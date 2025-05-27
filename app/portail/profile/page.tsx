"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Badge } from "@/components/ui/badge"
import { Progress } from "@/components/ui/progress"
import { useToast } from "@/hooks/use-toast"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import {
  Mail,
  Phone,
  Trophy,
  Clock,
  BookOpen,
  Star,
  Camera,
  Edit,
  Save,
  X,
  CheckCircle,
  MessageSquare,
} from "lucide-react"
import Link from "next/link"

export default function StudentProfilePage() {
  const [isEditing, setIsEditing] = useState(false)
  const [isSaving, setIsSaving] = useState(false)
  const [profileData, setProfileData] = useState({
    firstName: "hamza",
    lastName: "bensaleh",
    email: "hamza.bensaleh@email.com",
    phone: "06 13 80 93 92",
    bio: "Étudiant motivé en apprentissage de la conduite. J'aime apprendre de nouvelles techniques et progresser à mon rythme.",
    birthDate: "1995-03-15",
    address: "123 Rue de la Paix, 75001 Paris",
  })

  const { toast } = useToast()

  const stats = [
    {
      label: "Leçons terminées",
      value: 12,
      total: 20,
      icon: BookOpen,
      color: "text-blue-600",
    },
    {
      label: "Heures de conduite",
      value: 18,
      total: 30,
      icon: Clock,
      color: "text-green-600",
    },
    {
      label: "Tests réussis",
      value: 8,
      total: 10,
      icon: Trophy,
      color: "text-yellow-600",
    },
    {
      label: "Note moyenne",
      value: 4.2,
      total: 5,
      icon: Star,
      color: "text-purple-600",
    },
  ]

  const achievements = [
    {
      id: "1",
      title: "Premier pas",
      description: "Première leçon terminée",
      icon: "🎯",
      earned: true,
      date: "15 Jan 2024",
    },
    {
      id: "2",
      title: "Théoricien",
      description: "10 leçons théoriques terminées",
      icon: "📚",
      earned: true,
      date: "22 Jan 2024",
    },
    {
      id: "3",
      title: "Pratiquant",
      description: "5 heures de conduite pratique",
      icon: "🚗",
      earned: true,
      date: "28 Jan 2024",
    },
    {
      id: "4",
      title: "Perfectionniste",
      description: "Score parfait à un test",
      icon: "⭐",
      earned: false,
      date: null,
    },
    {
      id: "5",
      title: "Maître conducteur",
      description: "20 leçons terminées avec succès",
      icon: "🏆",
      earned: false,
      date: null,
    },
    {
      id: "6",
      title: "Simulateur expert",
      description: "10 sessions de simulateur terminées",
      icon: "🎮",
      earned: false,
      date: null,
    },
  ]

  const recentActivity = [
    {
      id: "1",
      type: "lesson",
      title: "Leçon pratique terminée",
      description: "Techniques de stationnement avec Sarah Dubois",
      date: "Il y a 2 jours",
      score: 85,
    },
    {
      id: "2",
      type: "test",
      title: "Test théorique réussi",
      description: "Code de la route - Signalisation",
      date: "Il y a 3 jours",
      score: 92,
    },
    {
      id: "3",
      type: "simulator",
      title: "Session simulateur",
      description: "Conduite en ville - 15 minutes",
      date: "Il y a 5 jours",
      score: 78,
    },
    {
      id: "4",
      type: "lesson",
      title: "Leçon théorique terminée",
      description: "Règles de priorité avec Michel Chen",
      date: "Il y a 1 semaine",
      score: 88,
    },
  ]

  const handleSaveProfile = async () => {
    setIsSaving(true)

    // Simulate API call
    await new Promise((resolve) => setTimeout(resolve, 1500))

    setIsSaving(false)
    setIsEditing(false)

    toast({
      title: "Profil mis à jour",
      description: "Vos informations ont été sauvegardées avec succès.",
    })
  }

  const handleCancelEdit = () => {
    setIsEditing(false)
    // Reset form data here if needed
    toast({
      title: "Modifications annulées",
      description: "Vos modifications n'ont pas été sauvegardées.",
    })
  }

  const getActivityIcon = (type: string) => {
    switch (type) {
      case "lesson":
        return "📖"
      case "test":
        return "📝"
      case "simulator":
        return "🎮"
      default:
        return "📋"
    }
  }

  const getScoreColor = (score: number) => {
    if (score >= 90) return "text-green-600"
    if (score >= 75) return "text-yellow-600"
    return "text-red-600"
  }

  return (
    <div className="min-h-screen bg-muted">
      {/* Header */}
      <div className="bg-white border-b">
        <div className="container mx-auto px-4 py-6">
          <div className="flex items-center justify-between">
            <div>
              <h1 className="text-3xl font-bold text-foreground">Mon Profil</h1>
              <p className="text-muted-foreground">Gérez vos informations personnelles et suivez vos progrès</p>
            </div>
            <Link href="/portail">
              <Button variant="outline">Retour au tableau de bord</Button>
            </Link>
          </div>
        </div>
      </div>

      <div className="container mx-auto px-4 py-8">
        <div className="grid lg:grid-cols-3 gap-8">
          {/* Profile Info */}
          <div className="lg:col-span-2">
            <Tabs defaultValue="profile" className="space-y-6">
              <TabsList className="grid w-full grid-cols-3">
                <TabsTrigger value="profile">Profil</TabsTrigger>
                <TabsTrigger value="progress">Progression</TabsTrigger>
                <TabsTrigger value="activity">Activité</TabsTrigger>
              </TabsList>

              <TabsContent value="profile" className="space-y-6">
                <Card>
                  <CardHeader>
                    <div className="flex items-center justify-between">
                      <div>
                        <CardTitle>Informations personnelles</CardTitle>
                        <CardDescription>Gérez vos informations de profil</CardDescription>
                      </div>
                      {!isEditing ? (
                        <Button onClick={() => setIsEditing(true)}>
                          <Edit className="h-4 w-4 mr-2" />
                          Modifier
                        </Button>
                      ) : (
                        <div className="flex gap-2">
                          <Button onClick={handleSaveProfile} disabled={isSaving}>
                            {isSaving ? (
                              <>
                                <div className="h-4 w-4 border-2 border-white border-t-transparent rounded-full animate-spin mr-2" />
                                Sauvegarde...
                              </>
                            ) : (
                              <>
                                <Save className="h-4 w-4 mr-2" />
                                Sauvegarder
                              </>
                            )}
                          </Button>
                          <Button variant="outline" onClick={handleCancelEdit}>
                            <X className="h-4 w-4 mr-2" />
                            Annuler
                          </Button>
                        </div>
                      )}
                    </div>
                  </CardHeader>
                  <CardContent className="space-y-6">
                    {/* Avatar */}
                    <div className="flex items-center gap-6">
                      <div className="relative">
                        <Avatar className="h-24 w-24">
                          <AvatarImage src="/placeholder.svg?height=96&width=96" />
                          <AvatarFallback className="text-lg">
                            {profileData.firstName[0]}
                            {profileData.lastName[0]}
                          </AvatarFallback>
                        </Avatar>
                        {isEditing && (
                          <Button
                            size="sm"
                            className="absolute -bottom-2 -right-2 h-8 w-8 rounded-full"
                            onClick={() =>
                              toast({
                                title: "Fonctionnalité à venir",
                                description: "Le changement de photo de profil sera bientôt disponible.",
                              })
                            }
                          >
                            <Camera className="h-4 w-4" />
                          </Button>
                        )}
                      </div>
                      <div>
                        <h3 className="text-xl font-semibold">
                          {profileData.firstName} {profileData.lastName}
                        </h3>
                        <p className="text-muted-foreground">Étudiant en conduite</p>
                        <Badge className="mt-2">Niveau Intermédiaire</Badge>
                      </div>
                    </div>

                    {/* Form Fields */}
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                      <div className="space-y-2">
                        <Label htmlFor="firstName">Prénom</Label>
                        <Input
                          id="firstName"
                          value={profileData.firstName}
                          onChange={(e) => setProfileData((prev) => ({ ...prev, firstName: e.target.value }))}
                          disabled={!isEditing}
                        />
                      </div>
                      <div className="space-y-2">
                        <Label htmlFor="lastName">Nom</Label>
                        <Input
                          id="lastName"
                          value={profileData.lastName}
                          onChange={(e) => setProfileData((prev) => ({ ...prev, lastName: e.target.value }))}
                          disabled={!isEditing}
                        />
                      </div>
                      <div className="space-y-2">
                        <Label htmlFor="email">Email</Label>
                        <Input
                          id="email"
                          type="email"
                          value={profileData.email}
                          onChange={(e) => setProfileData((prev) => ({ ...prev, email: e.target.value }))}
                          disabled={!isEditing}
                        />
                      </div>
                      <div className="space-y-2">
                        <Label htmlFor="phone">Téléphone</Label>
                        <Input
                          id="phone"
                          value={profileData.phone}
                          onChange={(e) => setProfileData((prev) => ({ ...prev, phone: e.target.value }))}
                          disabled={!isEditing}
                        />
                      </div>
                      <div className="space-y-2">
                        <Label htmlFor="birthDate">Date de naissance</Label>
                        <Input
                          id="birthDate"
                          type="date"
                          value={profileData.birthDate}
                          onChange={(e) => setProfileData((prev) => ({ ...prev, birthDate: e.target.value }))}
                          disabled={!isEditing}
                        />
                      </div>
                      <div className="space-y-2">
                        <Label htmlFor="address">Adresse</Label>
                        <Input
                          id="address"
                          value={profileData.address}
                          onChange={(e) => setProfileData((prev) => ({ ...prev, address: e.target.value }))}
                          disabled={!isEditing}
                        />
                      </div>
                    </div>

                    <div className="space-y-2">
                      <Label htmlFor="bio">Biographie</Label>
                      <Textarea
                        id="bio"
                        value={profileData.bio}
                        onChange={(e) => setProfileData((prev) => ({ ...prev, bio: e.target.value }))}
                        disabled={!isEditing}
                        rows={4}
                      />
                    </div>
                  </CardContent>
                </Card>
              </TabsContent>

              <TabsContent value="progress" className="space-y-6">
                {/* Stats Overview */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  {stats.map((stat, index) => {
                    const IconComponent = stat.icon
                    const percentage = (stat.value / stat.total) * 100

                    return (
                      <Card key={index}>
                        <CardContent className="p-6">
                          <div className="flex items-center justify-between mb-4">
                            <div className="flex items-center gap-3">
                              <div className={`p-2 rounded-full bg-muted ${stat.color}`}>
                                <IconComponent className="h-5 w-5" />
                              </div>
                              <div>
                                <p className="text-sm font-medium text-muted-foreground">{stat.label}</p>
                                <p className="text-2xl font-bold">
                                  {stat.value}
                                  {stat.label === "Note moyenne" ? "/5" : `/${stat.total}`}
                                </p>
                              </div>
                            </div>
                          </div>
                          <Progress value={percentage} className="h-2" />
                          <p className="text-sm text-muted-foreground mt-2">{Math.round(percentage)}% complété</p>
                        </CardContent>
                      </Card>
                    )
                  })}
                </div>

                {/* Achievements */}
                <Card>
                  <CardHeader>
                    <CardTitle className="flex items-center gap-2">
                      <Trophy className="h-5 w-5 text-yellow-500" />
                      Réalisations
                    </CardTitle>
                    <CardDescription>Vos accomplissements dans votre parcours d'apprentissage</CardDescription>
                  </CardHeader>
                  <CardContent>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      {achievements.map((achievement) => (
                        <div
                          key={achievement.id}
                          className={`p-4 border rounded-lg ${
                            achievement.earned
                              ? "bg-green-50 border-green-200"
                              : "bg-gray-50 border-gray-200 opacity-60"
                          }`}
                        >
                          <div className="flex items-center gap-3">
                            <div className="text-2xl">{achievement.icon}</div>
                            <div className="flex-1">
                              <h4 className="font-semibold">{achievement.title}</h4>
                              <p className="text-sm text-muted-foreground">{achievement.description}</p>
                              {achievement.earned && achievement.date && (
                                <p className="text-xs text-green-600 mt-1">Obtenu le {achievement.date}</p>
                              )}
                            </div>
                            {achievement.earned && <CheckCircle className="h-5 w-5 text-green-500" />}
                          </div>
                        </div>
                      ))}
                    </div>
                  </CardContent>
                </Card>
              </TabsContent>

              <TabsContent value="activity" className="space-y-6">
                <Card>
                  <CardHeader>
                    <CardTitle>Activité récente</CardTitle>
                    <CardDescription>Votre historique d'apprentissage et de progression</CardDescription>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-4">
                      {recentActivity.map((activity) => (
                        <div
                          key={activity.id}
                          className="flex items-center gap-4 p-4 border rounded-lg hover:bg-muted/50 transition-colors"
                        >
                          <div className="text-2xl">{getActivityIcon(activity.type)}</div>
                          <div className="flex-1">
                            <h4 className="font-semibold">{activity.title}</h4>
                            <p className="text-sm text-muted-foreground">{activity.description}</p>
                            <p className="text-xs text-muted-foreground mt-1">{activity.date}</p>
                          </div>
                          <div className="text-right">
                            <div className={`text-lg font-bold ${getScoreColor(activity.score)}`}>
                              {activity.score}%
                            </div>
                            <div className="text-xs text-muted-foreground">Score</div>
                          </div>
                        </div>
                      ))}
                    </div>
                  </CardContent>
                </Card>
              </TabsContent>
            </Tabs>
          </div>

          {/* Sidebar */}
          <div className="space-y-6">
            {/* Quick Stats */}
            <Card>
              <CardHeader>
                <CardTitle>Résumé</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="flex items-center justify-between">
                  <span className="text-sm">Membre depuis</span>
                  <span className="font-semibold">Jan 2024</span>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-sm">Progression globale</span>
                  <span className="font-semibold">68%</span>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-sm">Prochaine leçon</span>
                  <span className="font-semibold">Demain 14h</span>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-sm">Instructeur principal</span>
                  <span className="font-semibold">Sarah D.</span>
                </div>
              </CardContent>
            </Card>

            {/* Next Steps */}
            <Card>
              <CardHeader>
                <CardTitle>Prochaines étapes</CardTitle>
              </CardHeader>
              <CardContent className="space-y-3">
                <div className="p-3 bg-blue-50 border border-blue-200 rounded-lg">
                  <h4 className="font-semibold text-blue-900">Leçon pratique</h4>
                  <p className="text-sm text-blue-800">Techniques de stationnement avancées</p>
                </div>
                <div className="p-3 bg-yellow-50 border border-yellow-200 rounded-lg">
                  <h4 className="font-semibold text-yellow-900">Test théorique</h4>
                  <p className="text-sm text-yellow-800">Révision du code de la route</p>
                </div>
                <div className="p-3 bg-green-50 border border-green-200 rounded-lg">
                  <h4 className="font-semibold text-green-900">Simulateur</h4>
                  <p className="text-sm text-green-800">Session conduite de nuit</p>
                </div>
              </CardContent>
            </Card>

            {/* Contact Info */}
            <Card>
              <CardHeader>
                <CardTitle>Besoin d'aide ?</CardTitle>
              </CardHeader>
              <CardContent className="space-y-3">
                <Button variant="outline" className="w-full justify-start">
                  <Mail className="h-4 w-4 mr-2" />
                  Contacter le support
                </Button>
                <Button variant="outline" className="w-full justify-start">
                  <Phone className="h-4 w-4 mr-2" />
                  Appeler l'école
                </Button>
                <Button variant="outline" className="w-full justify-start">
                  <MessageSquare className="h-4 w-4 mr-2" />
                  Chat en direct
                </Button>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </div>
  )
}
