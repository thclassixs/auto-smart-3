"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { useToast } from "@/hooks/use-toast"
import { Bell, MessageSquare, Trophy, AlertCircle, CheckCircle, Clock, X } from "lucide-react"
import { cn } from "@/lib/utils"

interface Notification {
  id: string
  title: string
  message: string
  type: "info" | "success" | "warning" | "error"
  time: string
  isRead: boolean
  icon: any
}

export function NotificationsDropdown() {
  const [notifications, setNotifications] = useState<Notification[]>([
    {
      id: "1",
      title: "Leçon confirmée",
      message: "Votre leçon pratique avec Sarah Dubois est confirmée pour demain à 14h00",
      type: "success",
      time: "Il y a 5 min",
      isRead: false,
      icon: CheckCircle,
    },
    {
      id: "2",
      title: "Nouveau message",
      message: "Michel Chen vous a envoyé un message concernant votre prochaine leçon",
      type: "info",
      time: "Il y a 1h",
      isRead: false,
      icon: MessageSquare,
    },
    {
      id: "3",
      title: "Félicitations !",
      message: "Vous avez terminé le module 'Code de la Route' avec succès",
      type: "success",
      time: "Il y a 2h",
      isRead: true,
      icon: Trophy,
    },
    {
      id: "4",
      title: "Rappel de leçon",
      message: "N'oubliez pas votre leçon de conduite demain à 10h00",
      type: "warning",
      time: "Il y a 3h",
      isRead: true,
      icon: Clock,
    },
    {
      id: "5",
      title: "Mise à jour disponible",
      message: "Une nouvelle version du simulateur de conduite est disponible",
      type: "info",
      time: "Il y a 1 jour",
      isRead: true,
      icon: AlertCircle,
    },
  ])

  const { toast } = useToast()

  const unreadCount = notifications.filter((n) => !n.isRead).length

  const markAsRead = (id: string) => {
    setNotifications((prev) =>
      prev.map((notification) => (notification.id === id ? { ...notification, isRead: true } : notification)),
    )
  }

  const markAllAsRead = () => {
    setNotifications((prev) => prev.map((notification) => ({ ...notification, isRead: true })))
    toast({
      title: "Notifications marquées comme lues",
      description: "Toutes vos notifications ont été marquées comme lues.",
    })
  }

  const deleteNotification = (id: string) => {
    setNotifications((prev) => prev.filter((n) => n.id !== id))
    toast({
      title: "Notification supprimée",
      description: "La notification a été supprimée avec succès.",
    })
  }

  const getTypeColor = (type: string) => {
    switch (type) {
      case "success":
        return "text-green-600"
      case "warning":
        return "text-yellow-600"
      case "error":
        return "text-red-600"
      default:
        return "text-blue-600"
    }
  }

  const getTypeBgColor = (type: string) => {
    switch (type) {
      case "success":
        return "bg-green-50"
      case "warning":
        return "bg-yellow-50"
      case "error":
        return "bg-red-50"
      default:
        return "bg-blue-50"
    }
  }

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button variant="ghost" size="sm" className="relative">
          <Bell className="h-4 w-4" />
          {unreadCount > 0 && (
            <Badge
              variant="destructive"
              className="absolute -top-1 -right-1 h-5 w-5 flex items-center justify-center p-0 text-xs"
            >
              {unreadCount}
            </Badge>
          )}
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent align="end" className="w-80">
        <DropdownMenuLabel className="flex items-center justify-between">
          <span>Notifications</span>
          {unreadCount > 0 && (
            <Button variant="ghost" size="sm" onClick={markAllAsRead} className="text-xs h-auto p-1">
              Tout marquer comme lu
            </Button>
          )}
        </DropdownMenuLabel>
        <DropdownMenuSeparator />

        {notifications.length === 0 ? (
          <div className="p-4 text-center text-muted-foreground">
            <Bell className="h-8 w-8 mx-auto mb-2 opacity-50" />
            <p className="text-sm">Aucune notification</p>
          </div>
        ) : (
          <div className="max-h-96 overflow-y-auto">
            {notifications.map((notification) => {
              const IconComponent = notification.icon
              return (
                <div
                  key={notification.id}
                  className={cn(
                    "group relative flex items-start gap-3 p-4 cursor-pointer hover:bg-muted/50 transition-colors",
                    !notification.isRead && "bg-muted/30",
                  )}
                  onClick={() => markAsRead(notification.id)}
                >
                  <div className={cn("p-2 rounded-full", getTypeBgColor(notification.type))}>
                    <IconComponent className={cn("h-4 w-4", getTypeColor(notification.type))} />
                  </div>
                  <div className="flex-1 min-w-0">
                    <div className="flex items-start justify-between">
                      <h4 className={cn("text-sm font-medium", !notification.isRead && "font-semibold")}>
                        {notification.title}
                      </h4>
                      <div className="flex items-center gap-1 ml-2">
                        {!notification.isRead && <div className="w-2 h-2 bg-blue-600 rounded-full" />}
                        <Button
                          variant="ghost"
                          size="sm"
                          className="h-auto w-auto p-1 opacity-0 group-hover:opacity-100 transition-opacity"
                          onClick={(e) => {
                            e.stopPropagation()
                            deleteNotification(notification.id)
                          }}
                        >
                          <X className="h-3 w-3" />
                        </Button>
                      </div>
                    </div>
                    <p className="text-sm text-muted-foreground mt-1 line-clamp-2">{notification.message}</p>
                    <p className="text-xs text-muted-foreground mt-2">{notification.time}</p>
                  </div>
                </div>
              )
            })}
          </div>
        )}

        {notifications.length > 0 && (
          <>
            <DropdownMenuSeparator />
            <DropdownMenuItem className="text-center justify-center">
              <Button variant="ghost" size="sm" className="w-full">
                Voir toutes les notifications
              </Button>
            </DropdownMenuItem>
          </>
        )}
      </DropdownMenuContent>
    </DropdownMenu>
  )
}
