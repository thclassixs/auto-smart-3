"use client"

import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { CheckCircle, Download, Calendar, Mail, Phone, MapPin, Car, Clock } from "lucide-react"
import Link from "next/link"

export default function ConfirmationPage() {
  const handlePrint = () => {
    window.print()
  }

  const studentData = {
    firstName: "hamza",
    lastName: "bensaleh",
    email: "hamza.bensaleh@email.com",
    phone: "06 13 80 93 92",
    address: "300 localhost 127, computer",
    birthDate: "09/07/2001",
    licenseType: "Permis B (voiture)",
    package: "Formule Intensive",
    price: "349€",
    registrationDate: new Date().toLocaleDateString("fr-FR"),
    studentId: "DS2024001234",
  }

  return (
    <div className="min-h-screen bg-gray-50 py-8">
      <div className="max-w-4xl mx-auto px-4">
        {/* Success Header */}
        <div className="text-center mb-8">
          <CheckCircle className="h-16 w-16 text-green-500 mx-auto mb-4" />
          <h1 className="text-3xl font-bold text-gray-900 mb-2">Inscription Confirmée !</h1>
          <p className="text-gray-600">Votre compte a été créé avec succès. Voici votre confirmation d'inscription.</p>
        </div>

        {/* Printable Confirmation */}
        <Card className="border-0 shadow-xl print:shadow-none print:border">
          <CardHeader className="bg-gradient-to-r from-blue-600 to-purple-600 text-white print:bg-gray-100 print:text-black">
            <div className="flex items-center justify-between">
              <div>
                <CardTitle className="text-2xl">Confirmation d'Inscription</CardTitle>
                <p className="text-blue-100 print:text-gray-600">Auto-École Neufchâtel</p>
              </div>
              <div className="text-right">
                <p className="text-sm">N° d'inscription</p>
                <p className="font-bold text-lg">{studentData.studentId}</p>
              </div>
            </div>
          </CardHeader>

          <CardContent className="p-8 space-y-8">
            {/* Student Information */}
            <div>
              <h3 className="text-lg font-semibold mb-4 flex items-center">
                <CheckCircle className="h-5 w-5 text-green-500 mr-2" />
                Informations de l'élève
              </h3>
              <div className="grid grid-cols-2 gap-6">
                <div className="space-y-3">
                  <div className="flex items-center space-x-3">
                    <span className="font-medium text-gray-600 w-24">Nom :</span>
                    <span>
                      {studentData.firstName} {studentData.lastName}
                    </span>
                  </div>
                  <div className="flex items-center space-x-3">
                    <Mail className="h-4 w-4 text-gray-400" />
                    <span className="font-medium text-gray-600 w-20">Email :</span>
                    <span>{studentData.email}</span>
                  </div>
                  <div className="flex items-center space-x-3">
                    <Phone className="h-4 w-4 text-gray-400" />
                    <span className="font-medium text-gray-600 w-20">Téléphone :</span>
                    <span>{studentData.phone}</span>
                  </div>
                </div>
                <div className="space-y-3">
                  <div className="flex items-center space-x-3">
                    <Calendar className="h-4 w-4 text-gray-400" />
                    <span className="font-medium text-gray-600 w-24">Naissance :</span>
                    <span>{studentData.birthDate}</span>
                  </div>
                  <div className="flex items-start space-x-3">
                    <MapPin className="h-4 w-4 text-gray-400 mt-1" />
                    <span className="font-medium text-gray-600 w-20">Adresse :</span>
                    <span className="flex-1">{studentData.address}</span>
                  </div>
                </div>
              </div>
            </div>

            {/* Training Information */}
            <div className="border-t pt-6">
              <h3 className="text-lg font-semibold mb-4 flex items-center">
                <Car className="h-5 w-5 text-blue-500 mr-2" />
                Formation choisie
              </h3>
              <div className="bg-blue-50 p-6 rounded-lg">
                <div className="grid grid-cols-2 gap-6">
                  <div>
                    <p className="font-medium text-gray-600 mb-1">Type de permis</p>
                    <p className="text-lg font-semibold">{studentData.licenseType}</p>
                  </div>
                  <div>
                    <p className="font-medium text-gray-600 mb-1">Formule</p>
                    <p className="text-lg font-semibold">{studentData.package}</p>
                  </div>
                </div>
                <div className="mt-4 pt-4 border-t border-blue-200">
                  <div className="flex justify-between items-center">
                    <span className="font-medium text-gray-600">Montant total :</span>
                    <span className="text-2xl font-bold text-blue-600">{studentData.price}</span>
                  </div>
                </div>
              </div>
            </div>

            {/* Next Steps */}
            <div className="border-t pt-6">
              <h3 className="text-lg font-semibold mb-4 flex items-center">
                <Clock className="h-5 w-5 text-orange-500 mr-2" />
                Prochaines étapes
              </h3>
              <div className="space-y-4">
                <div className="flex items-start space-x-3">
                  <div className="w-6 h-6 bg-blue-600 text-white rounded-full flex items-center justify-center text-sm font-bold">
                    1
                  </div>
                  <div>
                    <p className="font-medium">Vérification des documents</p>
                    <p className="text-sm text-gray-600">Nos équipes vont vérifier vos documents sous 24-48h</p>
                  </div>
                </div>
                <div className="flex items-start space-x-3">
                  <div className="w-6 h-6 bg-blue-600 text-white rounded-full flex items-center justify-center text-sm font-bold">
                    2
                  </div>
                  <div>
                    <p className="font-medium">Accès au portail élève</p>
                    <p className="text-sm text-gray-600">Vous recevrez vos identifiants par email</p>
                  </div>
                </div>
                <div className="flex items-start space-x-3">
                  <div className="w-6 h-6 bg-blue-600 text-white rounded-full flex items-center justify-center text-sm font-bold">
                    3
                  </div>
                  <div>
                    <p className="font-medium">Premier rendez-vous</p>
                    <p className="text-sm text-gray-600">Planification de votre première leçon</p>
                  </div>
                </div>
              </div>
            </div>

            {/* Contact Information */}
            <div className="border-t pt-6 bg-gray-50 -mx-8 px-8 py-6">
              <h3 className="text-lg font-semibold mb-4">Contact Auto-École Neufchâtel</h3>
              <div className="grid grid-cols-2 gap-6 text-sm">
                <div>
                  <p className="font-medium">Adresse</p>
                  <p>123 Avenue de la République</p>
                  <p>75011 Paris</p>
                </div>
                <div>
                  <p className="font-medium">Contact</p>
                  <p>Tél : 01 23 45 67 89</p>
                  <p>Email : contact@autoecole-neufchatel.fr</p>
                </div>
              </div>
            </div>

            {/* Footer */}
            <div className="text-center text-sm text-gray-500 border-t pt-6">
              <p>Date d'inscription : {studentData.registrationDate}</p>
              <p>Ce document fait foi de votre inscription à l'auto-école.</p>
            </div>
          </CardContent>
        </Card>

        {/* Action Buttons */}
        <div className="flex justify-center space-x-4 mt-8 print:hidden">
          <Button onClick={handlePrint} variant="outline" size="lg">
            <Download className="h-4 w-4 mr-2" />
            Imprimer / Télécharger
          </Button>
          <Button asChild size="lg" className="bg-gradient-to-r from-blue-600 to-purple-600">
            <Link href="/portail">Accéder au tableau de bord</Link>
          </Button>
        </div>
      </div>
    </div>
  )
}
