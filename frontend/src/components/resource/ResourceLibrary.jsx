import React, { useState, useEffect } from 'react';
import { Card, CardHeader, CardTitle, CardContent } from '../ui/Card';
import { Input } from '../ui/Input';
import { Button } from '../ui/Button';
import { Badge } from '../ui/Badge';
import { ScrollArea } from '../ui/ScrollArea';
import {
  Search,
  Grid,
  List,
  FileText,
  Video,
  Image as ImageIcon,
  File,
  Download,
  Eye,
  Calendar
} from 'lucide-react';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '../ui/Select';
import PropTypes from 'prop-types';

export const ResourceLibrary = () => {
  const [view, setView] = useState('grid');
  const [selectedCategory, setSelectedCategory] = useState('all');
  const [searchQuery, setSearchQuery] = useState('');
  const [sortBy, setSortBy] = useState('newest');
  const [resources, setResources] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  // Simulate loading initial data
  useEffect(() => {
    const loadDummyData = () => {
      const dummyResources = [
        {
          id: 1,
          title: 'Product Design Guidelines 2024',
          type: 'document',
          tags: ['Design', 'Guidelines', 'Product'],
          downloads: 234,
          views: 1205,
          size: '2.4 MB',
          date: '2024-03-15',
          thumbnail: '/api/placeholder/400/300'
        },
        {
          id: 2,
          title: 'Introduction to UI Components',
          type: 'video',
          tags: ['Tutorial', 'UI', 'Components'],
          downloads: 567,
          views: 2890,
          size: '156 MB',
          date: '2024-03-14',
          thumbnail: '/api/placeholder/400/300'
        },
        {
          id: 3,
          title: 'Brand Asset Package',
          type: 'image',
          tags: ['Brand', 'Assets', 'Design'],
          downloads: 890,
          views: 3456,
          size: '45 MB',
          date: '2024-03-13',
          thumbnail: '/api/placeholder/400/300'
        }
      ];

      setResources(dummyResources);
      setIsLoading(false);
    };

    setTimeout(loadDummyData, 1000);
  }, []);

  const categories = [
    { id: 'all', name: 'All Resources', icon: File },
    { id: 'documents', name: 'Documents', icon: FileText },
    { id: 'videos', name: 'Videos', icon: Video },
    { id: 'images', name: 'Images', icon: ImageIcon }
  ];

  const getResourceIcon = (type) => {
    switch (type) {
      case 'document': return FileText;
      case 'video': return Video;
      case 'image': return ImageIcon;
      default: return File;
    }
  };

  const filteredResources = resources
    .filter(resource => {
      const matchesCategory = selectedCategory === 'all' || resource.type === selectedCategory;
      const matchesSearch = resource.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
        resource.tags.some(tag => tag.toLowerCase().includes(searchQuery.toLowerCase()));
      return matchesCategory && matchesSearch;
    })
    .sort((a, b) => {
      switch (sortBy) {
        case 'newest':
          return new Date(b.date) - new Date(a.date);
        case 'downloads':
          return b.downloads - a.downloads;
        case 'views':
          return b.views - a.views;
        default:
          return 0;
      }
    });

  const ResourceCard = ({ resource }) => (
    <Card className="group hover:shadow-lg transition-all duration-300 overflow-hidden">
      <CardContent className={`p-0 ${view === 'list' ? 'flex items-center gap-4' : ''}`}>
        <div className={`relative ${view === 'grid' ? 'w-full aspect-video' : 'w-24 h-24'}`}>
          <img
            src={resource.thumbnail}
            alt={resource.title}
            className="w-full h-full object-cover"
          />
          <div className="absolute inset-0 bg-black/50 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center gap-2">
            <Button size="sm" variant="secondary" className="h-8">
              <Eye className="w-4 h-4 mr-1" /> Preview
            </Button>
            <Button size="sm" variant="secondary" className="h-8">
              <Download className="w-4 h-4 mr-1" /> Download
            </Button>
          </div>
        </div>
        
        <div className="p-4 flex-1">
          <h3 className="font-semibold text-lg mb-2 line-clamp-1">{resource.title}</h3>
          <div className="flex flex-wrap gap-2 mb-3">
            {resource.tags.map(tag => (
              <Badge key={tag} variant="secondary" className="bg-blue-100 text-blue-700 hover:bg-blue-200">
                {tag}
              </Badge>
            ))}
          </div>
          <div className="flex items-center justify-between text-sm text-gray-500">
            <div className="flex items-center gap-4">
              <span className="flex items-center gap-1">
                <Download className="w-4 h-4" />
                {resource.downloads.toLocaleString()}
              </span>
              <span className="flex items-center gap-1">
                <Eye className="w-4 h-4" />
                {resource.views.toLocaleString()}
              </span>
              <span className="flex items-center gap-1">
                <Calendar className="w-4 h-4" />
                {new Date(resource.date).toLocaleDateString()}
              </span>
            </div>
            <span>{resource.size}</span>
          </div>
        </div>
      </CardContent>
    </Card>
  );

  ResourceCard.propTypes = {
    resource: PropTypes.shape({
      id: PropTypes.number.isRequired,
      title: PropTypes.string.isRequired,
      type: PropTypes.oneOf(['document', 'video', 'image']).isRequired,
      tags: PropTypes.arrayOf(PropTypes.string).isRequired,
      downloads: PropTypes.number.isRequired,
      views: PropTypes.number.isRequired,
      size: PropTypes.string.isRequired,
      date: PropTypes.string.isRequired,
      thumbnail: PropTypes.string.isRequired,
    }).isRequired,
  };

  return (
    <div className="min-h-screen bg-gray-50 p-6 space-y-6">
      <div className="max-w-7xl mx-auto space-y-6">
        <div className="flex justify-between items-center">
          <h1 className="text-3xl font-bold text-gray-900">Resource Library</h1>
          <div className="flex gap-2">
            <Button
              variant={view === 'grid' ? 'default' : 'outline'}
              size="icon"
              onClick={() => setView('grid')}
            >
              <Grid className="w-4 h-4" />
            </Button>
            <Button
              variant={view === 'list' ? 'default' : 'outline'}
              size="icon"
              onClick={() => setView('list')}
            >
              <List className="w-4 h-4" />
            </Button>
          </div>
        </div>

        <div className="flex flex-col lg:flex-row gap-6">
          {/* Sidebar */}
          <div className="w-full lg:w-64 space-y-4">
            <Card className="sticky top-6">
              <CardContent className="p-4 space-y-4">
                <div className="relative">
                  <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
                  <Input
                    type="text"
                    placeholder="Search resources..."
                    className="pl-9"
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                  />
                </div>

                <div>
                  <label className="text-sm font-medium mb-2 block">Sort By</label>
                  <Select value={sortBy} onValueChange={setSortBy}>
                    <SelectTrigger>
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="newest">Newest First</SelectItem>
                      <SelectItem value="downloads">Most Downloads</SelectItem>
                      <SelectItem value="views">Most Viewed</SelectItem>
                    </SelectContent>
                  </Select>
                </div>

                <div>
                  <h3 className="text-sm font-medium mb-2">Categories</h3>
                  <ScrollArea className="h-[300px]">
                    <div className="space-y-1">
                      {categories.map(category => {
                        const Icon = category.icon;
                        return (
                          <Button
                            key={category.id}
                            variant={selectedCategory === category.id ? "default" : "ghost"}
                            className="w-full justify-start"
                            onClick={() => setSelectedCategory(category.id)}
                          >
                            <Icon className="w-4 h-4 mr-2" />
                            {category.name}
                          </Button>
                        );
                      })}
                    </div>
                  </ScrollArea>
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Main Content */}
          <div className="flex-1">
            {isLoading ? (
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {[1, 2, 3].map(i => (
                  <Card key={i} className="animate-pulse">
                    <CardContent className="p-0">
                      <div className="bg-gray-200 aspect-video" />
                      <div className="p-4 space-y-3">
                        <div className="h-4 bg-gray-200 rounded w-3/4" />
                        <div className="h-3 bg-gray-200 rounded w-1/2" />
                      </div>
                    </CardContent>
                  </Card>
                ))}
              </div>
            ) : (
              <div className={view === 'grid' 
                ? 'grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6' 
                : 'space-y-4'
              }>
                {filteredResources.map(resource => (
                  <ResourceCard key={resource.id} resource={resource} />
                ))}
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default ResourceLibrary;