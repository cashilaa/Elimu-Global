import React, { useState } from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import * as z from 'zod';
import { Card } from '../components/ui/Card';
import { Button } from '../components/ui/Button';
import { User, Lock, Bell, Globe, Camera, Moon, Sun } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import axios from 'axios';
import { toast } from 'react-hot-toast';

interface NotificationSetting {
  id: string;
  label: string;
  description: string;
}

interface Tab {
  id: string;
  label: string;
  icon: React.FC<{ className?: string }>;
}

const profileSchema = z.object({
  fullName: z.string().min(2, 'Name must be at least 2 characters'),
  email: z.string().email('Invalid email address'),
  bio: z.string().max(500, 'Bio must be less than 500 characters').optional(),
  website: z.string().url('Invalid URL').optional().or(z.literal('')),
  timezone: z.string(),
  language: z.string()
});

const securitySchema = z.object({
  currentPassword: z.string().min(8, 'Password must be at least 8 characters'),
  newPassword: z.string().min(8, 'Password must be at least 8 characters'),
  confirmPassword: z.string()
}).refine((data) => data.newPassword === data.confirmPassword, {
  message: "Passwords don't match",
  path: ["confirmPassword"]
});

type ProfileFormData = z.infer<typeof profileSchema>;
type SecurityFormData = z.infer<typeof securitySchema>;

const Settings: React.FC = () => {
  const [activeTab, setActiveTab] = useState('profile');
  const [isDarkMode, setIsDarkMode] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [avatar, setAvatar] = useState<string | null>(null);

  const { register: profileRegister, handleSubmit: handleProfileSubmit, formState: { errors: profileErrors } } = 
    useForm<ProfileFormData>({
      resolver: zodResolver(profileSchema),
      defaultValues: {
        fullName: 'John Doe',
        email: 'john@example.com',
        bio: '',
        website: '',
        timezone: 'UTC',
        language: 'en'
      }
    });

  const { register: securityRegister, handleSubmit: handleSecuritySubmit, formState: { errors: securityErrors } } = 
    useForm<SecurityFormData>({
      resolver: zodResolver(securitySchema)
    });

  const tabs: Tab[] = [
    { id: 'profile', label: 'Profile', icon: User },
    { id: 'notifications', label: 'Notifications', icon: Bell },
    { id: 'security', label: 'Security', icon: Lock },
    { id: 'preferences', label: 'Preferences', icon: Globe }
  ];

  const handleAvatarChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setAvatar(reader.result as string);
      };
      reader.readAsDataURL(file);
    }
  };

  const onProfileSubmit = async (data: ProfileFormData) => {
    setIsLoading(true);
    try {
      await axios.put('/api/profile', { ...data, avatar });
      toast.success('Profile updated successfully');
    } catch (error) {
      toast.error('Failed to update profile');
      console.error(error);
    } finally {
      setIsLoading(false);
    }
  };

  const onSecuritySubmit = async (data: SecurityFormData) => {
    setIsLoading(true);
    try {
      await axios.put('/api/security', data);
      toast.success('Password updated successfully');
    } catch (error) {
      toast.error('Failed to update password');
      console.error(error);
    } finally {
      setIsLoading(false);
    }
  };

  const onNotificationSettingsChange = async (key: string, value: boolean) => {
    try {
      await axios.put('/api/notifications/settings', { [key]: value });
      toast.success('Notification settings updated');
    } catch (error) {
      toast.error('Failed to update notification settings');
      console.error(error);
    }
  };

  return (
    <div className="p-6 bg-gray-50 min-h-screen">
      <h1 className="text-3xl font-bold mb-8 text-gray-900">Settings</h1>

      <div className="flex flex-col lg:flex-row gap-8">
        {/* Tabs */}
        <div className="w-full lg:w-64">
          <Card className="sticky top-6">
            <nav className="space-y-1">
              {tabs.map((tab) => {
                const Icon = tab.icon;
                return (
                  <motion.button
                    key={tab.id}
                    onClick={() => setActiveTab(tab.id)}
                    className={`w-full flex items-center space-x-3 px-4 py-3 text-sm font-medium rounded-lg transition-colors ${
                      activeTab === tab.id
                        ? 'bg-blue-50 text-blue-700'
                        : 'text-gray-600 hover:bg-gray-50'
                    }`}
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.98 }}
                  >
                    <Icon className="h-5 w-5" />
                    <span>{tab.label}</span>
                  </motion.button>
                );
              })}
            </nav>
          </Card>
        </div>

        {/* Content */}
        <div className="flex-1">
          <AnimatePresence mode="wait">
            <motion.div
              key={activeTab}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              transition={{ duration: 0.2 }}
            >
              <Card className="overflow-hidden">
                {activeTab === 'profile' && (
                  <form onSubmit={handleProfileSubmit(onProfileSubmit)} className="space-y-6">
                    <div className="flex items-center space-x-6">
                      <div className="relative">
                        <div className="w-24 h-24 rounded-full overflow-hidden bg-gray-100">
                          {avatar ? (
                            <img src={avatar} alt="Profile" className="w-full h-full object-cover" />
                          ) : (
                            <User className="w-full h-full p-4 text-gray-400" />
                          )}
                        </div>
                        <label className="absolute bottom-0 right-0 p-1 bg-white rounded-full shadow-lg cursor-pointer">
                          <Camera className="w-4 h-4 text-gray-600" />
                          <input type="file" className="hidden" onChange={handleAvatarChange} accept="image/*" />
                        </label>
                      </div>
                      <div>
                        <h3 className="text-lg font-medium">Profile Picture</h3>
                        <p className="text-sm text-gray-500">PNG, JPG up to 10MB</p>
                      </div>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                      <div>
                        <label className="block text-sm font-medium text-gray-700">Full Name</label>
                        <input
                          {...profileRegister('fullName')}
                          className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
                        />
                        {profileErrors.fullName && (
                          <p className="mt-1 text-sm text-red-600">{profileErrors.fullName.message}</p>
                        )}
                      </div>

                      <div>
                        <label className="block text-sm font-medium text-gray-700">Email</label>
                        <input
                          {...profileRegister('email')}
                          className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
                        />
                        {profileErrors.email && (
                          <p className="mt-1 text-sm text-red-600">{profileErrors.email.message}</p>
                        )}
                      </div>

                      <div className="md:col-span-2">
                        <label className="block text-sm font-medium text-gray-700">Bio</label>
                        <textarea
                          {...profileRegister('bio')}
                          rows={4}
                          className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
                        />
                        {profileErrors.bio && (
                          <p className="mt-1 text-sm text-red-600">{profileErrors.bio.message}</p>
                        )}
                      </div>

                      <div>
                        <label className="block text-sm font-medium text-gray-700">Website</label>
                        <input
                          {...profileRegister('website')}
                          className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
                        />
                        {profileErrors.website && (
                          <p className="mt-1 text-sm text-red-600">{profileErrors.website.message}</p>
                        )}
                      </div>

                      <div>
                        <label className="block text-sm font-medium text-gray-700">Language</label>
                        <select
                          {...profileRegister('language')}
                          className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
                        >
                          <option value="en">English</option>
                          <option value="es">Spanish</option>
                          <option value="fr">French</option>
                        </select>
                      </div>
                    </div>

                    <div className="flex justify-end">
                      <Button
                        type="submit"
                        disabled={isLoading}
                        variant="default"
                      >
                        {isLoading ? 'Saving...' : 'Save Changes'}
                      </Button>
                    </div>
                  </form>
                )}

                {activeTab === 'notifications' && (
                  <div className="space-y-6">
                    <h2 className="text-lg font-semibold">Notification Preferences</h2>
                    <div className="space-y-4">
                      {[
                        { id: 'email', label: 'Email Notifications', description: 'Receive notifications via email' },
                        { id: 'push', label: 'Push Notifications', description: 'Receive push notifications on your device' },
                        { id: 'marketing', label: 'Marketing Emails', description: 'Receive marketing and promotional emails' }
                      ].map((setting: NotificationSetting) => (
                        <div key={setting.id} className="flex items-center justify-between">
                          <div>
                            <h3 className="text-sm font-medium text-gray-900">{setting.label}</h3>
                            <p className="text-sm text-gray-500">{setting.description}</p>
                          </div>
                          <label className="relative inline-flex items-center cursor-pointer">
                            <input
                              type="checkbox"
                              className="sr-only peer"
                              onChange={(e) => onNotificationSettingsChange(setting.id, e.target.checked)}
                            />
                            <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-blue-300 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-blue-600"></div>
                          </label>
                        </div>
                      ))}
                    </div>
                  </div>
                )}

                {activeTab === 'security' && (
                  <form onSubmit={handleSecuritySubmit(onSecuritySubmit)} className="space-y-6">
                    <h2 className="text-lg font-semibold">Change Password</h2>
                    <div className="space-y-4">
                      <div>
                        <label className="block text-sm font-medium text-gray-700">Current Password</label>
                        <input
                          type="password"
                          {...securityRegister('currentPassword')}
                          className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
                        />
                        {securityErrors.currentPassword && (
                          <p className="mt-1 text-sm text-red-600">{securityErrors.currentPassword.message}</p>
                        )}
                      </div>

                      <div>
                        <label className="block text-sm font-medium text-gray-700">New Password</label>
                        <input
                          type="password"
                          {...securityRegister('newPassword')}
                          className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
                        />
                        {securityErrors.newPassword && (
                          <p className="mt-1 text-sm text-red-600">{securityErrors.newPassword.message}</p>
                        )}
                      </div>

                      <div>
                        <label className="block text-sm font-medium text-gray-700">Confirm New Password</label>
                        <input
                          type="password"
                          {...securityRegister('confirmPassword')}
                          className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
                        />
                        {securityErrors.confirmPassword && (
                          <p className="mt-1 text-sm text-red-600">{securityErrors.confirmPassword.message}</p>
                        )}
                      </div>
                    </div>

                    <div className="flex justify-end">
                      <Button
                        type="submit"
                        disabled={isLoading}
                        variant="default"
                      >
                        {isLoading ? 'Updating...' : 'Update Password'}
                      </Button>
                    </div>
                  </form>
                )}

                {activeTab === 'preferences' && (
                  <div className="space-y-6">
                    <h2 className="text-lg font-semibold">App Preferences</h2>
                    <div className="space-y-4">
                      <div className="flex items-center justify-between">
                        <div>
                          <h3 className="text-sm font-medium text-gray-900">Dark Mode</h3>
                          <p className="text-sm text-gray-500">Toggle dark mode theme</p>
                        </div>
                        <button
                          onClick={() => setIsDarkMode(!isDarkMode)}
                          className="p-2 rounded-lg bg-gray-100 hover:bg-gray-200 transition-colors"
                          type="button"
                        >
                          {isDarkMode ? <Moon className="w-5 h-5" /> : <Sun className="w-5 h-5" />}
                        </button>
                      </div>

                      <div className="flex items-center justify-between">
                        <div>
                          <h3 className="text-sm font-medium text-gray-900">Language</h3>
                          <p className="text-sm text-gray-500">Select your preferred language</p>
                        </div>
                        <select className="rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500">
                          <option value="en">English</option>
                          <option value="es">Spanish</option>
                          <option value="fr">French</option>
                        </select>
                      </div>

                      <div className="flex items-center justify-between">
                        <div>
                          <h3 className="text-sm font-medium text-gray-900">Time Zone</h3>
                          <p className="text-sm text-gray-500">Set your local time zone</p>
                        </div>
                        <select className="rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500">
                          <option value="UTC">UTC</option>
                          <option value="EST">EST</option>
                          <option value="PST">PST</option>
                        </select>
                      </div>
                    </div>
                  </div>
                )}
              </Card>
            </motion.div>
          </AnimatePresence>
        </div>
      </div>
    </div>
  );
};

export default Settings;

