import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model, Types } from 'mongoose';
import { Discussion } from './discussion.schema';
import { WebSocketGateway, WebSocketServer } from '@nestjs/websockets';
import { Server } from 'socket.io';

interface SearchQuery {
  courseId: Types.ObjectId;
  createdAt?: {
    $gte: Date;
  };
  $or?: Array<{
    content: { $regex: string; $options: string; };
  } | {
    'replies.content': { $regex: string; $options: string; };
  }>;
  'replies.0'?: { $exists: boolean; };
}

@WebSocketGateway({
  cors: {
    origin: '*',
  },
})
@Injectable()
export class DiscussionService {
  @WebSocketServer()
  server: Server;

  constructor(
    @InjectModel(Discussion.name) private discussionModel: Model<Discussion>
  ) {}

  async create(courseId: string, userId: string, content: string): Promise<Discussion> {
    const discussion = new this.discussionModel({
      courseId: new Types.ObjectId(courseId),
      author: new Types.ObjectId(userId),
      content,
      likes: [],
      replies: []
    });

    const savedDiscussion = await discussion.save();
    const populatedDiscussion = await this.discussionModel
      .findById(savedDiscussion._id)
      .populate('author', 'firstName lastName profilePicture')
      .exec();

    if (!populatedDiscussion) {
      throw new NotFoundException('Discussion not found after creation');
    }

    this.server.to(`course:${courseId}`).emit('newDiscussion', populatedDiscussion);

    return populatedDiscussion;
  }

  async findByCourse(courseId: string): Promise<Discussion[]> {
    return this.discussionModel
      .find({ courseId: new Types.ObjectId(courseId) })
      .populate('author', 'firstName lastName profilePicture')
      .sort('-createdAt')
      .exec();
  }

  async toggleLike(discussionId: string, userId: string): Promise<Discussion> {
    const discussion = await this.discussionModel.findById(discussionId);
    if (!discussion) {
      throw new NotFoundException('Discussion not found');
    }

    const userIdObj = new Types.ObjectId(userId);
    const hasLiked = discussion.likes.includes(userIdObj);

    const updatedDiscussion = await this.discussionModel
      .findByIdAndUpdate(
        discussionId,
        hasLiked
          ? { $pull: { likes: userIdObj } }
          : { $addToSet: { likes: userIdObj } },
        { new: true }
      )
      .populate('author', 'firstName lastName profilePicture')
      .exec();

    if (!updatedDiscussion) {
      throw new NotFoundException('Discussion not found after update');
    }

    this.server.to(`course:${discussion.courseId}`).emit('discussionLiked', {
      discussionId,
      likes: updatedDiscussion.likes
    });

    return updatedDiscussion;
  }

  async addReply(
    discussionId: string,
    userId: string,
    content: string
  ): Promise<Discussion> {
    const discussion = await this.discussionModel.findById(discussionId);
    if (!discussion) {
      throw new NotFoundException('Discussion not found');
    }

    const reply = {
      author: new Types.ObjectId(userId),
      content,
      createdAt: new Date()
    };

    const updatedDiscussion = await this.discussionModel
      .findByIdAndUpdate(
        discussionId,
        { $push: { replies: reply } },
        { new: true }
      )
      .populate('author', 'firstName lastName profilePicture')
      .populate('replies.author', 'firstName lastName profilePicture')
      .exec();

    if (!updatedDiscussion) {
      throw new NotFoundException('Discussion not found after update');
    }

    // Emit new reply to course room
    this.server.to(`course:${discussion.courseId}`).emit('newReply', {
      discussionId,
      reply: {
        ...reply,
        author: await this.getUserInfo(userId)
      }
    });

    return updatedDiscussion;
  }

  private async getUserInfo(userId: string) {
    const User = this.discussionModel.db.model('User');
    return User.findById(userId).select('firstName lastName profilePicture').exec();
  }

  async searchDiscussions(
    courseId: string,
    query: string,
    filters: {
      sortBy?: 'latest' | 'popular' | 'replies';
      timeframe?: 'day' | 'week' | 'month' | 'all';
      hasReplies?: boolean;
    }
  ): Promise<Discussion[]> {
    const { sortBy = 'latest', timeframe = 'all', hasReplies } = filters;
    
    let dateFilter = {};
    if (timeframe !== 'all') {
      const now = new Date();
      switch (timeframe) {
        case 'day':
          dateFilter = { createdAt: { $gte: new Date(now.setDate(now.getDate() - 1)) } };
          break;
        case 'week':
          dateFilter = { createdAt: { $gte: new Date(now.setDate(now.getDate() - 7)) } };
          break;
        case 'month':
          dateFilter = { createdAt: { $gte: new Date(now.setMonth(now.getMonth() - 1)) } };
          break;
      }
    }

    const baseQuery: SearchQuery = {
      courseId: new Types.ObjectId(courseId),
      ...dateFilter,
    };

    if (query) {
      baseQuery.$or = [
        { content: { $regex: query, $options: 'i' } },
        { 'replies.content': { $regex: query, $options: 'i' } }
      ];
    }

    if (hasReplies !== undefined) {
      baseQuery['replies.0'] = { $exists: hasReplies };
    }

    return this.discussionModel
      .find(baseQuery)
      .populate('author', 'firstName lastName profilePicture')
      .populate('replies.author', 'firstName lastName profilePicture')
      .sort(sortBy === 'latest' ? { createdAt: -1 } : 
            sortBy === 'popular' ? { 'likes.length': -1 } : 
            { 'replies.length': -1 })
      .exec();
  }
} 