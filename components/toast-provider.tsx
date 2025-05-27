"use client"

import { Toaster } from "@/components/ui/sonner"
import { toast } from "sonner"

export function ToastProvider() {
  return (
    <Toaster
      position="top-right"
      toastOptions={{
        style: {
          background: "hsl(var(--background))",
          color: "hsl(var(--foreground))",
          border: "1px solid hsl(var(--border))",
        },
      }}
    />
  )
}

// Toast utility functions
export const showToast = {
  success: (message: string) => {
    toast.success(message)
  },
  error: (message: string) => {
    toast.error(message)
  },
  info: (message: string) => {
    toast.info(message)
  },
  warning: (message: string) => {
    toast.warning(message)
  },
  loading: (message: string) => {
    return toast.loading(message)
  },
  dismiss: (toastId: string | number) => {
    toast.dismiss(toastId)
  },
}
