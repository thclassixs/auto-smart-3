/**
 * Mock user data for testing and development
 */

import type { User } from "./types"

export interface MockUser extends User {
  password: string
}

// Default profile picture for all test users
const DEFAULT_PROFILE_PICTURE = "https://media.licdn.com/dms/image/v2/D4E03AQGsf6Hdm9JeqQ/profile-displayphoto-shrink_400_400/B4EZcNWbWyHYAk-/0/1748275673061?e=1753920000&v=beta&t=AjY2g-_z6bheuzpvOSVFSFGFPoNa-paCcCv6DnOarxw"

// Mock users for testing with the provided profile picture
export const MOCK_USERS: MockUser[] = [
  {
    id: "admin-001",
    firstName: "Test",
    lastName: "Admin",
    email: "admin@test.com",
    password: "Admin123!",
    phone: "+33 1 23 45 67 89",
    role: "admin",
    status: "active",
    avatar: DEFAULT_PROFILE_PICTURE,
    createdAt: new Date("2023-01-01"),
    updatedAt: new Date("2024-01-01"),
    birthDate: new Date("1990-01-01"),
    profilePicture: DEFAULT_PROFILE_PICTURE,
  },
  {
    id: "student-001",
    firstName: "Test",
    lastName: "Student",
    email: "student@test.com",
    password: "Student123!",
    phone: "+33 1 23 45 67 90",
    role: "student",
    status: "active",
    avatar: DEFAULT_PROFILE_PICTURE,
    createdAt: new Date("2023-06-01"),
    updatedAt: new Date("2024-01-01"),
    birthDate: new Date("2003-05-20"),
    profilePicture: DEFAULT_PROFILE_PICTURE,
  },
  {
    id: "instructor-001",
    firstName: "Test",
    lastName: "Instructor",
    email: "instructor@test.com",
    password: "Instructor123!",
    phone: "+33 1 23 45 67 91",
    role: "instructor",
    status: "active",
    avatar: DEFAULT_PROFILE_PICTURE,
    createdAt: new Date("2023-03-01"),
    updatedAt: new Date("2024-01-01"),
    birthDate: new Date("1985-11-11"),
    profilePicture: DEFAULT_PROFILE_PICTURE,
  },
]

// Helper function to find user by email
export function findUserByEmail(email: string): MockUser | undefined {
  return MOCK_USERS.find((user) => user.email.toLowerCase() === email.toLowerCase())
}

// Helper function to authenticate user with enhanced validation
export function authenticateUser(email: string, password: string): MockUser | null {
  const user = findUserByEmail(email)
  if (user && user.password === password && user.status === "active") {
    // Return user without password for security
    const { password: _, ...userWithoutPassword } = user
    return user
  }
  return null
}

// Helper function to get user by ID
export function getUserById(id: string): MockUser | undefined {
  return MOCK_USERS.find((user) => user.id === id)
}

// Helper function to get users by role
export function getUsersByRole(role: string): MockUser[] {
  return MOCK_USERS.filter((user) => user.role === role)
}

// Enhanced mock JWT token generation with role-based routing info
export function generateMockToken(user: MockUser): string {
  const payload = {
    id: user.id,
    email: user.email,
    role: user.role,
    firstName: user.firstName,
    lastName: user.lastName,
    profilePicture: user.profilePicture,
    exp: Date.now() + 24 * 60 * 60 * 1000, // 24 hours
    iat: Date.now(),
  }
  return btoa(JSON.stringify(payload))
}

// Enhanced mock JWT token verification
export function verifyMockToken(token: string): MockUser | null {
  try {
    const payload = JSON.parse(atob(token))
    if (payload.exp < Date.now()) {
      return null // Token expired
    }
    const user = getUserById(payload.id)
    return user && user.status === "active" ? user : null
  } catch {
    return null
  }
}

// Get role-based redirect URL
export function getRoleBasedRedirectUrl(role: string): string {
  switch (role) {
    case "admin":
      return "/dashboard/admin"
    case "instructor":
      return "/dashboard/instructor"
    case "student":
      return "/portail"
    default:
      return "/auth/login"
  }
}

// Validate user credentials and return authentication result
export interface AuthResult {
  success: boolean
  user?: MockUser
  token?: string
  redirectUrl?: string
  error?: string
}

export function validateAndAuthenticateUser(email: string, password: string): AuthResult {
  if (!email || !password) {
    return {
      success: false,
      error: "Email et mot de passe requis",
    }
  }

  const user = authenticateUser(email, password)

  if (!user) {
    return {
      success: false,
      error: "Email ou mot de passe incorrect",
    }
  }

  const token = generateMockToken(user)
  const redirectUrl = getRoleBasedRedirectUrl(user.role)

  return {
    success: true,
    user,
    token,
    redirectUrl,
  }
}
