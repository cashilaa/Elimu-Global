import React from 'react';
import { motion } from 'framer-motion';
import { ResourceLibrary } from '../../components/resource/ResourceLibrary';
import { FileUpload } from '../../components/resource/FileUpload';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '../../components/ui/Tabs';

export const ResourcesPage = () => {
  const handleUpload = async (files) => {
    // Implement file upload logic
    console.log('Uploading files:', files);
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