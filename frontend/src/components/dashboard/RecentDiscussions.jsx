import React from 'react';
import { Card } from '../ui/Card';
import { MessageCircle, ArrowRight } from 'lucide-react';
import { ProfileAvatar } from '../ui/ProfileAvatar';
import { format } from 'date-fns';
import { Link } from 'react-router-dom';

export const RecentDiscussions = ({ discussions }) => {
  return (
    <Card className="p-6">
      <div className="flex justify-between items-center mb-4">
        <h3 className="font-semibold">Recent Discussions</h3>
        <Link 
          to="/dashboard/discussions" 
          className="text-sm text-blue-600 hover:text-blue-700 flex items-center gap-1"
        >
          View All
          <ArrowRight className="w-4 h-4" />
        </Link>
      </div>

      <div className="space-y-4">
        {discussions?.length === 0 ? (
          <div className="text-center text-gray-500 py-8">
            <MessageCircle className="w-12 h-12 mx-auto mb-2 opacity-50" />
            <p>No recent discussions</p>
          </div>
        ) : (
          discussions?.map(discussion => (
            <Link
              key={discussion.id}
              to={`/dashboard/courses/${discussion.courseId}?tab=discussions`}
              className="flex items-start gap-3 p-3 hover:bg-gray-50 rounded-lg"
            >
              <ProfileAvatar user={discussion.author} size="sm" />
              <div className="flex-1 min-w-0">
                <p className="font-medium truncate">{discussion.content}</p>
                <p className="text-sm text-gray-500">
                  {discussion.author.firstName} {discussion.author.lastName} •{' '}
                  {format(new Date(discussion.createdAt), 'MMM d, h:mm a')}
                </p>
              </div>
            </Link>
          ))
        )}
      </div>
    </Card>
  );
}; 