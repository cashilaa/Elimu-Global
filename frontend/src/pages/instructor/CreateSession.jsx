import React, { useState, useEffect } from 'react';
import axios from 'axios';
import Button from '../../components/ui/Button';
import Spinner from '../../components/ui/Spinner';

const CreateSession = () => {
  const [loading, setLoading] = useState(false);
  const [title, setTitle] = useState('');
  const [course, setCourse] = useState('');
  const [date, setDate] = useState('');
  const [time, setTime] = useState('');
  const [groupId, setGroupId] = useState('');
  const [groups, setGroups] = useState([]);

  useEffect(() => {
    fetchGroups();
  }, []);

  const fetchGroups = async () => {
    setLoading(true);
    try {
      const response = await axios.get('/api/groups'); // Adjust the endpoint as necessary
      if (response.data && response.data.length > 0) {
        setGroups(response.data);
      } else {
        console.error('No groups found or response is invalid.');
      }
    } catch (error) {
      console.error('Error fetching groups:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      const sessionData = { title, course, date, time, groupId };
      const response = await axios.post('/api/sessions', sessionData); // Adjust the endpoint as necessary
      console.log('Session Created:', response.data);
      // Reset form or handle success
    } catch (error) {
      console.error('Error creating session:', error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="p-6">
      <h1 className="text-2xl font-bold mb-4">Create New Session</h1>
      {loading ? <Spinner /> : (
        <form onSubmit={handleSubmit}>
          <div className="mb-4">
            <label className="block mb-2">Title:</label>
            <input
              type="text"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              className="border rounded p-2 w-full"
              required
            />
          </div>
          <div className="mb-4">
            <label className="block mb-2">Course:</label>
            <input
              type="text"
              value={course}
              onChange={(e) => setCourse(e.target.value)}
              className="border rounded p-2 w-full"
              required
            />
          </div>
          <div className="mb-4">
            <label className="block mb-2">Date:</label>
            <input
              type="date"
              value={date}
              onChange={(e) => setDate(e.target.value)}
              className="border rounded p-2 w-full"
              required
            />
          </div>
          <div className="mb-4">
            <label className="block mb-2">Time:</label>
            <input
              type="time"
              value={time}
              onChange={(e) => setTime(e.target.value)}
              className="border rounded p-2 w-full"
              required
            />
          </div>
          <div className="mb-4">
            <label className="block mb-2">Select Group:</label>
            <select
              value={groupId}
              onChange={(e) => setGroupId(e.target.value)}
              className="border rounded p-2 w-full"
              required
            >
              <option value="">Select a group</option>
              {groups.map(group => (
                <option key={group.id} value={group.id}>{group.name}</option>
              ))}
            </select>
          </div>
          <Button type="submit">Create Session</Button>
        </form>
      )}
    </div>
  );
};

export default CreateSession;
