"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Input } from "@/components/ui/input"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { useToast } from "@/hooks/use-toast"
import { Bell, Search, CheckCircle, AlertCircle, MessageSquare, Trophy, Clock, Trash2 } from "lucide-react"
import { cn } from "@/lib/utils"

interface Notification {
  id: string
  title: string
  message: string
  type: "info" | "success" | "warning" | "error"
  time: string
  date: string
  isRead: boolean
  category: "lesson" | "payment" | "document" | "system" | "achievement"
  icon: any
}

export default function NotificationsPage() {
  const [notifications, setNotifications] = useState<Notification[]>([
    {
      id: "1",
      title: "Documents acceptés",
      message:
        "Vos documents d'identité ont été vérifiés et acceptés. Vous pouvez maintenant réserver vos premières leçons.",
      type: "success",
      time: "09:30",
      date: "Aujourd'hui",
      isRead: false,
      category: "document",
      icon: CheckCircle,
    },
    {
      id: "2",
      title: "Nouveau rendez-vous confirmé",
      message:
        "Votre leçon pratique avec Pierre Moreau est confirmée pour demain à 14h00. N'oubliez pas d'apporter votre permis d'apprenti.",
      type: "info",
      time: "14:15",
      date: "Aujourd'hui",
      isRead: false,
      category: "lesson",
      icon: MessageSquare,
    },
    {
      id: "3",
      title: "Félicitations ! Module terminé",
      message:
        "Vous avez terminé le module 'Code de la Route - Signalisation' avec un score de 95%. Excellent travail !",
      type: "success",
      time: "16:45",
      date: "Hier",
      isRead: true,
      category: "achievement",
      icon: Trophy,
    },
    {
      id: "4",
      title: "Rappel de paiement",
      message:
        "Votre prochaine échéance de paiement (200€) est due dans 3 jours. Vous pouvez régler en ligne depuis votre espace.",
      type: "warning",
      time: "10:20",
      date: "Hier",
      isRead: true,
      category: "payment",
      icon: AlertCircle,
    },
    {
      id: "5",
      title: "Mise à jour du simulateur",
      message:
        "Le simulateur de conduite a été mis à jour avec de nouveaux scénarios de conduite nocturne. Découvrez-les dès maintenant !",
      type: "info",
      time: "08:00",
      date: "2 janvier",
      isRead: true,
      category: "system",
      icon: Bell,
    },
    {
      id: "6",
      title: "Leçon reportée",
      message:
        "Votre leçon du 3 janvier à 10h00 a été reportée au 5 janvier à la même heure en raison des conditions météorologiques.",
      type: "warning",
      time: "18:30",
      date: "2 janvier",
      isRead: true,
      category: "lesson",
      icon: Clock,
    },
  ])

  const [searchTerm, setSearchTerm] = useState("")
  const [filterType, setFilterType] = useState("all")
  const [filterCategory, setFilterCategory] = useState("all")
  const { toast } = useToast()

  const filteredNotifications = notifications.filter((notification) => {
    const matchesSearch =
      notification.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
      notification.message.toLowerCase().includes(searchTerm.toLowerCase())
    const matchesType =
      filterType === "all" ||
      (filterType === "unread" && !notification.isRead) ||
      (filterType === "read" && notification.isRead)
    const matchesCategory = filterCategory === "all" || notification.category === filterCategory

    return matchesSearch && matchesType && matchesCategory
  })

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

  const getCategoryLabel = (category: string) => {
    switch (category) {
      case "lesson":
        return "Leçon"
      case "payment":
        return "Paiement"
      case "document":
        return "Document"
      case "system":
        return "Système"
      case "achievement":
        return "Réussite"
      default:
        return "Autre"
    }
  }

  return (
    <div className="p-6 space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold text-gray-900">Notifications</h1>
          <p className="text-gray-600 mt-1">Gérez vos notifications et restez informé de vos activités</p>
        </div>
        {unreadCount > 0 && (
          <Button onClick={markAllAsRead} variant="outline">
            Tout marquer comme lu ({unreadCount})
          </Button>
        )}
      </div>

      {/* Filters */}
      <Card>
        <CardContent className="p-6">
          <div className="flex flex-col sm:flex-row gap-4">
            <div className="flex-1">
              <div className="relative">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
                <Input
                  placeholder="Rechercher dans les notifications..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="pl-10"
                />
              </div>
            </div>
            <div className="flex gap-2">
              <Select value={filterType} onValueChange={setFilterType}>
                <SelectTrigger className="w-40">
                  <SelectValue placeholder="Statut" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">Toutes</SelectItem>
                  <SelectItem value="unread">Non lues</SelectItem>
                  <SelectItem value="read">Lues</SelectItem>
                </SelectContent>
              </Select>
              <Select value={filterCategory} onValueChange={setFilterCategory}>
                <SelectTrigger className="w-40">
                  <SelectValue placeholder="Catégorie" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">Toutes</SelectItem>
                  <SelectItem value="lesson">Leçons</SelectItem>
                  <SelectItem value="payment">Paiements</SelectItem>
                  <SelectItem value="document">Documents</SelectItem>
                  <SelectItem value="achievement">Réussites</SelectItem>
                  <SelectItem value="system">Système</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Notifications List */}
      <div className="space-y-4">
        {filteredNotifications.length === 0 ? (
          <Card>
            <CardContent className="p-12 text-center">
              <Bell className="h-12 w-12 text-gray-400 mx-auto mb-4" />
              <h3 className="text-lg font-semibold text-gray-900 mb-2">Aucune notification</h3>
              <p className="text-gray-600">
                {searchTerm || filterType !== "all" || filterCategory !== "all"
                  ? "Aucune notification ne correspond à vos critères de recherche."
                  : "Vous n'avez aucune notification pour le moment."}
              </p>
            </CardContent>
          </Card>
        ) : (
          filteredNotifications.map((notification) => {
            const IconComponent = notification.icon
            return (
              <Card
                key={notification.id}
                className={cn(
                  "cursor-pointer transition-all duration-200 hover:shadow-md",
                  !notification.isRead && "border-l-4 border-l-blue-500 bg-blue-50/30",
                )}
                onClick={() => markAsRead(notification.id)}
              >
                <CardContent className="p-6">
                  <div className="flex items-start gap-4">
                    <div className={cn("p-2 rounded-full", getTypeBgColor(notification.type))}>
                      <IconComponent className={cn("h-5 w-5", getTypeColor(notification.type))} />
                    </div>

                    <div className="flex-1 min-w-0">
                      <div className="flex items-start justify-between gap-4">
                        <div className="flex-1">
                          <div className="flex items-center gap-2 mb-1">
                            <h3
                              className={cn(
                                "text-lg font-semibold",
                                !notification.isRead ? "text-gray-900" : "text-gray-700",
                              )}
                            >
                              {notification.title}
                            </h3>
                            {!notification.isRead && <div className="w-2 h-2 bg-blue-600 rounded-full" />}
                          </div>
                          <p className="text-gray-600 mb-3 leading-relaxed">{notification.message}</p>
                          <div className="flex items-center gap-3">
                            <Badge variant="outline" className="text-xs">
                              {getCategoryLabel(notification.category)}
                            </Badge>
                            <span className="text-sm text-gray-500">
                              {notification.date} à {notification.time}
                            </span>
                          </div>
                        </div>

                        <div className="flex items-center gap-2">
                          <Button
                            variant="ghost"
                            size="sm"
                            onClick={(e) => {
                              e.stopPropagation()
                              deleteNotification(notification.id)
                            }}
                            className="opacity-0 group-hover:opacity-100 transition-opacity"
                          >
                            <Trash2 className="h-4 w-4" />
                          </Button>
                        </div>
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            )
          })
        )}
      </div>
    </div>
  )
}
