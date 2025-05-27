"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Badge } from "@/components/ui/badge"
import { ScrollArea } from "@/components/ui/scroll-area"
import { MessageSquare, Send, Search, Clock } from "lucide-react"

export default function MessagesPage() {
  const [selectedConversation, setSelectedConversation] = useState<string | null>("sarah")
  const [newMessage, setNewMessage] = useState("")
  const [searchTerm, setSearchTerm] = useState("")

  const conversations = [
    {
      id: "sarah",
      name: "Sarah Dubois",
      role: "Instructrice",
      lastMessage: "Excellent progrès dans la leçon d'aujourd'hui !",
      time: "Il y a 2h",
      unread: 2,
      avatar: "/placeholder.svg?height=40&width=40",
    },
    {
      id: "michel",
      name: "Michel Chen",
      role: "Instructeur",
      lastMessage: "N'oubliez pas d'apporter votre permis demain",
      time: "Il y a 1j",
      unread: 0,
      avatar: "/placeholder.svg?height=40&width=40",
    },
    {
      id: "admin",
      name: "Administration",
      role: "Support",
      lastMessage: "Votre dossier a été mis à jour",
      time: "Il y a 3j",
      unread: 1,
      avatar: "/placeholder.svg?height=40&width=40",
    },
  ]

  const messages = [
    {
      id: 1,
      sender: "sarah",
      content: "Bonjour hamza ! Comment vous sentez-vous après la leçon d'hier ?",
      timestamp: "10:30",
      isOwn: false,
    },
    {
      id: 2,
      sender: "me",
      content: "Bonjour ! Je me sens beaucoup plus confiant, merci pour vos conseils !",
      timestamp: "10:35",
      isOwn: true,
    },
    {
      id: 3,
      sender: "sarah",
      content:
        "Parfait ! Continuez à pratiquer le stationnement en parallèle comme nous avons vu. Pour la prochaine fois, nous travaillerons sur les créneaux.",
      timestamp: "10:37",
      isOwn: false,
    },
    {
      id: 4,
      sender: "me",
      content: "D'accord, j'ai hâte ! À quelle heure est notre prochain rendez-vous ?",
      timestamp: "10:40",
      isOwn: true,
    },
    {
      id: 5,
      sender: "sarah",
      content: "Demain à 14h00 comme prévu. N'oubliez pas votre permis d'apprenti !",
      timestamp: "10:42",
      isOwn: false,
    },
  ]

  const handleSendMessage = () => {
    if (newMessage.trim()) {
      // Add message logic here
      setNewMessage("")
    }
  }

  const filteredConversations = conversations.filter(
    (conv) =>
      conv.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      conv.role.toLowerCase().includes(searchTerm.toLowerCase()),
  )

  return (
    <div className="p-8">
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-foreground mb-2">Messages</h1>
        <p className="text-muted-foreground">Communiquez avec vos instructeurs et l'administration</p>
      </div>

      <div className="grid lg:grid-cols-4 gap-6 h-[calc(100vh-200px)]">
        {/* Conversations List */}
        <div className="lg:col-span-1">
          <Card className="h-full">
            <CardHeader>
              <CardTitle className="flex items-center space-x-2">
                <MessageSquare className="h-5 w-5" />
                <span>Conversations</span>
              </CardTitle>
              <div className="relative">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                <Input
                  placeholder="Rechercher..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="pl-10"
                />
              </div>
            </CardHeader>
            <CardContent className="p-0">
              <ScrollArea className="h-[calc(100%-120px)]">
                <div className="space-y-1 p-4">
                  {filteredConversations.map((conversation) => (
                    <div
                      key={conversation.id}
                      onClick={() => setSelectedConversation(conversation.id)}
                      className={`p-3 rounded-lg cursor-pointer transition-colors ${
                        selectedConversation === conversation.id
                          ? "bg-primary/10 border border-primary/20"
                          : "hover:bg-muted/50"
                      }`}
                    >
                      <div className="flex items-center space-x-3">
                        <Avatar className="h-10 w-10">
                          <AvatarImage src={conversation.avatar || "/placeholder.svg"} />
                          <AvatarFallback>
                            {conversation.name
                              .split(" ")
                              .map((n) => n[0])
                              .join("")}
                          </AvatarFallback>
                        </Avatar>
                        <div className="flex-1 min-w-0">
                          <div className="flex items-center justify-between">
                            <h3 className="font-medium text-sm truncate">{conversation.name}</h3>
                            {conversation.unread > 0 && (
                              <Badge variant="destructive" className="text-xs">
                                {conversation.unread}
                              </Badge>
                            )}
                          </div>
                          <Badge variant="outline" className="text-xs mb-1">
                            {conversation.role}
                          </Badge>
                          <p className="text-xs text-muted-foreground truncate">{conversation.lastMessage}</p>
                          <p className="text-xs text-muted-foreground">{conversation.time}</p>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </ScrollArea>
            </CardContent>
          </Card>
        </div>

        {/* Chat Area */}
        <div className="lg:col-span-3">
          <Card className="h-full flex flex-col">
            {selectedConversation ? (
              <>
                {/* Chat Header */}
                <CardHeader className="border-b">
                  <div className="flex items-center space-x-3">
                    <Avatar className="h-10 w-10">
                      <AvatarImage src="/placeholder.svg?height=40&width=40" />
                      <AvatarFallback>SD</AvatarFallback>
                    </Avatar>
                    <div>
                      <CardTitle className="text-lg">
                        {conversations.find((c) => c.id === selectedConversation)?.name}
                      </CardTitle>
                      <CardDescription>
                        {conversations.find((c) => c.id === selectedConversation)?.role}
                      </CardDescription>
                    </div>
                  </div>
                </CardHeader>

                {/* Messages */}
                <CardContent className="flex-1 p-0">
                  <ScrollArea className="h-[calc(100%-120px)] p-4">
                    <div className="space-y-4">
                      {messages.map((message) => (
                        <div key={message.id} className={`flex ${message.isOwn ? "justify-end" : "justify-start"}`}>
                          <div
                            className={`max-w-[70%] p-3 rounded-lg ${
                              message.isOwn ? "bg-primary text-primary-foreground" : "bg-muted text-muted-foreground"
                            }`}
                          >
                            <p className="text-sm">{message.content}</p>
                            <div className="flex items-center justify-end mt-1">
                              <Clock className="h-3 w-3 mr-1 opacity-70" />
                              <span className="text-xs opacity-70">{message.timestamp}</span>
                            </div>
                          </div>
                        </div>
                      ))}
                    </div>
                  </ScrollArea>
                </CardContent>

                {/* Message Input */}
                <div className="border-t p-4">
                  <div className="flex space-x-2">
                    <Textarea
                      placeholder="Tapez votre message..."
                      value={newMessage}
                      onChange={(e) => setNewMessage(e.target.value)}
                      className="flex-1 min-h-[40px] max-h-[120px]"
                      onKeyPress={(e) => {
                        if (e.key === "Enter" && !e.shiftKey) {
                          e.preventDefault()
                          handleSendMessage()
                        }
                      }}
                    />
                    <Button onClick={handleSendMessage} disabled={!newMessage.trim()}>
                      <Send className="h-4 w-4" />
                    </Button>
                  </div>
                </div>
              </>
            ) : (
              <div className="flex-1 flex items-center justify-center">
                <div className="text-center">
                  <MessageSquare className="h-12 w-12 text-muted-foreground mx-auto mb-4" />
                  <h3 className="text-lg font-medium text-muted-foreground">Sélectionnez une conversation</h3>
                  <p className="text-sm text-muted-foreground">Choisissez une conversation pour commencer à discuter</p>
                </div>
              </div>
            )}
          </Card>
        </div>
      </div>
    </div>
  )
}
