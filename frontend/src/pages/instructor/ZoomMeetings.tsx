import React from 'react';
import { ZoomMeetingManager } from '../../components/instructor/ZoomMeetingManager';
import { Card } from '../components/ui/Card';
import { motion } from 'framer-motion';

const ZoomMeetings: React.FC = () => {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0 }}
      className="p-6"
    >
      <Card className="p-6">
        <h1 className="text-2xl font-bold mb-6">Online Classes</h1>
        <ZoomMeetingManager />
      </Card>
    </motion.div>
  );
};

export default ZoomMeetings;

