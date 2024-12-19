import React, { useState, useEffect } from 'react';
import axios from 'axios';
import Button from '../../components/ui/Button';
import Card from '../../components/ui/Card';
import Spinner from '../../components/ui/Spinner';

const GroupManagement = () => {
  const [groups, setGroups] = useState([]);
  const [newGroupName, setNewGroupName] = useState('');
  const [editingGroup, setEditingGroup] = useState(null);
  const [editingGroupName, setEditingGroupName] = useState('');
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    fetchGroups();
  }, []);

  const fetchGroups = async () => {
    setLoading(true);
    try {
      const response = await axios.get('/api/groups'); // Adjust the endpoint as necessary
      if (response && response.data && Array.isArray(response.data) && response.data.length > 0) {
        setGroups(response.data);
      } else if (response && response.data) {
        console.error('Invalid response data:', response.data);
      } else {
        console.error('No groups found or response is invalid.');
      }
    } catch (error) {
      console.error('Error fetching groups:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleAddGroup = async () => {
    if (newGroupName) {
      try {
        const response = await axios.post('/api/groups', { name: newGroupName });
        setGroups([...groups, response.data]);
        setNewGroupName('');
      } catch (error) {
        console.error('Error adding group:', error);
      }
    }
  };

  const handleEditGroup = (id) => {
    const groupToEdit = groups.find(group => group.id === id);
    setEditingGroup(groupToEdit);
    setEditingGroupName(groupToEdit.name);
  };

  const handleUpdateGroup = async () => {
    try {
      const response = await axios.patch(`/api/groups/${editingGroup.id}`, { name: editingGroupName });
      setGroups(groups.map(group => (group.id === editingGroup.id ? response.data : group)));
      setEditingGroup(null);
      setEditingGroupName('');
    } catch (error) {
      console.error('Error updating group:', error);
    }
  };

  const handleDeleteGroup = async (id) => {
    try {
      await axios.delete(`/api/groups/${id}`);
      setGroups(groups.filter(group => group.id !== id));
    } catch (error) {
      console.error('Error deleting group:', error);
    }
  };

  return (
    <div className="p-6">
      <h1 className="text-2xl font-bold">Group Management</h1>
      {loading ? <Spinner /> : (
        <div>
          <div className="mb-4">
            <input
              type="text"
              value={newGroupName}
              onChange={(e) => setNewGroupName(e.target.value)}
              placeholder="New Group Name"
              className="border rounded p-2"
            />
            <Button onClick={handleAddGroup}>Add Group</Button>
          </div>
          <div className="grid gap-6">
            {groups.map(group => (
              <Card key={group.id} className="hover:shadow-lg transition-shadow">
                <div className="flex justify-between items-center">
                  <h3 className="text-lg font-semibold">{group.name}</h3>
                  <div>
                    <Button onClick={() => handleEditGroup(group.id)}>Edit</Button>
                    <Button onClick={() => handleDeleteGroup(group.id)} variant="danger">Delete</Button>
                  </div>
                </div>
              </Card>
            ))}
          </div>
          {editingGroup && (
            <div className="mt-4">
              <h2 className="text-xl">Editing Group: {editingGroup.name}</h2>
              <input
                type="text"
                value={editingGroupName}
                onChange={(e) => setEditingGroupName(e.target.value)}
                className="border rounded p-2"
              />
              <Button onClick={handleUpdateGroup}>Update Group</Button>
            </div>
          )}
        </div>
      )}
    </div>
  );
};

export default GroupManagement;
