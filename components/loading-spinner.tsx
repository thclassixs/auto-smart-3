"use client"

import { Loader2 } from "lucide-react"
import { cn } from "@/lib/utils"

interface LoadingSpinnerProps {
  size?: "sm" | "md" | "lg"
  className?: string
  text?: string
}

export function LoadingSpinner({ size = "md", className, text }: LoadingSpinnerProps) {
  const sizeClasses = {
    sm: "h-4 w-4",
    md: "h-6 w-6",
    lg: "h-8 w-8",
  }

  return (
    <div className={cn("flex items-center justify-center", className)}>
      <div className="flex flex-col items-center space-y-2">
        <Loader2 className={cn("animate-spin text-primary", sizeClasses[size])} />
        {text && <p className="text-sm text-muted-foreground">{text}</p>}
      </div>
    </div>
  )
}

// Full page loading component
export function PageLoading({ text = "Chargement..." }: { text?: string }) {
  return (
    <div className="min-h-screen bg-muted flex items-center justify-center">
      <LoadingSpinner size="lg" text={text} />
    </div>
  )
}

// Skeleton loading components
export function CardSkeleton() {
  return (
    <div className="border rounded-lg p-6 space-y-4 animate-pulse">
      <div className="h-4 bg-muted rounded w-3/4"></div>
      <div className="h-4 bg-muted rounded w-1/2"></div>
      <div className="h-20 bg-muted rounded"></div>
    </div>
  )
}

export function TableSkeleton({ rows = 5 }: { rows?: number }) {
  return (
    <div className="space-y-3">
      {Array.from({ length: rows }).map((_, i) => (
        <div key={i} className="flex space-x-4 animate-pulse">
          <div className="h-4 bg-muted rounded w-1/4"></div>
          <div className="h-4 bg-muted rounded w-1/3"></div>
          <div className="h-4 bg-muted rounded w-1/4"></div>
          <div className="h-4 bg-muted rounded w-1/6"></div>
        </div>
      ))}
    </div>
  )
}

export function AvatarSkeleton() {
  return <div className="h-10 w-10 bg-muted rounded-full animate-pulse"></div>
}

export function ButtonSkeleton() {
  return <div className="h-10 bg-muted rounded px-4 py-2 animate-pulse"></div>
}
