import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Question } from './question.schema';

interface QuestionData {
  text: string;
  type: string;
  options?: string[];
  correctAnswer: any;
  points?: number;
}

@Injectable()
export class AssessmentService {
  constructor(
    @InjectModel(Question.name) private questionModel: Model<Question>
  ) {}

  async createQuiz(quizData: { questions: QuestionData[] }) {
    const questions = await Promise.all(
      quizData.questions.map(async (questionData: QuestionData) => {
        const question = new this.questionModel(questionData);
        return question.save();
      })
    );

    return {
      ...quizData,
      questions: questions.map(q => q._id),
    };
  }

  async getQuizzesByCourse(courseId: string, userId: string) {
    const query = { userId } as any;
    if (courseId) {
      query.courseId = courseId;
    }
    return this.questionModel.find(query).exec();
  }
} 