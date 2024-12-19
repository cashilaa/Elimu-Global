import React from 'react';
import { ZoomMeetingManager } from '../../components/instructor/ZoomMeetingManager';

const ZoomMeetings = () => {
  return (
    <div className="container mx-auto px-4 py-8">
      <div className="bg-white rounded-lg shadow-lg p-6">
        <h1 className="text-3xl font-bold text-gray-900 mb-8">Online Classes</h1>
        <ZoomMeetingManager />
      </div>
    </div>
  );
};

export default ZoomMeetings;
