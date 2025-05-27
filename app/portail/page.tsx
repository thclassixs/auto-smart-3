"use client"

import { useState, useEffect } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Progress } from "@/components/ui/progress"
import { Badge } from "@/components/ui/badge"
import { Calendar } from "@/components/ui/calendar"
import { LoadingPage } from "@/components/loading-page"
import { CalendarIcon, MessageSquare, BookOpen, Trophy, Clock, CheckCircle, PlayCircle, User } from "lucide-react"
import Link from "next/link"
import { cn } from "@/lib/utils"

export default function StudentDashboard() {
  const [date, setDate] = useState<Date | undefined>(new Date())
  const [isLoading, setIsLoading] = useState(true)

  useEffect(() => {
    // Simulate loading with more realistic timing
    const timer = setTimeout(() => setIsLoading(false), 1500)
    return () => clearTimeout(timer)
  }, [])

  const lessons = [
    {
      id: 1,
      title: "Contrôles de Base du Véhicule",
      description: "Apprendre la direction, l'accélération et le freinage",
      progress: 100,
      status: "completed",
      duration: "45 min",
    },
    {
      id: 2,
      title: "Code de la Route et Signalisation",
      description: "Comprendre les panneaux de signalisation et les règles de circulation",
      progress: 75,
      status: "in-progress",
      duration: "60 min",
    },
    {
      id: 3,
      title: "Techniques de Stationnement",
      description: "Stationnement en parallèle et en perpendiculaire",
      progress: 30,
      status: "in-progress",
      duration: "90 min",
    },
    {
      id: 4,
      title: "Conduite sur Autoroute",
      description: "Insertion sécurisée et changements de voie sur autoroute",
      progress: 0,
      status: "locked",
      duration: "120 min",
    },
  ]

  const upcomingSessions = [
    {
      id: 1,
      instructor: "Sarah Dubois",
      date: "Aujourd'hui, 14h00",
      type: "Leçon Pratique",
      location: "Centre de Formation Principal",
    },
    {
      id: 2,
      instructor: "Michel Chen",
      date: "Demain, 10h00",
      type: "Pratique Autoroute",
      location: "Parcours Autoroute A",
    },
  ]

  const messages = [
    {
      id: 1,
      instructor: "Sarah Dubois",
      message: "Excellent progrès dans la leçon d'aujourd'hui ! Continuez à pratiquer le stationnement en parallèle.",
      time: "Il y a 2 heures",
      unread: true,
    },
    {
      id: 2,
      instructor: "Michel Chen",
      message: "N'oubliez pas d'apporter votre permis d'apprenti demain.",
      time: "Il y a 1 jour",
      unread: false,
    },
  ]

  if (isLoading) {
    return <LoadingPage />
  }

  return (
    <div className="p-4 md:p-8">
      {/* Welcome Section */}
      <div className="mb-8">
        <h1 className="text-2xl md:text-3xl font-bold text-foreground mb-2">Bon retour, hamza !</h1>
        <p className="text-muted-foreground">Continuez votre parcours d'apprentissage et suivez vos progrès</p>
      </div>

      <div className="grid lg:grid-cols-3 gap-6 md:gap-8">
        {/* Main Content */}
        <div className="lg:col-span-2 space-y-6 md:space-y-8">
          {/* Progress Overview */}
          <Card className="hover:shadow-lg transition-shadow duration-300">
            <CardHeader>
              <CardTitle className="flex items-center space-x-2">
                <Trophy className="h-5 w-5 text-accent" />
                <span>Progrès Global</span>
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <div className="flex justify-between items-center">
                  <span className="text-sm font-medium">Achèvement du Cours</span>
                  <span className="text-sm text-muted-foreground">51%</span>
                </div>
                <Progress value={51} className="h-3" />
                <div className="grid grid-cols-3 gap-4 pt-4">
                  <div className="text-center">
                    <div className="text-xl md:text-2xl font-bold text-accent">12</div>
                    <div className="text-xs text-muted-foreground">Leçons Terminées</div>
                  </div>
                  <div className="text-center">
                    <div className="text-xl md:text-2xl font-bold text-primary">8</div>
                    <div className="text-xs text-muted-foreground">Heures Pratiques</div>
                  </div>
                  <div className="text-center">
                    <div className="text-xl md:text-2xl font-bold text-secondary">2</div>
                    <div className="text-xs text-muted-foreground">Tests Blancs</div>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Lessons */}
          <Card className="hover:shadow-lg transition-shadow duration-300">
            <CardHeader>
              <CardTitle className="flex items-center space-x-2">
                <BookOpen className="h-5 w-5 text-primary" />
                <span>Mes Leçons</span>
              </CardTitle>
              <CardDescription>Suivez votre progression d'apprentissage</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {lessons.map((lesson) => (
                  <div
                    key={lesson.id}
                    className={cn(
                      "flex items-center space-x-4 p-4 border rounded-lg transition-all duration-300",
                      lesson.status !== "locked"
                        ? "hover:bg-muted/50 cursor-pointer hover:shadow-md"
                        : "opacity-60 cursor-not-allowed",
                    )}
                  >
                    <div className="flex-shrink-0">
                      {lesson.status === "completed" ? (
                        <CheckCircle className="h-8 w-8 text-accent" />
                      ) : lesson.status === "in-progress" ? (
                        <PlayCircle className="h-8 w-8 text-primary" />
                      ) : (
                        <div className="h-8 w-8 rounded-full bg-muted border-2 border-muted-foreground/20" />
                      )}
                    </div>
                    <div className="flex-1 min-w-0">
                      <h3 className="font-medium text-foreground">{lesson.title}</h3>
                      <p className="text-sm text-muted-foreground line-clamp-2">{lesson.description}</p>
                      <div className="flex items-center space-x-4 mt-2">
                        <div className="flex-1">
                          <Progress value={lesson.progress} className="h-2" />
                        </div>
                        <span className="text-xs text-muted-foreground">{lesson.progress}%</span>
                      </div>
                    </div>
                    <div className="flex items-center space-x-2">
                      <Clock className="h-4 w-4 text-muted-foreground" />
                      <span className="text-sm text-muted-foreground">{lesson.duration}</span>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>

          {/* Quick Actions */}
          <div className="grid md:grid-cols-2 gap-4">
            <Card className="cursor-pointer hover:shadow-lg transition-all duration-300 hover:-translate-y-1">
              <CardContent className="p-6 text-center space-y-4">
                <div className="w-12 h-12 bg-accent/10 rounded-full flex items-center justify-center mx-auto">
                  <Trophy className="h-6 w-6 text-accent" />
                </div>
                <div>
                  <h3 className="font-semibold text-foreground">Passer un Test Blanc</h3>
                  <p className="text-sm text-muted-foreground">Entraînez-vous pour votre examen de conduite</p>
                </div>
                <Button className="w-full">Commencer le Test</Button>
              </CardContent>
            </Card>

            <Card className="cursor-pointer hover:shadow-lg transition-all duration-300 hover:-translate-y-1">
              <CardContent className="p-6 text-center space-y-4">
                <div className="w-12 h-12 bg-primary/10 rounded-full flex items-center justify-center mx-auto">
                  <CalendarIcon className="h-6 w-6 text-primary" />
                </div>
                <div>
                  <h3 className="font-semibold text-foreground">Réserver une Séance</h3>
                  <p className="text-sm text-muted-foreground">Planifiez votre prochaine leçon</p>
                </div>
                <Link href="/portail/booking">
                  <Button variant="outline" className="w-full">
                    Réserver Maintenant
                  </Button>
                </Link>
              </CardContent>
            </Card>
          </div>
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

          {/* Upcoming Sessions */}
          <Card className="hover:shadow-lg transition-shadow duration-300">
            <CardHeader>
              <CardTitle className="text-lg">Prochaines Séances</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {upcomingSessions.map((session) => (
                  <div key={session.id} className="p-3 border rounded-lg space-y-2 hover:bg-muted/50 transition-colors">
                    <div className="flex items-center space-x-2">
                      <User className="h-4 w-4 text-muted-foreground" />
                      <span className="text-sm font-medium">{session.instructor}</span>
                    </div>
                    <div className="text-sm text-muted-foreground">{session.date}</div>
                    <Badge variant="outline" className="text-xs">
                      {session.type}
                    </Badge>
                  </div>
                ))}
              </div>
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
                      <span className="text-sm font-medium">{message.instructor}</span>
                      {message.unread && <div className="w-2 h-2 bg-primary rounded-full" />}
                    </div>
                    <p className="text-sm text-muted-foreground line-clamp-2">{message.message}</p>
                    <div className="text-xs text-muted-foreground">{message.time}</div>
                  </div>
                ))}
              </div>
              <Link href="/portail/messages">
                <Button variant="outline" className="w-full mt-4">
                  Voir Tous les Messages
                </Button>
              </Link>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  )
}
