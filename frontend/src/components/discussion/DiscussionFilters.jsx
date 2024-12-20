import React from 'react';
import { Select } from '../ui/select';
import { Button } from '../ui/button';
import { Search } from 'lucide-react';

export const DiscussionFilters = ({
  query,
  setQuery,
  sortBy,
  setSortBy,
  timeframe,
  setTimeframe,
  hasReplies,
  setHasReplies
}) => {
  return (
    <div className="space-y-4 p-4 bg-gray-50 rounded-lg">
      <div className="relative">
        <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
        <input
          type="text"
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          placeholder="Search discussions..."
          className="w-full pl-10 pr-4 py-2 border rounded-lg"
        />
      </div>

      <div className="grid grid-cols-2 gap-4">
        <div>
          <label className="text-sm font-medium text-gray-700">Sort By</label>
          <Select
            value={sortBy}
            onValueChange={setSortBy}
            options={[
              { value: 'latest', label: 'Latest' },
              { value: 'popular', label: 'Most Liked' },
              { value: 'replies', label: 'Most Replies' }
            ]}
          />
        </div>

        <div>
          <label className="text-sm font-medium text-gray-700">Time Frame</label>
          <Select
            value={timeframe}
            onValueChange={setTimeframe}
            options={[
              { value: 'all', label: 'All Time' },
              { value: 'day', label: 'Last 24 Hours' },
              { value: 'week', label: 'Last Week' },
              { value: 'month', label: 'Last Month' }
            ]}
          />
        </div>
      </div>

      <Button
        variant={hasReplies ? 'default' : 'outline'}
        onClick={() => setHasReplies(!hasReplies)}
        className="w-full"
      >
        {hasReplies ? 'Show All' : 'Show Only With Replies'}
      </Button>
    </div>
  );
}; 