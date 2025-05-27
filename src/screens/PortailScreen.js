"use client"

import { useState } from "react"
import { View, Text, ScrollView, StyleSheet, TouchableOpacity, Dimensions } from "react-native"
import { Ionicons } from "@expo/vector-icons"
import * as Progress from "react-native-progress"

const { width } = Dimensions.get("window")

export default function PortailScreen() {
  const [activeTab, setActiveTab] = useState("dashboard")

  const tabs = [
    { id: "dashboard", label: "Tableau", icon: "grid-outline" },
    { id: "code", label: "Code", icon: "book-outline" },
    { id: "videos", label: "Vidéos", icon: "videocam-outline" },
    { id: "planning", label: "Planning", icon: "calendar-outline" },
  ]

  const renderDashboard = () => (
    <ScrollView style={styles.tabContent}>
      {/* Welcome Card */}
      <View style={styles.welcomeCard}>
        <Text style={styles.welcomeTitle}>Bonjour Marie ! 👋</Text>
        <Text style={styles.welcomeSubtitle}>Prête pour votre prochaine leçon ?</Text>
      </View>

      {/* Progress Cards */}
      <View style={styles.progressGrid}>
        <View style={styles.progressCard}>
          <View style={styles.progressHeader}>
            <Ionicons name="book-outline" size={20} color="#3B82F6" />
            <Text style={styles.progressTitle}>Code</Text>
          </View>
          <Text style={styles.progressValue}>78%</Text>
          <Progress.Bar progress={0.78} width={width * 0.35} color="#3B82F6" style={styles.progressBar} />
          <Text style={styles.progressSubtext}>23/40 séries</Text>
        </View>

        <View style={styles.progressCard}>
          <View style={styles.progressHeader}>
            <Ionicons name="car-outline" size={20} color="#10B981" />
            <Text style={styles.progressTitle}>Conduite</Text>
          </View>
          <Text style={styles.progressValue}>12h/20h</Text>
          <Progress.Bar progress={0.6} width={width * 0.35} color="#10B981" style={styles.progressBar} />
          <Text style={styles.progressSubtext}>8h restantes</Text>
        </View>
      </View>

      {/* Next Lessons */}
      <View style={styles.section}>
        <Text style={styles.sectionTitle}>Prochaines leçons</Text>
        <View style={styles.lessonCard}>
          <View style={styles.lessonInfo}>
            <Text style={styles.lessonTitle}>Leçon de conduite</Text>
            <Text style={styles.lessonInstructor}>Avec M. bensaleh</Text>
          </View>
          <View style={styles.lessonTime}>
            <Text style={styles.lessonDate}>Demain</Text>
            <Text style={styles.lessonHour}>14h00 - 15h00</Text>
          </View>
        </View>
      </View>

      {/* Objectives */}
      <View style={styles.section}>
        <Text style={styles.sectionTitle}>Objectifs de la semaine</Text>
        <View style={styles.objectivesList}>
          <View style={styles.objectiveItem}>
            <Ionicons name="checkmark-circle" size={20} color="#10B981" />
            <Text style={styles.objectiveText}>Compléter 3 séries de code</Text>
          </View>
          <View style={styles.objectiveItem}>
            <Ionicons name="checkmark-circle" size={20} color="#10B981" />
            <Text style={styles.objectiveText}>Regarder 2 vidéos pédagogiques</Text>
          </View>
          <View style={styles.objectiveItem}>
            <Ionicons name="ellipse-outline" size={20} color="#9CA3AF" />
            <Text style={styles.objectiveText}>Effectuer 2h de conduite</Text>
          </View>
        </View>
      </View>
    </ScrollView>
  )

  const renderCode = () => (
    <ScrollView style={styles.tabContent}>
      <View style={styles.codeSection}>
        <Text style={styles.sectionTitle}>Test de code - Série 24</Text>

        <View style={styles.questionCard}>
          <Text style={styles.questionText}>
            À quelle distance minimale devez-vous vous arrêter derrière un véhicule à un feu rouge ?
          </Text>

          <View style={styles.answersContainer}>
            {["1 mètre", "2 mètres", "3 mètres", "5 mètres"].map((answer, index) => (
              <TouchableOpacity key={index} style={styles.answerButton}>
                <Text style={styles.answerText}>
                  {String.fromCharCode(65 + index)}. {answer}
                </Text>
              </TouchableOpacity>
            ))}
          </View>
        </View>

        <View style={styles.statsCard}>
          <Text style={styles.statsTitle}>Vos statistiques</Text>
          <View style={styles.statsGrid}>
            <View style={styles.statItem}>
              <Text style={styles.statValue}>23</Text>
              <Text style={styles.statLabel}>Tests réalisés</Text>
            </View>
            <View style={styles.statItem}>
              <Text style={styles.statValue}>85%</Text>
              <Text style={styles.statLabel}>Moyenne</Text>
            </View>
          </View>
        </View>
      </View>
    </ScrollView>
  )

  const renderVideos = () => (
    <ScrollView style={styles.tabContent}>
      <Text style={styles.sectionTitle}>Vidéos pédagogiques</Text>

      <View style={styles.videosGrid}>
        {[
          { title: "Les règles de priorité", duration: "12:30", progress: 100 },
          { title: "Le stationnement", duration: "8:45", progress: 60 },
          { title: "La signalisation", duration: "15:20", progress: 0 },
          { title: "Le démarrage en côte", duration: "6:15", progress: 0 },
        ].map((video, index) => (
          <View key={index} style={styles.videoCard}>
            <View style={styles.videoThumbnail}>
              <Ionicons name="play-circle" size={40} color="#fff" />
            </View>
            <View style={styles.videoInfo}>
              <Text style={styles.videoTitle}>{video.title}</Text>
              <Text style={styles.videoDuration}>{video.duration}</Text>
              {video.progress > 0 && (
                <Progress.Bar
                  progress={video.progress / 100}
                  width={width * 0.6}
                  color="#3B82F6"
                  style={styles.videoProgress}
                />
              )}
            </View>
          </View>
        ))}
      </View>
    </ScrollView>
  )

  const renderPlanning = () => (
    <ScrollView style={styles.tabContent}>
      <Text style={styles.sectionTitle}>Mon planning</Text>

      <View style={styles.calendarSection}>
        <Text style={styles.calendarTitle}>Janvier 2024</Text>
        <View style={styles.calendar}>
          {/* Simplified calendar view */}
          <View style={styles.calendarHeader}>
            {["L", "M", "M", "J", "V", "S", "D"].map((day, index) => (
              <Text key={index} style={styles.calendarDay}>
                {day}
              </Text>
            ))}
          </View>
          <View style={styles.calendarGrid}>
            {Array.from({ length: 35 }, (_, i) => (
              <TouchableOpacity key={i} style={styles.calendarDate}>
                <Text style={styles.calendarDateText}>{i + 1}</Text>
              </TouchableOpacity>
            ))}
          </View>
        </View>
      </View>

      <View style={styles.reservationsSection}>
        <Text style={styles.sectionTitle}>Mes réservations</Text>
        <View style={styles.reservationCard}>
          <Text style={styles.reservationTitle}>Demain - 14h00</Text>
          <Text style={styles.reservationDetails}>Leçon avec M. bensaleh</Text>
          <View style={styles.reservationActions}>
            <TouchableOpacity style={styles.actionButton}>
              <Text style={styles.actionButtonText}>Modifier</Text>
            </TouchableOpacity>
            <TouchableOpacity style={[styles.actionButton, styles.cancelButton]}>
              <Text style={[styles.actionButtonText, styles.cancelButtonText]}>Annuler</Text>
            </TouchableOpacity>
          </View>
        </View>
      </View>
    </ScrollView>
  )

  const renderTabContent = () => {
    switch (activeTab) {
      case "dashboard":
        return renderDashboard()
      case "code":
        return renderCode()
      case "videos":
        return renderVideos()
      case "planning":
        return renderPlanning()
      default:
        return renderDashboard()
    }
  }

  return (
    <View style={styles.container}>
      {/* Tab Navigation */}
      <View style={styles.tabNavigation}>
        {tabs.map((tab) => (
          <TouchableOpacity
            key={tab.id}
            style={[styles.tab, activeTab === tab.id && styles.activeTab]}
            onPress={() => setActiveTab(tab.id)}
          >
            <Ionicons name={tab.icon} size={20} color={activeTab === tab.id ? "#DC2626" : "#9CA3AF"} />
            <Text style={[styles.tabLabel, activeTab === tab.id && styles.activeTabLabel]}>{tab.label}</Text>
          </TouchableOpacity>
        ))}
      </View>

      {/* Tab Content */}
      {renderTabContent()}
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
  },
  tabNavigation: {
    flexDirection: "row",
    backgroundColor: "#F9FAFB",
    borderBottomWidth: 1,
    borderBottomColor: "#E5E7EB",
  },
  tab: {
    flex: 1,
    alignItems: "center",
    paddingVertical: 12,
    borderBottomWidth: 2,
    borderBottomColor: "transparent",
  },
  activeTab: {
    borderBottomColor: "#DC2626",
  },
  tabLabel: {
    fontSize: 12,
    color: "#9CA3AF",
    marginTop: 4,
  },
  activeTabLabel: {
    color: "#DC2626",
    fontWeight: "600",
  },
  tabContent: {
    flex: 1,
    padding: 15,
  },
  welcomeCard: {
    backgroundColor: "#3B82F6",
    padding: 20,
    borderRadius: 12,
    marginBottom: 20,
  },
  welcomeTitle: {
    fontSize: 20,
    fontWeight: "bold",
    color: "#fff",
    marginBottom: 5,
  },
  welcomeSubtitle: {
    fontSize: 14,
    color: "#DBEAFE",
  },
  progressGrid: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginBottom: 20,
  },
  progressCard: {
    backgroundColor: "#F9FAFB",
    padding: 15,
    borderRadius: 12,
    width: (width - 45) / 2,
    alignItems: "center",
  },
  progressHeader: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 10,
  },
  progressTitle: {
    fontSize: 14,
    fontWeight: "600",
    marginLeft: 5,
    color: "#374151",
  },
  progressValue: {
    fontSize: 24,
    fontWeight: "bold",
    color: "#1F2937",
    marginBottom: 10,
  },
  progressBar: {
    marginBottom: 5,
  },
  progressSubtext: {
    fontSize: 12,
    color: "#6B7280",
  },
  section: {
    marginBottom: 20,
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: "bold",
    color: "#1F2937",
    marginBottom: 15,
  },
  lessonCard: {
    backgroundColor: "#EFF6FF",
    padding: 15,
    borderRadius: 12,
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },
  lessonInfo: {
    flex: 1,
  },
  lessonTitle: {
    fontSize: 16,
    fontWeight: "600",
    color: "#1F2937",
  },
  lessonInstructor: {
    fontSize: 14,
    color: "#6B7280",
  },
  lessonTime: {
    alignItems: "flex-end",
  },
  lessonDate: {
    fontSize: 14,
    fontWeight: "600",
    color: "#1F2937",
  },
  lessonHour: {
    fontSize: 12,
    color: "#6B7280",
  },
  objectivesList: {
    gap: 10,
  },
  objectiveItem: {
    flexDirection: "row",
    alignItems: "center",
    gap: 10,
  },
  objectiveText: {
    fontSize: 14,
    color: "#374151",
  },
  codeSection: {
    gap: 20,
  },
  questionCard: {
    backgroundColor: "#F9FAFB",
    padding: 20,
    borderRadius: 12,
  },
  questionText: {
    fontSize: 16,
    fontWeight: "600",
    color: "#1F2937",
    marginBottom: 20,
  },
  answersContainer: {
    gap: 10,
  },
  answerButton: {
    backgroundColor: "#fff",
    padding: 15,
    borderRadius: 8,
    borderWidth: 1,
    borderColor: "#E5E7EB",
  },
  answerText: {
    fontSize: 14,
    color: "#374151",
  },
  statsCard: {
    backgroundColor: "#F9FAFB",
    padding: 20,
    borderRadius: 12,
  },
  statsTitle: {
    fontSize: 16,
    fontWeight: "600",
    color: "#1F2937",
    marginBottom: 15,
  },
  statsGrid: {
    flexDirection: "row",
    justifyContent: "space-around",
  },
  statItem: {
    alignItems: "center",
  },
  statValue: {
    fontSize: 20,
    fontWeight: "bold",
    color: "#1F2937",
  },
  statLabel: {
    fontSize: 12,
    color: "#6B7280",
  },
  videosGrid: {
    gap: 15,
  },
  videoCard: {
    flexDirection: "row",
    backgroundColor: "#F9FAFB",
    borderRadius: 12,
    overflow: "hidden",
  },
  videoThumbnail: {
    width: 120,
    height: 80,
    backgroundColor: "#374151",
    alignItems: "center",
    justifyContent: "center",
  },
  videoInfo: {
    flex: 1,
    padding: 15,
  },
  videoTitle: {
    fontSize: 14,
    fontWeight: "600",
    color: "#1F2937",
    marginBottom: 5,
  },
  videoDuration: {
    fontSize: 12,
    color: "#6B7280",
    marginBottom: 10,
  },
  videoProgress: {
    marginTop: 5,
  },
  calendarSection: {
    marginBottom: 20,
  },
  calendarTitle: {
    fontSize: 16,
    fontWeight: "600",
    color: "#1F2937",
    marginBottom: 15,
  },
  calendar: {
    backgroundColor: "#F9FAFB",
    borderRadius: 12,
    padding: 15,
  },
  calendarHeader: {
    flexDirection: "row",
    justifyContent: "space-around",
    marginBottom: 10,
  },
  calendarDay: {
    fontSize: 12,
    fontWeight: "600",
    color: "#6B7280",
    textAlign: "center",
    width: 30,
  },
  calendarGrid: {
    flexDirection: "row",
    flexWrap: "wrap",
  },
  calendarDate: {
    width: (width - 60) / 7,
    height: 35,
    alignItems: "center",
    justifyContent: "center",
  },
  calendarDateText: {
    fontSize: 14,
    color: "#374151",
  },
  reservationsSection: {
    marginTop: 20,
  },
  reservationCard: {
    backgroundColor: "#EFF6FF",
    padding: 15,
    borderRadius: 12,
  },
  reservationTitle: {
    fontSize: 16,
    fontWeight: "600",
    color: "#1F2937",
    marginBottom: 5,
  },
  reservationDetails: {
    fontSize: 14,
    color: "#6B7280",
    marginBottom: 15,
  },
  reservationActions: {
    flexDirection: "row",
    gap: 10,
  },
  actionButton: {
    backgroundColor: "#fff",
    paddingHorizontal: 15,
    paddingVertical: 8,
    borderRadius: 6,
    borderWidth: 1,
    borderColor: "#D1D5DB",
  },
  actionButtonText: {
    fontSize: 12,
    color: "#374151",
    fontWeight: "500",
  },
  cancelButton: {
    borderColor: "#EF4444",
  },
  cancelButtonText: {
    color: "#EF4444",
  },
})
