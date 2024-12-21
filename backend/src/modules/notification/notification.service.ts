import { Injectable } from '@nestjs/common';

@Injectable()
export class NotificationService {
  constructor() {
    // Add any dependencies here if needed
  }

  async notifyCourseCreated(courseId: string, instructorId: string, courseTitle: string) {
    console.log(`Course ${courseTitle} created by instructor ${instructorId}`);
  }

  async notifyCourseApproved(courseId: string, instructorId: string, courseTitle: string) {
    console.log(`Course ${courseTitle} approved for instructor ${instructorId}`);
  }

  async notifyNewEnrollment(courseId: string, instructorId: string, studentId: string, courseTitle: string) {
    console.log(`New enrollment in ${courseTitle} by student ${studentId}`);
  }

  async notifyNewReview(
    courseId: string,
    instructorId: string,
    studentId: string,
    courseTitle: string,
    rating: number
  ) {
    console.log(`New review for ${courseTitle} by student ${studentId} with rating ${rating}`);
  }
} 