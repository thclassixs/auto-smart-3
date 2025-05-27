"use client"

import { useState, useRef, useEffect } from "react"
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  ScrollView,
  StyleSheet,
  KeyboardAvoidingView,
  Platform,
} from "react-native"
import { Ionicons } from "@expo/vector-icons"

export default function ChatbotScreen() {
  const [messages, setMessages] = useState([
    {
      id: 1,
      text: "Salut ! 👋 Je suis Sarah, votre assistante virtuelle de l'Auto-École Neufchâtel ! Comment puis-je vous aider ?",
      sender: "bot",
      timestamp: new Date(),
      suggestions: ["Je veux passer mon permis", "Vos tarifs ?", "Prendre un RDV", "Où êtes-vous ?"],
    },
  ])
  const [inputText, setInputText] = useState("")
  const [isTyping, setIsTyping] = useState(false)
  const scrollViewRef = useRef()

  const quickActions = [
    { icon: "calendar-outline", label: "Prendre RDV", action: "Je veux prendre un rendez-vous" },
    { icon: "book-outline", label: "Code en ligne", action: "Comment accéder au code en ligne ?" },
    { icon: "car-outline", label: "Formations", action: "Quelles formations proposez-vous ?" },
    { icon: "call-outline", label: "Appeler", action: "Je veux vous appeler" },
  ]

  const getResponse = (userMessage) => {
    const lowerMessage = userMessage.toLowerCase()

    if (lowerMessage.includes("tarif") || lowerMessage.includes("prix")) {
      return {
        text: "Nos tarifs sont très compétitifs :\n\n🚗 Permis B classique : 890€\n🚀 Formule accélérée : 1190€\n👨‍👩‍👧 Conduite accompagnée : 950€\n\nTous nos prix incluent le code ET les heures de conduite !",
        suggestions: ["Dans mon budget !", "Modes de paiement ?", "Je veux m'inscrire"],
      }
    }

    if (lowerMessage.includes("où") || lowerMessage.includes("adresse")) {
      return {
        text: "Nous sommes situés au :\n\n📍 87 rue de Neufchâtel, 51100 REIMS\n📞 03 26 87 16 77\n\nFacile d'accès en transport en commun !",
        suggestions: ["Comment venir ?", "Vos horaires ?", "Prendre RDV"],
      }
    }

    if (lowerMessage.includes("horaire")) {
      return {
        text: "Nos horaires :\n\n📅 Lundi - Vendredi : 9h00 - 19h00\n📅 Samedi : 9h00 - 17h00\n📅 Dimanche : Fermé\n\n🚗 Leçons : 8h00 - 20h00",
        suggestions: ["Parfait !", "Leçons le soir ?", "Prendre RDV"],
      }
    }

    return {
      text: "Je ne suis pas sûre de comprendre... 🤔 Pouvez-vous reformuler ?",
      suggestions: ["Vos tarifs ?", "Prendre un RDV", "Où êtes-vous ?"],
    }
  }

  const sendMessage = (text) => {
    if (!text.trim()) return

    const userMessage = {
      id: messages.length + 1,
      text: text,
      sender: "user",
      timestamp: new Date(),
    }

    setMessages((prev) => [...prev, userMessage])
    setInputText("")
    setIsTyping(true)

    setTimeout(() => {
      const response = getResponse(text)
      const botMessage = {
        id: messages.length + 2,
        text: response.text,
        sender: "bot",
        timestamp: new Date(),
        suggestions: response.suggestions,
      }

      setMessages((prev) => [...prev, botMessage])
      setIsTyping(false)
    }, 1000)
  }

  useEffect(() => {
    scrollViewRef.current?.scrollToEnd({ animated: true })
  }, [messages])

  return (
    <KeyboardAvoidingView style={styles.container} behavior={Platform.OS === "ios" ? "padding" : "height"}>
      {/* Quick Actions */}
      <View style={styles.quickActions}>
        <ScrollView horizontal showsHorizontalScrollIndicator={false}>
          {quickActions.map((action, index) => (
            <TouchableOpacity key={index} style={styles.quickActionButton} onPress={() => sendMessage(action.action)}>
              <Ionicons name={action.icon} size={20} color="#DC2626" />
              <Text style={styles.quickActionText}>{action.label}</Text>
            </TouchableOpacity>
          ))}
        </ScrollView>
      </View>

      {/* Messages */}
      <ScrollView ref={scrollViewRef} style={styles.messagesContainer} showsVerticalScrollIndicator={false}>
        {messages.map((message) => (
          <View key={message.id} style={styles.messageWrapper}>
            <View style={[styles.messageBubble, message.sender === "user" ? styles.userMessage : styles.botMessage]}>
              <Text
                style={[styles.messageText, message.sender === "user" ? styles.userMessageText : styles.botMessageText]}
              >
                {message.text}
              </Text>
            </View>

            {message.suggestions && (
              <View style={styles.suggestionsContainer}>
                {message.suggestions.map((suggestion, index) => (
                  <TouchableOpacity key={index} style={styles.suggestionButton} onPress={() => sendMessage(suggestion)}>
                    <Text style={styles.suggestionText}>{suggestion}</Text>
                  </TouchableOpacity>
                ))}
              </View>
            )}
          </View>
        ))}

        {isTyping && (
          <View style={styles.typingIndicator}>
            <Text style={styles.typingText}>Sarah écrit...</Text>
          </View>
        )}
      </ScrollView>

      {/* Input */}
      <View style={styles.inputContainer}>
        <TextInput
          style={styles.textInput}
          value={inputText}
          onChangeText={setInputText}
          placeholder="Tapez votre message..."
          multiline
          maxLength={500}
        />
        <TouchableOpacity style={styles.sendButton} onPress={() => sendMessage(inputText)} disabled={!inputText.trim()}>
          <Ionicons name="send" size={20} color="#fff" />
        </TouchableOpacity>
      </View>
    </KeyboardAvoidingView>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
  },
  quickActions: {
    backgroundColor: "#F9FAFB",
    paddingVertical: 10,
    borderBottomWidth: 1,
    borderBottomColor: "#E5E7EB",
  },
  quickActionButton: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "#fff",
    paddingHorizontal: 12,
    paddingVertical: 8,
    borderRadius: 20,
    marginHorizontal: 5,
    borderWidth: 1,
    borderColor: "#DC2626",
  },
  quickActionText: {
    marginLeft: 5,
    fontSize: 12,
    color: "#DC2626",
    fontWeight: "500",
  },
  messagesContainer: {
    flex: 1,
    padding: 15,
  },
  messageWrapper: {
    marginBottom: 15,
  },
  messageBubble: {
    maxWidth: "80%",
    padding: 12,
    borderRadius: 18,
    marginBottom: 5,
  },
  userMessage: {
    backgroundColor: "#3B82F6",
    alignSelf: "flex-end",
    borderBottomRightRadius: 4,
  },
  botMessage: {
    backgroundColor: "#F3F4F6",
    alignSelf: "flex-start",
    borderBottomLeftRadius: 4,
  },
  messageText: {
    fontSize: 14,
    lineHeight: 20,
  },
  userMessageText: {
    color: "#fff",
  },
  botMessageText: {
    color: "#1F2937",
  },
  suggestionsContainer: {
    flexDirection: "row",
    flexWrap: "wrap",
    marginTop: 5,
  },
  suggestionButton: {
    backgroundColor: "#EFF6FF",
    paddingHorizontal: 10,
    paddingVertical: 6,
    borderRadius: 12,
    marginRight: 8,
    marginBottom: 5,
    borderWidth: 1,
    borderColor: "#DBEAFE",
  },
  suggestionText: {
    fontSize: 12,
    color: "#1D4ED8",
  },
  typingIndicator: {
    alignSelf: "flex-start",
    backgroundColor: "#F3F4F6",
    paddingHorizontal: 12,
    paddingVertical: 8,
    borderRadius: 18,
    borderBottomLeftRadius: 4,
  },
  typingText: {
    fontSize: 12,
    color: "#6B7280",
    fontStyle: "italic",
  },
  inputContainer: {
    flexDirection: "row",
    padding: 15,
    backgroundColor: "#F9FAFB",
    alignItems: "flex-end",
  },
  textInput: {
    flex: 1,
    borderWidth: 1,
    borderColor: "#D1D5DB",
    borderRadius: 20,
    paddingHorizontal: 15,
    paddingVertical: 10,
    backgroundColor: "#fff",
    maxHeight: 100,
    fontSize: 14,
  },
  sendButton: {
    backgroundColor: "#DC2626",
    width: 40,
    height: 40,
    borderRadius: 20,
    alignItems: "center",
    justifyContent: "center",
    marginLeft: 10,
  },
})
