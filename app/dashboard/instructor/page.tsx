"use client"

import { useState, useEffect } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Calendar } from "@/components/ui/calendar"
import { Progress } from "@/components/ui/progress"
import { Skeleton } from "@/components/ui/skeleton"
import {
  Car,
  CalendarIcon,
  MessageSquare,
  Users,
  Clock,
  CheckCircle,
  Bell,
  Settings,
  LogOut,
  Star,
  MapPin,
  Menu,
  X,
} from "lucide-react"
import Link from "next/link"
import { cn } from "@/lib/utils"

export default function InstructorDashboard() {
  const [date, setDate] = useState<Date | undefined>(new Date())
  const [isLoading, setIsLoading] = useState(true)
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false)

  useEffect(() => {
    // Simulate loading
    const timer = setTimeout(() => setIsLoading(false), 1000)
    return () => clearTimeout(timer)
  }, [])

  const todaySessions = [
    {
      id: 1,
      student: "hamza bensaleh",
      time: "9h00 - 10h30",
      type: "Leçon Pratique",
      location: "Centre de Formation Principal",
      status: "upcoming",
      avatar: "/placeholder.svg?height=32&width=32",
    },
    {
      id: 2,
      student: "Sarah Wilson",
      time: "11h00 - 12h00",
      type: "Pratique Autoroute",
      location: "Parcours Autoroute A",
      status: "completed",
      avatar: "/placeholder.svg?height=32&width=32",
    },
    {
      id: 3,
      student: "Michel Johnson",
      time: "14h00 - 15h30",
      type: "Pratique Stationnement",
      location: "Parking d'Entraînement B",
      status: "in-progress",
      avatar: "/placeholder.svg?height=32&width=32",
    },
    {
      id: 4,
      student: "Emma Martin",
      time: "16h00 - 17h00",
      type: "Révision Théorique",
      location: "Salle de Classe 2",
      status: "upcoming",
      avatar: "/placeholder.svg?height=32&width=32",
    },
  ]

  const students = [
    {
      id: 1,
      name: "hamza bensaleh",
      progress: 65,
      lessonsCompleted: 8,
      nextLesson: "Demain, 9h00",
      avatar: "/placeholder.svg?height=40&width=40",
    },
    {
      id: 2,
      name: "Sarah Wilson",
      progress: 85,
      lessonsCompleted: 12,
      nextLesson: "Vendredi, 11h00",
      avatar: "/placeholder.svg?height=40&width=40",
    },
    {
      id: 3,
      name: "Michel Johnson",
      progress: 45,
      lessonsCompleted: 5,
      nextLesson: "Lundi, 14h00",
      avatar: "/placeholder.svg?height=40&width=40",
    },
  ]

  const messages = [
    {
      id: 1,
      student: "hamza bensaleh",
      message: "Bonjour ! Pouvons-nous reprogrammer la leçon de demain à 10h au lieu de 9h ?",
      time: "Il y a 30 min",
      unread: true,
    },
    {
      id: 2,
      student: "Sarah Wilson",
      message: "Merci pour l'excellente leçon d'aujourd'hui ! Je me sens beaucoup plus confiante maintenant.",
      time: "Il y a 2 heures",
      unread: true,
    },
    {
      id: 3,
      student: "Emma Martin",
      message: "J'ai une question sur la technique de stationnement en parallèle.",
      time: "Il y a 1 jour",
      unread: false,
    },
  ]

  const markSessionComplete = (sessionId: number) => {
    console.log("Marquer la séance comme terminée:", sessionId)
  }

  if (isLoading) {
    return (
      <div className="min-h-screen bg-muted">
        <header className="bg-white shadow-sm border-b">
          <div className="container mx-auto px-4 py-4">
            <Skeleton className="h-8 w-48" />
          </div>
        </header>
        <div className="container mx-auto px-4 py-8">
          <div className="space-y-4">
            <Skeleton className="h-8 w-64" />
            <Skeleton className="h-4 w-96" />
            <div className="grid lg:grid-cols-3 gap-8">
              <div className="lg:col-span-2 space-y-8">
                <Skeleton className="h-48 w-full" />
                <Skeleton className="h-64 w-full" />
              </div>
              <div className="space-y-6">
                <Skeleton className="h-48 w-full" />
                <Skeleton className="h-32 w-full" />
              </div>
            </div>
          </div>
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-muted">
      {/* Header */}
      <header className="bg-white shadow-sm border-b sticky top-0 z-40">
        <div className="container mx-auto px-4 py-4 flex items-center justify-between">
          <div className="flex items-center space-x-4">
            <Link href="/" className="flex items-center space-x-2">
              <Car className="h-6 w-6 text-primary" />
              <span className="text-lg font-bold text-foreground">École de Conduite</span>
            </Link>
            <Badge variant="secondary">Instructeur</Badge>
          </div>

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center space-x-4">
            <Button variant="ghost" size="sm">
              <Bell className="h-4 w-4" />
            </Button>
            <Button variant="ghost" size="sm">
              <Settings className="h-4 w-4" />
            </Button>
            <Avatar className="h-8 w-8">
              <AvatarImage src="/placeholder.svg?height=32&width=32" />
              <AvatarFallback>SD</AvatarFallback>
            </Avatar>
            <Button variant="ghost" size="sm">
              <LogOut className="h-4 w-4" />
            </Button>
          </div>

          {/* Mobile Menu Button */}
          <Button
            variant="ghost"
            size="sm"
            className="md:hidden"
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
          >
            {isMobileMenuOpen ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
          </Button>
        </div>

        {/* Mobile Navigation */}
        {isMobileMenuOpen && (
          <div className="md:hidden bg-white border-t">
            <div className="container mx-auto px-4 py-4 space-y-4">
              <div className="flex items-center space-x-3">
                <Avatar className="h-10 w-10">
                  <AvatarImage src="/placeholder.svg?height=40&width=40" />
                  <AvatarFallback>SD</AvatarFallback>
                </Avatar>
                <div>
                  <div className="font-medium">Sarah Dubois</div>
                  <div className="text-sm text-muted-foreground">Instructrice</div>
                </div>
              </div>
              <div className="flex flex-col space-y-2">
                <Button variant="ghost" className="justify-start">
                  <Bell className="h-4 w-4 mr-2" />
                  Notifications
                </Button>
                <Button variant="ghost" className="justify-start">
                  <Settings className="h-4 w-4 mr-2" />
                  Paramètres
                </Button>
                <Button variant="ghost" className="justify-start">
                  <LogOut className="h-4 w-4 mr-2" />
                  Déconnexion
                </Button>
              </div>
            </div>
          </div>
        )}
      </header>

      <div className="container mx-auto px-4 py-8">
        {/* Welcome Section */}
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-foreground mb-2">Bonjour, Sarah !</h1>
          <p className="text-muted-foreground">Vous avez 4 séances programmées pour aujourd'hui</p>
        </div>

        <div className="grid lg:grid-cols-3 gap-8">
          {/* Main Content */}
          <div className="lg:col-span-2 space-y-8">
            {/* Stats Overview */}
            <div className="grid md:grid-cols-4 gap-4">
              <Card className="hover:shadow-lg transition-shadow duration-300">
                <CardContent className="p-6 text-center">
                  <div className="text-2xl font-bold text-primary">24</div>
                  <div className="text-sm text-muted-foreground">Étudiants Actifs</div>
                </CardContent>
              </Card>
              <Card className="hover:shadow-lg transition-shadow duration-300">
                <CardContent className="p-6 text-center">
                  <div className="text-2xl font-bold text-accent">156</div>
                  <div className="text-sm text-muted-foreground">Leçons Enseignées</div>
                </CardContent>
              </Card>
              <Card className="hover:shadow-lg transition-shadow duration-300">
                <CardContent className="p-6 text-center">
                  <div className="text-2xl font-bold text-secondary">4.9</div>
                  <div className="text-sm text-muted-foreground flex items-center justify-center">
                    <Star className="h-3 w-3 fill-yellow-400 text-yellow-400 mr-1" />
                    Évaluation
                  </div>
                </CardContent>
              </Card>
              <Card className="hover:shadow-lg transition-shadow duration-300">
                <CardContent className="p-6 text-center">
                  <div className="text-2xl font-bold text-foreground">92%</div>
                  <div className="text-sm text-muted-foreground">Taux de Réussite</div>
                </CardContent>
              </Card>
            </div>

            {/* Today's Sessions */}
            <Card className="hover:shadow-lg transition-shadow duration-300">
              <CardHeader>
                <CardTitle className="flex items-center space-x-2">
                  <CalendarIcon className="h-5 w-5 text-primary" />
                  <span>Séances d'Aujourd'hui</span>
                </CardTitle>
                <CardDescription>Gérez vos leçons programmées</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {todaySessions.map((session) => (
                    <div
                      key={session.id}
                      className="flex items-center space-x-4 p-4 border rounded-lg hover:bg-muted/50 transition-colors"
                    >
                      <Avatar className="h-10 w-10">
                        <AvatarImage src={session.avatar || "/placeholder.svg"} />
                        <AvatarFallback>
                          {session.student
                            .split(" ")
                            .map((n) => n[0])
                            .join("")}
                        </AvatarFallback>
                      </Avatar>
                      <div className="flex-1 min-w-0">
                        <h3 className="font-medium text-foreground">{session.student}</h3>
                        <p className="text-sm text-muted-foreground">{session.type}</p>
                        <div className="flex items-center space-x-4 mt-1">
                          <div className="flex items-center space-x-1">
                            <Clock className="h-3 w-3 text-muted-foreground" />
                            <span className="text-xs text-muted-foreground">{session.time}</span>
                          </div>
                          <div className="flex items-center space-x-1">
                            <MapPin className="h-3 w-3 text-muted-foreground" />
                            <span className="text-xs text-muted-foreground">{session.location}</span>
                          </div>
                        </div>
                      </div>
                      <div className="flex items-center space-x-2">
                        {session.status === "completed" ? (
                          <Badge className="bg-accent text-accent-foreground">Terminée</Badge>
                        ) : session.status === "in-progress" ? (
                          <Badge className="bg-secondary text-secondary-foreground">En Cours</Badge>
                        ) : (
                          <Badge variant="outline">À Venir</Badge>
                        )}
                        {session.status === "in-progress" && (
                          <Button size="sm" onClick={() => markSessionComplete(session.id)}>
                            <CheckCircle className="h-4 w-4 mr-1" />
                            Terminer
                          </Button>
                        )}
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>

            {/* Student Progress */}
            <Card className="hover:shadow-lg transition-shadow duration-300">
              <CardHeader>
                <CardTitle className="flex items-center space-x-2">
                  <Users className="h-5 w-5 text-primary" />
                  <span>Progrès des Étudiants</span>
                </CardTitle>
                <CardDescription>Suivez le parcours d'apprentissage de vos étudiants</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-6">
                  {students.map((student) => (
                    <div key={student.id} className="flex items-center space-x-4">
                      <Avatar className="h-12 w-12">
                        <AvatarImage src={student.avatar || "/placeholder.svg"} />
                        <AvatarFallback>
                          {student.name
                            .split(" ")
                            .map((n) => n[0])
                            .join("")}
                        </AvatarFallback>
                      </Avatar>
                      <div className="flex-1 min-w-0">
                        <h3 className="font-medium text-foreground">{student.name}</h3>
                        <div className="flex items-center space-x-4 mt-1">
                          <div className="flex-1">
                            <div className="flex justify-between text-sm mb-1">
                              <span>Progrès</span>
                              <span>{student.progress}%</span>
                            </div>
                            <Progress value={student.progress} className="h-2" />
                          </div>
                          <div className="text-right">
                            <div className="text-sm font-medium">{student.lessonsCompleted} leçons</div>
                            <div className="text-xs text-muted-foreground">Prochaine: {student.nextLesson}</div>
                          </div>
                        </div>
                      </div>
                      <Button variant="outline" size="sm">
                        <MessageSquare className="h-4 w-4 mr-1" />
                        Message
                      </Button>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Sidebar */}
          <div className="space-y-6">
            {/* Calendar */}
            <Card className="hover:shadow-lg transition-shadow duration-300">
              <CardHeader>
                <CardTitle className="text-lg">Calendrier</CardTitle>
              </CardHeader>
              <CardContent>
                <Calendar mode="single" selected={date} onSelect={setDate} className="rounded-md border-0" />
              </CardContent>
            </Card>

            {/* Messages */}
            <Card className="hover:shadow-lg transition-shadow duration-300">
              <CardHeader>
                <CardTitle className="flex items-center justify-between text-lg">
                  <span>Messages</span>
                  <MessageSquare className="h-4 w-4" />
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {messages.map((message) => (
                    <div
                      key={message.id}
                      className={cn(
                        "p-3 border rounded-lg space-y-2 transition-colors",
                        message.unread ? "bg-primary/5 border-primary/20" : "hover:bg-muted/50",
                      )}
                    >
                      <div className="flex items-center justify-between">
                        <span className="text-sm font-medium">{message.student}</span>
                        {message.unread && <div className="w-2 h-2 bg-primary rounded-full" />}
                      </div>
                      <p className="text-sm text-muted-foreground">{message.message}</p>
                      <div className="text-xs text-muted-foreground">{message.time}</div>
                    </div>
                  ))}
                </div>
                <Button variant="outline" className="w-full mt-4">
                  Voir Tous les Messages
                </Button>
              </CardContent>
            </Card>

            {/* Quick Actions */}
            <Card className="hover:shadow-lg transition-shadow duration-300">
              <CardHeader>
                <CardTitle className="text-lg">Actions Rapides</CardTitle>
              </CardHeader>
              <CardContent className="space-y-3">
                <Button className="w-full justify-start">
                  <CalendarIcon className="h-4 w-4 mr-2" />
                  Programmer une Séance
                </Button>
                <Button variant="outline" className="w-full justify-start">
                  <Users className="h-4 w-4 mr-2" />
                  Voir Tous les Étudiants
                </Button>
                <Button variant="outline" className="w-full justify-start">
                  <MessageSquare className="h-4 w-4 mr-2" />
                  Envoyer un Message
                </Button>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </div>
  )
}
