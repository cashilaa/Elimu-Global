import { api } from '../utils/api';

interface StudentData {
  fullName: string;
  email: string;
  dateOfBirth?: string;
  enrolledCourses: number;
  status?: 'Active' | 'Inactive';
}

interface UpdateStudentData extends Partial<StudentData> {
  // Any additional fields specific to updates
}

class StudentsService {
  async getAllStudents() {
    try {
      const response = await api.get('/students');
      return response.data;
    } catch (error) {
      console.error('Error fetching students:', error);
      throw error;
    }
  }

  async createStudent(studentData: StudentData) {
    try {
      console.log('Creating student with data:', studentData);
      
      const formattedData = {
        ...studentData,
        status: studentData.status || 'Active'
      };
      
      const response = await api.post('/students', formattedData);
      return response.data;
    } catch (error: any) {
      console.error('Error creating student:', error);
      console.error('Error response:', error.response?.data);
      throw error;
    }
  }

  async getStudentStats() {
    try {
      const response = await api.get('/students/stats');
      return response.data;
    } catch (error) {
      console.error('Error fetching student stats:', error);
      throw error;
    }
  }

  async updateStudent(id: string, studentData: Partial<StudentData>) {
    try {
      if (!id) {
        throw new Error('Student ID is required for update');
      }

      const formattedData = {
        ...studentData,
        dateOfBirth: studentData.dateOfBirth || undefined,
        status: studentData.status || 'Active',
        enrolledCourses: typeof studentData.enrolledCourses === 'string' 
          ? parseInt(studentData.enrolledCourses) 
          : studentData.enrolledCourses
      };

      console.log('Updating student with ID:', id);
      console.log('Update data:', formattedData);
      
      // Changed back to /students
      const response = await api.put(`/students/${id}`, formattedData);
      return response.data;
    } catch (error: any) {
      console.error('Error updating student:', error);
      console.error('Error response:', error.response?.data);
      throw error;
    }
  }

  async deleteStudent(id: string) {
    try {
      const response = await api.delete(`/students/${id}`);
      return response.data;
    } catch (error) {
      console.error('Error deleting student:', error);
      throw error;
    }
  }
}

export const studentsService = new StudentsService(); 