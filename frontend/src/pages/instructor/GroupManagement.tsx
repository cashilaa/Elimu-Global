import React, { useState } from 'react';
import { Card } from '../../components/ui/Card';
import { Button } from '../../components/ui/Button';
import { Input } from '../../components/ui/Input';
import { Plus, Users, Edit, Trash } from 'lucide-react';
import { toast } from 'react-hot-toast';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "../../components/ui/dialog";

interface Group {
  id: string;
  name: string;
  memberCount: number;
  createdAt: string;
}

const GroupManagement: React.FC = () => {
  const [groups, setGroups] = useState<Group[]>([]);
  const [newGroupName, setNewGroupName] = useState('');
  const [editingGroup, setEditingGroup] = useState<Group | null>(null);
  const [editingGroupName, setEditingGroupName] = useState('');
  const [showCreateDialog, setShowCreateDialog] = useState(false);
  const [showEditDialog, setShowEditDialog] = useState(false);

  const handleCreateGroup = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newGroupName.trim()) {
      toast.error('Please enter a group name');
      return;
    }

    const newGroup: Group = {
      id: Date.now().toString(),
      name: newGroupName,
      memberCount: 0,
      createdAt: new Date().toISOString()
    };

    setGroups([...groups, newGroup]);
    setNewGroupName('');
    setShowCreateDialog(false);
    toast.success('Group created successfully');
  };

  const handleEditGroup = (e: React.FormEvent) => {
    e.preventDefault();
    if (!editingGroup || !editingGroupName.trim()) {
      toast.error('Please enter a group name');
      return;
    }

    setGroups(groups.map(group => 
      group.id === editingGroup.id 
        ? { ...group, name: editingGroupName }
        : group
    ));
    setEditingGroup(null);
    setEditingGroupName('');
    setShowEditDialog(false);
    toast.success('Group updated successfully');
  };

  const handleDeleteGroup = (groupId: string) => {
    setGroups(groups.filter(group => group.id !== groupId));
    toast.success('Group deleted successfully');
  };

  const openEditDialog = (group: Group) => {
    setEditingGroup(group);
    setEditingGroupName(group.name);
    setShowEditDialog(true);
  };

  return (
    <div className="p-6">
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-2xl font-bold">Group Management</h1>
        <Dialog open={showCreateDialog} onOpenChange={setShowCreateDialog}>
          <DialogTrigger asChild>
            <Button>
              <Plus className="w-4 h-4 mr-2" />
              Create Group
            </Button>
          </DialogTrigger>
          <DialogContent>
            <DialogHeader>
              <DialogTitle>Create New Group</DialogTitle>
              <DialogDescription>
                Enter a name for your new group.
              </DialogDescription>
            </DialogHeader>
            <form onSubmit={handleCreateGroup} className="space-y-4">
              <Input
                value={newGroupName}
                onChange={(e: React.ChangeEvent<HTMLInputElement>) => setNewGroupName(e.target.value)}
                placeholder="Enter group name"
                required
              />
              <div className="flex justify-end gap-2">
                <Button type="button" variant="outline" onClick={() => setShowCreateDialog(false)}>
                  Cancel
                </Button>
                <Button type="submit">Create</Button>
              </div>
            </form>
          </DialogContent>
        </Dialog>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {groups.map((group) => (
          <Card key={group.id} className="p-6">
            <div className="flex justify-between items-start mb-4">
              <div>
                <h3 className="font-semibold text-lg">{group.name}</h3>
                <div className="flex items-center text-sm text-gray-600 mt-1">
                  <Users className="w-4 h-4 mr-1" />
                  {group.memberCount} members
                </div>
              </div>
              <div className="flex gap-2">
                <Button
                  variant="outline"
                  size="sm"
                  onClick={() => openEditDialog(group)}
                >
                  <Edit className="w-4 h-4" />
                </Button>
                <Button
                  variant="destructive"
                  size="sm"
                  onClick={() => handleDeleteGroup(group.id)}
                >
                  <Trash className="w-4 h-4" />
                </Button>
              </div>
            </div>
            <p className="text-sm text-gray-500">
              Created {new Date(group.createdAt).toLocaleDateString()}
            </p>
          </Card>
        ))}
      </div>

      <Dialog open={showEditDialog} onOpenChange={setShowEditDialog}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Edit Group</DialogTitle>
            <DialogDescription>
              Update the group name.
            </DialogDescription>
          </DialogHeader>
          <form onSubmit={handleEditGroup} className="space-y-4">
            <Input
              value={editingGroupName}
              onChange={(e: React.ChangeEvent<HTMLInputElement>) => setEditingGroupName(e.target.value)}
              placeholder="Enter new group name"
              required
            />
            <div className="flex justify-end gap-2">
              <Button type="button" variant="outline" onClick={() => setShowEditDialog(false)}>
                Cancel
              </Button>
              <Button type="submit">Save Changes</Button>
            </div>
          </form>
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default GroupManagement;
