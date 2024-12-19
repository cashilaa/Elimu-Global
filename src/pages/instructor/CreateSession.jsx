import React from 'react';
import { Card, CardHeader, CardTitle, CardContent } from '../../components/ui/card';
import { Button } from '../../components/ui/button';

const CreateSession = () => {
  return (
    <div className="min-h-screen bg-gray-50 py-8 px-4 sm:px-6 lg:px-8">
      <div className="max-w-3xl mx-auto">
        <Card>
          <CardHeader>
            <CardTitle className="text-2xl text-center text-primary-600">
              Create New Session
            </CardTitle>
          </CardHeader>
          <CardContent>
            <form className="space-y-6">
              {/* Session Title */}
              <div>
                <label 
                  htmlFor="title" 
                  className="block text-sm font-medium text-gray-700"
                >
                  Session Title
                </label>
                <input
                  type="text"
                  id="title"
                  className="mt-1 block w-full px-4 py-3 bg-gray-50 border border-gray-200 rounded-lg 
                           focus:ring-2 focus:ring-primary-500 focus:border-transparent
                           transition-colors duration-200"
                  placeholder="Enter session title"
                />
              </div>

              {/* Description */}
              <div>
                <label 
                  htmlFor="description" 
                  className="block text-sm font-medium text-gray-700"
                >
                  Description
                </label>
                <textarea
                  id="description"
                  rows="4"
                  className="mt-1 block w-full px-4 py-3 bg-gray-50 border border-gray-200 rounded-lg 
                           focus:ring-2 focus:ring-primary-500 focus:border-transparent
                           transition-colors duration-200 resize-none"
                  placeholder="Describe your session"
                />
              </div>

              {/* Date and Time Row */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label 
                    htmlFor="date" 
                    className="block text-sm font-medium text-gray-700"
                  >
                    Date
                  </label>
                  <input
                    type="date"
                    id="date"
                    className="mt-1 block w-full px-4 py-3 bg-gray-50 border border-gray-200 rounded-lg 
                             focus:ring-2 focus:ring-primary-500 focus:border-transparent
                             transition-colors duration-200"
                  />
                </div>
                <div>
                  <label 
                    htmlFor="time" 
                    className="block text-sm font-medium text-gray-700"
                  >
                    Time
                  </label>
                  <input
                    type="time"
                    id="time"
                    className="mt-1 block w-full px-4 py-3 bg-gray-50 border border-gray-200 rounded-lg 
                             focus:ring-2 focus:ring-primary-500 focus:border-transparent
                             transition-colors duration-200"
                  />
                </div>
              </div>

              {/* Duration and Capacity Row */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label 
                    htmlFor="duration" 
                    className="block text-sm font-medium text-gray-700"
                  >
                    Duration (minutes)
                  </label>
                  <input
                    type="number"
                    id="duration"
                    min="15"
                    step="15"
                    className="mt-1 block w-full px-4 py-3 bg-gray-50 border border-gray-200 rounded-lg 
                             focus:ring-2 focus:ring-primary-500 focus:border-transparent
                             transition-colors duration-200"
                    placeholder="60"
                  />
                </div>
                <div>
                  <label 
                    htmlFor="capacity" 
                    className="block text-sm font-medium text-gray-700"
                  >
                    Maximum Capacity
                  </label>
                  <input
                    type="number"
                    id="capacity"
                    min="1"
                    className="mt-1 block w-full px-4 py-3 bg-gray-50 border border-gray-200 rounded-lg 
                             focus:ring-2 focus:ring-primary-500 focus:border-transparent
                             transition-colors duration-200"
                    placeholder="20"
                  />
                </div>
              </div>

              {/* Session Type */}
              <div>
                <label 
                  className="block text-sm font-medium text-gray-700"
                >
                  Session Type
                </label>
                <div className="mt-2 grid grid-cols-2 gap-3">
                  <div className="flex items-center">
                    <input
                      type="radio"
                      id="online"
                      name="sessionType"
                      className="h-4 w-4 text-primary-600 focus:ring-primary-500"
                    />
                    <label htmlFor="online" className="ml-3 text-sm text-gray-700">
                      Online
                    </label>
                  </div>
                  <div className="flex items-center">
                    <input
                      type="radio"
                      id="inPerson"
                      name="sessionType"
                      className="h-4 w-4 text-primary-600 focus:ring-primary-500"
                    />
                    <label htmlFor="inPerson" className="ml-3 text-sm text-gray-700">
                      In Person
                    </label>
                  </div>
                </div>
              </div>

              {/* Submit Button */}
              <div className="flex justify-end space-x-3">
                <Button
                  variant="outline"
                  className="w-24"
                >
                  Cancel
                </Button>
                <Button
                  variant="primary"
                  className="w-24"
                >
                  Create
                </Button>
              </div>
            </form>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default CreateSession; 