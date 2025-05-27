"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Badge } from "@/components/ui/badge"
import { Calendar, Clock, User, Car, Phone, MapPin, CheckCircle, Star } from "lucide-react"

export default function RendezVousPage() {
  const [selectedDate, setSelectedDate] = useState<string>("")
  const [selectedTime, setSelectedTime] = useState<string>("")
  const [selectedInstructor, setSelectedInstructor] = useState<string>("")
  const [lessonType, setLessonType] = useState<string>("")

  const instructors = [
    {
      id: "bensaleh",
      name: "M. bensaleh",
      speciality: "Conduite classique",
      rating: 4.9,
      photo: "/placeholder.svg?height=80&width=80",
      experience: "15 ans d'expérience",
    },
    {
      id: "martin",
      name: "Mme Martin",
      speciality: "Conduite accompagnée",
      rating: 4.8,
      photo: "/placeholder.svg?height=80&width=80",
      experience: "12 ans d'expérience",
    },
    {
      id: "bernard",
      name: "M. Bernard",
      speciality: "Perfectionnement",
      rating: 4.7,
      photo: "/placeholder.svg?height=80&width=80",
      experience: "10 ans d'expérience",
    },
  ]

  const timeSlots = ["08:00", "09:00", "10:00", "11:00", "14:00", "15:00", "16:00", "17:00", "18:00"]

  const lessonTypes = [
    { id: "conduite", name: "Leçon de conduite", duration: "1h", price: "45€" },
    { id: "code", name: "Cours de code", duration: "1h", price: "25€" },
    { id: "simulateur", name: "Séance simulateur", duration: "1h", price: "35€" },
    { id: "evaluation", name: "Évaluation", duration: "1h", price: "50€" },
  ]

  return (
    <div className="min-h-screen bg-gradient-to-b from-blue-50 to-white py-12">
      <div className="container mx-auto px-4 max-w-6xl">
        {/* Hero Section */}
        <section className="relative py-16 bg-gradient-to-r from-green-600 to-blue-600 text-white">
          <div className="absolute inset-0 opacity-20">
            <img
              src="/placeholder.svg?height=400&width=1200"
              alt="Réservation leçon de conduite"
              className="w-full h-full object-cover"
            />
          </div>
          <div className="container mx-auto px-4 text-center relative z-10">
            <h1 className="text-4xl font-bold mb-4">Prendre un rendez-vous</h1>
            <p className="text-xl text-green-100 mb-6">Réservez votre créneau en quelques clics</p>
            <div className="flex justify-center space-x-8 text-sm">
              <div className="flex items-center">
                <Calendar className="h-5 w-5 mr-2 text-green-400" />
                <span>Disponibilités en temps réel</span>
              </div>
              <div className="flex items-center">
                <Clock className="h-5 w-5 mr-2 text-green-400" />
                <span>Confirmation immédiate</span>
              </div>
              <div className="flex items-center">
                <Phone className="h-5 w-5 mr-2 text-green-400" />
                <span>Rappel automatique</span>
              </div>
            </div>
          </div>
        </section>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Formulaire de réservation */}
          <div className="lg:col-span-2 space-y-6">
            {/* Type de leçon */}
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center">
                  <Car className="mr-2 h-5 w-5" />
                  Type de leçon
                </CardTitle>
                <CardDescription>Choisissez le type de leçon souhaité</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  {lessonTypes.map((type) => (
                    <div
                      key={type.id}
                      onClick={() => setLessonType(type.id)}
                      className={`p-4 border-2 rounded-lg cursor-pointer transition-colors ${
                        lessonType === type.id ? "border-blue-500 bg-blue-50" : "border-gray-200 hover:border-gray-300"
                      }`}
                    >
                      <div className="flex justify-between items-start mb-2">
                        <h3 className="font-semibold">{type.name}</h3>
                        <Badge variant="secondary">{type.price}</Badge>
                      </div>
                      <p className="text-sm text-gray-600">Durée : {type.duration}</p>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>

            {/* Moniteur */}
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center">
                  <User className="mr-2 h-5 w-5" />
                  Choisir un moniteur
                </CardTitle>
                <CardDescription>Sélectionnez votre moniteur préféré</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-3">
                  {instructors.map((instructor) => (
                    <div
                      key={instructor.id}
                      onClick={() => setSelectedInstructor(instructor.id)}
                      className={`p-4 border-2 rounded-lg cursor-pointer transition-all ${
                        selectedInstructor === instructor.id
                          ? "border-blue-500 bg-blue-50 shadow-lg"
                          : "border-gray-200 hover:border-gray-300 hover:shadow-md"
                      }`}
                    >
                      <div className="flex items-center space-x-4">
                        <img
                          src={instructor.photo || "/placeholder.svg"}
                          alt={instructor.name}
                          className="w-16 h-16 rounded-full object-cover border-2 border-gray-200"
                        />
                        <div className="flex-1">
                          <h3 className="font-semibold text-lg">{instructor.name}</h3>
                          <p className="text-sm text-gray-600">{instructor.speciality}</p>
                          <p className="text-xs text-gray-500">{instructor.experience}</p>
                        </div>
                        <div className="text-right">
                          <div className="flex items-center space-x-1">
                            <span className="text-sm font-medium">{instructor.rating}</span>
                            <Star className="h-4 w-4 text-yellow-400 fill-current" />
                          </div>
                          <p className="text-xs text-gray-500">Note moyenne</p>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>

            {/* Date et heure */}
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center">
                  <Calendar className="mr-2 h-5 w-5" />
                  Date et heure
                </CardTitle>
                <CardDescription>Sélectionnez votre créneau préféré</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div>
                    <Label htmlFor="date">Date souhaitée</Label>
                    <Input
                      id="date"
                      type="date"
                      value={selectedDate}
                      onChange={(e) => setSelectedDate(e.target.value)}
                      min={new Date().toISOString().split("T")[0]}
                    />
                  </div>
                  <div>
                    <Label>Heure souhaitée</Label>
                    <div className="grid grid-cols-3 gap-2 mt-2">
                      {timeSlots.map((time) => (
                        <Button
                          key={time}
                          variant={selectedTime === time ? "default" : "outline"}
                          size="sm"
                          onClick={() => setSelectedTime(time)}
                        >
                          {time}
                        </Button>
                      ))}
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Informations personnelles */}
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center">
                  <User className="mr-2 h-5 w-5" />
                  Vos informations
                </CardTitle>
                <CardDescription>Renseignez vos coordonnées pour la réservation</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <Label htmlFor="prenom">Prénom *</Label>
                    <Input id="prenom" placeholder="Votre prénom" />
                  </div>
                  <div>
                    <Label htmlFor="nom">Nom *</Label>
                    <Input id="nom" placeholder="Votre nom" />
                  </div>
                  <div>
                    <Label htmlFor="email">Email *</Label>
                    <Input id="email" type="email" placeholder="votre.email@exemple.com" />
                  </div>
                  <div>
                    <Label htmlFor="telephone">Téléphone *</Label>
                    <Input id="telephone" placeholder="06 13 80 93 92" />
                  </div>
                </div>
                <div className="mt-4">
                  <Label htmlFor="commentaire">Commentaire (optionnel)</Label>
                  <Textarea
                    id="commentaire"
                    placeholder="Précisions particulières, objectifs de la leçon..."
                    rows={3}
                  />
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Récapitulatif */}
          <div className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle>Récapitulatif</CardTitle>
                <CardDescription>Vérifiez les détails de votre réservation</CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                {lessonType && (
                  <div className="flex justify-between items-center">
                    <span className="text-sm text-gray-600">Type de leçon</span>
                    <span className="font-medium">{lessonTypes.find((t) => t.id === lessonType)?.name}</span>
                  </div>
                )}

                {selectedInstructor && (
                  <div className="flex justify-between items-center">
                    <span className="text-sm text-gray-600">Moniteur</span>
                    <span className="font-medium">{instructors.find((i) => i.id === selectedInstructor)?.name}</span>
                  </div>
                )}

                {selectedDate && (
                  <div className="flex justify-between items-center">
                    <span className="text-sm text-gray-600">Date</span>
                    <span className="font-medium">
                      {new Date(selectedDate).toLocaleDateString("fr-FR", {
                        weekday: "long",
                        year: "numeric",
                        month: "long",
                        day: "numeric",
                      })}
                    </span>
                  </div>
                )}

                {selectedTime && (
                  <div className="flex justify-between items-center">
                    <span className="text-sm text-gray-600">Heure</span>
                    <span className="font-medium">{selectedTime}</span>
                  </div>
                )}

                {lessonType && (
                  <div className="flex justify-between items-center pt-4 border-t">
                    <span className="font-semibold">Total</span>
                    <span className="font-bold text-lg text-blue-600">
                      {lessonTypes.find((t) => t.id === lessonType)?.price}
                    </span>
                  </div>
                )}
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Informations pratiques</CardTitle>
              </CardHeader>
              <CardContent className="space-y-3">
                <div className="flex items-start space-x-3">
                  <MapPin className="h-5 w-5 text-blue-600 mt-0.5" />
                  <div>
                    <p className="font-medium">Lieu de rendez-vous</p>
                    <p className="text-sm text-gray-600">
                      123 Avenue de la République
                      <br />
                      75011 Paris
                    </p>
                  </div>
                </div>

                <div className="flex items-start space-x-3">
                  <Clock className="h-5 w-5 text-blue-600 mt-0.5" />
                  <div>
                    <p className="font-medium">Ponctualité</p>
                    <p className="text-sm text-gray-600">Merci d'arriver 5 minutes avant l'heure</p>
                  </div>
                </div>

                <div className="flex items-start space-x-3">
                  <Phone className="h-5 w-5 text-blue-600 mt-0.5" />
                  <div>
                    <p className="font-medium">Annulation</p>
                    <p className="text-sm text-gray-600">Possible jusqu'à 24h avant</p>
                  </div>
                </div>
              </CardContent>
            </Card>

            <Button
              className="w-full"
              size="lg"
              disabled={!lessonType || !selectedInstructor || !selectedDate || !selectedTime}
            >
              <CheckCircle className="mr-2 h-5 w-5" />
              Confirmer la réservation
            </Button>

            <p className="text-xs text-gray-500 text-center">Vous recevrez une confirmation par email et SMS</p>
          </div>
        </div>
      </div>
    </div>
  )
}
