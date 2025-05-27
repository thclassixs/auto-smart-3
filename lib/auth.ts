// Simple client-side auth utilities for the mock system

export function setAuthToken(token: string): void {
  if (typeof window !== "undefined") {
    localStorage.setItem("auth_token", token)
  }
}

export function getAuthToken(): string | null {
  if (typeof window !== "undefined") {
    return localStorage.getItem("auth_token")
  }
  return null
}

export function removeAuthToken(): void {
  if (typeof window !== "undefined") {
    localStorage.removeItem("auth_token")
    localStorage.removeItem("user")
  }
}

export function isAuthenticated(): boolean {
  return getAuthToken() !== null
}

export function getCurrentUser() {
  if (typeof window !== "undefined") {
    const userStr = localStorage.getItem("user")
    return userStr ? JSON.parse(userStr) : null
  }
  return null
}

export function logout(): void {
  removeAuthToken()
  if (typeof window !== "undefined") {
    window.location.href = "/auth/login"
  }
}
