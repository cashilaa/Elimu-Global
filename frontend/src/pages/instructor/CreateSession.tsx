import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Button } from '../../components/ui/Button.tsx';
import { Input } from '../../components/ui/Input.tsx';
import { 
  Select, 
  SelectContent, 
  SelectItem, 
  SelectTrigger, 
  SelectValue 
} from '../../components/ui/Select.tsx';
import { Card } from '../../components/ui/Card.tsx';
import { toast } from 'react-hot-toast';
import axios from 'axios';

interface SessionData {
  title: string;
  course: string;
  date: string;
  time: string;
}

const CreateSession: React.FC = () => {
  const navigate = useNavigate();
  const [title, setTitle] = useState('');
  const [course, setCourse] = useState('');
  const [date, setDate] = useState('');
  const [time, setTime] = useState('');
  const [isLoading, setIsLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);

    const sessionData: SessionData = {
      title,
      course,
      date,
      time
    };

    try {
      await axios.post('/api/sessions', sessionData);
      toast.success('Session created successfully!');
      navigate('/instructor/schedule');
    } catch (error) {
      console.error('Error creating session:', error);
      toast.error('Failed to create session');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="max-w-2xl mx-auto p-6">
      <Card>
        <form onSubmit={handleSubmit} className="space-y-6 p-6">
          <h2 className="text-2xl font-bold">Create New Session</h2>
          
          <div className="space-y-4">
            <div>
              <label htmlFor="title" className="block text-sm font-medium text-gray-700">
                Session Title
              </label>
              <Input
                id="title"
                value={title}
                onChange={(e: React.ChangeEvent<HTMLInputElement>) => setTitle(e.target.value)}
                placeholder="Enter session title"
                required
              />
            </div>

            <div>
              <label htmlFor="course" className="block text-sm font-medium text-gray-700">
                Course
              </label>
              <Select value={course} onValueChange={setCourse}>
                <SelectTrigger>
                  <SelectValue placeholder="Select a course" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="course1">Course 1</SelectItem>
                  <SelectItem value="course2">Course 2</SelectItem>
                  <SelectItem value="course3">Course 3</SelectItem>
                </SelectContent>
              </Select>
            </div>

            <div>
              <label htmlFor="date" className="block text-sm font-medium text-gray-700">
                Date
              </label>
              <Input
                id="date"
                type="date"
                value={date}
                onChange={(e: React.ChangeEvent<HTMLInputElement>) => setDate(e.target.value)}
                required
              />
            </div>

            <div>
              <label htmlFor="time" className="block text-sm font-medium text-gray-700">
                Time
              </label>
              <Input
                id="time"
                type="time"
                value={time}
                onChange={(e: React.ChangeEvent<HTMLInputElement>) => setTime(e.target.value)}
                required
              />
            </div>
          </div>

          <div className="flex justify-end">
            <Button type="submit" disabled={isLoading}>
              {isLoading ? 'Creating...' : 'Create Session'}
            </Button>
          </div>
        </form>
      </Card>
    </div>
  );
};

export default CreateSession;
