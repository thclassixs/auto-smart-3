"use client"

import { useState, useEffect } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Input } from "@/components/ui/input"
import { Skeleton } from "@/components/ui/skeleton"
import {
  Car,
  Users,
  BookOpen,
  TrendingUp,
  Search,
  Plus,
  Edit,
  Trash2,
  Bell,
  Settings,
  LogOut,
  BarChart3,
  UserCheck,
  UserX,
  GraduationCap,
  Menu,
  X,
} from "lucide-react"
import Link from "next/link"
import { cn } from "@/lib/utils"

export default function AdminDashboard() {
  const [searchTerm, setSearchTerm] = useState("")
  const [isLoading, setIsLoading] = useState(true)
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false)

  useEffect(() => {
    // Simulate loading
    const timer = setTimeout(() => setIsLoading(false), 1000)
    return () => clearTimeout(timer)
  }, [])

  const stats = [
    {
      title: "Total Étudiants",
      value: "1,234",
      change: "+12%",
      icon: Users,
      color: "text-primary",
    },
    {
      title: "Instructeurs Actifs",
      value: "45",
      change: "+3%",
      icon: GraduationCap,
      color: "text-accent",
    },
    {
      title: "Leçons Terminées",
      value: "8,567",
      change: "+18%",
      icon: BookOpen,
      color: "text-secondary",
    },
    {
      title: "Revenus",
      value: "124,500€",
      change: "+25%",
      icon: TrendingUp,
      color: "text-green-600",
    },
  ]

  const recentUsers = [
    {
      id: 1,
      name: "hamza bensaleh",
      email: "hamza@exemple.com",
      role: "Étudiant",
      status: "Actif",
      joinDate: "15/01/2024",
      avatar: "/placeholder.svg?height=32&width=32",
    },
    {
      id: 2,
      name: "Sarah Dubois",
      email: "sarah@exemple.com",
      role: "Instructrice",
      status: "Actif",
      joinDate: "14/01/2024",
      avatar: "/placeholder.svg?height=32&width=32",
    },
    {
      id: 3,
      name: "Michel Chen",
      email: "michel@exemple.com",
      role: "Étudiant",
      status: "Inactif",
      joinDate: "13/01/2024",
      avatar: "/placeholder.svg?height=32&width=32",
    },
    {
      id: 4,
      name: "Emma Martin",
      email: "emma@exemple.com",
      role: "Étudiante",
      status: "Actif",
      joinDate: "12/01/2024",
      avatar: "/placeholder.svg?height=32&width=32",
    },
  ]

  const lessons = [
    {
      id: 1,
      title: "Contrôles de Base du Véhicule",
      category: "Débutant",
      duration: "45 min",
      students: 156,
      status: "Publié",
    },
    {
      id: 2,
      title: "Code de la Route et Signalisation",
      category: "Théorie",
      duration: "60 min",
      students: 142,
      status: "Publié",
    },
    {
      id: 3,
      title: "Conduite sur Autoroute",
      category: "Avancé",
      duration: "120 min",
      students: 89,
      status: "Brouillon",
    },
    {
      id: 4,
      title: "Techniques de Stationnement",
      category: "Pratique",
      duration: "90 min",
      students: 134,
      status: "Publié",
    },
  ]

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
            <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
              {[...Array(4)].map((_, i) => (
                <Skeleton key={i} className="h-32 w-full" />
              ))}
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
            <Badge className="bg-red-100 text-red-800">Admin</Badge>
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
              <AvatarFallback>AD</AvatarFallback>
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
                  <AvatarFallback>AD</AvatarFallback>
                </Avatar>
                <div>
                  <div className="font-medium">Administrateur</div>
                  <div className="text-sm text-muted-foreground">admin@ecoleconduite.fr</div>
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
          <h1 className="text-3xl font-bold text-foreground mb-2">Tableau de Bord Admin</h1>
          <p className="text-muted-foreground">
            Gérez les utilisateurs, les leçons et surveillez les analyses du système
          </p>
        </div>

        {/* Stats Overview */}
        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
          {stats.map((stat, index) => (
            <Card key={index} className="hover:shadow-lg transition-shadow duration-300">
              <CardContent className="p-6">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm font-medium text-muted-foreground">{stat.title}</p>
                    <p className="text-2xl font-bold text-foreground">{stat.value}</p>
                    <p className="text-sm text-accent">{stat.change} par rapport au mois dernier</p>
                  </div>
                  <div className={cn("p-3 rounded-full bg-muted", stat.color)}>
                    <stat.icon className="h-6 w-6" />
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>

        <div className="grid lg:grid-cols-3 gap-8">
          {/* Main Content */}
          <div className="lg:col-span-2 space-y-8">
            {/* User Management */}
            <Card className="hover:shadow-lg transition-shadow duration-300">
              <CardHeader>
                <div className="flex items-center justify-between">
                  <div>
                    <CardTitle className="flex items-center space-x-2">
                      <Users className="h-5 w-5 text-primary" />
                      <span>Gestion des Utilisateurs</span>
                    </CardTitle>
                    <CardDescription>Gérer les étudiants et les instructeurs</CardDescription>
                  </div>
                  <Button>
                    <Plus className="h-4 w-4 mr-2" />
                    Ajouter Utilisateur
                  </Button>
                </div>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <div className="relative">
                    <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                    <Input
                      placeholder="Rechercher des utilisateurs..."
                      value={searchTerm}
                      onChange={(e) => setSearchTerm(e.target.value)}
                      className="pl-10"
                    />
                  </div>
                  <div className="space-y-3">
                    {recentUsers
                      .filter(
                        (user) =>
                          user.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                          user.email.toLowerCase().includes(searchTerm.toLowerCase()),
                      )
                      .map((user) => (
                        <div
                          key={user.id}
                          className="flex items-center space-x-4 p-4 border rounded-lg hover:bg-muted/50 transition-colors"
                        >
                          <Avatar className="h-10 w-10">
                            <AvatarImage src={user.avatar || "/placeholder.svg"} />
                            <AvatarFallback>
                              {user.name
                                .split(" ")
                                .map((n) => n[0])
                                .join("")}
                            </AvatarFallback>
                          </Avatar>
                          <div className="flex-1 min-w-0">
                            <h3 className="font-medium text-foreground">{user.name}</h3>
                            <p className="text-sm text-muted-foreground">{user.email}</p>
                            <div className="flex items-center space-x-2 mt-1">
                              <Badge variant={user.role.includes("Instructeur") ? "default" : "secondary"}>
                                {user.role}
                              </Badge>
                              <Badge
                                variant={user.status === "Actif" ? "default" : "destructive"}
                                className={user.status === "Actif" ? "bg-accent text-accent-foreground" : ""}
                              >
                                {user.status}
                              </Badge>
                            </div>
                          </div>
                          <div className="text-right">
                            <div className="text-sm text-muted-foreground">Inscrit le {user.joinDate}</div>
                            <div className="flex items-center space-x-1 mt-2">
                              <Button variant="ghost" size="sm">
                                <Edit className="h-4 w-4" />
                              </Button>
                              <Button variant="ghost" size="sm">
                                <Trash2 className="h-4 w-4" />
                              </Button>
                            </div>
                          </div>
                        </div>
                      ))}
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Lesson Management */}
            <Card className="hover:shadow-lg transition-shadow duration-300">
              <CardHeader>
                <div className="flex items-center justify-between">
                  <div>
                    <CardTitle className="flex items-center space-x-2">
                      <BookOpen className="h-5 w-5 text-primary" />
                      <span>Gestion des Leçons</span>
                    </CardTitle>
                    <CardDescription>Créer et gérer les leçons de conduite</CardDescription>
                  </div>
                  <Button>
                    <Plus className="h-4 w-4 mr-2" />
                    Créer Leçon
                  </Button>
                </div>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {lessons.map((lesson) => (
                    <div
                      key={lesson.id}
                      className="flex items-center space-x-4 p-4 border rounded-lg hover:bg-muted/50 transition-colors"
                    >
                      <div className="flex-1 min-w-0">
                        <h3 className="font-medium text-foreground">{lesson.title}</h3>
                        <div className="flex items-center space-x-4 mt-1">
                          <Badge variant="outline">{lesson.category}</Badge>
                          <span className="text-sm text-muted-foreground">{lesson.duration}</span>
                          <span className="text-sm text-muted-foreground">{lesson.students} étudiants</span>
                        </div>
                      </div>
                      <div className="flex items-center space-x-2">
                        <Badge
                          variant={lesson.status === "Publié" ? "default" : "secondary"}
                          className={lesson.status === "Publié" ? "bg-accent text-accent-foreground" : ""}
                        >
                          {lesson.status}
                        </Badge>
                        <Button variant="ghost" size="sm">
                          <Edit className="h-4 w-4" />
                        </Button>
                        <Button variant="ghost" size="sm">
                          <Trash2 className="h-4 w-4" />
                        </Button>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Sidebar */}
          <div className="space-y-6">
            {/* Quick Stats */}
            <Card className="hover:shadow-lg transition-shadow duration-300">
              <CardHeader>
                <CardTitle className="text-lg">Statistiques Rapides</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="flex items-center justify-between">
                  <div className="flex items-center space-x-2">
                    <UserCheck className="h-4 w-4 text-accent" />
                    <span className="text-sm">Utilisateurs Actifs</span>
                  </div>
                  <span className="font-semibold">1,189</span>
                </div>
                <div className="flex items-center justify-between">
                  <div className="flex items-center space-x-2">
                    <UserX className="h-4 w-4 text-red-500" />
                    <span className="text-sm">Utilisateurs Inactifs</span>
                  </div>
                  <span className="font-semibold">45</span>
                </div>
                <div className="flex items-center justify-between">
                  <div className="flex items-center space-x-2">
                    <BookOpen className="h-4 w-4 text-primary" />
                    <span className="text-sm">Total Leçons</span>
                  </div>
                  <span className="font-semibold">24</span>
                </div>
                <div className="flex items-center justify-between">
                  <div className="flex items-center space-x-2">
                    <BarChart3 className="h-4 w-4 text-secondary" />
                    <span className="text-sm">Taux de Réussite</span>
                  </div>
                  <span className="font-semibold">87%</span>
                </div>
              </CardContent>
            </Card>

            {/* Recent Activity */}
            <Card className="hover:shadow-lg transition-shadow duration-300">
              <CardHeader>
                <CardTitle className="text-lg">Activité Récente</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <div className="flex items-start space-x-3">
                    <div className="w-2 h-2 bg-accent rounded-full mt-2"></div>
                    <div className="flex-1">
                      <p className="text-sm">Nouvel étudiant hamza bensaleh inscrit</p>
                      <p className="text-xs text-muted-foreground">Il y a 2 heures</p>
                    </div>
                  </div>
                  <div className="flex items-start space-x-3">
                    <div className="w-2 h-2 bg-primary rounded-full mt-2"></div>
                    <div className="flex-1">
                      <p className="text-sm">Leçon "Conduite sur Autoroute" mise à jour</p>
                      <p className="text-xs text-muted-foreground">Il y a 4 heures</p>
                    </div>
                  </div>
                  <div className="flex items-start space-x-3">
                    <div className="w-2 h-2 bg-secondary rounded-full mt-2"></div>
                    <div className="flex-1">
                      <p className="text-sm">Instructrice Sarah Dubois a terminé 5 séances</p>
                      <p className="text-xs text-muted-foreground">Il y a 6 heures</p>
                    </div>
                  </div>
                  <div className="flex items-start space-x-3">
                    <div className="w-2 h-2 bg-muted-foreground rounded-full mt-2"></div>
                    <div className="flex-1">
                      <p className="text-sm">Sauvegarde système terminée</p>
                      <p className="text-xs text-muted-foreground">Il y a 1 jour</p>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Quick Actions */}
            <Card className="hover:shadow-lg transition-shadow duration-300">
              <CardHeader>
                <CardTitle className="text-lg">Actions Rapides</CardTitle>
              </CardHeader>
              <CardContent className="space-y-3">
                <Button className="w-full justify-start">
                  <Users className="h-4 w-4 mr-2" />
                  Gérer Utilisateurs
                </Button>
                <Button variant="outline" className="w-full justify-start">
                  <BookOpen className="h-4 w-4 mr-2" />
                  Créer Leçon
                </Button>
                <Button variant="outline" className="w-full justify-start">
                  <BarChart3 className="h-4 w-4 mr-2" />
                  Voir Analyses
                </Button>
                <Button variant="outline" className="w-full justify-start">
                  <Settings className="h-4 w-4 mr-2" />
                  Paramètres Système
                </Button>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </div>
  )
}
