/**
 * Application constants and configuration
 */

// API Configuration
export const API_CONFIG = {
  BASE_URL: process.env.NEXT_PUBLIC_API_URL || "http://localhost:3000/api",
  TIMEOUT: 10000,
  RETRY_ATTEMPTS: 3,
  RETRY_DELAY: 1000,
} as const

// Storage Keys
export const STORAGE_KEYS = {
  TOKEN: "auth-token",
  USER: "user-data",
  USER_ROLE: "user-role",
  THEME: "theme",
  LANGUAGE: "language",
} as const

// Routes
export const ROUTES = {
  HOME: "/",
  LOGIN: "/auth/login",
  SIGNUP: "/auth/signup",
  DASHBOARD: {
    ADMIN: "/dashboard/admin",
    INSTRUCTOR: "/dashboard/instructor",
  },
  PORTAIL: {
    STUDENT: "/portail",
    BOOKING: "/portail/booking",
    LESSONS: "/portail/lessons",
    PROFILE: "/portail/profile",
    NOTIFICATIONS: "/portail/notifications",
    MESSAGES: "/portail/messages",
    INSTRUCTOR: "/portail/instructor",
    SIMULATOR: "/portail/simulator",
  },
  CHATBOT: "/chatbot",
  RENDEZ_VOUS: "/rendez-vous",
} as const

// User Roles
export const USER_ROLES = {
  ADMIN: "admin",
  INSTRUCTOR: "instructor",
  STUDENT: "student",
} as const

// User Status
export const USER_STATUS = {
  ACTIVE: "active",
  INACTIVE: "inactive",
  SUSPENDED: "suspended",
  PENDING: "pending",
} as const

// Lesson Status
export const LESSON_STATUS = {
  SCHEDULED: "scheduled",
  IN_PROGRESS: "in_progress",
  COMPLETED: "completed",
  CANCELLED: "cancelled",
  RESCHEDULED: "rescheduled",
} as const

// Session Status
export const SESSION_STATUS = {
  UPCOMING: "upcoming",
  ACTIVE: "active",
  COMPLETED: "completed",
  CANCELLED: "cancelled",
  NO_SHOW: "no_show",
} as const

// Message Status
export const MESSAGE_STATUS = {
  SENT: "sent",
  DELIVERED: "delivered",
  READ: "read",
  FAILED: "failed",
} as const

// Error Messages
export const ERROR_MESSAGES = {
  NETWORK_ERROR: "Erreur de connexion réseau",
  SERVER_ERROR: "Erreur serveur interne",
  UNAUTHORIZED: "Non autorisé - Veuillez vous connecter",
  FORBIDDEN: "Accès interdit",
  NOT_FOUND: "Ressource non trouvée",
  VALIDATION_ERROR: "Erreur de validation des données",
  TIMEOUT: "Délai d'attente dépassé",
  UNKNOWN_ERROR: "Une erreur inconnue s'est produite",
} as const

// Success Messages
export const SUCCESS_MESSAGES = {
  LOGIN_SUCCESS: "Connexion réussie",
  LOGOUT_SUCCESS: "Déconnexion réussie",
  SIGNUP_SUCCESS: "Inscription réussie",
  PROFILE_UPDATED: "Profil mis à jour avec succès",
  LESSON_BOOKED: "Leçon réservée avec succès",
  LESSON_CANCELLED: "Leçon annulée avec succès",
  MESSAGE_SENT: "Message envoyé avec succès",
} as const

// Validation Rules
export const VALIDATION_RULES = {
  EMAIL: {
    PATTERN: /^[^\s@]+@[^\s@]+\.[^\s@]+$/,
    MESSAGE: "Veuillez entrer une adresse email valide",
  },
  PASSWORD: {
    MIN_LENGTH: 8,
    PATTERN: /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]/,
    MESSAGE:
      "Le mot de passe doit contenir au moins 8 caractères, une majuscule, une minuscule, un chiffre et un caractère spécial",
  },
  PHONE: {
    PATTERN: /^(\+33|0)[1-9](\d{8})$/,
    MESSAGE: "Veuillez entrer un numéro de téléphone français valide",
  },
  NAME: {
    MIN_LENGTH: 2,
    MAX_LENGTH: 50,
    PATTERN: /^[a-zA-ZÀ-ÿ\s-']+$/,
    MESSAGE: "Le nom ne doit contenir que des lettres, espaces, tirets et apostrophes",
  },
} as const

// Date Formats
export const DATE_FORMATS = {
  DISPLAY: "dd/MM/yyyy",
  DISPLAY_WITH_TIME: "dd/MM/yyyy HH:mm",
  API: "yyyy-MM-dd",
  API_WITH_TIME: "yyyy-MM-dd'T'HH:mm:ss.SSSxxx",
} as const

// Pagination
export const PAGINATION = {
  DEFAULT_PAGE_SIZE: 10,
  MAX_PAGE_SIZE: 100,
  PAGE_SIZE_OPTIONS: [5, 10, 20, 50],
} as const

// File Upload
export const FILE_UPLOAD = {
  MAX_SIZE: 5 * 1024 * 1024, // 5MB
  ALLOWED_TYPES: ["image/jpeg", "image/png", "image/webp", "application/pdf"],
  ALLOWED_EXTENSIONS: [".jpg", ".jpeg", ".png", ".webp", ".pdf"],
} as const

// Theme Configuration
export const THEME_CONFIG = {
  DEFAULT_THEME: "light",
  THEMES: ["light", "dark", "system"],
} as const

// Animation Durations (in milliseconds)
export const ANIMATION_DURATION = {
  FAST: 150,
  NORMAL: 300,
  SLOW: 500,
} as const

// Breakpoints (matching Tailwind CSS)
export const BREAKPOINTS = {
  SM: 640,
  MD: 768,
  LG: 1024,
  XL: 1280,
  "2XL": 1536,
} as const

// Z-Index Layers
export const Z_INDEX = {
  DROPDOWN: 1000,
  STICKY: 1020,
  FIXED: 1030,
  MODAL_BACKDROP: 1040,
  MODAL: 1050,
  POPOVER: 1060,
  TOOLTIP: 1070,
  TOAST: 1080,
} as const
