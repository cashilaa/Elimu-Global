import { Entity, Column, PrimaryGeneratedColumn, CreateDateColumn, UpdateDateColumn } from 'typeorm';

@Entity('instructors')
export class Instructor {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column()
  firstName: string;

  @Column()
  lastName: string;

  @Column({ unique: true })
  email: string;

  @Column()
  password: string;

  @Column({ nullable: true })
  phoneNumber: string;

  @Column()
  expertise: string;

  @Column()
  experience: string;

  @Column()
  education: string;

  @Column({ nullable: true })
  certification: string;

  @Column('simple-array')
  teachingAreas: string[];

  @Column('text')
  bio: string;

  @Column('json')
  socialLinks: {
    linkedin: string;
    twitter: string;
    website: string;
  };

  @Column({ nullable: true })
  avatarUrl: string;

  @Column({ default: false })
  isVerified: boolean;

  @CreateDateColumn()
  createdAt: Date;

  @UpdateDateColumn()
  updatedAt: Date;
}
