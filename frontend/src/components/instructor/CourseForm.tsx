import React from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import { motion, AnimatePresence } from "framer-motion";
import { TypewriterText } from "../shared/TypewriterText";
import { X, Save, Clock, DollarSign, Book, Users } from "lucide-react";

const courseSchema = z.object({
  title: z.string().min(5, "Title must be at least 5 characters"),
  description: z.string().min(20, "Description must be at least 20 characters"),
  duration: z.string().min(1, "Duration is required"),
  price: z.number().min(0, "Price must be 0 or greater"),
  maxStudents: z.number().min(1, "Must allow at least 1 student"),
  level: z.enum(["beginner", "intermediate", "advanced"]),
  prerequisites: z.string().optional(),
  objectives: z.string().min(20, "Course objectives must be at least 20 characters")
});

type CourseFormData = z.infer<typeof courseSchema>;

interface CourseFormProps {
  onSubmit: (data: CourseFormData) => void;
  onClose: () => void;
}

export const CourseForm = ({ onSubmit, onClose }: CourseFormProps) => {
  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting }
  } = useForm<CourseFormData>({
    resolver: zodResolver(courseSchema),
    defaultValues: {
      level: "beginner",
      price: 0,
      maxStudents: 50
    }
  });

  const onSubmitForm = async (data: CourseFormData) => {
    try {
      await onSubmit(data);
      onClose();
    } catch (error) {
      console.error("Error submitting form:", error);
    }
  };

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <TypewriterText
          text="Create a New Course"
          className="text-2xl font-bold text-gray-900"
        />
        <button
          onClick={onClose}
          className="p-2 hover:bg-gray-100 rounded-full transition-colors"
        >
          <X className="h-5 w-5 text-gray-500" />
        </button>
      </div>

      <form onSubmit={handleSubmit(onSubmitForm)} className="space-y-6">
        <div className="grid grid-cols-1 gap-6 sm:grid-cols-2">
          <div className="space-y-2">
            <label className="block text-sm font-medium text-gray-700">
              Course Title
            </label>
            <input
              type="text"
              {...register("title")}
              className="block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
            />
            {errors.title && (
              <p className="text-sm text-red-600">{errors.title.message}</p>
            )}
          </div>

          <div className="space-y-2">
            <label className="block text-sm font-medium text-gray-700">
              Duration
            </label>
            <div className="relative">
              <Clock className="absolute left-3 top-1/2 -translate-y-1/2 h-5 w-5 text-gray-400" />
              <input
                type="text"
                {...register("duration")}
                placeholder="e.g., 8 weeks"
                className="block w-full pl-10 rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
              />
            </div>
            {errors.duration && (
              <p className="text-sm text-red-600">{errors.duration.message}</p>
            )}
          </div>

          <div className="space-y-2">
            <label className="block text-sm font-medium text-gray-700">
              Price
            </label>
            <div className="relative">
              <DollarSign className="absolute left-3 top-1/2 -translate-y-1/2 h-5 w-5 text-gray-400" />
              <input
                type="number"
                {...register("price", { valueAsNumber: true })}
                className="block w-full pl-10 rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
              />
            </div>
            {errors.price && (
              <p className="text-sm text-red-600">{errors.price.message}</p>
            )}
          </div>

          <div className="space-y-2">
            <label className="block text-sm font-medium text-gray-700">
              Maximum Students
            </label>
            <div className="relative">
              <Users className="absolute left-3 top-1/2 -translate-y-1/2 h-5 w-5 text-gray-400" />
              <input
                type="number"
                {...register("maxStudents", { valueAsNumber: true })}
                className="block w-full pl-10 rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
              />
            </div>
            {errors.maxStudents && (
              <p className="text-sm text-red-600">{errors.maxStudents.message}</p>
            )}
          </div>

          <div className="space-y-2 sm:col-span-2">
            <label className="block text-sm font-medium text-gray-700">
              Description
            </label>
            <div className="relative">
              <Book className="absolute left-3 top-3 h-5 w-5 text-gray-400" />
              <textarea
                {...register("description")}
                rows={4}
                className="block w-full pl-10 rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
              />
            </div>
            {errors.description && (
              <p className="text-sm text-red-600">{errors.description.message}</p>
            )}
          </div>

          <div className="space-y-2">
            <label className="block text-sm font-medium text-gray-700">
              Level
            </label>
            <select
              {...register("level")}
              className="block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
            >
              <option value="beginner">Beginner</option>
              <option value="intermediate">Intermediate</option>
              <option value="advanced">Advanced</option>
            </select>
            {errors.level && (
              <p className="text-sm text-red-600">{errors.level.message}</p>
            )}
          </div>

          <div className="space-y-2">
            <label className="block text-sm font-medium text-gray-700">
              Prerequisites
            </label>
            <input
              type="text"
              {...register("prerequisites")}
              className="block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
            />
            {errors.prerequisites && (
              <p className="text-sm text-red-600">
                {errors.prerequisites.message}
              </p>
            )}
          </div>

          <div className="space-y-2 sm:col-span-2">
            <label className="block text-sm font-medium text-gray-700">
              Course Objectives
            </label>
            <textarea
              {...register("objectives")}
              rows={4}
              className="block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
            />
            {errors.objectives && (
              <p className="text-sm text-red-600">{errors.objectives.message}</p>
            )}
          </div>
        </div>

        <div className="flex justify-end space-x-3">
          <button
            type="button"
            onClick={onClose}
            className="px-4 py-2 text-sm font-medium text-gray-700 bg-white border border-gray-300 rounded-md shadow-sm hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
          >
            Cancel
          </button>
          <button
            type="submit"
            disabled={isSubmitting}
            className="inline-flex items-center px-4 py-2 text-sm font-medium text-white bg-blue-600 border border-transparent rounded-md shadow-sm hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
          >
            <Save className="w-4 h-4 mr-2" />
            {isSubmitting ? "Creating..." : "Create Course"}
          </button>
        </div>
      </form>
    </div>
  );
};

export default CourseForm;
