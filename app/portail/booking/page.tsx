"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Calendar } from "@/components/ui/calendar"
import { Badge } from "@/components/ui/badge"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { useToast } from "@/hooks/use-toast"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { CalendarIcon, Clock, MapPin, User, CheckCircle, AlertCircle } from "lucide-react"
import Link from "next/link"
import { format, addDays } from "date-fns"
import { fr } from "date-fns/locale"

export default function StudentBookingPage() {
  const [selectedDate, setSelectedDate] = useState<Date | undefined>(new Date())
  const [selectedSlot, setSelectedSlot] = useState<any>(null)
  const [selectedInstructor, setSelectedInstructor] = useState("")
  const [selectedLessonType, setSelectedLessonType] = useState("")
  const [isBookingModalOpen, setIsBookingModalOpen] = useState(false)
  const [isConfirming, setIsConfirming] = useState(false)
  const { toast } = useToast()

  const instructors = [
    {
      id: "1",
      name: "Sarah Dubois",
      specialties: ["Débutant", "Autoroute"],
      rating: 4.9,
      avatar: "/placeholder.svg?height=40&width=40",
    },
    {
      id: "2",
      name: "Michel Chen",
      specialties: ["Stationnement", "Conduite urbaine"],
      rating: 4.8,
      avatar: "/placeholder.svg?height=40&width=40",
    },
    {
      id: "3",
      name: "Emma Martin",
      specialties: ["Code de la route", "Théorie"],
      rating: 4.7,
      avatar: "/placeholder.svg?height=40&width=40",
    },
  ]

  const lessonTypes = [
    { id: "theory", name: "Leçon théorique", duration: "1h", price: "35€" },
    { id: "practical", name: "Leçon pratique", duration: "1h30", price: "45€" },
    { id: "highway", name: "Conduite autoroute", duration: "2h", price: "60€" },
    { id: "parking", name: "Techniques stationnement", duration: "1h", price: "40€" },
    { id: "exam", name: "Préparation examen", duration: "2h", price: "70€" },
  ]

  // Generate available slots for the selected date
  const generateTimeSlots = (date: Date) => {
    const slots = []
    const startHour = 8
    const endHour = 18

    for (let hour = startHour; hour < endHour; hour++) {
      for (const minute of [0, 30]) {
        const time = `${hour.toString().padStart(2, "0")}:${minute.toString().padStart(2, "0")}`
        const isAvailable = Math.random() > 0.3 // 70% chance of being available
        const instructorId = instructors[Math.floor(Math.random() * instructors.length)].id

        slots.push({
          id: `${date.toISOString()}-${time}`,
          time,
          available: isAvailable,
          instructorId,
          date,
        })
      }
    }

    return slots
  }

  const availableSlots = selectedDate ? generateTimeSlots(selectedDate) : []

  const upcomingBookings = [
    {
      id: "1",
      date: addDays(new Date(), 1),
      time: "14:00",
      instructor: "Sarah Dubois",
      type: "Leçon pratique",
      location: "Centre de Formation Principal",
      status: "confirmed",
    },
    {
      id: "2",
      date: addDays(new Date(), 3),
      time: "10:00",
      instructor: "Michel Chen",
      type: "Conduite autoroute",
      location: "Parcours Autoroute A",
      status: "pending",
    },
  ]

  const handleSlotClick = (slot: any) => {
    if (!slot.available) {
      toast({
        title: "Créneau indisponible",
        description: "Ce créneau est déjà réservé ou non disponible.",
        variant: "destructive",
      })
      return
    }

    setSelectedSlot(slot)
    setIsBookingModalOpen(true)
  }

  const handleConfirmBooking = async () => {
    if (!selectedInstructor || !selectedLessonType) {
      toast({
        title: "Informations manquantes",
        description: "Veuillez sélectionner un instructeur et un type de leçon.",
        variant: "destructive",
      })
      return
    }

    setIsConfirming(true)

    // Simulate booking process
    await new Promise((resolve) => setTimeout(resolve, 2000))

    setIsConfirming(false)
    setIsBookingModalOpen(false)

    const instructor = instructors.find((i) => i.id === selectedInstructor)
    const lessonType = lessonTypes.find((l) => l.id === selectedLessonType)

    toast({
      title: "Réservation confirmée !",
      description: `Votre ${lessonType?.name.toLowerCase()} avec ${instructor?.name} est confirmée pour le ${format(selectedSlot.date, "dd MMMM yyyy", { locale: fr })} à ${selectedSlot.time}.`,
    })

    // Reset form
    setSelectedSlot(null)
    setSelectedInstructor("")
    setSelectedLessonType("")
  }

  const getStatusBadge = (status: string) => {
    switch (status) {
      case "confirmed":
        return <Badge className="bg-green-100 text-green-800">Confirmé</Badge>
      case "pending":
        return <Badge className="bg-yellow-100 text-yellow-800">En attente</Badge>
      case "cancelled":
        return <Badge className="bg-red-100 text-red-800">Annulé</Badge>
      default:
        return <Badge variant="secondary">{status}</Badge>
    }
  }

  return (
    <div className="min-h-screen bg-muted">
      {/* Header */}
      <div className="bg-white border-b">
        <div className="container mx-auto px-4 py-6">
          <div className="flex items-center justify-between">
            <div>
              <h1 className="text-3xl font-bold text-foreground">Réserver une Séance</h1>
              <p className="text-muted-foreground">Planifiez vos leçons de conduite</p>
            </div>
            <Link href="/portail">
              <Button variant="outline">Retour au tableau de bord</Button>
            </Link>
          </div>
        </div>
      </div>

      <div className="container mx-auto px-4 py-8">
        <div className="grid lg:grid-cols-3 gap-8">
          {/* Calendar and Slots */}
          <div className="lg:col-span-2 space-y-6">
            {/* Calendar */}
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <CalendarIcon className="h-5 w-5" />
                  Sélectionner une date
                </CardTitle>
                <CardDescription>Choisissez la date pour votre prochaine leçon</CardDescription>
              </CardHeader>
              <CardContent>
                <Calendar
                  mode="single"
                  selected={selectedDate}
                  onSelect={setSelectedDate}
                  disabled={(date) => date < new Date() || date > addDays(new Date(), 30)}
                  className="rounded-md border"
                />
              </CardContent>
            </Card>

            {/* Available Slots */}
            {selectedDate && (
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <Clock className="h-5 w-5" />
                    Créneaux disponibles
                  </CardTitle>
                  <CardDescription>{format(selectedDate, "EEEE dd MMMM yyyy", { locale: fr })}</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="grid grid-cols-3 sm:grid-cols-4 md:grid-cols-6 gap-3">
                    {availableSlots.map((slot) => (
                      <Button
                        key={slot.id}
                        variant={slot.available ? "outline" : "secondary"}
                        className={`h-12 ${slot.available ? "hover:bg-primary hover:text-primary-foreground" : "opacity-50 cursor-not-allowed"}`}
                        onClick={() => handleSlotClick(slot)}
                        disabled={!slot.available}
                      >
                        {slot.time}
                      </Button>
                    ))}
                  </div>
                  {availableSlots.filter((s) => s.available).length === 0 && (
                    <div className="text-center py-8">
                      <AlertCircle className="h-12 w-12 text-muted-foreground mx-auto mb-4" />
                      <p className="text-muted-foreground">Aucun créneau disponible pour cette date.</p>
                    </div>
                  )}
                </CardContent>
              </Card>
            )}
          </div>

          {/* Sidebar */}
          <div className="space-y-6">
            {/* Upcoming Bookings */}
            <Card>
              <CardHeader>
                <CardTitle>Prochaines Réservations</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                {upcomingBookings.map((booking) => (
                  <div key={booking.id} className="p-4 border rounded-lg space-y-2">
                    <div className="flex items-center justify-between">
                      <div className="font-medium">{booking.type}</div>
                      {getStatusBadge(booking.status)}
                    </div>
                    <div className="text-sm text-muted-foreground">
                      <div className="flex items-center gap-1">
                        <CalendarIcon className="h-3 w-3" />
                        {format(booking.date, "dd/MM/yyyy")} à {booking.time}
                      </div>
                      <div className="flex items-center gap-1 mt-1">
                        <User className="h-3 w-3" />
                        {booking.instructor}
                      </div>
                      <div className="flex items-center gap-1 mt-1">
                        <MapPin className="h-3 w-3" />
                        {booking.location}
                      </div>
                    </div>
                  </div>
                ))}
              </CardContent>
            </Card>

            {/* Instructors */}
            <Card>
              <CardHeader>
                <CardTitle>Nos Instructeurs</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                {instructors.map((instructor) => (
                  <div key={instructor.id} className="flex items-center space-x-3">
                    <Avatar>
                      <AvatarImage src={instructor.avatar || "/placeholder.svg"} />
                      <AvatarFallback>
                        {instructor.name
                          .split(" ")
                          .map((n) => n[0])
                          .join("")}
                      </AvatarFallback>
                    </Avatar>
                    <div className="flex-1">
                      <div className="font-medium">{instructor.name}</div>
                      <div className="text-sm text-muted-foreground">{instructor.specialties.join(", ")}</div>
                      <div className="text-sm text-yellow-600">⭐ {instructor.rating}</div>
                    </div>
                  </div>
                ))}
              </CardContent>
            </Card>
          </div>
        </div>
      </div>

      {/* Booking Modal */}
      <Dialog open={isBookingModalOpen} onOpenChange={setIsBookingModalOpen}>
        <DialogContent className="sm:max-w-md">
          <DialogHeader>
            <DialogTitle>Confirmer la réservation</DialogTitle>
            <DialogDescription>
              {selectedSlot && (
                <>
                  Créneau sélectionné : {format(selectedSlot.date, "dd MMMM yyyy", { locale: fr })} à{" "}
                  {selectedSlot.time}
                </>
              )}
            </DialogDescription>
          </DialogHeader>

          <div className="space-y-4">
            <div>
              <label className="text-sm font-medium">Type de leçon</label>
              <Select value={selectedLessonType} onValueChange={setSelectedLessonType}>
                <SelectTrigger>
                  <SelectValue placeholder="Sélectionner un type de leçon" />
                </SelectTrigger>
                <SelectContent>
                  {lessonTypes.map((type) => (
                    <SelectItem key={type.id} value={type.id}>
                      <div className="flex justify-between items-center w-full">
                        <span>{type.name}</span>
                        <span className="text-sm text-muted-foreground ml-2">
                          {type.duration} - {type.price}
                        </span>
                      </div>
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>

            <div>
              <label className="text-sm font-medium">Instructeur</label>
              <Select value={selectedInstructor} onValueChange={setSelectedInstructor}>
                <SelectTrigger>
                  <SelectValue placeholder="Sélectionner un instructeur" />
                </SelectTrigger>
                <SelectContent>
                  {instructors.map((instructor) => (
                    <SelectItem key={instructor.id} value={instructor.id}>
                      <div className="flex items-center gap-2">
                        <span>{instructor.name}</span>
                        <span className="text-sm text-muted-foreground">⭐ {instructor.rating}</span>
                      </div>
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
          </div>

          <DialogFooter>
            <Button variant="outline" onClick={() => setIsBookingModalOpen(false)}>
              Annuler
            </Button>
            <Button onClick={handleConfirmBooking} disabled={isConfirming}>
              {isConfirming ? (
                <div className="flex items-center gap-2">
                  <div className="h-4 w-4 border-2 border-white border-t-transparent rounded-full animate-spin" />
                  Confirmation...
                </div>
              ) : (
                <>
                  <CheckCircle className="h-4 w-4 mr-2" />
                  Confirmer
                </>
              )}
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  )
}
