"use client"

import { useState } from "react"
import { View, Text, ScrollView, StyleSheet, TouchableOpacity, TextInput, Alert } from "react-native"
import { Ionicons } from "@expo/vector-icons"

export default function RendezVousScreen() {
  const [selectedType, setSelectedType] = useState("")
  const [selectedInstructor, setSelectedInstructor] = useState("")
  const [selectedDate, setSelectedDate] = useState("")
  const [selectedTime, setSelectedTime] = useState("")
  const [formData, setFormData] = useState({
    prenom: "",
    nom: "",
    email: "",
    telephone: "",
    commentaire: "",
  })

  const lessonTypes = [
    { id: "conduite", name: "Leçon de conduite", duration: "1h", price: "45€" },
    { id: "code", name: "Cours de code", duration: "1h", price: "25€" },
    { id: "simulateur", name: "Séance simulateur", duration: "1h", price: "35€" },
    { id: "evaluation", name: "Évaluation", duration: "1h", price: "50€" },
  ]

  const instructors = [
    { id: "bensaleh", name: "M. bensaleh", speciality: "Conduite classique", rating: 4.9 },
    { id: "martin", name: "Mme Martin", speciality: "Conduite accompagnée", rating: 4.8 },
    { id: "bernard", name: "M. Bernard", speciality: "Perfectionnement", rating: 4.7 },
  ]

  const timeSlots = ["08:00", "09:00", "10:00", "11:00", "14:00", "15:00", "16:00", "17:00", "18:00"]

  const handleReservation = () => {
    if (!selectedType || !selectedInstructor || !selectedDate || !selectedTime) {
      Alert.alert("Erreur", "Veuillez remplir tous les champs obligatoires")
      return
    }

    Alert.alert("Confirmation", "Votre rendez-vous a été réservé avec succès !", [{ text: "OK" }])
  }

  return (
    <ScrollView style={styles.container}>
      {/* Header */}
      <View style={styles.header}>
        <Text style={styles.headerTitle}>Prendre un rendez-vous</Text>
        <Text style={styles.headerSubtitle}>Réservez votre créneau en quelques clics</Text>
      </View>

      {/* Type de leçon */}
      <View style={styles.section}>
        <Text style={styles.sectionTitle}>Type de leçon</Text>
        <View style={styles.optionsGrid}>
          {lessonTypes.map((type) => (
            <TouchableOpacity
              key={type.id}
              style={[styles.optionCard, selectedType === type.id && styles.selectedOption]}
              onPress={() => setSelectedType(type.id)}
            >
              <View style={styles.optionHeader}>
                <Text style={styles.optionTitle}>{type.name}</Text>
                <Text style={styles.optionPrice}>{type.price}</Text>
              </View>
              <Text style={styles.optionDuration}>Durée : {type.duration}</Text>
            </TouchableOpacity>
          ))}
        </View>
      </View>

      {/* Moniteur */}
      <View style={styles.section}>
        <Text style={styles.sectionTitle}>Choisir un moniteur</Text>
        <View style={styles.instructorsList}>
          {instructors.map((instructor) => (
            <TouchableOpacity
              key={instructor.id}
              style={[styles.instructorCard, selectedInstructor === instructor.id && styles.selectedOption]}
              onPress={() => setSelectedInstructor(instructor.id)}
            >
              <View style={styles.instructorInfo}>
                <Text style={styles.instructorName}>{instructor.name}</Text>
                <Text style={styles.instructorSpeciality}>{instructor.speciality}</Text>
              </View>
              <View style={styles.instructorRating}>
                <Ionicons name="star" size={16} color="#FBBF24" />
                <Text style={styles.ratingText}>{instructor.rating}</Text>
              </View>
            </TouchableOpacity>
          ))}
        </View>
      </View>

      {/* Date et heure */}
      <View style={styles.section}>
        <Text style={styles.sectionTitle}>Date et heure</Text>

        <View style={styles.dateSection}>
          <Text style={styles.inputLabel}>Date souhaitée</Text>
          <TouchableOpacity style={styles.dateInput}>
            <Ionicons name="calendar-outline" size={20} color="#6B7280" />
            <Text style={styles.dateText}>{selectedDate || "Sélectionner une date"}</Text>
          </TouchableOpacity>
        </View>

        <View style={styles.timeSection}>
          <Text style={styles.inputLabel}>Heure souhaitée</Text>
          <View style={styles.timeSlotsGrid}>
            {timeSlots.map((time) => (
              <TouchableOpacity
                key={time}
                style={[styles.timeSlot, selectedTime === time && styles.selectedTimeSlot]}
                onPress={() => setSelectedTime(time)}
              >
                <Text style={[styles.timeSlotText, selectedTime === time && styles.selectedTimeSlotText]}>{time}</Text>
              </TouchableOpacity>
            ))}
          </View>
        </View>
      </View>

      {/* Informations personnelles */}
      <View style={styles.section}>
        <Text style={styles.sectionTitle}>Vos informations</Text>

        <View style={styles.formGrid}>
          <View style={styles.inputGroup}>
            <Text style={styles.inputLabel}>Prénom *</Text>
            <TextInput
              style={styles.textInput}
              value={formData.prenom}
              onChangeText={(text) => setFormData({ ...formData, prenom: text })}
              placeholder="Votre prénom"
            />
          </View>

          <View style={styles.inputGroup}>
            <Text style={styles.inputLabel}>Nom *</Text>
            <TextInput
              style={styles.textInput}
              value={formData.nom}
              onChangeText={(text) => setFormData({ ...formData, nom: text })}
              placeholder="Votre nom"
            />
          </View>

          <View style={styles.inputGroup}>
            <Text style={styles.inputLabel}>Email *</Text>
            <TextInput
              style={styles.textInput}
              value={formData.email}
              onChangeText={(text) => setFormData({ ...formData, email: text })}
              placeholder="votre.email@exemple.com"
              keyboardType="email-address"
            />
          </View>

          <View style={styles.inputGroup}>
            <Text style={styles.inputLabel}>Téléphone *</Text>
            <TextInput
              style={styles.textInput}
              value={formData.telephone}
              onChangeText={(text) => setFormData({ ...formData, telephone: text })}
              placeholder="06 13 80 93 92"
              keyboardType="phone-pad"
            />
          </View>

          <View style={styles.inputGroup}>
            <Text style={styles.inputLabel}>Commentaire (optionnel)</Text>
            <TextInput
              style={[styles.textInput, styles.textArea]}
              value={formData.commentaire}
              onChangeText={(text) => setFormData({ ...formData, commentaire: text })}
              placeholder="Précisions particulières, objectifs de la leçon..."
              multiline
              numberOfLines={3}
            />
          </View>
        </View>
      </View>

      {/* Récapitulatif */}
      <View style={styles.section}>
        <Text style={styles.sectionTitle}>Récapitulatif</Text>
        <View style={styles.summaryCard}>
          {selectedType && (
            <View style={styles.summaryItem}>
              <Text style={styles.summaryLabel}>Type de leçon</Text>
              <Text style={styles.summaryValue}>{lessonTypes.find((t) => t.id === selectedType)?.name}</Text>
            </View>
          )}

          {selectedInstructor && (
            <View style={styles.summaryItem}>
              <Text style={styles.summaryLabel}>Moniteur</Text>
              <Text style={styles.summaryValue}>{instructors.find((i) => i.id === selectedInstructor)?.name}</Text>
            </View>
          )}

          {selectedDate && (
            <View style={styles.summaryItem}>
              <Text style={styles.summaryLabel}>Date</Text>
              <Text style={styles.summaryValue}>{selectedDate}</Text>
            </View>
          )}

          {selectedTime && (
            <View style={styles.summaryItem}>
              <Text style={styles.summaryLabel}>Heure</Text>
              <Text style={styles.summaryValue}>{selectedTime}</Text>
            </View>
          )}

          {selectedType && (
            <View style={[styles.summaryItem, styles.totalItem]}>
              <Text style={styles.totalLabel}>Total</Text>
              <Text style={styles.totalValue}>{lessonTypes.find((t) => t.id === selectedType)?.price}</Text>
            </View>
          )}
        </View>
      </View>

      {/* Bouton de confirmation */}
      <TouchableOpacity
        style={[
          styles.confirmButton,
          (!selectedType || !selectedInstructor || !selectedDate || !selectedTime) && styles.disabledButton,
        ]}
        onPress={handleReservation}
        disabled={!selectedType || !selectedInstructor || !selectedDate || !selectedTime}
      >
        <Ionicons name="checkmark-circle-outline" size={20} color="#fff" />
        <Text style={styles.confirmButtonText}>Confirmer la réservation</Text>
      </TouchableOpacity>

      <Text style={styles.confirmationNote}>Vous recevrez une confirmation par email et SMS</Text>
    </ScrollView>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
  },
  header: {
    backgroundColor: "#10B981",
    padding: 20,
    paddingTop: 30,
  },
  headerTitle: {
    fontSize: 24,
    fontWeight: "bold",
    color: "#fff",
    textAlign: "center",
    marginBottom: 5,
  },
  headerSubtitle: {
    fontSize: 16,
    color: "#D1FAE5",
    textAlign: "center",
  },
  section: {
    padding: 20,
    borderBottomWidth: 1,
    borderBottomColor: "#F3F4F6",
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: "bold",
    color: "#1F2937",
    marginBottom: 15,
  },
  optionsGrid: {
    gap: 10,
  },
  optionCard: {
    backgroundColor: "#F9FAFB",
    padding: 15,
    borderRadius: 12,
    borderWidth: 2,
    borderColor: "transparent",
  },
  selectedOption: {
    borderColor: "#3B82F6",
    backgroundColor: "#EFF6FF",
  },
  optionHeader: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: 5,
  },
  optionTitle: {
    fontSize: 16,
    fontWeight: "600",
    color: "#1F2937",
  },
  optionPrice: {
    fontSize: 14,
    fontWeight: "600",
    color: "#3B82F6",
  },
  optionDuration: {
    fontSize: 14,
    color: "#6B7280",
  },
  instructorsList: {
    gap: 10,
  },
  instructorCard: {
    backgroundColor: "#F9FAFB",
    padding: 15,
    borderRadius: 12,
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    borderWidth: 2,
    borderColor: "transparent",
  },
  instructorInfo: {
    flex: 1,
  },
  instructorName: {
    fontSize: 16,
    fontWeight: "600",
    color: "#1F2937",
    marginBottom: 2,
  },
  instructorSpeciality: {
    fontSize: 14,
    color: "#6B7280",
  },
  instructorRating: {
    flexDirection: "row",
    alignItems: "center",
    gap: 5,
  },
  ratingText: {
    fontSize: 14,
    fontWeight: "600",
    color: "#1F2937",
  },
  dateSection: {
    marginBottom: 20,
  },
  inputLabel: {
    fontSize: 14,
    fontWeight: "600",
    color: "#374151",
    marginBottom: 8,
  },
  dateInput: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "#F9FAFB",
    padding: 15,
    borderRadius: 8,
    borderWidth: 1,
    borderColor: "#E5E7EB",
    gap: 10,
  },
  dateText: {
    fontSize: 14,
    color: "#6B7280",
  },
  timeSection: {
    marginTop: 20,
  },
  timeSlotsGrid: {
    flexDirection: "row",
    flexWrap: "wrap",
    gap: 10,
  },
  timeSlot: {
    backgroundColor: "#F9FAFB",
    paddingHorizontal: 15,
    paddingVertical: 10,
    borderRadius: 8,
    borderWidth: 1,
    borderColor: "#E5E7EB",
    minWidth: 70,
    alignItems: "center",
  },
  selectedTimeSlot: {
    backgroundColor: "#3B82F6",
    borderColor: "#3B82F6",
  },
  timeSlotText: {
    fontSize: 14,
    color: "#374151",
    fontWeight: "500",
  },
  selectedTimeSlotText: {
    color: "#fff",
  },
  formGrid: {
    gap: 15,
  },
  inputGroup: {
    gap: 8,
  },
  textInput: {
    backgroundColor: "#F9FAFB",
    padding: 15,
    borderRadius: 8,
    borderWidth: 1,
    borderColor: "#E5E7EB",
    fontSize: 14,
    color: "#1F2937",
  },
  textArea: {
    height: 80,
    textAlignVertical: "top",
  },
  summaryCard: {
    backgroundColor: "#F9FAFB",
    padding: 15,
    borderRadius: 12,
    gap: 10,
  },
  summaryItem: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },
  summaryLabel: {
    fontSize: 14,
    color: "#6B7280",
  },
  summaryValue: {
    fontSize: 14,
    fontWeight: "600",
    color: "#1F2937",
  },
  totalItem: {
    borderTopWidth: 1,
    borderTopColor: "#E5E7EB",
    paddingTop: 10,
    marginTop: 5,
  },
  totalLabel: {
    fontSize: 16,
    fontWeight: "bold",
    color: "#1F2937",
  },
  totalValue: {
    fontSize: 18,
    fontWeight: "bold",
    color: "#3B82F6",
  },
  confirmButton: {
    backgroundColor: "#10B981",
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    padding: 15,
    margin: 20,
    borderRadius: 12,
    gap: 8,
  },
  disabledButton: {
    backgroundColor: "#9CA3AF",
  },
  confirmButtonText: {
    fontSize: 16,
    fontWeight: "600",
    color: "#fff",
  },
  confirmationNote: {
    fontSize: 12,
    color: "#6B7280",
    textAlign: "center",
    marginBottom: 20,
  },
})
