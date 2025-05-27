"use client"

import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { AlertTriangle, RefreshCw, Home } from "lucide-react"
import Link from "next/link"

interface ErrorFallbackProps {
  error?: Error
  resetError?: () => void
}

export function ErrorFallback({ error, resetError }: ErrorFallbackProps) {
  return (
    <div className="min-h-screen flex items-center justify-center p-4 bg-muted">
      <Card className="w-full max-w-md">
        <CardHeader className="text-center">
          <div className="w-16 h-16 bg-destructive/10 rounded-full flex items-center justify-center mx-auto mb-4">
            <AlertTriangle className="h-8 w-8 text-destructive" />
          </div>
          <CardTitle className="text-xl">Oups ! Une erreur s'est produite</CardTitle>
          <CardDescription>
            Nous nous excusons pour ce désagrément. Veuillez réessayer ou retourner à l'accueil.
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          {error && (
            <div className="p-3 bg-muted rounded-lg">
              <p className="text-sm text-muted-foreground font-mono">{error.message}</p>
            </div>
          )}
          <div className="flex flex-col sm:flex-row gap-2">
            {resetError && (
              <Button onClick={resetError} className="flex-1">
                <RefreshCw className="h-4 w-4 mr-2" />
                Réessayer
              </Button>
            )}
            <Button variant="outline" asChild className="flex-1">
              <Link href="/">
                <Home className="h-4 w-4 mr-2" />
                Accueil
              </Link>
            </Button>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
