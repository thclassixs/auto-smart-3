"use client"

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Gamepad2, Zap, Clock, Star, Wrench, Calendar } from "lucide-react"

export default function SimulatorPage() {
  const upcomingFeatures = [
    {
      title: "Conduite en ville",
      description: "Naviguez dans le trafic urbain avec des scénarios réalistes",
      difficulty: "Débutant",
      eta: "Q2 2024",
    },
    {
      title: "Autoroute",
      description: "Maîtrisez la conduite à haute vitesse et les insertions",
      difficulty: "Intermédiaire",
      eta: "Q2 2024",
    },
    {
      title: "Stationnement",
      description: "Perfectionnez vos techniques de stationnement",
      difficulty: "Avancé",
      eta: "Q3 2024",
    },
    {
      title: "Conduite nocturne",
      description: "Adaptez-vous aux conditions de faible luminosité",
      difficulty: "Intermédiaire",
      eta: "Q3 2024",
    },
  ]

  const getDifficultyColor = (difficulty: string) => {
    switch (difficulty) {
      case "Débutant":
        return "bg-green-100 text-green-800"
      case "Intermédiaire":
        return "bg-yellow-100 text-yellow-800"
      case "Avancé":
        return "bg-red-100 text-red-800"
      default:
        return "bg-gray-100 text-gray-800"
    }
  }

  return (
    <div className="p-6 space-y-6">
      {/* Header */}
      <div>
        <h1 className="text-3xl font-bold text-gray-900">Simulateur de Conduite</h1>
        <p className="text-gray-600 mt-1">Entraînez-vous dans un environnement virtuel sécurisé</p>
      </div>

      {/* Coming Soon Banner */}
      <Card className="border-2 border-dashed border-blue-300 bg-gradient-to-r from-blue-50 to-purple-50">
        <CardContent className="p-12 text-center">
          <div className="space-y-6">
            <div className="inline-flex items-center justify-center w-20 h-20 bg-gradient-to-br from-blue-500 to-purple-600 rounded-full">
              <Gamepad2 className="h-10 w-10 text-white" />
            </div>

            <div className="space-y-3">
              <h2 className="text-3xl font-bold bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
                Simulateur Three.js en développement
              </h2>
              <p className="text-lg text-gray-600 max-w-2xl mx-auto">
                Notre équipe travaille sur un simulateur de conduite révolutionnaire utilisant Three.js pour vous offrir
                une expérience d'apprentissage immersive et réaliste.
              </p>
            </div>

            <div className="flex items-center justify-center gap-8 pt-4">
              <div className="text-center">
                <div className="text-2xl font-bold text-blue-600">3D</div>
                <div className="text-sm text-gray-500">Environnement</div>
              </div>
              <div className="text-center">
                <div className="text-2xl font-bold text-purple-600">VR</div>
                <div className="text-sm text-gray-500">Compatible</div>
              </div>
              <div className="text-center">
                <div className="text-2xl font-bold text-green-600">AI</div>
                <div className="text-sm text-gray-500">Assisté</div>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Features Grid */}
      <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
        <Card className="text-center">
          <CardContent className="p-6">
            <div className="w-12 h-12 bg-blue-100 rounded-full flex items-center justify-center mx-auto mb-4">
              <Zap className="h-6 w-6 text-blue-600" />
            </div>
            <h3 className="font-semibold text-gray-900 mb-2">Physique Réaliste</h3>
            <p className="text-sm text-gray-600">Simulation précise du comportement des véhicules</p>
          </CardContent>
        </Card>

        <Card className="text-center">
          <CardContent className="p-6">
            <div className="w-12 h-12 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4">
              <Star className="h-6 w-6 text-green-600" />
            </div>
            <h3 className="font-semibold text-gray-900 mb-2">Évaluation IA</h3>
            <p className="text-sm text-gray-600">Feedback intelligent sur vos performances</p>
          </CardContent>
        </Card>

        <Card className="text-center">
          <CardContent className="p-6">
            <div className="w-12 h-12 bg-purple-100 rounded-full flex items-center justify-center mx-auto mb-4">
              <Clock className="h-6 w-6 text-purple-600" />
            </div>
            <h3 className="font-semibold text-gray-900 mb-2">Progression Adaptative</h3>
            <p className="text-sm text-gray-600">Difficulté qui s'adapte à votre niveau</p>
          </CardContent>
        </Card>

        <Card className="text-center">
          <CardContent className="p-6">
            <div className="w-12 h-12 bg-orange-100 rounded-full flex items-center justify-center mx-auto mb-4">
              <Wrench className="h-6 w-6 text-orange-600" />
            </div>
            <h3 className="font-semibold text-gray-900 mb-2">Personnalisable</h3>
            <p className="text-sm text-gray-600">Scénarios adaptés à vos besoins</p>
          </CardContent>
        </Card>
      </div>

      {/* Upcoming Scenarios */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Calendar className="h-5 w-5" />
            Scénarios à venir
          </CardTitle>
          <CardDescription>Découvrez les environnements de conduite qui seront bientôt disponibles</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="grid md:grid-cols-2 gap-4">
            {upcomingFeatures.map((feature, index) => (
              <div key={index} className="p-4 border rounded-lg hover:bg-gray-50 transition-colors">
                <div className="flex items-start justify-between mb-3">
                  <h3 className="font-semibold text-gray-900">{feature.title}</h3>
                  <Badge className={getDifficultyColor(feature.difficulty)}>{feature.difficulty}</Badge>
                </div>
                <p className="text-sm text-gray-600 mb-3">{feature.description}</p>
                <div className="flex items-center justify-between">
                  <span className="text-xs text-gray-500">Disponible {feature.eta}</span>
                  <Badge variant="outline" className="text-xs">
                    En développement
                  </Badge>
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>

      {/* Development Progress */}
      <Card>
        <CardHeader>
          <CardTitle>Avancement du développement</CardTitle>
          <CardDescription>Suivez l'évolution de notre simulateur Three.js</CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="space-y-3">
            <div className="flex justify-between items-center">
              <span className="text-sm font-medium">Architecture 3D</span>
              <span className="text-sm text-gray-500">85%</span>
            </div>
            <div className="w-full bg-gray-200 rounded-full h-2">
              <div className="bg-blue-600 h-2 rounded-full" style={{ width: "85%" }}></div>
            </div>
          </div>

          <div className="space-y-3">
            <div className="flex justify-between items-center">
              <span className="text-sm font-medium">Physique des véhicules</span>
              <span className="text-sm text-gray-500">70%</span>
            </div>
            <div className="w-full bg-gray-200 rounded-full h-2">
              <div className="bg-green-600 h-2 rounded-full" style={{ width: "70%" }}></div>
            </div>
          </div>

          <div className="space-y-3">
            <div className="flex justify-between items-center">
              <span className="text-sm font-medium">Interface utilisateur</span>
              <span className="text-sm text-gray-500">60%</span>
            </div>
            <div className="w-full bg-gray-200 rounded-full h-2">
              <div className="bg-purple-600 h-2 rounded-full" style={{ width: "60%" }}></div>
            </div>
          </div>

          <div className="space-y-3">
            <div className="flex justify-between items-center">
              <span className="text-sm font-medium">Intelligence artificielle</span>
              <span className="text-sm text-gray-500">45%</span>
            </div>
            <div className="w-full bg-gray-200 rounded-full h-2">
              <div className="bg-orange-600 h-2 rounded-full" style={{ width: "45%" }}></div>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
