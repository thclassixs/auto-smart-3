"use client"

import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Car, Users, Trophy, Clock, CheckCircle, Star, Phone, Mail, MapPin, ArrowRight } from "lucide-react"
import Link from "next/link"

export default function HomePage() {
  const features = [
    {
      icon: Car,
      title: "Véhicules modernes",
      description: "Flotte de véhicules récents et bien entretenus",
    },
    {
      icon: Users,
      title: "Instructeurs qualifiés",
      description: "Équipe d'instructeurs expérimentés et pédagogues",
    },
    {
      icon: Trophy,
      title: "Taux de réussite élevé",
      description: "95% de réussite à l'examen du permis de conduire",
    },
    {
      icon: Clock,
      title: "Horaires flexibles",
      description: "Cours disponibles 7j/7 selon vos disponibilités",
    },
  ]

  const packages = [
    {
      name: "Formule Classique",
      price: "890€",
      description: "Code + 20h de conduite",
      features: ["Formation au code", "20h de conduite", "Support pédagogique"],
      popular: false,
    },
    {
      name: "Formule Intensive",
      price: "1190€",
      description: "Code + 30h de conduite + simulateur",
      features: ["Formation au code", "30h de conduite", "Accès simulateur", "Planning accéléré"],
      popular: true,
    },
    {
      name: "Formule Premium",
      price: "1490€",
      description: "Code + 40h de conduite + simulateur + suivi personnalisé",
      features: ["Formation au code", "40h de conduite", "Accès simulateur", "Suivi personnalisé", "Moniteur dédié"],
      popular: false,
    },
  ]

  const testimonials = [
    {
      name: "Marie Dubois",
      rating: 5,
      comment:
        "Excellente auto-école ! J'ai eu mon permis du premier coup grâce à leurs instructeurs patients et compétents.",
    },
    {
      name: "Pierre Martin",
      rating: 5,
      comment: "Formation de qualité, véhicules en parfait état. Je recommande vivement cette auto-école.",
    },
    {
      name: "Sophie Laurent",
      rating: 5,
      comment: "Équipe très professionnelle, horaires flexibles. Parfait pour concilier travail et formation.",
    },
  ]

  return (
    <div className="min-h-screen">
      {/* Header */}
      <header className="bg-white shadow-sm border-b">
        <div className="container mx-auto px-4 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-2">
              <Car className="h-8 w-8 text-blue-600" />
              <span className="text-xl font-bold text-gray-900">Auto-École Neufchâtel</span>
            </div>
            <nav className="hidden md:flex items-center space-x-6">
              <Link href="#services" className="text-gray-600 hover:text-blue-600">
                Services
              </Link>
              <Link href="#tarifs" className="text-gray-600 hover:text-blue-600">
                Tarifs
              </Link>
              <Link href="#contact" className="text-gray-600 hover:text-blue-600">
                Contact
              </Link>
              <Link href="/auth/login">
                <Button variant="outline">Se connecter</Button>
              </Link>
              <Link href="/auth/signup">
                <Button>S'inscrire</Button>
              </Link>
            </nav>
          </div>
        </div>
      </header>

      {/* Hero Section */}
      <section className="bg-gradient-to-br from-blue-600 via-blue-700 to-purple-800 text-white py-20">
        <div className="container mx-auto px-4 text-center">
          <h1 className="text-5xl font-bold mb-6">Apprenez à conduire avec confiance</h1>
          <p className="text-xl mb-8 max-w-2xl mx-auto">
            Rejoignez notre auto-école de référence et obtenez votre permis de conduire avec nos instructeurs
            expérimentés et nos méthodes pédagogiques éprouvées.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link href="/auth/signup">
              <Button size="lg" className="bg-white text-blue-600 hover:bg-gray-100">
                Commencer maintenant
                <ArrowRight className="ml-2 h-5 w-5" />
              </Button>
            </Link>
            <Link href="/rendez-vous">
              <Button
                size="lg"
                variant="outline"
                className="border-white text-white hover:bg-white hover:text-blue-600"
              >
                Prendre rendez-vous
              </Button>
            </Link>
          </div>

          <div className="flex justify-center space-x-8 mt-12 text-sm">
            <div className="flex items-center space-x-2">
              <CheckCircle className="h-5 w-5 text-green-400" />
              <span>95% de réussite</span>
            </div>
            <div className="flex items-center space-x-2">
              <CheckCircle className="h-5 w-5 text-green-400" />
              <span>+1000 élèves formés</span>
            </div>
            <div className="flex items-center space-x-2">
              <CheckCircle className="h-5 w-5 text-green-400" />
              <span>Instructeurs diplômés</span>
            </div>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section id="services" className="py-20 bg-gray-50">
        <div className="container mx-auto px-4">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold text-gray-900 mb-4">Pourquoi nous choisir ?</h2>
            <p className="text-xl text-gray-600 max-w-2xl mx-auto">
              Découvrez les avantages qui font de notre auto-école le choix idéal pour votre formation
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {features.map((feature, index) => (
              <Card key={index} className="text-center hover:shadow-lg transition-shadow">
                <CardHeader>
                  <div className="mx-auto w-16 h-16 bg-blue-100 rounded-full flex items-center justify-center mb-4">
                    <feature.icon className="h-8 w-8 text-blue-600" />
                  </div>
                  <CardTitle className="text-xl">{feature.title}</CardTitle>
                </CardHeader>
                <CardContent>
                  <CardDescription className="text-gray-600">{feature.description}</CardDescription>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Pricing Section */}
      <section id="tarifs" className="py-20">
        <div className="container mx-auto px-4">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold text-gray-900 mb-4">Nos formules</h2>
            <p className="text-xl text-gray-600 max-w-2xl mx-auto">
              Choisissez la formule qui correspond le mieux à vos besoins et votre budget
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-6xl mx-auto">
            {packages.map((pkg, index) => (
              <Card key={index} className={`relative ${pkg.popular ? "border-blue-500 border-2" : ""}`}>
                {pkg.popular && (
                  <div className="absolute -top-3 left-1/2 transform -translate-x-1/2">
                    <Badge className="bg-blue-500 text-white">Populaire</Badge>
                  </div>
                )}
                <CardHeader className="text-center">
                  <CardTitle className="text-2xl">{pkg.name}</CardTitle>
                  <div className="text-4xl font-bold text-blue-600 my-4">{pkg.price}</div>
                  <CardDescription>{pkg.description}</CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                  <ul className="space-y-2">
                    {pkg.features.map((feature, featureIndex) => (
                      <li key={featureIndex} className="flex items-center">
                        <CheckCircle className="h-5 w-5 text-green-500 mr-2" />
                        <span>{feature}</span>
                      </li>
                    ))}
                  </ul>
                  <Link href="/auth/signup" className="block">
                    <Button className="w-full" variant={pkg.popular ? "default" : "outline"}>
                      Choisir cette formule
                    </Button>
                  </Link>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Testimonials Section */}
      <section className="py-20 bg-gray-50">
        <div className="container mx-auto px-4">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold text-gray-900 mb-4">Ce que disent nos élèves</h2>
            <p className="text-xl text-gray-600 max-w-2xl mx-auto">
              Découvrez les témoignages de nos élèves satisfaits
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-6xl mx-auto">
            {testimonials.map((testimonial, index) => (
              <Card key={index} className="hover:shadow-lg transition-shadow">
                <CardContent className="p-6">
                  <div className="flex items-center mb-4">
                    {[...Array(testimonial.rating)].map((_, i) => (
                      <Star key={i} className="h-5 w-5 text-yellow-400 fill-current" />
                    ))}
                  </div>
                  <p className="text-gray-600 mb-4">"{testimonial.comment}"</p>
                  <p className="font-semibold text-gray-900">- {testimonial.name}</p>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Contact Section */}
      <section id="contact" className="py-20">
        <div className="container mx-auto px-4">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold text-gray-900 mb-4">Contactez-nous</h2>
            <p className="text-xl text-gray-600 max-w-2xl mx-auto">Une question ? N'hésitez pas à nous contacter</p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-4xl mx-auto">
            <Card className="text-center">
              <CardContent className="p-6">
                <Phone className="h-12 w-12 text-blue-600 mx-auto mb-4" />
                <h3 className="text-xl font-semibold mb-2">Téléphone</h3>
                <p className="text-gray-600">01 23 45 67 89</p>
              </CardContent>
            </Card>

            <Card className="text-center">
              <CardContent className="p-6">
                <Mail className="h-12 w-12 text-blue-600 mx-auto mb-4" />
                <h3 className="text-xl font-semibold mb-2">Email</h3>
                <p className="text-gray-600">contact@autoecole-neufchatel.fr</p>
              </CardContent>
            </Card>

            <Card className="text-center">
              <CardContent className="p-6">
                <MapPin className="h-12 w-12 text-blue-600 mx-auto mb-4" />
                <h3 className="text-xl font-semibold mb-2">Adresse</h3>
                <p className="text-gray-600">
                  123 Rue de la République
                  <br />
                  75001 Paris
                </p>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-gray-900 text-white py-12">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
            <div>
              <div className="flex items-center space-x-2 mb-4">
                <Car className="h-6 w-6 text-blue-400" />
                <span className="text-lg font-bold">Auto-École Neufchâtel</span>
              </div>
              <p className="text-gray-400">Votre auto-école de confiance depuis plus de 20 ans.</p>
            </div>

            <div>
              <h4 className="text-lg font-semibold mb-4">Services</h4>
              <ul className="space-y-2 text-gray-400">
                <li>Permis B</li>
                <li>Conduite accompagnée</li>
                <li>Permis moto</li>
                <li>Stage de récupération</li>
              </ul>
            </div>

            <div>
              <h4 className="text-lg font-semibold mb-4">Liens utiles</h4>
              <ul className="space-y-2 text-gray-400">
                <li>
                  <Link href="/auth/login" className="hover:text-white">
                    Se connecter
                  </Link>
                </li>
                <li>
                  <Link href="/auth/signup" className="hover:text-white">
                    S'inscrire
                  </Link>
                </li>
                <li>
                  <Link href="/rendez-vous" className="hover:text-white">
                    Prendre RDV
                  </Link>
                </li>
                <li>
                  <Link href="/chatbot" className="hover:text-white">
                    Assistance
                  </Link>
                </li>
              </ul>
            </div>

            <div>
              <h4 className="text-lg font-semibold mb-4">Contact</h4>
              <div className="space-y-2 text-gray-400">
                <p>📞 01 23 45 67 89</p>
                <p>✉️ contact@autoecole-neufchatel.fr</p>
                <p>📍 123 Rue de la République, 75001 Paris</p>
              </div>
            </div>
          </div>

          <div className="border-t border-gray-800 mt-8 pt-8 text-center text-gray-400">
            <p>&copy; 2024 Auto-École Neufchâtel. Tous droits réservés.</p>
          </div>
        </div>
      </footer>
    </div>
  )
}
