import React, { useState, useRef } from 'react';
import { Upload, X, Play, Check } from 'lucide-react';
import { motion } from 'framer-motion';

export const VideoUpload = ({ onUpload, maxDuration = 300 }) => {
  const [video, setVideo] = useState(null);
  const [preview, setPreview] = useState('');
  const [duration, setDuration] = useState(0);
  const [uploading, setUploading] = useState(false);
  const [error, setError] = useState('');
  const videoRef = useRef(null);

  const handleVideoSelect = (e) => {
    const file = e.target.files[0];
    if (!file) return;

    // Create video element to check duration
    const video = document.createElement('video');
    video.preload = 'metadata';

    video.onloadedmetadata = function() {
      window.URL.revokeObjectURL(video.src);
      if (video.duration > maxDuration) {
        setError('Video must be 5 minutes or less');
        return;
      }
      setDuration(video.duration);
      setVideo(file);
      setPreview(URL.createObjectURL(file));
      setError('');
    }

    video.src = URL.createObjectURL(file);
  };

  const handleUpload = async () => {
    if (!video) return;
    
    setUploading(true);
    try {
      const formData = new FormData();
      formData.append('video', video);
      
      await onUpload(formData);
      setVideo(null);
      setPreview('');
    } catch (err) {
      setError('Upload failed. Please try again.');
    } finally {
      setUploading(false);
    }
  };

  return (
    <div className="space-y-4">
      <div
        className={`
          border-2 border-dashed rounded-lg p-6 text-center
          ${error ? 'border-red-500 bg-red-50' : 'border-gray-300 hover:border-gray-400'}
        `}
      >
        {!preview ? (
          <>
            <input
              type="file"
              accept="video/*"
              onChange={handleVideoSelect}
              className="hidden"
              ref={videoRef}
            />
            <Upload className="mx-auto h-12 w-12 text-gray-400" />
            <p className="mt-2 text-sm text-gray-600">
              Click to upload or drag and drop
            </p>
            <p className="text-xs text-gray-500">
              MP4, WebM or Ogg (max. 5 minutes)
            </p>
          </>
        ) : (
          <div className="relative">
            <video
              src={preview}
              controls
              className="w-full rounded-lg"
            />
            <button
              onClick={() => {
                setVideo(null);
                setPreview('');
              }}
              className="absolute top-2 right-2 p-1 bg-white rounded-full shadow-lg"
            >
              <X className="w-4 h-4" />
            </button>
          </div>
        )}
      </div>

      {error && (
        <p className="text-sm text-red-600">{error}</p>
      )}

      {video && !error && (
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="flex justify-end"
        >
          <button
            onClick={handleUpload}
            disabled={uploading}
            className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 disabled:opacity-50"
          >
            {uploading ? (
              <span className="flex items-center">
                <svg className="animate-spin -ml-1 mr-3 h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                  <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                  <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                </svg>
                Uploading...
              </span>
            ) : (
              <span className="flex items-center">
                <Check className="w-5 h-5 mr-2" />
                Upload Video
              </span>
            )}
          </button>
        </motion.div>
      )}
    </div>
  );
}; 