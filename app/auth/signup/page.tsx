"use client"
import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Checkbox } from "@/components/ui/checkbox"
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group"
import { useToast } from "@/hooks/use-toast"
import {
  Car,
  Eye,
  EyeOff,
  Loader2,
  Upload,
  CheckCircle,
  Check,
  CreditCard,
  Calendar,
  Banknote,
  Users,
} from "lucide-react"
import Link from "next/link"
import { useRouter } from "next/navigation"

interface FormData {
  // Step 1: Personal Information
  firstName: string
  lastName: string
  email: string
  phone: string
  birthDate: string
  address: string
  password: string
  confirmPassword: string

  // Step 2: Training Selection
  licenseType: string
  trainingPackage: string

  // Step 3: Documents
  documents: {
    identity: File | null
    addressProof: File | null
    photo: File | null
    assr: File | null
  }

  // Step 4: Payment
  paymentMethod: string
  agreeToTerms: boolean
}

type FormErrors = {
  [key: string]: string | undefined;
};

const trainingPackages = {
  classic: {
    name: "Formule Classique",
    price: 890,
    description: "Code + 20h de conduite",
    features: ["Formation au code", "20h de conduite", "Support pédagogique"],
  },
  intensive: {
    name: "Formule Intensive",
    price: 1190,
    description: "Code + 30h de conduite + simulateur",
    features: ["Formation au code", "30h de conduite", "Accès simulateur", "Planning accéléré"],
    popular: true,
  },
  premium: {
    name: "Formule Premium",
    price: 1490,
    description: "Code + 40h de conduite + simulateur + suivi personnalisé",
    features: ["Formation au code", "40h de conduite", "Accès simulateur", "Suivi personnalisé", "Moniteur dédié"],
  },
}

export default function SignupPage() {
  const router = useRouter()
  const [currentStep, setCurrentStep] = useState(1)
  const [showPassword, setShowPassword] = useState(false)
  const [showConfirmPassword, setShowConfirmPassword] = useState(false)
  const [isLoading, setIsLoading] = useState(false)
  const [formData, setFormData] = useState<FormData>({
    firstName: "",
    lastName: "",
    email: "",
    phone: "",
    birthDate: "",
    address: "",
    password: "",
    confirmPassword: "",
    licenseType: "",
    trainingPackage: "",
    documents: {
      identity: null,
      addressProof: null,
      photo: null,
      assr: null,
    },
    paymentMethod: "",
    agreeToTerms: false,
  })
  const [errors, setErrors] = useState<FormErrors>({})
  const { toast } = useToast()

  const validateStep = (step: number): boolean => {
    const newErrors: FormErrors = {}

    switch (step) {
      case 1:
        if (!formData.firstName.trim()) newErrors.firstName = "Le prénom est requis"
        if (!formData.lastName.trim()) newErrors.lastName = "Le nom est requis"
        if (!formData.email) newErrors.email = "L'email est requis"
        else if (!/\S+@\S+\.\S+/.test(formData.email)) newErrors.email = "Format d'email invalide"
        if (!formData.phone) newErrors.phone = "Le téléphone est requis"
        if (!formData.birthDate) newErrors.birthDate = "La date de naissance est requise"
        if (!formData.address.trim()) newErrors.address = "L'adresse est requise"
        if (!formData.password) newErrors.password = "Le mot de passe est requis"
        else if (formData.password.length < 8) newErrors.password = "Au moins 8 caractères"
        if (formData.password !== formData.confirmPassword)
          newErrors.confirmPassword = "Les mots de passe ne correspondent pas"
        break

      case 2:
        if (!formData.licenseType) newErrors.licenseType = "Choisissez un type de permis"
        if (!formData.trainingPackage) newErrors.trainingPackage = "Choisissez une formule"
        break

      case 3:
        if (!formData.documents.identity) newErrors.identity = "Pièce d'identité requise"
        if (!formData.documents.addressProof) newErrors.addressProof = "Justificatif de domicile requis"
        if (!formData.documents.photo) newErrors.photo = "Photo d'identité requise"
        if (!formData.documents.assr) newErrors.assr = "ASSR 2 requis"
        break

      case 4:
        if (!formData.paymentMethod) newErrors.paymentMethod = "Choisissez un mode de paiement"
        if (!formData.agreeToTerms) newErrors.agreeToTerms = "Acceptez les conditions"
        break
    }

    setErrors(newErrors)
    return Object.keys(newErrors).length === 0
  }

  const handleNext = () => {
    if (validateStep(currentStep)) {
      setCurrentStep((prev) => Math.min(prev + 1, 4))
    }
  }

  const handlePrevious = () => {
    setCurrentStep((prev) => Math.max(prev - 1, 1))
  }

  const handleSubmit = async () => {
    if (!validateStep(4)) return

    setIsLoading(true)
    try {
      await new Promise((resolve) => setTimeout(resolve, 3000))
      toast({
        title: "Inscription réussie !",
        description: "Votre compte a été créé avec succès.",
      })
      router.push("/auth/confirmation")
    } catch (error) {
      toast({
        title: "Erreur",
        description: "Une erreur est survenue lors de l'inscription.",
        variant: "destructive",
      })
    } finally {
      setIsLoading(false)
    }
  }

  const handleInputChange = (field: string, value: string | boolean) => {
    setFormData((prev) => ({ ...prev, [field]: value }))
    if (errors[field]) {
      setErrors((prev) => ({ ...prev, [field]: undefined }))
    }
  }

  const handleFileUpload = (type: keyof FormData["documents"], file: File | null) => {
    setFormData((prev) => ({
      ...prev,
      documents: { ...prev.documents, [type]: file },
    }))
    if (errors[type]) {
      setErrors((prev) => ({ ...prev, [type]: undefined }))
    }
  }

  const getSelectedPackage = () => {
    return formData.trainingPackage ? trainingPackages[formData.trainingPackage as keyof typeof trainingPackages] : null
  }

  const renderStepContent = () => {
    switch (currentStep) {
      case 1:
        return (
          <div className="space-y-6">
            <div className="text-center space-y-2">
              <h2 className="text-2xl font-bold text-gray-900">Informations personnelles</h2>
              <p className="text-gray-600">Renseignez vos informations de base</p>
            </div>

            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label htmlFor="firstName">Prénom *</Label>
                <Input
                  id="firstName"
                  placeholder="Votre prénom"
                  value={formData.firstName}
                  onChange={(e) => handleInputChange("firstName", e.target.value)}
                  className={errors.firstName ? "border-red-500" : ""}
                />
                {errors.firstName && <p className="text-sm text-red-500">{errors.firstName}</p>}
              </div>
              <div className="space-y-2">
                <Label htmlFor="lastName">Nom *</Label>
                <Input
                  id="lastName"
                  placeholder="Votre nom"
                  value={formData.lastName}
                  onChange={(e) => handleInputChange("lastName", e.target.value)}
                  className={errors.lastName ? "border-red-500" : ""}
                />
                {errors.lastName && <p className="text-sm text-red-500">{errors.lastName}</p>}
              </div>
            </div>

            <div className="space-y-2">
              <Label htmlFor="email">Email *</Label>
              <Input
                id="email"
                type="email"
                placeholder="votre.email@exemple.com"
                value={formData.email}
                onChange={(e) => handleInputChange("email", e.target.value)}
                className={errors.email ? "border-red-500" : ""}
              />
              {errors.email && <p className="text-sm text-red-500">{errors.email}</p>}
            </div>

            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label htmlFor="phone">Téléphone *</Label>
                <Input
                  id="phone"
                  placeholder="06 13 80 93 92"
                  value={formData.phone}
                  onChange={(e) => handleInputChange("phone", e.target.value)}
                  className={errors.phone ? "border-red-500" : ""}
                />
                {errors.phone && <p className="text-sm text-red-500">{errors.phone}</p>}
              </div>
              <div className="space-y-2">
                <Label htmlFor="birthDate">Date de naissance *</Label>
                <Input
                  id="birthDate"
                  type="date"
                  value={formData.birthDate}
                  onChange={(e) => handleInputChange("birthDate", e.target.value)}
                  className={errors.birthDate ? "border-red-500" : ""}
                />
                {errors.birthDate && <p className="text-sm text-red-500">{errors.birthDate}</p>}
              </div>
            </div>

            <div className="space-y-2">
              <Label htmlFor="address">Adresse complète *</Label>
              <Input
                id="address"
                placeholder="300 localhost 127, computer"
                value={formData.address}
                onChange={(e) => handleInputChange("address", e.target.value)}
                className={errors.address ? "border-red-500" : ""}
              />
              {errors.address && <p className="text-sm text-red-500">{errors.address}</p>}
            </div>

            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label htmlFor="password">Mot de passe *</Label>
                <div className="relative">
                  <Input
                    id="password"
                    type={showPassword ? "text" : "password"}
                    placeholder="Créez un mot de passe"
                    value={formData.password}
                    onChange={(e) => handleInputChange("password", e.target.value)}
                    className={errors.password ? "border-red-500" : ""}
                  />
                  <Button
                    type="button"
                    variant="ghost"
                    size="sm"
                    className="absolute right-0 top-0 h-full px-3"
                    onClick={() => setShowPassword(!showPassword)}
                  >
                    {showPassword ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
                  </Button>
                </div>
                {errors.password && <p className="text-sm text-red-500">{errors.password}</p>}
              </div>
              <div className="space-y-2">
                <Label htmlFor="confirmPassword">Confirmer le mot de passe *</Label>
                <div className="relative">
                  <Input
                    id="confirmPassword"
                    type={showConfirmPassword ? "text" : "password"}
                    placeholder="Confirmez le mot de passe"
                    value={formData.confirmPassword}
                    onChange={(e) => handleInputChange("confirmPassword", e.target.value)}
                    className={errors.confirmPassword ? "border-red-500" : ""}
                  />
                  <Button
                    type="button"
                    variant="ghost"
                    size="sm"
                    className="absolute right-0 top-0 h-full px-3"
                    onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                  >
                    {showConfirmPassword ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
                  </Button>
                </div>
                {errors.confirmPassword && <p className="text-sm text-red-500">{errors.confirmPassword}</p>}
              </div>
            </div>
          </div>
        )

      case 2:
        return (
          <div className="space-y-6">
            <div className="text-center space-y-2">
              <h2 className="text-2xl font-bold text-gray-900">Formation souhaitée</h2>
              <p className="text-gray-600">Choisissez votre type de permis et votre formule</p>
            </div>

            <div className="space-y-4">
              <Label className="text-lg font-semibold">Type de permis *</Label>
              <RadioGroup
                value={formData.licenseType}
                onValueChange={(value) => handleInputChange("licenseType", value)}
                className="space-y-3"
              >
                <div className="flex items-center space-x-3 p-4 border rounded-lg hover:bg-gray-50">
                  <RadioGroupItem value="permis-b" id="permis-b" />
                  <Label htmlFor="permis-b" className="flex-1 cursor-pointer">
                    <div className="flex items-center space-x-3">
                      <Car className="h-5 w-5 text-blue-600" />
                      <span className="font-medium">Permis B (voiture)</span>
                    </div>
                  </Label>
                </div>
                <div className="flex items-center space-x-3 p-4 border rounded-lg hover:bg-gray-50">
                  <RadioGroupItem value="conduite-accompagnee" id="conduite-accompagnee" />
                  <Label htmlFor="conduite-accompagnee" className="flex-1 cursor-pointer">
                    <div className="flex items-center space-x-3">
                      <Users className="h-5 w-5 text-green-600" />
                      <span className="font-medium">Conduite accompagnée (AAC)</span>
                    </div>
                  </Label>
                </div>
                <div className="flex items-center space-x-3 p-4 border rounded-lg hover:bg-gray-50">
                  <RadioGroupItem value="permis-a" id="permis-a" />
                  <Label htmlFor="permis-a" className="flex-1 cursor-pointer">
                    <div className="flex items-center space-x-3">
                      <Car className="h-5 w-5 text-orange-600" />
                      <span className="font-medium">Permis A (moto)</span>
                    </div>
                  </Label>
                </div>
              </RadioGroup>
              {errors.licenseType && <p className="text-sm text-red-500">{errors.licenseType}</p>}
            </div>

            <div className="space-y-4">
              <Label className="text-lg font-semibold">Formule de formation *</Label>
              <RadioGroup
                value={formData.trainingPackage}
                onValueChange={(value) => handleInputChange("trainingPackage", value)}
                className="space-y-4"
              >
                {Object.entries(trainingPackages).map(([key, pkg]) => (
                  <div key={key} className="relative">
                    <div
                      className={`p-6 border-2 rounded-lg hover:border-blue-300 transition-colors ${
                        formData.trainingPackage === key ? "border-blue-500 bg-blue-50" : "border-gray-200"
                      }`}
                    >
                      {trainingPackages.intensive && (
                        <div className="absolute -top-3 left-4 bg-orange-500 text-white px-3 py-1 rounded-full text-sm font-medium">
                          Populaire
                        </div>
                      )}
                      <div className="flex items-start space-x-3">
                        <RadioGroupItem value={key} id={key} className="mt-1" />
                        <Label htmlFor={key} className="flex-1 cursor-pointer">
                          <div className="space-y-3">
                            <div className="flex items-center justify-between">
                              <h3 className="text-lg font-semibold text-gray-900">{pkg.name}</h3>
                              <span className="text-2xl font-bold text-blue-600">{pkg.price}€</span>
                            </div>
                            <p className="text-gray-600">{pkg.description}</p>
                            <div className="flex flex-wrap gap-2">
                              {pkg.features.map((feature, index) => (
                                <span
                                  key={index}
                                  className="inline-flex items-center px-2 py-1 bg-gray-100 text-gray-700 text-sm rounded"
                                >
                                  <Check className="h-3 w-3 mr-1 text-green-500" />
                                  {feature}
                                </span>
                              ))}
                            </div>
                          </div>
                        </Label>
                      </div>
                    </div>
                  </div>
                ))}
              </RadioGroup>
              {errors.trainingPackage && <p className="text-sm text-red-500">{errors.trainingPackage}</p>}
            </div>
          </div>
        )

      case 3:
        return (
          <div className="space-y-6">
            <div className="text-center space-y-2">
              <h2 className="text-2xl font-bold text-gray-900">Pièces justificatives</h2>
              <p className="text-gray-600">Téléchargez vos documents requis</p>
            </div>

            <div className="grid grid-cols-2 gap-6">
              <div className="space-y-2">
                <Label>Pièce d'identité *</Label>
                <div className="border-2 border-dashed border-gray-300 rounded-lg p-6 text-center hover:border-blue-400 transition-colors">
                  <input
                    type="file"
                    accept=".pdf,.jpg,.jpeg,.png"
                    onChange={(e) => handleFileUpload("identity", e.target.files?.[0] || null)}
                    className="hidden"
                    id="identity-upload"
                  />
                  <label htmlFor="identity-upload" className="cursor-pointer">
                    {formData.documents.identity ? (
                      <div className="flex items-center justify-center space-x-2 text-green-600">
                        <CheckCircle className="h-5 w-5" />
                        <span className="text-sm">{formData.documents.identity.name}</span>
                      </div>
                    ) : (
                      <div className="space-y-2">
                        <Upload className="h-8 w-8 text-gray-400 mx-auto" />
                        <p className="text-sm text-gray-600">Choisir un fichier</p>
                        <p className="text-xs text-gray-400">PDF, JPG, PNG (max 5MB)</p>
                      </div>
                    )}
                  </label>
                </div>
                {errors.identity && <p className="text-sm text-red-500">{errors.identity}</p>}
              </div>

              <div className="space-y-2">
                <Label>Justificatif de domicile *</Label>
                <div className="border-2 border-dashed border-gray-300 rounded-lg p-6 text-center hover:border-blue-400 transition-colors">
                  <input
                    type="file"
                    accept=".pdf,.jpg,.jpeg,.png"
                    onChange={(e) => handleFileUpload("addressProof", e.target.files?.[0] || null)}
                    className="hidden"
                    id="address-upload"
                  />
                  <label htmlFor="address-upload" className="cursor-pointer">
                    {formData.documents.addressProof ? (
                      <div className="flex items-center justify-center space-x-2 text-green-600">
                        <CheckCircle className="h-5 w-5" />
                        <span className="text-sm">{formData.documents.addressProof.name}</span>
                      </div>
                    ) : (
                      <div className="space-y-2">
                        <Upload className="h-8 w-8 text-gray-400 mx-auto" />
                        <p className="text-sm text-gray-600">Choisir un fichier</p>
                        <p className="text-xs text-gray-400">PDF, JPG, PNG (max 5MB)</p>
                      </div>
                    )}
                  </label>
                </div>
                {errors.addressProof && <p className="text-sm text-red-500">{errors.addressProof}</p>}
              </div>

              <div className="space-y-2">
                <Label>Photo d'identité *</Label>
                <p className="text-xs text-gray-500">Format numérique</p>
                <div className="border-2 border-dashed border-gray-300 rounded-lg p-6 text-center hover:border-blue-400 transition-colors">
                  <input
                    type="file"
                    accept=".jpg,.jpeg,.png"
                    onChange={(e) => handleFileUpload("photo", e.target.files?.[0] || null)}
                    className="hidden"
                    id="photo-upload"
                  />
                  <label htmlFor="photo-upload" className="cursor-pointer">
                    {formData.documents.photo ? (
                      <div className="flex items-center justify-center space-x-2 text-green-600">
                        <CheckCircle className="h-5 w-5" />
                        <span className="text-sm">{formData.documents.photo.name}</span>
                      </div>
                    ) : (
                      <div className="space-y-2">
                        <Upload className="h-8 w-8 text-gray-400 mx-auto" />
                        <p className="text-sm text-gray-600">Choisir un fichier</p>
                        <p className="text-xs text-gray-400">JPG, PNG (max 2MB)</p>
                      </div>
                    )}
                  </label>
                </div>
                {errors.photo && <p className="text-sm text-red-500">{errors.photo}</p>}
              </div>

              <div className="space-y-2">
                <Label>ASSR 2 *</Label>
                <p className="text-xs text-gray-500">Ou ASR si né avant 1988</p>
                <div className="border-2 border-dashed border-gray-300 rounded-lg p-6 text-center hover:border-blue-400 transition-colors">
                  <input
                    type="file"
                    accept=".pdf,.jpg,.jpeg,.png"
                    onChange={(e) => handleFileUpload("assr", e.target.files?.[0] || null)}
                    className="hidden"
                    id="assr-upload"
                  />
                  <label htmlFor="assr-upload" className="cursor-pointer">
                    {formData.documents.assr ? (
                      <div className="flex items-center justify-center space-x-2 text-green-600">
                        <CheckCircle className="h-5 w-5" />
                        <span className="text-sm">{formData.documents.assr.name}</span>
                      </div>
                    ) : (
                      <div className="space-y-2">
                        <Upload className="h-8 w-8 text-gray-400 mx-auto" />
                        <p className="text-sm text-gray-600">Choisir un fichier</p>
                        <p className="text-xs text-gray-400">PDF, JPG, PNG (max 5MB)</p>
                      </div>
                    )}
                  </label>
                </div>
                {errors.assr && <p className="text-sm text-red-500">{errors.assr}</p>}
              </div>
            </div>
          </div>
        )

      case 4:
        const selectedPackage = getSelectedPackage()
        return (
          <div className="space-y-6">
            <div className="text-center space-y-2">
              <h2 className="text-2xl font-bold text-gray-900">Mode de paiement</h2>
              <p className="text-gray-600">Choisissez votre mode de paiement</p>
            </div>

            {selectedPackage && (
              <div className="bg-blue-50 p-6 rounded-lg">
                <h3 className="font-semibold text-lg mb-2">{selectedPackage.name}</h3>
                <p className="text-gray-600 mb-4">{selectedPackage.description}</p>
                <div className="text-3xl font-bold text-blue-600">{selectedPackage.price}€</div>
              </div>
            )}

            <div className="space-y-4">
              <Label className="text-lg font-semibold">Mode de paiement *</Label>
              <RadioGroup
                value={formData.paymentMethod}
                onValueChange={(value) => handleInputChange("paymentMethod", value)}
                className="space-y-3"
              >
                <div className="flex items-center space-x-3 p-4 border rounded-lg hover:bg-gray-50">
                  <RadioGroupItem value="card" id="card" />
                  <Label htmlFor="card" className="flex-1 cursor-pointer">
                    <div className="flex items-center space-x-3">
                      <CreditCard className="h-5 w-5 text-blue-600" />
                      <div>
                        <div className="font-medium">Carte bancaire (paiement immédiat)</div>
                        <div className="text-sm text-gray-500">Paiement sécurisé par Stripe</div>
                      </div>
                    </div>
                  </Label>
                </div>
                <div className="flex items-center space-x-3 p-4 border rounded-lg hover:bg-gray-50">
                  <RadioGroupItem value="installments" id="installments" />
                  <Label htmlFor="installments" className="flex-1 cursor-pointer">
                    <div className="flex items-center space-x-3">
                      <Calendar className="h-5 w-5 text-green-600" />
                      <div>
                        <div className="font-medium">Paiement en 3 fois sans frais</div>
                        <div className="text-sm text-gray-500">
                          {selectedPackage && `${Math.round(selectedPackage.price / 3)}€ x 3 mensualités`}
                        </div>
                      </div>
                    </div>
                  </Label>
                </div>
                <div className="flex items-center space-x-3 p-4 border rounded-lg hover:bg-gray-50">
                  <RadioGroupItem value="transfer" id="transfer" />
                  <Label htmlFor="transfer" className="flex-1 cursor-pointer">
                    <div className="flex items-center space-x-3">
                      <Banknote className="h-5 w-5 text-purple-600" />
                      <div>
                        <div className="font-medium">Virement bancaire</div>
                        <div className="text-sm text-gray-500">Délai de traitement 2-3 jours</div>
                      </div>
                    </div>
                  </Label>
                </div>
              </RadioGroup>
              {errors.paymentMethod && <p className="text-sm text-red-500">{errors.paymentMethod}</p>}
            </div>

            <div className="flex items-start space-x-2">
              <Checkbox
                id="terms"
                checked={formData.agreeToTerms}
                onCheckedChange={(checked) => handleInputChange("agreeToTerms", checked as boolean)}
                className="mt-1"
              />
              <Label htmlFor="terms" className="text-sm leading-relaxed">
                J'accepte les{" "}
                <Link href="/terms" className="text-blue-600 hover:underline">
                  Conditions d'Utilisation
                </Link>{" "}
                et la{" "}
                <Link href="/privacy" className="text-blue-600 hover:underline">
                  Politique de Confidentialité
                </Link>
              </Label>
            </div>
            {errors.agreeToTerms && <p className="text-sm text-red-500">{errors.agreeToTerms}</p>}
          </div>
        )

      default:
        return null
    }
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-600 via-blue-700 to-purple-800">
      {/* Header */}
      <div className="bg-gradient-to-r from-blue-600 to-purple-700 text-white py-12">
        <div className="max-w-4xl mx-auto px-4 text-center">
          <h1 className="text-4xl font-bold mb-4">Inscription en ligne</h1>
          <p className="text-xl mb-8">Rejoignez Auto-École Neufchâtel en quelques étapes simples</p>

          <div className="flex justify-center space-x-8 text-sm">
            <div className="flex items-center space-x-2">
              <CheckCircle className="h-5 w-5 text-green-400" />
              <span>Inscription 100% en ligne</span>
            </div>
            <div className="flex items-center space-x-2">
              <CheckCircle className="h-5 w-5 text-green-400" />
              <span>Paiement sécurisé</span>
            </div>
            <div className="flex items-center space-x-2">
              <CheckCircle className="h-5 w-5 text-green-400" />
              <span>Accès immédiat au portail</span>
            </div>
          </div>
        </div>
      </div>

      <div className="max-w-4xl mx-auto px-4 py-8">
        {/* Progress Steps */}
        <div className="mb-8">
          <p className="text-center text-gray-600 mb-6">Rejoignez Auto-École Neufchâtel en quelques étapes simples</p>
          <div className="flex justify-center items-center space-x-4">
            {[1, 2, 3, 4].map((step) => (
              <div key={step} className="flex items-center">
                <div
                  className={`w-10 h-10 rounded-full flex items-center justify-center font-semibold ${
                    step === currentStep
                      ? "bg-blue-600 text-white"
                      : step < currentStep
                        ? "bg-green-500 text-white"
                        : "bg-gray-300 text-gray-600"
                  }`}
                >
                  {step < currentStep ? <Check className="h-5 w-5" /> : step}
                </div>
                {step < 4 && <div className={`w-16 h-1 mx-2 ${step < currentStep ? "bg-green-500" : "bg-gray-300"}`} />}
              </div>
            ))}
          </div>
        </div>

        {/* Form Card */}
        <Card className="border-0 shadow-2xl">
          <CardContent className="p-8">
            {renderStepContent()}

            {/* Navigation Buttons */}
            <div className="flex justify-between mt-8 pt-6 border-t">
              <Button variant="outline" onClick={handlePrevious} disabled={currentStep === 1} className="px-8">
                Précédent
              </Button>

              {currentStep < 4 ? (
                <Button
                  onClick={handleNext}
                  className="px-8 bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700"
                >
                  Suivant
                </Button>
              ) : (
                <Button
                  onClick={handleSubmit}
                  disabled={isLoading}
                  className="px-8 bg-gradient-to-r from-green-600 to-blue-600 hover:from-green-700 hover:to-blue-700"
                >
                  {isLoading ? (
                    <>
                      <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                      Finalisation...
                    </>
                  ) : (
                    "Finaliser l'inscription"
                  )}
                </Button>
              )}
            </div>
          </CardContent>
        </Card>

        {/* Footer */}
        <div className="text-center mt-8">
          <p className="text-gray-600">
            Vous avez déjà un compte ?{" "}
            <Link href="/auth/login" className="text-blue-600 hover:underline font-medium">
              Se connecter
            </Link>
          </p>
        </div>
      </div>
    </div>
  )
}
