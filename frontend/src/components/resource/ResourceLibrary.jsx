import React, { useState } from 'react';
import { Card, CardHeader, CardTitle, CardContent } from '../ui/Card';
import { Search, Filter, Grid, List, FileText, Video, Image, File, Download, Eye } from 'lucide-react';
import Button from '../ui/Button';
import Badge from '../ui/Badge';
import { useWebSocket } from '../../hooks/useWebSocket';

export const ResourceLibrary = () => {
  const [view, setView] = useState('grid');
  const [selectedCategory, setSelectedCategory] = useState('all');
  const [resources, setResources] = useState([]);

  useWebSocket('resourceUpdate', (newResource) => {
    setResources(prevResources => [...prevResources, newResource]);
  });

  const categories = [
    { id: 'all', name: 'All Resources' },
    { id: 'documents', name: 'Documents' },
    { id: 'videos', name: 'Videos' },
    { id: 'images', name: 'Images' },
    { id: 'other', name: 'Other' },
  ];

  const getResourceIcon = (type) => {
    switch (type) {
      case 'document': return FileText;
      case 'video': return Video;
      case 'image': return Image;
      default: return File;
    }
  };

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h1 className="text-2xl font-bold">Resource Library</h1>
        <div className="flex gap-2">
          <Button onClick={() => setView('grid')}>
            <Grid className={`w-4 h-4 ${view === 'grid' ? 'text-blue-600' : ''}`} />
          </Button>
          <Button onClick={() => setView('list')}>
            <List className={`w-4 h-4 ${view === 'list' ? 'text-blue-600' : ''}`} />
          </Button>
        </div>
      </div>

      <div className="flex flex-col md:flex-row gap-6">
        {/* Sidebar */}
        <div className="w-full md:w-64 space-y-6">
          <Card>
            <CardContent className="p-4">
              <div className="relative">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
                <input
                  type="text"
                  placeholder="Search resources..."
                  className="w-full pl-9 pr-4 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500"
                />
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Categories</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-2">
                {categories.map(category => (
                  <button
                    key={category.id}
                    onClick={() => setSelectedCategory(category.id)}
                    className={`w-full text-left px-3 py-2 rounded-lg transition-colors ${
                      selectedCategory === category.id
                        ? 'bg-blue-50 text-blue-600'
                        : 'hover:bg-gray-50'
                    }`}
                  >
                    {category.name}
                  </button>
                ))}
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Main Content */}
        <div className="flex-1">
          <div className={view === 'grid' ? 'grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6' : 'space-y-4'}>
            {resources.map(resource => (
              <Card key={resource.id} className="hover:shadow-md transition-shadow">
                <CardContent className={`p-4 ${view === 'list' ? 'flex items-center gap-4' : ''}`}>
                  <div className={`${view === 'grid' ? 'mb-4' : 'flex-shrink-0'}`}>
                    <div className="w-12 h-12 bg-blue-50 rounded-lg flex items-center justify-center">
                      {React.createElement(getResourceIcon(resource.type), {
                        className: 'w-6 h-6 text-blue-600'
                      })}
                    </div>
                  </div>
                  <div className="flex-1">
                    <h3 className="font-medium">{resource.title}</h3>
                    <div className="mt-2 flex flex-wrap gap-2">
                      {resource.tags.map(tag => (
                        <Badge key={tag} variant="secondary">{tag}</Badge>
                      ))}
                    </div>
                    <div className="mt-4 flex items-center justify-between text-sm text-gray-500">
                      <div className="flex items-center gap-4">
                        <span className="flex items-center gap-1">
                          <Download className="w-4 h-4" />
                          {resource.downloads}
                        </span>
                        <span className="flex items-center gap-1">
                          <Eye className="w-4 h-4" />
                          {resource.views}
                        </span>
                      </div>
                      <span>{resource.size}</span>
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}; 