import React, { useState, useEffect } from 'react';
import { Card } from '../../components/ui/Card';
import { Button } from '../../components/ui/Button';
import { Input } from '../../components/ui/Input';
import { Textarea } from '../../components/ui/Textarea';
import { toast } from 'react-hot-toast';
import { motion } from 'framer-motion';
import axios from 'axios';
import { Avatar, AvatarImage, AvatarFallback } from '../../components/ui/avatar';
import { Camera, Save } from 'lucide-react';

interface Profile {
  firstName: string;
  lastName: string;
  email: string;
  title: string;
  bio: string;
  phoneNumber: string;
  location: string;
  website: string;
  socialLinks: {
    twitter: string;
    linkedin: string;
    github: string;
  };
  avatar?: string;
}

const ProfilePage: React.FC = () => {
  const [profile, setProfile] = useState<Profile>({
    firstName: '',
    lastName: '',
    email: '',
    title: '',
    bio: '',
    phoneNumber: '',
    location: '',
    website: '',
    socialLinks: {
      twitter: '',
      linkedin: '',
      github: ''
    }
  });

  const [isLoading, setIsLoading] = useState(false);
  const [avatarFile, setAvatarFile] = useState<File | null>(null);

  useEffect(() => {
    fetchProfile();
  }, []);

  const fetchProfile = async () => {
    try {
      const response = await axios.get<Profile>('/api/profile');
      setProfile(response.data);
    } catch (error) {
      console.error('Error fetching profile:', error);
      toast.error('Failed to load profile');
    }
  };

  const handleAvatarChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) {
      setAvatarFile(file);
      // Create a preview URL
      const reader = new FileReader();
      reader.onloadend = () => {
        setProfile(prev => ({
          ...prev,
          avatar: reader.result as string
        }));
      };
      reader.readAsDataURL(file);
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);

    try {
      const formData = new FormData();
      Object.entries(profile).forEach(([key, value]) => {
        if (key === 'socialLinks') {
          formData.append(key, JSON.stringify(value));
        } else {
          formData.append(key, value);
        }
      });

      if (avatarFile) {
        formData.append('avatar', avatarFile);
      }

      await axios.put('/api/profile', formData, {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
      });

      toast.success('Profile updated successfully');
    } catch (error) {
      console.error('Error updating profile:', error);
      toast.error('Failed to update profile');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="max-w-4xl mx-auto p-6"
    >
      <Card className="p-6">
        <form onSubmit={handleSubmit} className="space-y-6">
          <div className="flex justify-between items-center">
            <h2 className="text-2xl font-bold">Profile Settings</h2>
            <Button type="submit" disabled={isLoading}>
              {isLoading ? (
                <>
                  <div className="w-4 h-4 border-t-2 border-b-2 border-current rounded-full animate-spin mr-2" />
                  Saving...
                </>
              ) : (
                <>
                  <Save className="w-4 h-4 mr-2" />
                  Save Changes
                </>
              )}
            </Button>
          </div>

          <div className="flex items-center space-x-4">
            <div className="relative">
              <Avatar className="h-24 w-24">
                {profile.avatar ? (
                  <AvatarImage src={profile.avatar} alt={`${profile.firstName} ${profile.lastName}`} />
                ) : (
                  <AvatarFallback>
                    {profile.firstName && profile.lastName
                      ? `${profile.firstName[0]}${profile.lastName[0]}`
                      : 'User'}
                  </AvatarFallback>
                )}
              </Avatar>
              <label
                htmlFor="avatar-upload"
                className="absolute bottom-0 right-0 bg-white rounded-full p-1.5 shadow-lg cursor-pointer hover:bg-gray-50"
              >
                <Camera className="w-4 h-4" />
                <input
                  id="avatar-upload"
                  type="file"
                  accept="image/*"
                  className="hidden"
                  onChange={handleAvatarChange}
                />
              </label>
            </div>
            <div>
              <h3 className="text-lg font-medium">{`${profile.firstName} ${profile.lastName}`}</h3>
              <p className="text-gray-500">{profile.title || 'No title set'}</p>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <label className="block text-sm font-medium mb-1">First Name</label>
              <Input
                type="text"
                value={profile.firstName}
                onChange={(e: React.ChangeEvent<HTMLInputElement>) => setProfile({ ...profile, firstName: e.target.value })}
                required
              />
            </div>

            <div>
              <label className="block text-sm font-medium mb-1">Last Name</label>
              <Input
                type="text"
                value={profile.lastName}
                onChange={(e: React.ChangeEvent<HTMLInputElement>) => setProfile({ ...profile, lastName: e.target.value })}
                required
              />
            </div>

            <div>
              <label className="block text-sm font-medium mb-1">Email</label>
              <Input
                type="email"
                value={profile.email}
                onChange={(e: React.ChangeEvent<HTMLInputElement>) => setProfile({ ...profile, email: e.target.value })}
                required
              />
            </div>

            <div>
              <label className="block text-sm font-medium mb-1">Title</label>
              <Input
                type="text"
                value={profile.title}
                onChange={(e: React.ChangeEvent<HTMLInputElement>) => setProfile({ ...profile, title: e.target.value })}
              />
            </div>

            <div className="md:col-span-2">
              <label className="block text-sm font-medium mb-1">Bio</label>
              <Textarea
                value={profile.bio}
                onChange={(e: React.ChangeEvent<HTMLTextAreaElement>) => setProfile({ ...profile, bio: e.target.value })}
                rows={4}
              />
            </div>

            <div>
              <label className="block text-sm font-medium mb-1">Phone Number</label>
              <Input
                type="tel"
                value={profile.phoneNumber}
                onChange={(e: React.ChangeEvent<HTMLInputElement>) => setProfile({ ...profile, phoneNumber: e.target.value })}
              />
            </div>

            <div>
              <label className="block text-sm font-medium mb-1">Location</label>
              <Input
                type="text"
                value={profile.location}
                onChange={(e: React.ChangeEvent<HTMLInputElement>) => setProfile({
                  ...profile,
                  location: e.target.value
                })}
              />
            </div>

            <div>
              <label className="block text-sm font-medium mb-1">Website</label>
              <Input
                type="url"
                value={profile.website}
                onChange={(e: React.ChangeEvent<HTMLInputElement>) => setProfile({
                  ...profile,
                  website: e.target.value
                })}
              />
            </div>

            <div>
              <label className="block text-sm font-medium mb-1">Twitter</label>
              <Input
                type="text"
                value={profile.socialLinks.twitter}
                onChange={(e: React.ChangeEvent<HTMLInputElement>) => setProfile({
                  ...profile,
                  socialLinks: { ...profile.socialLinks, twitter: e.target.value }
                })}
              />
            </div>

            <div>
              <label className="block text-sm font-medium mb-1">LinkedIn</label>
              <Input
                type="text"
                value={profile.socialLinks.linkedin}
                onChange={(e: React.ChangeEvent<HTMLInputElement>) => setProfile({
                  ...profile,
                  socialLinks: { ...profile.socialLinks, linkedin: e.target.value }
                })}
              />
            </div>

            <div>
              <label className="block text-sm font-medium mb-1">GitHub</label>
              <Input
                type="text"
                value={profile.socialLinks.github}
                onChange={(e: React.ChangeEvent<HTMLInputElement>) => setProfile({
                  ...profile,
                  socialLinks: { ...profile.socialLinks, github: e.target.value }
                })}
              />
            </div>
          </div>
        </form>
      </Card>
    </motion.div>
  );
};

export default ProfilePage;
