import { useState } from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import * as z from 'zod';
import { Video, Calendar, Clock, Link as LinkIcon } from 'lucide-react';
import { format } from 'date-fns';

const meetingSchema = z.object({
  topic: z.string().min(5, 'Topic must be at least 5 characters'),
  startTime: z.string().min(1, 'Start time is required'),
  duration: z.number().min(15, 'Duration must be at least 15 minutes'),
  agenda: z.string().optional(),
});

type MeetingFormData = z.infer<typeof meetingSchema>;

interface Meeting {
  id: string;
  topic: string;
  startTime: string;
  duration: number;
  joinUrl: string;
  startUrl: string;
}

export const ZoomMeetingManager = () => {
  const [meetings, setMeetings] = useState<Meeting[]>([]);
  const [isCreating, setIsCreating] = useState(false);
  const [currentMeeting, setCurrentMeeting] = useState<Meeting | null>(null);

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors, isSubmitting },
  } = useForm<MeetingFormData>({
    resolver: zodResolver(meetingSchema),
  });

  const createMeeting = async (data: MeetingFormData) => {
    const startTimeWithTimezone = new Date(data.startTime).toISOString();

    // Validate start time to ensure it's in the future
    const currentTime = new Date();
    if (new Date(startTimeWithTimezone) <= currentTime) {
      alert('Start time must be in the future.');
      return;
    }

    const meetingData = {
      ...data,
      startTime: startTimeWithTimezone,
    };

    console.log('Creating meeting with data:', meetingData);
    console.log('Start Time:', meetingData.startTime);
    try {
      const response = await fetch('/api/zoom/meetings', {
        method: 'POST',
        body: JSON.stringify(meetingData),
        headers: { 'Content-Type': 'application/json' },
      });

      if (!response.ok) {
        throw new Error('Failed to create meeting');
      }

      const meetingResponse = await response.json();
      setCurrentMeeting(meetingResponse);
      setMeetings([...meetings, meetingResponse]);
      setIsCreating(false);
      reset();
    } catch (error) {
      console.error('Error creating meeting:', error);
    }
  };

  const deleteMeeting = async (meetingId: string) => {
    try {
      const response = await fetch(`/api/zoom/meetings/${meetingId}`, {
        method: 'DELETE',
      });

      if (!response.ok) {
        throw new Error('Failed to delete meeting');
      }

      setMeetings(meetings.filter(meeting => meeting.id !== meetingId));
    } catch (error) {
      console.error('Error deleting meeting:', error);
    }
  };

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h2 className="text-2xl font-bold text-gray-900">Zoom Meetings</h2>
        <button
          onClick={() => setIsCreating(true)}
          className="inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md text-white bg-blue-600 hover:bg-blue-700"
        >
          <Video className="h-5 w-5 mr-2" />
          Create Meeting
        </button>
      </div>

      {isCreating && (
        <div className="bg-white p-6 rounded-lg shadow">
          <form onSubmit={handleSubmit(createMeeting)} className="space-y-6">
            <div className="grid grid-cols-1 gap-6 sm:grid-cols-2">
              <div className="space-y-2">
                <label className="block text-sm font-medium text-gray-700">
                  Topic
                </label>
                <input
                  type="text"
                  {...register('topic')}
                  className="block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
                />
                {errors.topic && (
                  <p className="text-sm text-red-600">{errors.topic.message}</p>
                )}
              </div>

              <div className="space-y-2">
                <label className="block text-sm font-medium text-gray-700">
                  Start Time
                </label>
                <input
                  type="datetime-local"
                  {...register('startTime')}
                  className="block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
                />
                {errors.startTime && (
                  <p className="text-sm text-red-600">{errors.startTime.message}</p>
                )}
              </div>

              <div className="space-y-2">
                <label className="block text-sm font-medium text-gray-700">
                  Duration (minutes)
                </label>
                <input
                  type="number"
                  {...register('duration', { valueAsNumber: true })}
                  className="block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
                />
                {errors.duration && (
                  <p className="text-sm text-red-600">{errors.duration.message}</p>
                )}
              </div>

              <div className="space-y-2">
                <label className="block text-sm font-medium text-gray-700">
                  Agenda (optional)
                </label>
                <textarea
                  {...register('agenda')}
                  rows={3}
                  className="block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
                />
              </div>
            </div>

            <div className="flex justify-end space-x-3">
              <button
                type="button"
                onClick={() => setIsCreating(false)}
                className="px-4 py-2 text-sm font-medium text-gray-700 bg-white border border-gray-300 rounded-md shadow-sm hover:bg-gray-50"
              >
                Cancel
              </button>
              <button
                type="submit"
                disabled={isSubmitting}
                className="inline-flex items-center px-4 py-2 text-sm font-medium text-white bg-blue-600 border border-transparent rounded-md shadow-sm hover:bg-blue-700"
              >
                {isSubmitting ? 'Creating...' : 'Create Meeting'}
              </button>
            </div>
          </form>
        </div>
      )}

      {currentMeeting && (
        <iframe
          src={currentMeeting.joinUrl}
          width="100%"
          height="600"
          frameBorder="0"
          allow="microphone; camera; fullscreen"
          onError={() => alert('Could not load the Zoom meeting. Please check your Zoom settings or try again later.')}
        />
      )}

      <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
        {meetings.map((meeting) => {
          const meetingStartTime = new Date(meeting.startTime);
          if (isNaN(meetingStartTime.getTime())) {
            console.error('Invalid start time for meeting:', meeting);
            return null; // Skip rendering this meeting if the start time is invalid
          }

          return (
            <div
              key={meeting.id}
              className="bg-white p-6 rounded-lg shadow space-y-4"
            >
              <div className="flex items-start justify-between">
                <div className="space-y-1">
                  <h3 className="text-lg font-medium text-gray-900">
                    {meeting.topic}
                  </h3>
                  <div className="flex items-center text-sm text-gray-500">
                    <Calendar className="h-4 w-4 mr-1" />
                    {format(meetingStartTime, 'PPp')}
                  </div>
                  <div className="flex items-center text-sm text-gray-500">
                    <Clock className="h-4 w-4 mr-1" />
                    {meeting.duration} minutes
                  </div>
                </div>
              </div>

              <div className="space-y-2">
                <a
                  href={meeting.joinUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center px-3 py-2 text-sm font-medium text-blue-700 bg-blue-100 rounded-md hover:bg-blue-200 w-full"
                >
                  <LinkIcon className="h-4 w-4 mr-2" />
                  Join Meeting
                </a>
                <button
                  onClick={() => deleteMeeting(meeting.id)}
                  className="inline-flex items-center px-3 py-2 text-sm font-medium text-red-700 bg-red-100 rounded-md hover:bg-red-200 w-full"
                >
                  Delete Meeting
                </button>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default ZoomMeetingManager;
