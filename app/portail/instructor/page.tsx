"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Progress } from "@/components/ui/progress"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Star, MessageSquare, Calendar, Trophy, Clock, Phone, Mail, MapPin, Award, BookOpen } from "lucide-react"
import Link from "next/link"

export default function InstructorPage() {
  const [selectedTab, setSelectedTab] = useState("profile")

  const instructor = {
    name: "Sarah Dubois",
    speciality: "Conduite classique et perfectionnement",
    experience: "12 ans d'expérience",
    rating: 4.9,
    totalStudents: 156,
    successRate: 94,
    avatar: "/placeholder.svg?height=120&width=120",
    phone: "06 13 80 93 92",
    email: "sarah.dubois@ecole-conduite.fr",
    location: "Centre de Formation Principal",
    certifications: ["Moniteur agréé", "Formation continue", "Spécialiste AAC"],
    bio: "Passionnée par l'enseignement de la conduite depuis plus de 12 ans, je mets un point d'honneur à accompagner chaque élève vers la réussite. Ma méthode pédagogique s'adapte au rythme et aux besoins de chacun.",
  }

  const lessons = [
    {
      id: 1,
      title: "Contrôles de base",
      date: "15 Jan 2024",
      duration: "1h",
      status: "completed",
      notes: "Très bon progrès sur les vérifications. Continue comme ça !",
      grade: "A",
    },
    {
      id: 2,
      title: "Stationnement",
      date: "18 Jan 2024",
      duration: "1h30",
      status: "completed",
      notes: "Créneaux maîtrisés. Travail sur le stationnement en bataille la prochaine fois.",
      grade: "B+",
    },
    {
      id: 3,
      title: "Circulation urbaine",
      date: "22 Jan 2024",
      duration: "1h",
      status: "completed",
      notes: "Excellente gestion des priorités. Confiance en progression.",
      grade: "A-",
    },
    {
      id: 4,
      title: "Autoroute",
      date: "25 Jan 2024",
      duration: "2h",
      status: "upcoming",
      notes: "",
      grade: "",
    },
  ]

  const stats = [
    { label: "Leçons effectuées", value: "12", icon: BookOpen },
    { label: "Heures de conduite", value: "18h", icon: Clock },
    { label: "Progression", value: "78%", icon: Trophy },
    { label: "Note moyenne", value: "A-", icon: Award },
  ]

  return (
    <div className="p-8">
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-foreground mb-2">Mon Instructeur</h1>
        <p className="text-muted-foreground">Découvrez votre instructeur et suivez votre progression</p>
      </div>

      <div className="grid lg:grid-cols-3 gap-8">
        {/* Instructor Profile */}
        <div className="lg:col-span-1">
          <Card className="hover:shadow-lg transition-shadow duration-300">
            <CardContent className="p-6 text-center">
              <Avatar className="h-32 w-32 mx-auto mb-4">
                <AvatarImage src={instructor.avatar || "/placeholder.svg"} />
                <AvatarFallback className="text-2xl">SD</AvatarFallback>
              </Avatar>
              <h2 className="text-2xl font-bold mb-2">{instructor.name}</h2>
              <p className="text-muted-foreground mb-4">{instructor.speciality}</p>
              <div className="flex items-center justify-center space-x-1 mb-4">
                <Star className="h-5 w-5 text-yellow-500 fill-current" />
                <span className="font-semibold">{instructor.rating}</span>
                <span className="text-muted-foreground">/ 5</span>
              </div>
              <Badge variant="secondary" className="mb-4">
                {instructor.experience}
              </Badge>
              <div className="space-y-2">
                <Button className="w-full" asChild>
                  <Link href="/portail/messages">
                    <MessageSquare className="h-4 w-4 mr-2" />
                    Envoyer un message
                  </Link>
                </Button>
                <Button variant="outline" className="w-full" asChild>
                  <Link href="/portail/booking">
                    <Calendar className="h-4 w-4 mr-2" />
                    Réserver une leçon
                  </Link>
                </Button>
              </div>
            </CardContent>
          </Card>

          {/* Contact Info */}
          <Card className="mt-6 hover:shadow-lg transition-shadow duration-300">
            <CardHeader>
              <CardTitle className="text-lg">Contact</CardTitle>
            </CardHeader>
            <CardContent className="space-y-3">
              <div className="flex items-center space-x-3">
                <Phone className="h-4 w-4 text-muted-foreground" />
                <span className="text-sm">{instructor.phone}</span>
              </div>
              <div className="flex items-center space-x-3">
                <Mail className="h-4 w-4 text-muted-foreground" />
                <span className="text-sm">{instructor.email}</span>
              </div>
              <div className="flex items-center space-x-3">
                <MapPin className="h-4 w-4 text-muted-foreground" />
                <span className="text-sm">{instructor.location}</span>
              </div>
            </CardContent>
          </Card>

          {/* Certifications */}
          <Card className="mt-6 hover:shadow-lg transition-shadow duration-300">
            <CardHeader>
              <CardTitle className="text-lg">Certifications</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-2">
                {instructor.certifications.map((cert, index) => (
                  <Badge key={index} variant="outline" className="w-full justify-center">
                    {cert}
                  </Badge>
                ))}
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Main Content */}
        <div className="lg:col-span-2">
          {/* Stats */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-8">
            {stats.map((stat, index) => (
              <Card key={index} className="hover:shadow-lg transition-shadow duration-300">
                <CardContent className="p-4 text-center">
                  <stat.icon className="h-8 w-8 mx-auto mb-2 text-primary" />
                  <div className="text-2xl font-bold">{stat.value}</div>
                  <div className="text-xs text-muted-foreground">{stat.label}</div>
                </CardContent>
              </Card>
            ))}
          </div>

          {/* Tabs */}
          <Tabs value={selectedTab} onValueChange={setSelectedTab}>
            <TabsList className="grid w-full grid-cols-3">
              <TabsTrigger value="profile">Profil</TabsTrigger>
              <TabsTrigger value="lessons">Mes leçons</TabsTrigger>
              <TabsTrigger value="progress">Progression</TabsTrigger>
            </TabsList>

            <TabsContent value="profile" className="mt-6">
              <Card>
                <CardHeader>
                  <CardTitle>À propos de {instructor.name}</CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-muted-foreground leading-relaxed mb-6">{instructor.bio}</p>
                  <div className="grid md:grid-cols-2 gap-6">
                    <div>
                      <h4 className="font-semibold mb-2">Statistiques</h4>
                      <div className="space-y-2">
                        <div className="flex justify-between">
                          <span className="text-sm">Étudiants formés</span>
                          <span className="font-medium">{instructor.totalStudents}</span>
                        </div>
                        <div className="flex justify-between">
                          <span className="text-sm">Taux de réussite</span>
                          <span className="font-medium">{instructor.successRate}%</span>
                        </div>
                        <div className="flex justify-between">
                          <span className="text-sm">Note moyenne</span>
                          <span className="font-medium">{instructor.rating}/5</span>
                        </div>
                      </div>
                    </div>
                    <div>
                      <h4 className="font-semibold mb-2">Spécialités</h4>
                      <div className="space-y-1">
                        <Badge variant="outline">Conduite urbaine</Badge>
                        <Badge variant="outline">Autoroute</Badge>
                        <Badge variant="outline">Stationnement</Badge>
                        <Badge variant="outline">Conduite défensive</Badge>
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </TabsContent>

            <TabsContent value="lessons" className="mt-6">
              <Card>
                <CardHeader>
                  <CardTitle>Historique des leçons</CardTitle>
                  <CardDescription>Retrouvez toutes vos leçons avec {instructor.name}</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    {lessons.map((lesson) => (
                      <div
                        key={lesson.id}
                        className="flex items-center justify-between p-4 border rounded-lg hover:bg-muted/50 transition-colors"
                      >
                        <div className="flex-1">
                          <h4 className="font-medium">{lesson.title}</h4>
                          <div className="flex items-center space-x-4 mt-1 text-sm text-muted-foreground">
                            <span>{lesson.date}</span>
                            <span>{lesson.duration}</span>
                            {lesson.grade && (
                              <Badge variant={lesson.grade.startsWith("A") ? "default" : "secondary"}>
                                {lesson.grade}
                              </Badge>
                            )}
                          </div>
                          {lesson.notes && <p className="text-sm text-muted-foreground mt-2">{lesson.notes}</p>}
                        </div>
                        <Badge variant={lesson.status === "completed" ? "default" : "outline"}>
                          {lesson.status === "completed" ? "Terminée" : "À venir"}
                        </Badge>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>
            </TabsContent>

            <TabsContent value="progress" className="mt-6">
              <Card>
                <CardHeader>
                  <CardTitle>Ma progression</CardTitle>
                  <CardDescription>Suivez votre évolution avec {instructor.name}</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="space-y-6">
                    <div>
                      <div className="flex justify-between items-center mb-2">
                        <span className="text-sm font-medium">Progression générale</span>
                        <span className="text-sm text-muted-foreground">78%</span>
                      </div>
                      <Progress value={78} className="h-3" />
                    </div>

                    <div className="grid md:grid-cols-2 gap-6">
                      <div>
                        <h4 className="font-semibold mb-4">Compétences acquises</h4>
                        <div className="space-y-3">
                          <div>
                            <div className="flex justify-between text-sm mb-1">
                              <span>Contrôles de base</span>
                              <span>95%</span>
                            </div>
                            <Progress value={95} className="h-2" />
                          </div>
                          <div>
                            <div className="flex justify-between text-sm mb-1">
                              <span>Stationnement</span>
                              <span>85%</span>
                            </div>
                            <Progress value={85} className="h-2" />
                          </div>
                          <div>
                            <div className="flex justify-between text-sm mb-1">
                              <span>Circulation urbaine</span>
                              <span>90%</span>
                            </div>
                            <Progress value={90} className="h-2" />
                          </div>
                          <div>
                            <div className="flex justify-between text-sm mb-1">
                              <span>Autoroute</span>
                              <span>45%</span>
                            </div>
                            <Progress value={45} className="h-2" />
                          </div>
                        </div>
                      </div>

                      <div>
                        <h4 className="font-semibold mb-4">Objectifs à venir</h4>
                        <div className="space-y-3">
                          <div className="flex items-center space-x-2">
                            <div className="w-2 h-2 bg-primary rounded-full"></div>
                            <span className="text-sm">Maîtriser l'insertion sur autoroute</span>
                          </div>
                          <div className="flex items-center space-x-2">
                            <div className="w-2 h-2 bg-primary rounded-full"></div>
                            <span className="text-sm">Perfectionner les manœuvres</span>
                          </div>
                          <div className="flex items-center space-x-2">
                            <div className="w-2 h-2 bg-primary rounded-full"></div>
                            <span className="text-sm">Conduite de nuit</span>
                          </div>
                          <div className="flex items-center space-x-2">
                            <div className="w-2 h-2 bg-primary rounded-full"></div>
                            <span className="text-sm">Préparation à l'examen</span>
                          </div>
                        </div>
                      </div>
                    </div>

                    <div className="bg-muted/50 p-4 rounded-lg">
                      <h4 className="font-semibold mb-2">Commentaire de votre instructeur</h4>
                      <p className="text-sm text-muted-foreground">
                        "hamza fait d'excellents progrès ! Sa confiance au volant s'améliore de leçon en leçon. Nous
                        allons maintenant nous concentrer sur la conduite autoroutière pour compléter sa formation.
                        Continue comme ça !"
                      </p>
                      <div className="flex items-center justify-between mt-3">
                        <span className="text-xs text-muted-foreground">Dernière mise à jour: 22 Jan 2024</span>
                        <div className="flex items-center space-x-1">
                          <Star className="h-4 w-4 text-yellow-500 fill-current" />
                          <span className="text-sm font-medium">Très bon élève</span>
                        </div>
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </TabsContent>
          </Tabs>
        </div>
      </div>
    </div>
  )
}
