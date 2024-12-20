import React, { useState } from 'react';
import { Card } from '../ui/Card';
import { Tabs, TabsList, TabsTrigger, TabsContent } from '../ui/Tabs';
import { DiscussionForum } from '../discussion/DiscussionForum';
import { CourseContent } from './CourseContent';
import { CourseInfo } from './CourseInfo';
import { CourseProgress } from './CourseProgress';

export const CourseView = ({ course }) => {
  return (
    <div className="p-6">
      <Card>
        <Tabs defaultValue="content">
          <TabsList>
            <TabsTrigger value="content">Content</TabsTrigger>
            <TabsTrigger value="discussions">Discussions</TabsTrigger>
            <TabsTrigger value="info">Info</TabsTrigger>
            <TabsTrigger value="progress">Progress</TabsTrigger>
          </TabsList>

          <TabsContent value="content">
            <CourseContent course={course} />
          </TabsContent>

          <TabsContent value="discussions">
            <DiscussionForum courseId={course.id} />
          </TabsContent>

          <TabsContent value="info">
            <CourseInfo course={course} />
          </TabsContent>

          <TabsContent value="progress">
            <CourseProgress course={course} />
          </TabsContent>
        </Tabs>
      </Card>
    </div>
  );
}; 