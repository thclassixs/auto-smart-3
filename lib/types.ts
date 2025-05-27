import type React from "react"
/**
 * Type definitions for the driving school application
 */

// User Types
export interface User {
  id: string
  firstName: string
  lastName: string
  email: string
  phone: string
  role: UserRole
  status: UserStatus
  avatar?: string
  createdAt: Date
  updatedAt: Date
  birthDate?: Date
  profilePicture?: string
}

export type UserRole = "student" | "instructor" | "admin"
export type UserStatus = "active" | "inactive" | "suspended"

// Authentication Types
export interface AuthState {
  user: User | null
  token: string | null
  isAuthenticated: boolean
  isLoading: boolean
}

export interface LoginCredentials {
  email: string
  password: string
}

export interface SignupData {
  firstName: string
  lastName: string
  email: string
  phone: string
  password: string
  confirmPassword: string
  role: UserRole
  agreeToTerms: boolean
  birthDate?: Date
}

// Lesson Types
export interface Lesson {
  id: string
  title: string
  description: string
  category: LessonCategory
  duration: number // in minutes
  progress: number // 0-100
  status: LessonStatus
  content?: LessonContent
  prerequisites?: string[]
  createdAt: Date
  updatedAt: Date
}

export type LessonCategory = "beginner" | "intermediate" | "advanced" | "theory" | "practical"
export type LessonStatus = "locked" | "in-progress" | "completed" | "failed"

export interface LessonContent {
  videoUrl?: string
  documents?: Document[]
  quiz?: Quiz
  practicalExercises?: PracticalExercise[]
}

// Session Types
export interface Session {
  id: string
  studentId: string
  instructorId: string
  lessonId?: string
  scheduledAt: Date
  duration: number
  type: SessionType
  location: string
  status: SessionStatus
  notes?: string
  rating?: number
  feedback?: string
  createdAt: Date
  updatedAt: Date
}

export type SessionType = "theory" | "practical" | "exam" | "mock-test"
export type SessionStatus = "scheduled" | "in-progress" | "completed" | "cancelled" | "no-show"

// Progress Types
export interface StudentProgress {
  studentId: string
  totalLessons: number
  completedLessons: number
  practicalHours: number
  theoryScore: number
  mockTestsPassed: number
  overallProgress: number // 0-100
  strengths: string[]
  areasForImprovement: string[]
  nextMilestone: string
  estimatedCompletionDate: Date
}

// Message Types
export interface Message {
  id: string
  senderId: string
  receiverId: string
  content: string
  type: MessageType
  isRead: boolean
  attachments?: Attachment[]
  createdAt: Date
}

export type MessageType = "text" | "image" | "document" | "system"

export interface Attachment {
  id: string
  name: string
  url: string
  type: string
  size: number
}

// Notification Types
export interface Notification {
  id: string
  userId: string
  title: string
  message: string
  type: NotificationType
  isRead: boolean
  actionUrl?: string
  createdAt: Date
}

export type NotificationType = "info" | "success" | "warning" | "error" | "reminder"

// Quiz Types
export interface Quiz {
  id: string
  title: string
  questions: Question[]
  passingScore: number
  timeLimit?: number // in minutes
}

export interface Question {
  id: string
  text: string
  type: QuestionType
  options?: string[]
  correctAnswer: string | string[]
  explanation?: string
  points: number
}

export type QuestionType = "multiple-choice" | "true-false" | "text" | "image"

// Practical Exercise Types
export interface PracticalExercise {
  id: string
  title: string
  description: string
  instructions: string[]
  duration: number
  difficulty: ExerciseDifficulty
  skills: string[]
}

export type ExerciseDifficulty = "easy" | "medium" | "hard"

// Document Types
export interface Document {
  id: string
  title: string
  description?: string
  url: string
  type: DocumentType
  size: number
  createdAt: Date
}

export type DocumentType = "pdf" | "image" | "video" | "audio"

// API Response Types
export interface ApiResponse<T = any> {
  success: boolean
  data?: T
  message?: string
  errors?: Record<string, string[]>
}

export interface PaginatedResponse<T> extends ApiResponse<T[]> {
  pagination: {
    page: number
    limit: number
    total: number
    totalPages: number
  }
}

// Form Types
export interface FormState<T = any> {
  data: T
  errors: Record<string, string>
  isSubmitting: boolean
  isValid: boolean
}

// Dashboard Stats Types
export interface DashboardStats {
  totalStudents: number
  activeInstructors: number
  completedLessons: number
  revenue: number
  passRate: number
  averageRating: number
  monthlyGrowth: {
    students: number
    revenue: number
    lessons: number
  }
}

// Calendar Types
export interface CalendarEvent {
  id: string
  title: string
  start: Date
  end: Date
  type: SessionType
  participantIds: string[]
  location?: string
  description?: string
  color?: string
}

// Settings Types
export interface UserSettings {
  notifications: NotificationSettings
  privacy: PrivacySettings
  preferences: UserPreferences
}

export interface NotificationSettings {
  email: boolean
  push: boolean
  sms: boolean
  reminders: boolean
  marketing: boolean
}

export interface PrivacySettings {
  profileVisibility: "public" | "private" | "instructors-only"
  showProgress: boolean
  allowMessages: boolean
}

export interface UserPreferences {
  language: string
  timezone: string
  theme: "light" | "dark" | "system"
  dateFormat: string
  timeFormat: "12h" | "24h"
}

// Error Types
export interface AppError {
  code: string
  message: string
  details?: any
  timestamp: Date
}

// Loading States
export interface LoadingState {
  isLoading: boolean
  error: string | null
  lastUpdated: Date | null
}

// Filter and Sort Types
export interface FilterOptions {
  search?: string
  status?: string[]
  category?: string[]
  dateRange?: {
    start: Date
    end: Date
  }
  sortBy?: string
  sortOrder?: "asc" | "desc"
}

// Component Props Types
export interface BaseComponentProps {
  className?: string
  children?: React.ReactNode
}

export interface PageProps {
  params: Record<string, string>
  searchParams: Record<string, string | string[] | undefined>
}
