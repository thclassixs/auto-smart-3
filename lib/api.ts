/**
 * API utility functions and configurations
 */

import { API_CONFIG, ERROR_MESSAGES } from "./constants"

// API Error Class
export class ApiError extends Error {
  constructor(
    public status: number,
    public message: string,
    public code?: string,
  ) {
    super(message)
    this.name = "ApiError"
  }
}

// Request configuration
interface RequestConfig extends RequestInit {
  timeout?: number
}

// API Client Class
class ApiClient {
  private baseURL: string
  private defaultTimeout: number

  constructor(baseURL: string, timeout: number = API_CONFIG.TIMEOUT) {
    this.baseURL = baseURL
    this.defaultTimeout = timeout
  }

  private async request<T>(endpoint: string, config: RequestConfig = {}): Promise<T> {
    const { timeout = this.defaultTimeout, ...requestConfig } = config

    // Create abort controller for timeout
    const controller = new AbortController()
    const timeoutId = setTimeout(() => controller.abort(), timeout)

    try {
      const url = `${this.baseURL}${endpoint}`
      const response = await fetch(url, {
        ...requestConfig,
        signal: controller.signal,
        headers: {
          "Content-Type": "application/json",
          ...requestConfig.headers,
        },
      })

      clearTimeout(timeoutId)

      if (!response.ok) {
        throw new ApiError(response.status, await this.getErrorMessage(response), response.statusText)
      }

      return await response.json()
    } catch (error) {
      clearTimeout(timeoutId)

      if (error instanceof ApiError) {
        throw error
      }

      if (error instanceof Error) {
        if (error.name === "AbortError") {
          throw new ApiError(408, "Request timeout")
        }
        throw new ApiError(0, ERROR_MESSAGES.NETWORK_ERROR)
      }

      throw new ApiError(500, ERROR_MESSAGES.SERVER_ERROR)
    }
  }

  private async getErrorMessage(response: Response): Promise<string> {
    try {
      const errorData = await response.json()
      return errorData.message || ERROR_MESSAGES.SERVER_ERROR
    } catch {
      return ERROR_MESSAGES.SERVER_ERROR
    }
  }

  // HTTP Methods
  async get<T>(endpoint: string, config?: RequestConfig): Promise<T> {
    return this.request<T>(endpoint, { ...config, method: "GET" })
  }

  async post<T>(endpoint: string, data?: any, config?: RequestConfig): Promise<T> {
    return this.request<T>(endpoint, {
      ...config,
      method: "POST",
      body: data ? JSON.stringify(data) : undefined,
    })
  }

  async put<T>(endpoint: string, data?: any, config?: RequestConfig): Promise<T> {
    return this.request<T>(endpoint, {
      ...config,
      method: "PUT",
      body: data ? JSON.stringify(data) : undefined,
    })
  }

  async patch<T>(endpoint: string, data?: any, config?: RequestConfig): Promise<T> {
    return this.request<T>(endpoint, {
      ...config,
      method: "PATCH",
      body: data ? JSON.stringify(data) : undefined,
    })
  }

  async delete<T>(endpoint: string, config?: RequestConfig): Promise<T> {
    return this.request<T>(endpoint, { ...config, method: "DELETE" })
  }

  // Set authorization header
  setAuthToken(token: string) {
    const originalRequest = this.request.bind(this)
    // Override the request method to include the Authorization header
    this.request = async <T>(endpoint: string, config: RequestConfig = {}): Promise<T> => {
      return originalRequest<T>(endpoint, {
        ...config,
        headers: {
          ...config.headers,
          Authorization: `Bearer ${token}`,
        },
      })
    }
  }
}

// Create API client instance
export const apiClient = new ApiClient(API_CONFIG.BASE_URL)

// API Endpoints
export const endpoints = {
  // Authentication
  auth: {
    login: "/auth/login",
    signup: "/auth/signup",
    logout: "/auth/logout",
    refresh: "/auth/refresh",
    forgotPassword: "/auth/forgot-password",
    resetPassword: "/auth/reset-password",
  },
  // Users
  users: {
    profile: "/users/profile",
    update: "/users/profile",
    list: "/users",
    create: "/users",
    delete: (id: string) => `/users/${id}`,
  },
  // Lessons
  lessons: {
    list: "/lessons",
    get: (id: string) => `/lessons/${id}`,
    create: "/lessons",
    update: (id: string) => `/lessons/${id}`,
    delete: (id: string) => `/lessons/${id}`,
    progress: (id: string) => `/lessons/${id}/progress`,
  },
  // Sessions
  sessions: {
    list: "/sessions",
    get: (id: string) => `/sessions/${id}`,
    create: "/sessions",
    update: (id: string) => `/sessions/${id}`,
    cancel: (id: string) => `/sessions/${id}/cancel`,
    complete: (id: string) => `/sessions/${id}/complete`,
  },
  // Messages
  messages: {
    list: "/messages",
    send: "/messages",
    markRead: (id: string) => `/messages/${id}/read`,
    conversation: (userId: string) => `/messages/conversation/${userId}`,
  },
  // Dashboard
  dashboard: {
    stats: "/dashboard/stats",
    recentActivity: "/dashboard/activity",
  },
} as const

// API Helper Functions
export async function handleApiError(error: unknown): Promise<never> {
  if (error instanceof ApiError) {
    switch (error.status) {
      case 401:
        // Handle unauthorized - redirect to login
        if (typeof window !== "undefined") {
          window.location.href = "/auth/login"
        }
        throw new Error(ERROR_MESSAGES.UNAUTHORIZED)
      case 403:
        throw new Error(ERROR_MESSAGES.FORBIDDEN)
      case 404:
        throw new Error(ERROR_MESSAGES.NOT_FOUND)
      case 422:
        throw new Error(ERROR_MESSAGES.VALIDATION_ERROR)
      default:
        throw new Error(error.message || ERROR_MESSAGES.SERVER_ERROR)
    }
  }

  throw new Error(ERROR_MESSAGES.NETWORK_ERROR)
}

// Retry mechanism
export async function withRetry<T>(fn: () => Promise<T>, maxRetries = 3, delay = 1000): Promise<T> {
  let lastError: Error

  for (let i = 0; i <= maxRetries; i++) {
    try {
      return await fn()
    } catch (error) {
      lastError = error instanceof Error ? error : new Error("Unknown error")

      if (i === maxRetries) {
        throw lastError
      }

      // Exponential backoff
      await new Promise((resolve) => setTimeout(resolve, delay * Math.pow(2, i)))
    }
  }

  throw lastError!
}

// Cache implementation
class SimpleCache {
  private cache = new Map<string, { data: any; timestamp: number; ttl: number }>()

  set(key: string, data: any, ttl: number = 5 * 60 * 1000): void {
    this.cache.set(key, {
      data,
      timestamp: Date.now(),
      ttl,
    })
  }

  get(key: string): any | null {
    const item = this.cache.get(key)
    if (!item) return null

    if (Date.now() - item.timestamp > item.ttl) {
      this.cache.delete(key)
      return null
    }

    return item.data
  }

  clear(): void {
    this.cache.clear()
  }

  delete(key: string): void {
    this.cache.delete(key)
  }
}

export const apiCache = new SimpleCache()

// Cached request wrapper
export async function cachedRequest<T>(key: string, requestFn: () => Promise<T>, ttl?: number): Promise<T> {
  const cached = apiCache.get(key)
  if (cached) {
    return cached
  }

  const data = await requestFn()
  apiCache.set(key, data, ttl)
  return data
}