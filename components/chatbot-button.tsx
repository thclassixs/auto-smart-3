"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { MessageCircle, X } from "lucide-react"
import Link from "next/link"
import { usePathname } from "next/navigation"

export function ChatbotButton() {
  const [isVisible, setIsVisible] = useState(true)
  const pathname = usePathname()

  // Hide on chatbot page itself
  if (pathname === "/chatbot") {
    return null
  }

  if (!isVisible) {
    return null
  }

  return (
    <div className="fixed bottom-6 right-6 z-50">
      <div className="relative">
        {/* Close button */}
        <Button
          variant="ghost"
          size="sm"
          className="absolute -top-2 -right-2 h-6 w-6 rounded-full bg-gray-500 hover:bg-gray-600 text-white p-0"
          onClick={() => setIsVisible(false)}
        >
          <X className="h-3 w-3" />
        </Button>

        {/* Main chatbot button */}
        <Link href="/chatbot">
          <Button
            size="lg"
            className="h-14 w-14 rounded-full bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 shadow-lg hover:shadow-xl transition-all duration-300 hover:scale-105"
          >
            <MessageCircle className="h-6 w-6" />
          </Button>
        </Link>

        {/* Tooltip */}
        <div className="absolute bottom-16 right-0 bg-gray-900 text-white text-sm px-3 py-2 rounded-lg opacity-0 hover:opacity-100 transition-opacity duration-300 whitespace-nowrap pointer-events-none">
          Besoin d'aide ? Chattez avec Sarah !
          <div className="absolute top-full right-4 w-0 h-0 border-l-4 border-r-4 border-t-4 border-transparent border-t-gray-900"></div>
        </div>
      </div>
    </div>
  )
}
