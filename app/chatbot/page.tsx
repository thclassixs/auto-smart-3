import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Textarea } from "@/components/ui/textarea"
import Link from "next/link"
import { X } from "lucide-react"
import { ArrowLeft } from "lucide-react"

export default function ChatbotPage() {
  return (
    <div className="flex flex-col h-screen">
      {/* Header */}
      <header className="bg-white shadow-sm border-b">
        <div className="container mx-auto px-4 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-4">
              <Link href="/">
                <Button variant="outline" size="sm">
                  <ArrowLeft className="h-4 w-4 mr-2" />
                  Retour
                </Button>
              </Link>
              <div className="flex items-center space-x-3">
                <div className="w-12 h-12 bg-gradient-to-r from-red-500 to-red-600 rounded-full flex items-center justify-center overflow-hidden">
                  <img
                    src="/placeholder.svg?height=48&width=48"
                    alt="Sarah - Assistante IA"
                    className="w-full h-full object-cover"
                  />
                </div>
                <div>
                  <h1 className="text-2xl font-bold text-gray-900">Sarah - Assistant Neufchâtel</h1>
                  <div className="flex items-center space-x-2">
                    <div className="w-2 h-2 bg-green-500 rounded-full animate-pulse"></div>
                    <span className="text-sm text-gray-600">En ligne • Répond en moins de 30 secondes</span>
                  </div>
                </div>
              </div>
            </div>
            <Button variant="outline" asChild>
              <Link href="/">
                <X className="h-4 w-4 mr-2" />
                Fermer
              </Link>
            </Button>
          </div>
        </div>
      </header>

      {/* Chatbot Content */}
      <div className="flex-grow bg-gray-100">
        <div className="container mx-auto px-4 py-8">
          <Card className="w-full max-w-2xl mx-auto">
            <CardHeader>
              <CardTitle>Posez votre question</CardTitle>
              <CardDescription>Notre IA est là pour vous répondre.</CardDescription>
            </CardHeader>
            <CardContent>
              <Textarea placeholder="Entrez votre question ici..." className="w-full" />
            </CardContent>
            <CardFooter>
              <Button>Envoyer</Button>
            </CardFooter>
          </Card>
        </div>
      </div>
    </div>
  )
}
