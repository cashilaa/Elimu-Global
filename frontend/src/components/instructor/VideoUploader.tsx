import { useCallback, useState } from "react";
import { useDropzone } from "react-dropzone";
import { motion, AnimatePresence } from "framer-motion";
import { Upload, X } from "lucide-react";
import { LoadingSpinner } from "../shared/LoadingSpinner";

interface VideoFile extends File {
  preview?: string;
}

interface VideoUploaderProps {
  onUpload: (file: File) => Promise<void>;
}

export const VideoUploader = ({ onUpload }: VideoUploaderProps) => {
  const [files, setFiles] = useState<VideoFile[]>([]);
  const [uploading, setUploading] = useState(false);

  const onDrop = useCallback((acceptedFiles: File[]) => {
    setFiles(acceptedFiles.map(file => Object.assign(file, {
      preview: URL.createObjectURL(file)
    })));
  }, []);

  const { getRootProps, getInputProps, isDragActive } = useDropzone({
    onDrop,
    accept: {
      'video/mp4': ['.mp4'],
      'video/quicktime': ['.mov'],
      'video/x-msvideo': ['.avi']
    },
    maxSize: 100 * 1024 * 1024, // 100MB
    multiple: false
  });

  const handleUpload = async () => {
    if (files.length === 0) return;

    setUploading(true);
    try {
      await onUpload(files[0]);
      setFiles([]);
    } catch (error) {
      console.error('Upload failed:', error);
    } finally {
      setUploading(false);
    }
  };

  const removeFile = (file: VideoFile) => {
    const newFiles = files.filter(f => f !== file);
    setFiles(newFiles);
  };

  return (
    <div className="w-full">
      <div
        {...getRootProps()}
        className={`border-2 border-dashed rounded-lg p-8 text-center cursor-pointer transition-colors ${
          isDragActive ? 'border-blue-500 bg-blue-50' : 'border-gray-300 hover:border-gray-400'
        }`}
      >
        <input {...getInputProps()} />
        <Upload 
          className={`mx-auto h-12 w-12 ${
            isDragActive ? 'text-blue-500' : 'text-gray-400'
          }`}
        />
        <p className="mt-2 text-sm text-gray-600">
          {isDragActive
            ? "Drop the video here"
            : "Drag and drop a video, or click to select"}
        </p>
        <p className="text-xs text-gray-500 mt-1">
          MP4, MOV or AVI (max. {Math.floor(100 * 1024 * 1024 / 1024 / 1024)}MB)
        </p>
      </div>

      <AnimatePresence>
        {files.map(file => (
          <motion.div
            key={file.name}
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            className="mt-4 p-4 bg-gray-50 rounded-lg"
          >
            <div className="flex items-center justify-between">
              <div className="flex items-center space-x-3">
                <div className="flex-shrink-0">
                  <video
                    className="h-16 w-16 rounded object-cover"
                    src={file.preview}
                  />
                </div>
                <div>
                  <p className="text-sm font-medium text-gray-900">
                    {file.name}
                  </p>
                  <p className="text-sm text-gray-500">
                    {(file.size / 1024 / 1024).toFixed(2)} MB
                  </p>
                </div>
              </div>
              <button
                onClick={() => removeFile(file)}
                className="p-1 hover:bg-gray-200 rounded-full"
              >
                <X className="h-5 w-5 text-gray-500" />
              </button>
            </div>

            <div className="mt-4">
              <button
                onClick={handleUpload}
                disabled={uploading}
                className={`w-full py-2 px-4 rounded-lg text-white font-medium ${
                  uploading
                    ? 'bg-blue-400 cursor-not-allowed'
                    : 'bg-blue-600 hover:bg-blue-700'
                }`}
              >
                {uploading ? (
                  <div className="flex items-center justify-center space-x-2">
                    <LoadingSpinner size="sm" className="text-white" />
                    <span>Uploading...</span>
                  </div>
                ) : (
                  'Upload Video'
                )}
              </button>
            </div>
          </motion.div>
        ))}
      </AnimatePresence>
    </div>
  );
};

export default VideoUploader;
