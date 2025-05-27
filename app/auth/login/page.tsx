"use client"

import type React from "react"

import { useState } from "react"
import { useRouter } from "next/navigation"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Alert, AlertDescription } from "@/components/ui/alert"
import { Eye, EyeOff, User, Lock, ArrowRight, CheckCircle } from "lucide-react"
import { validateAndAuthenticateUser } from "@/lib/mock-users"
import { setAuthToken } from "@/lib/auth"
import Image from "next/image"

export default function LoginPage() {
  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")
  const [showPassword, setShowPassword] = useState(false)
  const [error, setError] = useState("")
  const [isLoading, setIsLoading] = useState(false)
  const router = useRouter()

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setError("")
    setIsLoading(true)

    try {
      const authResult = validateAndAuthenticateUser(email, password)

      if (authResult.success && authResult.user && authResult.token && authResult.redirectUrl) {
        // Store authentication token
        setAuthToken(authResult.token)

        // Store user data in localStorage for the session
        localStorage.setItem(
          "user",
          JSON.stringify({
            id: authResult.user.id,
            firstName: authResult.user.firstName,
            lastName: authResult.user.lastName,
            email: authResult.user.email,
            role: authResult.user.role,
            profilePicture: authResult.user.profilePicture,
          }),
        )

        // Redirect based on role
        router.push(authResult.redirectUrl)
      } else {
        setError(authResult.error || "Erreur de connexion")
      }
    } catch (err) {
      setError("Une erreur est survenue lors de la connexion")
    } finally {
      setIsLoading(false)
    }
  }

  const testCredentials = [
    {
      role: "Administrateur",
      email: "admin@test.com",
      password: "Admin123!",
      color: "bg-red-50 border-red-200",
      icon: "👨‍💼",
    },
    {
      role: "Étudiant",
      email: "student@test.com",
      password: "Student123!",
      color: "bg-blue-50 border-blue-200",
      icon: "👨‍🎓",
    },
    {
      role: "Instructeur",
      email: "instructor@test.com",
      password: "Instructor123!",
      color: "bg-green-50 border-green-200",
      icon: "👨‍🏫",
    },
  ]

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-blue-50 flex items-center justify-center p-4">
      <div className="w-full max-w-6xl grid lg:grid-cols-2 gap-8 items-center">
        {/* Left side - Login Form */}
        <Card className="w-full max-w-md mx-auto shadow-xl border-0 bg-white/80 backdrop-blur-sm">
          <CardHeader className="space-y-1 text-center pb-8">
            <div className="mx-auto w-16 h-16 bg-blue-600 rounded-full flex items-center justify-center mb-4">
              <User className="w-8 h-8 text-white" />
            </div>
            <CardTitle className="text-2xl font-bold text-gray-900">Connexion</CardTitle>
            <CardDescription className="text-gray-600">Accédez à votre espace personnel</CardDescription>
          </CardHeader>

          <CardContent className="space-y-6">
            <form onSubmit={handleSubmit} className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="email" className="text-sm font-medium text-gray-700">
                  Adresse email
                </Label>
                <div className="relative">
                  <User className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
                  <Input
                    id="email"
                    type="email"
                    placeholder="votre@email.com"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    className="pl-10 h-12 border-gray-200 focus:border-blue-500 focus:ring-blue-500"
                    required
                  />
                </div>
              </div>

              <div className="space-y-2">
                <Label htmlFor="password" className="text-sm font-medium text-gray-700">
                  Mot de passe
                </Label>
                <div className="relative">
                  <Lock className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
                  <Input
                    id="password"
                    type={showPassword ? "text" : "password"}
                    placeholder="••••••••"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    className="pl-10 pr-10 h-12 border-gray-200 focus:border-blue-500 focus:ring-blue-500"
                    required
                  />
                  <button
                    type="button"
                    onClick={() => setShowPassword(!showPassword)}
                    className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-gray-600"
                  >
                    {showPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                  </button>
                </div>
              </div>

              {error && (
                <Alert className="border-red-200 bg-red-50">
                  <AlertDescription className="text-red-700">{error}</AlertDescription>
                </Alert>
              )}

              <Button
                type="submit"
                className="w-full h-12 bg-blue-600 hover:bg-blue-700 text-white font-medium transition-all duration-200 transform hover:scale-[1.02]"
                disabled={isLoading}
              >
                {isLoading ? (
                  <div className="flex items-center space-x-2">
                    <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin" />
                    <span>Connexion...</span>
                  </div>
                ) : (
                  <div className="flex items-center space-x-2">
                    <span>Se connecter</span>
                    <ArrowRight className="w-4 h-4" />
                  </div>
                )}
              </Button>
            </form>
          </CardContent>
        </Card>

        {/* Right side - Test Credentials */}
        <div className="space-y-6">
          <div className="text-center lg:text-left">
            <h2 className="text-3xl font-bold text-gray-900 mb-2">Comptes de test</h2>
            <p className="text-gray-600 mb-6">
              Utilisez ces identifiants pour tester l'application avec différents rôles
            </p>
          </div>

          <div className="space-y-4">
            {testCredentials.map((cred, index) => (
              <Card
                key={index}
                className={`${cred.color} border-2 transition-all duration-200 hover:shadow-md cursor-pointer`}
                onClick={() => {
                  setEmail(cred.email)
                  setPassword(cred.password)
                }}
              >
                <CardContent className="p-4">
                  <div className="flex items-center space-x-4">
                    <div className="text-2xl">{cred.icon}</div>
                    <div className="flex-1">
                      <h3 className="font-semibold text-gray-900">{cred.role}</h3>
                      <p className="text-sm text-gray-600 font-mono">{cred.email}</p>
                      <p className="text-sm text-gray-600 font-mono">{cred.password}</p>
                    </div>
                    <CheckCircle className="w-5 h-5 text-green-600" />
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>

          <div className="bg-blue-50 border border-blue-200 rounded-lg p-4">
            <h4 className="font-semibold text-blue-900 mb-2">🔄 Redirection automatique</h4>
            <ul className="text-sm text-blue-800 space-y-1">
              <li>
                • <strong>Admin/Instructeur:</strong> /dashboard
              </li>
              <li>
                • <strong>Étudiant:</strong> /portail
              </li>
            </ul>
          </div>

          {/* Profile Picture Preview */}
          <div className="bg-gray-50 border border-gray-200 rounded-lg p-4">
            <h4 className="font-semibold text-gray-900 mb-3">👤 Photo de profil par défaut</h4>
            <div className="flex items-center space-x-3">
              <Image
                src="/images/default-profile.jpg"
                alt="Photo de profil par défaut"
                width={60}
                height={60}
                className="rounded-full object-cover border-2 border-gray-200"
              />
              <div className="text-sm text-gray-600">
                <p>Tous les utilisateurs de test</p>
                <p>utilisent cette photo par défaut</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
