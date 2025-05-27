"use client"

import { useState } from "react"
import { View, Text, ScrollView, StyleSheet, TouchableOpacity, TextInput, Alert } from "react-native"
import { Ionicons } from "@expo/vector-icons"

export default function InscriptionScreen({ navigation }) {
  const [step, setStep] = useState(1)
  const [formData, setFormData] = useState({
    prenom: "",
    nom: "",
    email: "",
    telephone: "",
    adresse: "",
    dateNaissance: "",
    permisVise: "",
    formule: "",
  })

  const handleNext = () => {
    if (step < 3) setStep(step + 1)
  }

  const handlePrev = () => {
    if (step > 1) setStep(step - 1)
  }

  const handleSubmit = () => {
    Alert.alert(
      "Inscription réussie !",
      "Votre inscription a été enregistrée. Vous recevrez un email de confirmation.",
      [
        {
          text: "OK",
          onPress: () => navigation.goBack(),
        },
      ],
    )
  }

  const renderStep1 = () => (
    <View style={styles.stepContent}>
      <Text style={styles.stepTitle}>Informations personnelles</Text>

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
        <Text style={styles.inputLabel}>Adresse complète *</Text>
        <TextInput
          style={styles.textInput}
          value={formData.adresse}
          onChangeText={(text) => setFormData({ ...formData, adresse: text })}
          placeholder="123 rue de la République, 51100 REIMS"
        />
      </View>
    </View>
  )

  const renderStep2 = () => (
    <View style={styles.stepContent}>
      <Text style={styles.stepTitle}>Formation souhaitée</Text>

      <Text style={styles.sectionSubtitle}>Type de permis *</Text>
      <View style={styles.optionsContainer}>
        {[
          { id: "permis-b", label: "Permis B (voiture)" },
          { id: "aac", label: "Conduite accompagnée (AAC)" },
          { id: "permis-a", label: "Permis A (moto)" },
        ].map((option) => (
          <TouchableOpacity
            key={option.id}
            style={[styles.optionButton, formData.permisVise === option.id && styles.selectedOption]}
            onPress={() => setFormData({ ...formData, permisVise: option.id })}
          >
            <Text style={[styles.optionText, formData.permisVise === option.id && styles.selectedOptionText]}>
              {option.label}
            </Text>
          </TouchableOpacity>
        ))}
      </View>

      <Text style={styles.sectionSubtitle}>Formule de formation *</Text>
      <View style={styles.formulesContainer}>
        {[
          { id: "classique", name: "Formule Classique", price: "890€", description: "Code + 20h de conduite" },
          {
            id: "intensive",
            name: "Formule Intensive",
            price: "1190€",
            description: "Code + 30h + simulateur",
            popular: true,
          },
          { id: "premium", name: "Formule Premium", price: "1490€", description: "Code + 40h + simulateur + suivi" },
        ].map((formule) => (
          <TouchableOpacity
            key={formule.id}
            style={[styles.formuleCard, formData.formule === formule.id && styles.selectedFormule]}
            onPress={() => setFormData({ ...formData, formule: formule.id })}
          >
            {formule.popular && (
              <View style={styles.popularBadge}>
                <Text style={styles.popularText}>Populaire</Text>
              </View>
            )}
            <Text style={styles.formuleName}>{formule.name}</Text>
            <Text style={styles.formulePrice}>{formule.price}</Text>
            <Text style={styles.formuleDescription}>{formule.description}</Text>
          </TouchableOpacity>
        ))}
      </View>
    </View>
  )

  const renderStep3 = () => (
    <View style={styles.stepContent}>
      <Text style={styles.stepTitle}>Récapitulatif</Text>

      <View style={styles.summaryCard}>
        <View style={styles.summaryItem}>
          <Text style={styles.summaryLabel}>Nom complet</Text>
          <Text style={styles.summaryValue}>
            {formData.prenom} {formData.nom}
          </Text>
        </View>

        <View style={styles.summaryItem}>
          <Text style={styles.summaryLabel}>Email</Text>
          <Text style={styles.summaryValue}>{formData.email}</Text>
        </View>

        <View style={styles.summaryItem}>
          <Text style={styles.summaryLabel}>Type de permis</Text>
          <Text style={styles.summaryValue}>
            {formData.permisVise === "permis-b"
              ? "Permis B"
              : formData.permisVise === "aac"
                ? "Conduite accompagnée"
                : "Permis A"}
          </Text>
        </View>

        <View style={styles.summaryItem}>
          <Text style={styles.summaryLabel}>Formule</Text>
          <Text style={styles.summaryValue}>
            {formData.formule === "classique"
              ? "Classique (890€)"
              : formData.formule === "intensive"
                ? "Intensive (1190€)"
                : "Premium (1490€)"}
          </Text>
        </View>

        <View style={[styles.summaryItem, styles.totalItem]}>
          <Text style={styles.totalLabel}>Total</Text>
          <Text style={styles.totalValue}>
            {formData.formule === "classique" ? "920€" : formData.formule === "intensive" ? "1220€" : "1520€"}
          </Text>
        </View>
      </View>

      <View style={styles.termsContainer}>
        <Text style={styles.termsText}>
          En finalisant votre inscription, vous acceptez nos conditions générales d'utilisation et notre politique de
          confidentialité.
        </Text>
      </View>
    </View>
  )

  return (
    <View style={styles.container}>
      {/* Progress Bar */}
      <View style={styles.progressContainer}>
        <View style={styles.progressBar}>
          <View style={[styles.progressFill, { width: `${(step / 3) * 100}%` }]} />
        </View>
        <Text style={styles.progressText}>Étape {step} sur 3</Text>
      </View>

      <ScrollView style={styles.scrollContainer}>
        {step === 1 && renderStep1()}
        {step === 2 && renderStep2()}
        {step === 3 && renderStep3()}
      </ScrollView>

      {/* Navigation Buttons */}
      <View style={styles.navigationContainer}>
        {step > 1 && (
          <TouchableOpacity style={styles.prevButton} onPress={handlePrev}>
            <Ionicons name="chevron-back" size={20} color="#6B7280" />
            <Text style={styles.prevButtonText}>Précédent</Text>
          </TouchableOpacity>
        )}

        <TouchableOpacity
          style={[styles.nextButton, step === 1 && styles.fullWidthButton]}
          onPress={step === 3 ? handleSubmit : handleNext}
        >
          <Text style={styles.nextButtonText}>{step === 3 ? "Finaliser l'inscription" : "Suivant"}</Text>
          {step < 3 && <Ionicons name="chevron-forward" size={20} color="#fff" />}
        </TouchableOpacity>
      </View>
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
  },
  progressContainer: {
    padding: 20,
    backgroundColor: "#F9FAFB",
  },
  progressBar: {
    height: 4,
    backgroundColor: "#E5E7EB",
    borderRadius: 2,
    marginBottom: 10,
  },
  progressFill: {
    height: "100%",
    backgroundColor: "#3B82F6",
    borderRadius: 2,
  },
  progressText: {
    fontSize: 14,
    color: "#6B7280",
    textAlign: "center",
  },
  scrollContainer: {
    flex: 1,
  },
  stepContent: {
    padding: 20,
  },
  stepTitle: {
    fontSize: 24,
    fontWeight: "bold",
    color: "#1F2937",
    marginBottom: 20,
    textAlign: "center",
  },
  inputGroup: {
    marginBottom: 15,
  },
  inputLabel: {
    fontSize: 14,
    fontWeight: "600",
    color: "#374151",
    marginBottom: 8,
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
  sectionSubtitle: {
    fontSize: 16,
    fontWeight: "600",
    color: "#1F2937",
    marginBottom: 15,
    marginTop: 10,
  },
  optionsContainer: {
    gap: 10,
    marginBottom: 20,
  },
  optionButton: {
    backgroundColor: "#F9FAFB",
    padding: 15,
    borderRadius: 8,
    borderWidth: 2,
    borderColor: "#E5E7EB",
  },
  selectedOption: {
    borderColor: "#3B82F6",
    backgroundColor: "#EFF6FF",
  },
  optionText: {
    fontSize: 14,
    color: "#374151",
    textAlign: "center",
  },
  selectedOptionText: {
    color: "#1D4ED8",
    fontWeight: "600",
  },
  formulesContainer: {
    gap: 15,
  },
  formuleCard: {
    backgroundColor: "#F9FAFB",
    padding: 20,
    borderRadius: 12,
    borderWidth: 2,
    borderColor: "#E5E7EB",
    position: "relative",
  },
  selectedFormule: {
    borderColor: "#3B82F6",
    backgroundColor: "#EFF6FF",
  },
  popularBadge: {
    position: "absolute",
    top: 10,
    right: 10,
    backgroundColor: "#3B82F6",
    paddingHorizontal: 8,
    paddingVertical: 4,
    borderRadius: 12,
  },
  popularText: {
    fontSize: 10,
    color: "#fff",
    fontWeight: "600",
  },
  formuleName: {
    fontSize: 16,
    fontWeight: "bold",
    color: "#1F2937",
    marginBottom: 5,
  },
  formulePrice: {
    fontSize: 18,
    fontWeight: "bold",
    color: "#3B82F6",
    marginBottom: 5,
  },
  formuleDescription: {
    fontSize: 14,
    color: "#6B7280",
  },
  summaryCard: {
    backgroundColor: "#F9FAFB",
    padding: 20,
    borderRadius: 12,
    marginBottom: 20,
  },
  summaryItem: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: 10,
  },
  summaryLabel: {
    fontSize: 14,
    color: "#6B7280",
  },
  summaryValue: {
    fontSize: 14,
    fontWeight: "600",
    color: "#1F2937",
    textAlign: "right",
    flex: 1,
    marginLeft: 10,
  },
  totalItem: {
    borderTopWidth: 1,
    borderTopColor: "#E5E7EB",
    paddingTop: 10,
    marginTop: 10,
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
  termsContainer: {
    backgroundColor: "#FEF3C7",
    padding: 15,
    borderRadius: 8,
    marginTop: 10,
  },
  termsText: {
    fontSize: 12,
    color: "#92400E",
    textAlign: "center",
    lineHeight: 18,
  },
  navigationContainer: {
    flexDirection: "row",
    padding: 20,
    gap: 15,
    backgroundColor: "#F9FAFB",
  },
  prevButton: {
    flex: 1,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    padding: 15,
    borderRadius: 8,
    borderWidth: 1,
    borderColor: "#D1D5DB",
    backgroundColor: "#fff",
  },
  prevButtonText: {
    fontSize: 16,
    color: "#6B7280",
    marginLeft: 5,
  },
  nextButton: {
    flex: 1,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    padding: 15,
    borderRadius: 8,
    backgroundColor: "#3B82F6",
  },
  fullWidthButton: {
    flex: 2,
  },
  nextButtonText: {
    fontSize: 16,
    fontWeight: "600",
    color: "#fff",
    marginRight: 5,
  },
})
