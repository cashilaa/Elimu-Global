import React from 'react';
import { motion } from 'framer-motion';
import ResourceLibrary from '../../components/resource/ResourceLibrary';
import { FileUpload } from '../../components/resource/FileUpload';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '../components/ui/Tabs';
import { toast } from 'react-hot-toast';

interface FileUploadProps {
  file: File;
  progress: number;
}

export const ResourcesPage: React.FC = () => {
  const handleUpload = async (files: FileList | null) => {
    if (!files || files.length === 0) {
      toast.error('Please select files to upload');
      return;
    }

    const formData = new FormData();
    Array.from(files).forEach((file) => {
      formData.append('files', file);
    });

    try {
      const response = await fetch('/api/resources/upload', {
        method: 'POST',
        headers: {
          'Authorization': `Bearer ${localStorage.getItem('token')}`
        },
        body: formData
      });

      if (!response.ok) {
        throw new Error('Upload failed');
      }

      const data = await response.json();
      toast.success('Files uploaded successfully');
      return data;
    } catch (error) {
      console.error('Upload error:', error);
      toast.error('Failed to upload files');
    }
  };

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="p-6"
    >
      <Tabs defaultValue="library">
        <div className="mb-6">
          <TabsList className="w-full justify-start">
            <TabsTrigger value="library">Resource Library</TabsTrigger>
            <TabsTrigger value="upload">Upload Resources</TabsTrigger>
          </TabsList>
        </div>

        <TabsContent value="library" className="mt-6">
          <ResourceLibrary />
        </TabsContent>

        <TabsContent value="upload" className="mt-6">
          <FileUpload onUpload={handleUpload} />
        </TabsContent>
      </Tabs>
    </motion.div>
  );
};

export default ResourcesPage;

