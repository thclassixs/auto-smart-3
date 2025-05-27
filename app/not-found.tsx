"use client"

import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Home, ArrowLeft } from "lucide-react"
import Link from "next/link"

export default function NotFound() {
  return (
    <div className="min-h-screen flex items-center justify-center p-4 bg-muted">
      <Card className="w-full max-w-md text-center">
        <CardHeader>
          <div className="text-6xl font-bold text-primary mb-4">404</div>
          <CardTitle className="text-2xl">Page non trouvée</CardTitle>
          <CardDescription>Désolé, la page que vous recherchez n'existe pas ou a été déplacée.</CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="flex flex-col sm:flex-row gap-2">
            <Button asChild className="flex-1">
              <Link href="/">
                <Home className="h-4 w-4 mr-2" />
                Retour à l'accueil
              </Link>
            </Button>
            <Button variant="outline" onClick={() => window.history.back()} className="flex-1">
              <ArrowLeft className="h-4 w-4 mr-2" />
              Page précédente
            </Button>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
