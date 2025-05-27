"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Progress } from "@/components/ui/progress"
import { Badge } from "@/components/ui/badge"
import { Input } from "@/components/ui/input"
import { useToast } from "@/hooks/use-toast"
import { PlayCircle, CheckCircle, Lock, Clock, Search, BookOpen, Video, FileText, Trophy, Star } from "lucide-react"
import Link from "next/link"
import { cn } from "@/lib/utils"

export default function StudentLessonsPage() {
  const [searchTerm, setSearchTerm] = useState("")
  const [selectedCategory, setSelectedCategory] = useState("all")
  const [loadingLessonId, setLoadingLessonId] = useState<string | null>(null)
  const { toast } = useToast()

  const lessons = [
    {
      id: "1",
      title: "Introduction à la Conduite",
      description: "Apprenez les bases de la conduite automobile",
      category: "Débutant",
      duration: "45 min",
      progress: 100,
      status: "completed",
      type: "video",
      difficulty: "Facile",
      rating: 4.8,
      studentsCompleted: 1234,
    },
    {
      id: "2",
      title: "Code de la Route - Signalisation",
      description: "Maîtrisez tous les panneaux de signalisation",
      category: "Théorie",
      duration: "60 min",
      progress: 75,
      status: "in-progress",
      type: "interactive",
      difficulty: "Moyen",
      rating: 4.9,
      studentsCompleted: 987,
    },
    {
      id: "3",
      title: "Techniques de Stationnement",
      description: "Stationnement en parallèle et en bataille",
      category: "Pratique",
      duration: "90 min",
      progress: 30,
      status: "in-progress",
      type: "video",
      difficulty: "Moyen",
      rating: 4.7,
      studentsCompleted: 756,
    },
    {
      id: "4",
      title: "Conduite sur Autoroute",
      description: "Techniques avancées pour la conduite autoroutière",
      category: "Avancé",
      duration: "120 min",
      progress: 0,
      status: "locked",
      type: "video",
      difficulty: "Difficile",
      rating: 4.6,
      studentsCompleted: 432,
    },
    {
      id: "5",
      title: "Conduite de Nuit",
      description: "Spécificités et précautions pour conduire la nuit",
      category: "Avancé",
      duration: "75 min",
      progress: 0,
      status: "locked",
      type: "interactive",
      difficulty: "Difficile",
      rating: 4.5,
      studentsCompleted: 321,
    },
    {
      id: "6",
      title: "Éco-conduite",
      description: "Techniques pour une conduite économique et écologique",
      category: "Spécialisé",
      duration: "50 min",
      progress: 0,
      status: "locked",
      type: "text",
      difficulty: "Moyen",
      rating: 4.4,
      studentsCompleted: 543,
    },
  ]

  const categories = ["all", "Débutant", "Théorie", "Pratique", "Avancé", "Spécialisé"]

  const filteredLessons = lessons.filter((lesson) => {
    const matchesSearch =
      lesson.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
      lesson.description.toLowerCase().includes(searchTerm.toLowerCase())
    const matchesCategory = selectedCategory === "all" || lesson.category === selectedCategory
    return matchesSearch && matchesCategory
  })

  const handleStartLesson = async (lesson: any) => {
    if (lesson.status === "locked") {
      toast({
        title: "Leçon verrouillée",
        description: "Vous devez terminer les leçons précédentes pour débloquer celle-ci.",
        variant: "destructive",
      })
      return
    }

    setLoadingLessonId(lesson.id)

    // Simulate loading
    await new Promise((resolve) => setTimeout(resolve, 2000))

    setLoadingLessonId(null)

    if (lesson.status === "completed") {
      toast({
        title: "Leçon relancée",
        description: `Vous révisez "${lesson.title}". Bon apprentissage !`,
      })
    } else {
      toast({
        title: "Leçon démarrée",
        description: `Vous commencez "${lesson.title}". Bon apprentissage !`,
      })
    }
  }

  const getStatusIcon = (status: string) => {
    switch (status) {
      case "completed":
        return <CheckCircle className="h-6 w-6 text-green-500" />
      case "in-progress":
        return <PlayCircle className="h-6 w-6 text-blue-500" />
      case "locked":
        return <Lock className="h-6 w-6 text-gray-400" />
      default:
        return <PlayCircle className="h-6 w-6 text-gray-400" />
    }
  }

  const getTypeIcon = (type: string) => {
    switch (type) {
      case "video":
        return <Video className="h-4 w-4" />
      case "interactive":
        return <BookOpen className="h-4 w-4" />
      case "text":
        return <FileText className="h-4 w-4" />
      default:
        return <BookOpen className="h-4 w-4" />
    }
  }

  const getDifficultyColor = (difficulty: string) => {
    switch (difficulty) {
      case "Facile":
        return "bg-green-100 text-green-800"
      case "Moyen":
        return "bg-yellow-100 text-yellow-800"
      case "Difficile":
        return "bg-red-100 text-red-800"
      default:
        return "bg-gray-100 text-gray-800"
    }
  }

  return (
    <div className="min-h-screen bg-muted">
      {/* Header */}
      <div className="bg-white border-b">
        <div className="container mx-auto px-4 py-6">
          <div className="flex items-center justify-between mb-6">
            <div>
              <h1 className="text-3xl font-bold text-foreground">Mes Leçons</h1>
              <p className="text-muted-foreground">Progressez à votre rythme dans votre apprentissage</p>
            </div>
            <Link href="/dashboard/student">
              <Button variant="outline">Retour au tableau de bord</Button>
            </Link>
          </div>

          {/* Search and Filter */}
          <div className="flex flex-col sm:flex-row gap-4">
            <div className="relative flex-1">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
              <Input
                placeholder="Rechercher une leçon..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="pl-10"
              />
            </div>
            <div className="flex gap-2">
              {categories.map((category) => (
                <Button
                  key={category}
                  variant={selectedCategory === category ? "default" : "outline"}
                  size="sm"
                  onClick={() => setSelectedCategory(category)}
                  className="whitespace-nowrap"
                >
                  {category === "all" ? "Toutes" : category}
                </Button>
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* Progress Overview */}
      <div className="container mx-auto px-4 py-6">
        <Card className="mb-8">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Trophy className="h-5 w-5 text-yellow-500" />
              Votre Progression
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
              <div className="text-center">
                <div className="text-2xl font-bold text-green-600">1</div>
                <div className="text-sm text-muted-foreground">Leçons terminées</div>
              </div>
              <div className="text-center">
                <div className="text-2xl font-bold text-blue-600">2</div>
                <div className="text-sm text-muted-foreground">En cours</div>
              </div>
              <div className="text-center">
                <div className="text-2xl font-bold text-gray-600">3</div>
                <div className="text-sm text-muted-foreground">À débloquer</div>
              </div>
              <div className="text-center">
                <div className="text-2xl font-bold text-purple-600">34%</div>
                <div className="text-sm text-muted-foreground">Progression totale</div>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Lessons Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredLessons.map((lesson) => (
            <Card
              key={lesson.id}
              className={cn(
                "hover:shadow-lg transition-all duration-300",
                lesson.status === "locked" ? "opacity-60" : "hover:-translate-y-1",
              )}
            >
              <CardHeader className="pb-3">
                <div className="flex items-start justify-between">
                  <div className="flex-1">
                    <CardTitle className="text-lg mb-2">{lesson.title}</CardTitle>
                    <CardDescription className="text-sm">{lesson.description}</CardDescription>
                  </div>
                  {getStatusIcon(lesson.status)}
                </div>

                <div className="flex items-center gap-2 mt-3">
                  <Badge variant="outline" className={getDifficultyColor(lesson.difficulty)}>
                    {lesson.difficulty}
                  </Badge>
                  <Badge variant="secondary">{lesson.category}</Badge>
                </div>
              </CardHeader>

              <CardContent className="space-y-4">
                {/* Progress Bar */}
                {lesson.status !== "locked" && (
                  <div className="space-y-2">
                    <div className="flex justify-between text-sm">
                      <span>Progression</span>
                      <span>{lesson.progress}%</span>
                    </div>
                    <Progress value={lesson.progress} className="h-2" />
                  </div>
                )}

                {/* Lesson Info */}
                <div className="flex items-center justify-between text-sm text-muted-foreground">
                  <div className="flex items-center gap-1">
                    <Clock className="h-4 w-4" />
                    {lesson.duration}
                  </div>
                  <div className="flex items-center gap-1">
                    {getTypeIcon(lesson.type)}
                    <span className="capitalize">{lesson.type}</span>
                  </div>
                </div>

                {/* Rating and Students */}
                <div className="flex items-center justify-between text-sm">
                  <div className="flex items-center gap-1">
                    <Star className="h-4 w-4 fill-yellow-400 text-yellow-400" />
                    <span>{lesson.rating}</span>
                  </div>
                  <span className="text-muted-foreground">{lesson.studentsCompleted} étudiants</span>
                </div>

                {/* Action Button */}
                <Button
                  className="w-full"
                  onClick={() => handleStartLesson(lesson)}
                  disabled={loadingLessonId === lesson.id}
                  variant={lesson.status === "locked" ? "secondary" : "default"}
                >
                  {loadingLessonId === lesson.id ? (
                    <div className="flex items-center gap-2">
                      <div className="h-4 w-4 border-2 border-white border-t-transparent rounded-full animate-spin" />
                      Chargement...
                    </div>
                  ) : lesson.status === "completed" ? (
                    <>
                      <CheckCircle className="h-4 w-4 mr-2" />
                      Réviser
                    </>
                  ) : lesson.status === "in-progress" ? (
                    <>
                      <PlayCircle className="h-4 w-4 mr-2" />
                      Continuer
                    </>
                  ) : lesson.status === "locked" ? (
                    <>
                      <Lock className="h-4 w-4 mr-2" />
                      Verrouillé
                    </>
                  ) : (
                    <>
                      <PlayCircle className="h-4 w-4 mr-2" />
                      Commencer
                    </>
                  )}
                </Button>
              </CardContent>
            </Card>
          ))}
        </div>

        {filteredLessons.length === 0 && (
          <div className="text-center py-12">
            <BookOpen className="h-12 w-12 text-muted-foreground mx-auto mb-4" />
            <h3 className="text-lg font-semibold text-foreground mb-2">Aucune leçon trouvée</h3>
            <p className="text-muted-foreground">Essayez de modifier vos critères de recherche ou de filtrage.</p>
          </div>
        )}
      </div>
    </div>
  )
}
