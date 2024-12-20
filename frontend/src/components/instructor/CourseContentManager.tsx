import { useState, useEffect } from 'react';
import { DragDropContext, Droppable, Draggable } from 'react-beautiful-dnd';
import { Plus, GripVertical, Video, FileText, Link as LinkIcon, Download, X } from 'lucide-react';
import { Course } from '../../types';

interface ContentItem {
  id: string;
  type: 'video' | 'document' | 'link' | 'download';
  title: string;
  duration?: string;
  size?: string;
  url?: string;
}

interface Section {
  id: string;
  title: string;
  items: ContentItem[];
}

interface CourseContentManagerProps {
  course: Course;
  onUpdate: (sections: Section[]) => Promise<void>;
}

const CourseContentManager = ({ course, onUpdate }: CourseContentManagerProps) => {
  const [sections, setSections] = useState<Section[]>(
    course.content?.sections || []
  );
  const [newSectionTitle, setNewSectionTitle] = useState('');

  useEffect(() => {
    setSections(course.content?.sections || []);
  }, [course]);

  const handleDragEnd = (result: any) => {
    if (!result.destination) return;

    const { source, destination } = result;
    const newSections = [...sections];

    if (source.droppableId === destination.droppableId) {
      // Reordering within the same section
      const section = newSections.find(s => s.id === source.droppableId);
      if (!section) return;

      const [removed] = section.items.splice(source.index, 1);
      section.items.splice(destination.index, 0, removed);
    } else {
      // Moving between sections
      const sourceSection = newSections.find(s => s.id === source.droppableId);
      const destSection = newSections.find(s => s.id === destination.droppableId);
      if (!sourceSection || !destSection) return;

      const [removed] = sourceSection.items.splice(source.index, 1);
      destSection.items.splice(destination.index, 0, removed);
    }

    setSections(newSections);
    onUpdate(newSections);
  };

  const addSection = () => {
    if (!newSectionTitle.trim()) return;

    const newSections = [
      ...sections,
      {
        id: `section-${Date.now()}`,
        title: newSectionTitle,
        items: []
      }
    ];
    setSections(newSections);
    setNewSectionTitle('');
    onUpdate(newSections).catch(console.error);
  };

  const removeSection = (sectionId: string) => {
    const newSections = sections.filter(section => section.id !== sectionId);
    setSections(newSections);
    onUpdate(newSections).catch(console.error);
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center space-x-4">
        <input
          type="text"
          value={newSectionTitle}
          onChange={(e) => setNewSectionTitle(e.target.value)}
          placeholder="New Section Title"
          className="flex-1 px-4 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
        />
        <button
          onClick={addSection}
          className="px-4 py-2 text-white bg-blue-600 rounded-lg hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2"
        >
          <Plus className="w-5 h-5" />
        </button>
      </div>

      <DragDropContext onDragEnd={handleDragEnd}>
        {sections.map((section) => (
          <div key={section.id} className="bg-white rounded-lg shadow-md p-6">
            <div className="flex items-center justify-between mb-4">
              <h3 className="text-lg font-semibold">{section.title}</h3>
              <button
                onClick={() => removeSection(section.id)}
                className="text-red-500 hover:text-red-600"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            <Droppable droppableId={section.id}>
              {(provided) => (
                <div
                  {...provided.droppableProps}
                  ref={provided.innerRef}
                  className="space-y-2"
                >
                  {section.items.map((item, index) => (
                    <Draggable key={item.id} draggableId={item.id} index={index}>
                      {(provided) => (
                        <div
                          ref={provided.innerRef}
                          {...provided.draggableProps}
                          className="flex items-center space-x-4 p-4 bg-gray-50 rounded-lg"
                        >
                          <div {...provided.dragHandleProps}>
                            <GripVertical className="w-5 h-5 text-gray-400" />
                          </div>
                          {item.type === 'video' && <Video className="w-5 h-5 text-blue-500" />}
                          {item.type === 'document' && <FileText className="w-5 h-5 text-green-500" />}
                          {item.type === 'link' && <LinkIcon className="w-5 h-5 text-purple-500" />}
                          {item.type === 'download' && <Download className="w-5 h-5 text-orange-500" />}
                          <div className="flex-1">
                            <h4 className="font-medium">{item.title}</h4>
                            <div className="text-sm text-gray-500">
                              {item.duration && <span>{item.duration}</span>}
                              {item.size && <span> • {item.size}</span>}
                            </div>
                          </div>
                        </div>
                      )}
                    </Draggable>
                  ))}
                  {provided.placeholder}
                </div>
              )}
            </Droppable>
          </div>
        ))}
      </DragDropContext>
    </div>
  );
};

export default CourseContentManager;