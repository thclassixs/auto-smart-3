import { View, Text, ScrollView, StyleSheet, TouchableOpacity, Dimensions } from "react-native"
import { LinearGradient } from "expo-linear-gradient"
import { Ionicons } from "@expo/vector-icons"

const { width } = Dimensions.get("window")

export default function HomeScreen({ navigation }) {
  const stats = [
    { number: "88%", label: "Taux de réussite" },
    { number: "850+", label: "Élèves formés" },
    { number: "6", label: "Moniteurs experts" },
    { number: "8", label: "Véhicules récents" },
  ]

  const services = [
    {
      icon: "book-outline",
      title: "Code interactif",
      description: "Tests en ligne 24h/24",
      color: "#3B82F6",
    },
    {
      icon: "car-outline",
      title: "Leçons de conduite",
      description: "Moniteurs diplômés",
      color: "#10B981",
    },
    {
      icon: "game-controller-outline",
      title: "Simulateur",
      description: "Entraînement virtuel",
      color: "#8B5CF6",
    },
    {
      icon: "videocam-outline",
      title: "Vidéos pédagogiques",
      description: "Cours HD disponibles",
      color: "#F59E0B",
    },
  ]

  return (
    <ScrollView style={styles.container}>
      {/* Hero Section */}
      <LinearGradient colors={["#1E40AF", "#3B82F6"]} style={styles.heroSection}>
        <View style={styles.heroContent}>
          <Text style={styles.heroTitle}>Obtenez votre permis de conduire avec Auto-École Neufchâtel</Text>
          <Text style={styles.heroSubtitle}>Permis B traditionnel et accéléré, conduite accompagnée (AAC)</Text>

          <View style={styles.buttonContainer}>
            <TouchableOpacity
              style={[styles.button, styles.primaryButton]}
              onPress={() => navigation.navigate("Inscription")}
            >
              <Ionicons name="person-add" size={20} color="#fff" />
              <Text style={styles.buttonText}>S'inscrire</Text>
            </TouchableOpacity>

            <TouchableOpacity
              style={[styles.button, styles.secondaryButton]}
              onPress={() => navigation.navigate("RDV")}
            >
              <Ionicons name="calendar" size={20} color="#1E40AF" />
              <Text style={[styles.buttonText, { color: "#1E40AF" }]}>Prendre RDV</Text>
            </TouchableOpacity>
          </View>
        </View>
      </LinearGradient>

      {/* Stats Section */}
      <View style={styles.statsSection}>
        <View style={styles.statsContainer}>
          {stats.map((stat, index) => (
            <View key={index} style={styles.statItem}>
              <Text style={styles.statNumber}>{stat.number}</Text>
              <Text style={styles.statLabel}>{stat.label}</Text>
            </View>
          ))}
        </View>
      </View>

      {/* Services Section */}
      <View style={styles.servicesSection}>
        <Text style={styles.sectionTitle}>Nos services</Text>
        <View style={styles.servicesGrid}>
          {services.map((service, index) => (
            <View key={index} style={styles.serviceCard}>
              <View style={[styles.serviceIcon, { backgroundColor: service.color }]}>
                <Ionicons name={service.icon} size={24} color="#fff" />
              </View>
              <Text style={styles.serviceTitle}>{service.title}</Text>
              <Text style={styles.serviceDescription}>{service.description}</Text>
            </View>
          ))}
        </View>
      </View>

      {/* Contact Section */}
      <View style={styles.contactSection}>
        <Text style={styles.sectionTitle}>Contactez-nous</Text>
        <View style={styles.contactInfo}>
          <View style={styles.contactItem}>
            <Ionicons name="location-outline" size={20} color="#DC2626" />
            <Text style={styles.contactText}>87 rue de Neufchâtel, 51100 REIMS</Text>
          </View>
          <View style={styles.contactItem}>
            <Ionicons name="call-outline" size={20} color="#DC2626" />
            <Text style={styles.contactText}>03 26 87 16 77</Text>
          </View>
          <View style={styles.contactItem}>
            <Ionicons name="mail-outline" size={20} color="#DC2626" />
            <Text style={styles.contactText}>neufchatel.autoecole@orange.fr</Text>
          </View>
          <View style={styles.contactItem}>
            <Ionicons name="time-outline" size={20} color="#DC2626" />
            <Text style={styles.contactText}>Lun-Ven: 9h-19h, Sam: 9h-17h</Text>
          </View>
        </View>
      </View>
    </ScrollView>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
  },
  heroSection: {
    padding: 20,
    paddingTop: 40,
    paddingBottom: 40,
  },
  heroContent: {
    alignItems: "center",
  },
  heroTitle: {
    fontSize: 24,
    fontWeight: "bold",
    color: "#fff",
    textAlign: "center",
    marginBottom: 10,
  },
  heroSubtitle: {
    fontSize: 16,
    color: "#E0E7FF",
    textAlign: "center",
    marginBottom: 30,
  },
  buttonContainer: {
    flexDirection: "row",
    gap: 15,
  },
  button: {
    flexDirection: "row",
    alignItems: "center",
    paddingHorizontal: 20,
    paddingVertical: 12,
    borderRadius: 8,
    gap: 8,
  },
  primaryButton: {
    backgroundColor: "#FBBF24",
  },
  secondaryButton: {
    backgroundColor: "#fff",
  },
  buttonText: {
    fontSize: 16,
    fontWeight: "600",
    color: "#fff",
  },
  statsSection: {
    backgroundColor: "#DC2626",
    padding: 20,
  },
  statsContainer: {
    flexDirection: "row",
    justifyContent: "space-around",
  },
  statItem: {
    alignItems: "center",
  },
  statNumber: {
    fontSize: 24,
    fontWeight: "bold",
    color: "#fff",
  },
  statLabel: {
    fontSize: 12,
    color: "#FCA5A5",
    textAlign: "center",
  },
  servicesSection: {
    padding: 20,
  },
  sectionTitle: {
    fontSize: 22,
    fontWeight: "bold",
    color: "#1F2937",
    marginBottom: 20,
    textAlign: "center",
  },
  servicesGrid: {
    flexDirection: "row",
    flexWrap: "wrap",
    justifyContent: "space-between",
  },
  serviceCard: {
    width: (width - 60) / 2,
    backgroundColor: "#F9FAFB",
    padding: 15,
    borderRadius: 12,
    alignItems: "center",
    marginBottom: 15,
  },
  serviceIcon: {
    width: 50,
    height: 50,
    borderRadius: 25,
    alignItems: "center",
    justifyContent: "center",
    marginBottom: 10,
  },
  serviceTitle: {
    fontSize: 14,
    fontWeight: "600",
    color: "#1F2937",
    textAlign: "center",
    marginBottom: 5,
  },
  serviceDescription: {
    fontSize: 12,
    color: "#6B7280",
    textAlign: "center",
  },
  contactSection: {
    padding: 20,
    backgroundColor: "#F9FAFB",
  },
  contactInfo: {
    gap: 15,
  },
  contactItem: {
    flexDirection: "row",
    alignItems: "center",
    gap: 10,
  },
  contactText: {
    fontSize: 14,
    color: "#374151",
    flex: 1,
  },
})
