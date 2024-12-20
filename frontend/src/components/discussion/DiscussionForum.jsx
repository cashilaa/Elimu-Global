import React, { useState, useEffect } from 'react';
import { Card } from '../ui/Card';
import { Send, MessageCircle, ThumbsUp, Reply, MoreVertical } from 'lucide-react';
import { ProfileAvatar } from '../ui/ProfileAvatar';
import { motion, AnimatePresence } from 'framer-motion';
import { format } from 'date-fns';
import { DiscussionFilters } from './DiscussionFilters';

export const DiscussionForum = ({ courseId }) => {
  const [discussions, setDiscussions] = useState([]);
  const [newMessage, setNewMessage] = useState('');
  const [loading, setLoading] = useState(true);
  const [user, setUser] = useState(null);
  const [query, setQuery] = useState('');
  const [sortBy, setSortBy] = useState('latest');
  const [timeframe, setTimeframe] = useState('all');
  const [hasReplies, setHasReplies] = useState(false);

  useEffect(() => {
    const userData = JSON.parse(localStorage.getItem('user') || '{}');
    setUser(userData);
    fetchDiscussions();
  }, [courseId]);

  useEffect(() => {
    fetchDiscussions();
  }, [query, sortBy, timeframe, hasReplies]);

  const fetchDiscussions = async () => {
    try {
      const params = new URLSearchParams({
        q: query,
        sortBy,
        timeframe,
        ...(hasReplies && { hasReplies: 'true' })
      });

      const response = await fetch(
        `/api/discussions/course/${courseId}/search?${params}`,
        {
          headers: {
            'Authorization': `Bearer ${localStorage.getItem('token')}`
          }
        }
      );
      const data = await response.json();
      setDiscussions(data);
    } catch (error) {
      console.error('Failed to fetch discussions:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!newMessage.trim()) return;

    try {
      const response = await fetch(`/api/courses/${courseId}/discussions`, {
        method: 'POST',
        headers: {
          'Authorization': `Bearer ${localStorage.getItem('token')}`,
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({ content: newMessage })
      });

      const data = await response.json();
      setDiscussions(prev => [data, ...prev]);
      setNewMessage('');
    } catch (error) {
      console.error('Failed to post message:', error);
    }
  };

  const handleLike = async (discussionId) => {
    try {
      await fetch(`/api/discussions/${discussionId}/like`, {
        method: 'POST',
        headers: {
          'Authorization': `Bearer ${localStorage.getItem('token')}`
        }
      });

      setDiscussions(prev => prev.map(d => 
        d.id === discussionId 
          ? { ...d, likes: d.likes.includes(user.id) 
              ? d.likes.filter(id => id !== user.id)
              : [...d.likes, user.id] 
            }
          : d
      ));
    } catch (error) {
      console.error('Failed to like discussion:', error);
    }
  };

  const DiscussionMessage = ({ discussion }) => (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className="p-4 border-b last:border-b-0"
    >
      <div className="flex gap-4">
        <ProfileAvatar user={discussion.author} size="md" />
        <div className="flex-1">
          <div className="flex justify-between items-start">
            <div>
              <h4 className="font-medium">
                {discussion.author.firstName} {discussion.author.lastName}
              </h4>
              <p className="text-sm text-gray-500">
                {format(new Date(discussion.createdAt), 'MMM d, yyyy h:mm a')}
              </p>
            </div>
            <button className="p-1 hover:bg-gray-100 rounded-full">
              <MoreVertical className="w-4 h-4 text-gray-500" />
            </button>
          </div>
          <p className="mt-2 text-gray-700">{discussion.content}</p>
          <div className="mt-3 flex items-center gap-4">
            <button
              onClick={() => handleLike(discussion.id)}
              className={`flex items-center gap-1 text-sm ${
                discussion.likes.includes(user?.id) 
                  ? 'text-blue-600' 
                  : 'text-gray-500 hover:text-blue-600'
              }`}
            >
              <ThumbsUp className="w-4 h-4" />
              {discussion.likes.length}
            </button>
            <button className="flex items-center gap-1 text-sm text-gray-500 hover:text-blue-600">
              <Reply className="w-4 h-4" />
              Reply
            </button>
          </div>
        </div>
      </div>
    </motion.div>
  );

  return (
    <div className="space-y-6">
      <DiscussionFilters
        query={query}
        setQuery={setQuery}
        sortBy={sortBy}
        setSortBy={setSortBy}
        timeframe={timeframe}
        setTimeframe={setTimeframe}
        hasReplies={hasReplies}
        setHasReplies={setHasReplies}
      />
      {/* Message Input */}
      <div className="p-4">
        <form onSubmit={handleSubmit} className="flex gap-4">
          <ProfileAvatar user={user} size="md" />
          <div className="flex-1 relative">
            <textarea
              value={newMessage}
              onChange={(e) => setNewMessage(e.target.value)}
              placeholder="Start a discussion..."
              className="w-full p-3 pr-12 border rounded-lg resize-none focus:ring-2 focus:ring-blue-500"
              rows={3}
            />
            <button
              type="submit"
              disabled={!newMessage.trim()}
              className="absolute bottom-3 right-3 p-2 text-blue-600 hover:bg-blue-50 rounded-full disabled:opacity-50"
            >
              <Send className="w-5 h-5" />
            </button>
          </div>
        </form>
      </div>

      {/* Discussion List */}
      <div className="divide-y">
        {loading ? (
          <div className="p-8 text-center text-gray-500">Loading discussions...</div>
        ) : discussions.length === 0 ? (
          <div className="p-8 text-center text-gray-500">
            <MessageCircle className="w-12 h-12 mx-auto mb-3 opacity-50" />
            <p>No discussions yet. Start one!</p>
          </div>
        ) : (
          <AnimatePresence>
            {discussions.map(discussion => (
              <DiscussionMessage key={discussion.id} discussion={discussion} />
            ))}
          </AnimatePresence>
        )}
      </div>
    </div>
  );
}; 