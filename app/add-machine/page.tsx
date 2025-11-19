"use client"

import type React from "react"
import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { ArrowLeft, Upload, MapPin, Wrench, DollarSign, Clock, Weight, CheckCircle } from "lucide-react"
import Link from "next/link"
import { useRouter } from "next/navigation"

export default function AddMachinePage() {
  const router = useRouter()
  const [formData, setFormData] = useState({
    name: "",
    model: "",
    category: "",
    location: "",
    weight: "",
    hourlyPrice: "",
    currentHours: "",
    status: "",
    description: "",
    specifications: "",
  })

  const [uploadedImage, setUploadedImage] = useState<string | null>(null)
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [showSuccess, setShowSuccess] = useState(false)

  const handleInputChange = (field: string, value: string) => {
    setFormData((prev) => ({ ...prev, [field]: value }))
  }

  const handleImageUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0]
    if (file) {
      const reader = new FileReader()
      reader.onload = (event) => {
        setUploadedImage(event.target?.result as string)
      }
      reader.readAsDataURL(file)
    }
  }

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    setIsSubmitting(true)

    // Create new machine object
    const newMachine = {
      id: Date.now().toString(),
      name: formData.name,
      model: formData.model,
      category: formData.category,
      location: formData.location,
      weight: `${formData.weight} ton`,
      hourlyPrice: Number.parseInt(formData.hourlyPrice.replace(/,/g, "")),
      currentHours: Number.parseInt(formData.currentHours),
      status: formData.status,
      description: formData.description,
      specifications: formData.specifications,
      image: uploadedImage || "/heavy-machinery.png",
      rating: 4.5 + Math.random() * 0.5, // Random rating between 4.5-5.0
      reviews: Math.floor(Math.random() * 50) + 10, // Random reviews 10-60
    }

    // Get existing machines from localStorage
    const existingMachines = JSON.parse(localStorage.getItem("userMachines") || "[]")

    // Add new machine
    existingMachines.push(newMachine)

    // Save back to localStorage
    localStorage.setItem("userMachines", JSON.stringify(existingMachines))

    // Show success message
    setTimeout(() => {
      setIsSubmitting(false)
      setShowSuccess(true)

      // Redirect after 2 seconds
      setTimeout(() => {
        router.push("/")
      }, 2000)
    }, 1500)
  }

  if (showSuccess) {
    return (
      <div className="min-h-screen bg-background flex items-center justify-center">
        <Card className="max-w-md mx-auto text-center">
          <CardContent className="pt-6">
            <CheckCircle className="w-16 h-16 text-green-500 mx-auto mb-4" />
            <h2 className="text-2xl font-bold text-foreground mb-2">¡Máquina Agregada Exitosamente!</h2>
            <p className="text-muted-foreground mb-4">
              Tu {formData.name} ha sido publicada en el mercado y está disponible para alquiler.
            </p>
            <p className="text-sm text-muted-foreground">Redirigiendo al mercado...</p>
          </CardContent>
        </Card>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <header className="border-b border-border bg-card">
        <div className="container mx-auto px-4 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-4">
              <Link href="/" className="flex items-center gap-2 text-muted-foreground hover:text-foreground">
                <ArrowLeft className="w-5 h-5" />
                Volver al Mercado
              </Link>
              <div className="w-px h-6 bg-border" />
              <div className="flex items-center gap-2">
                <img src="/maquisoluciones-logo.png" alt="MaquiSoluciones Logo" className="w-8 h-8" />
                <h1 className="text-xl font-bold text-foreground">MakiLibre</h1>
              </div>
            </div>
            <Button variant="outline" size="sm">
              Guardar Borrador
            </Button>
          </div>
        </div>
      </header>

      <div className="container mx-auto px-4 py-8">
        <div className="max-w-4xl mx-auto">
          {/* Page Header */}
          <div className="mb-8">
            <h1 className="text-3xl font-bold text-foreground mb-2">Agregar Nueva Máquina</h1>
            <p className="text-muted-foreground text-lg">
              Registra tu maquinaria pesada para comenzar a recibir solicitudes de alquiler de contratistas.
            </p>
          </div>

          <form onSubmit={handleSubmit} className="space-y-8">
            {/* Basic Information */}
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Wrench className="w-5 h-5" />
                  Información Básica
                </CardTitle>
                <CardDescription>Proporciona detalles esenciales sobre tu maquinaria</CardDescription>
              </CardHeader>
              <CardContent className="space-y-6">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div className="space-y-2">
                    <Label htmlFor="name">Nombre de la Máquina *</Label>
                    <Input
                      id="name"
                      placeholder="ej., Excavadora Caterpillar 320"
                      value={formData.name}
                      onChange={(e) => handleInputChange("name", e.target.value)}
                      required
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="model">Modelo *</Label>
                    <Input
                      id="model"
                      placeholder="ej., CAT 320D2L"
                      value={formData.model}
                      onChange={(e) => handleInputChange("model", e.target.value)}
                      required
                    />
                  </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div className="space-y-2">
                    <Label htmlFor="category">Categoría *</Label>
                    <Select value={formData.category} onValueChange={(value) => handleInputChange("category", value)}>
                      <SelectTrigger>
                        <SelectValue placeholder="Seleccionar categoría de máquina" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="excavator">Excavadora</SelectItem>
                        <SelectItem value="bulldozer">Bulldozer</SelectItem>
                        <SelectItem value="crane">Grúa</SelectItem>
                        <SelectItem value="loader">Cargadora</SelectItem>
                        <SelectItem value="grader">Motoniveladora</SelectItem>
                        <SelectItem value="compactor">Compactadora</SelectItem>
                        <SelectItem value="dump-truck">Volqueta</SelectItem>
                        <SelectItem value="other">Otro</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="status">Estado Actual *</Label>
                    <Select value={formData.status} onValueChange={(value) => handleInputChange("status", value)}>
                      <SelectTrigger>
                        <SelectValue placeholder="Seleccionar estado operacional" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="available">Disponible para Alquiler</SelectItem>
                        <SelectItem value="in-use">Actualmente en Uso</SelectItem>
                        <SelectItem value="maintenance">En Mantenimiento</SelectItem>
                        <SelectItem value="inactive">Inactiva</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                </div>

                <div className="space-y-2">
                  <Label htmlFor="description">Descripción</Label>
                  <Textarea
                    id="description"
                    placeholder="Describe el estado de tu máquina, mantenimiento reciente, características especiales..."
                    value={formData.description}
                    onChange={(e) => handleInputChange("description", e.target.value)}
                    rows={3}
                  />
                </div>
              </CardContent>
            </Card>

            {/* Location & Specifications */}
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <MapPin className="w-5 h-5" />
                  Ubicación y Especificaciones
                </CardTitle>
                <CardDescription>Especifica dónde se encuentra la máquina y sus detalles técnicos</CardDescription>
              </CardHeader>
              <CardContent className="space-y-6">
                <div className="space-y-2">
                  <Label htmlFor="location">Ubicación *</Label>
                  <Input
                    id="location"
                    placeholder="ej., Bogotá, Cundinamarca, Colombia"
                    value={formData.location}
                    onChange={(e) => handleInputChange("location", e.target.value)}
                    required
                  />
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div className="space-y-2">
                    <Label htmlFor="weight" className="flex items-center gap-2">
                      <Weight className="w-4 h-4" />
                      Peso Operacional *
                    </Label>
                    <div className="relative">
                      <Input
                        id="weight"
                        placeholder="20"
                        value={formData.weight}
                        onChange={(e) => handleInputChange("weight", e.target.value)}
                        required
                      />
                      <span className="absolute right-3 top-1/2 transform -translate-y-1/2 text-muted-foreground">
                        toneladas
                      </span>
                    </div>
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="currentHours" className="flex items-center gap-2">
                      <Clock className="w-4 h-4" />
                      Horómetro Actual *
                    </Label>
                    <div className="relative">
                      <Input
                        id="currentHours"
                        placeholder="2450"
                        value={formData.currentHours}
                        onChange={(e) => handleInputChange("currentHours", e.target.value)}
                        required
                      />
                      <span className="absolute right-3 top-1/2 transform -translate-y-1/2 text-muted-foreground">
                        hrs
                      </span>
                    </div>
                  </div>
                </div>

                <div className="space-y-2">
                  <Label htmlFor="specifications">Especificaciones Técnicas</Label>
                  <Textarea
                    id="specifications"
                    placeholder="Potencia del motor, capacidad del balde, alcance máximo, flujo hidráulico, etc."
                    value={formData.specifications}
                    onChange={(e) => handleInputChange("specifications", e.target.value)}
                    rows={3}
                  />
                </div>
              </CardContent>
            </Card>

            {/* Pricing */}
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <DollarSign className="w-5 h-5" />
                  Información de Precios
                </CardTitle>
                <CardDescription>Establece tu tarifa por hora y términos mínimos de contrato</CardDescription>
              </CardHeader>
              <CardContent className="space-y-6">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div className="space-y-2">
                    <Label htmlFor="hourlyPrice">Tarifa por Hora *</Label>
                    <div className="relative">
                      <span className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground">
                        ₡
                      </span>
                      <Input
                        id="hourlyPrice"
                        placeholder="280,000"
                        className="pl-8"
                        value={formData.hourlyPrice}
                        onChange={(e) => handleInputChange("hourlyPrice", e.target.value)}
                        required
                      />
                      <span className="absolute right-3 top-1/2 transform -translate-y-1/2 text-muted-foreground">
                        COP/hr
                      </span>
                    </div>
                  </div>
                  <div className="space-y-2">
                    <Label>Contrato Mínimo</Label>
                    <div className="flex items-center gap-2">
                      <Input placeholder="100" className="flex-1" />
                      <span className="text-muted-foreground">horas</span>
                    </div>
                  </div>
                </div>

                <div className="bg-muted p-4 rounded-lg">
                  <h4 className="font-medium text-foreground mb-2">Proyección de Ingresos</h4>
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-4 text-sm">
                    <div>
                      <span className="text-muted-foreground">Valor Contrato Mínimo:</span>
                      <div className="font-bold text-lg text-primary">
                        ₡
                        {formData.hourlyPrice
                          ? (Number.parseInt(formData.hourlyPrice.replace(/,/g, "")) * 100).toLocaleString()
                          : "0"}{" "}
                        COP
                      </div>
                    </div>
                    <div>
                      <span className="text-muted-foreground">Potencial Mensual (200hrs):</span>
                      <div className="font-bold text-lg text-primary">
                        ₡
                        {formData.hourlyPrice
                          ? (Number.parseInt(formData.hourlyPrice.replace(/,/g, "")) * 200).toLocaleString()
                          : "0"}{" "}
                        COP
                      </div>
                    </div>
                    <div>
                      <span className="text-muted-foreground">Potencial Anual (2000hrs):</span>
                      <div className="font-bold text-lg text-primary">
                        ₡
                        {formData.hourlyPrice
                          ? (Number.parseInt(formData.hourlyPrice.replace(/,/g, "")) * 2000).toLocaleString()
                          : "0"}{" "}
                        COP
                      </div>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Upload className="w-5 h-5" />
                  Fotos de la Máquina
                </CardTitle>
                <CardDescription>
                  Sube fotos de alta calidad de tu maquinaria (recomendado: 5-10 imágenes)
                </CardDescription>
              </CardHeader>
              <CardContent>
                {uploadedImage ? (
                  <div className="space-y-4">
                    <div className="relative">
                      <img
                        src={uploadedImage || "/placeholder.svg"}
                        alt="Imagen subida"
                        className="w-full h-64 object-cover rounded-lg border"
                      />
                      <Button
                        type="button"
                        variant="outline"
                        size="sm"
                        className="absolute top-2 right-2 bg-transparent"
                        onClick={() => setUploadedImage(null)}
                      >
                        Cambiar Imagen
                      </Button>
                    </div>
                    <p className="text-sm text-green-600">✓ Imagen cargada exitosamente</p>
                  </div>
                ) : (
                  <div className="border-2 border-dashed border-border rounded-lg p-8 text-center">
                    <Upload className="w-12 h-12 text-muted-foreground mx-auto mb-4" />
                    <h4 className="text-lg font-medium text-foreground mb-2">Subir Fotos de la Máquina</h4>
                    <p className="text-muted-foreground mb-4">
                      Arrastra y suelta imágenes aquí, o haz clic para navegar
                    </p>
                    <input
                      type="file"
                      accept="image/*"
                      onChange={handleImageUpload}
                      className="hidden"
                      id="image-upload"
                    />
                    <Button
                      type="button"
                      variant="outline"
                      onClick={() => document.getElementById("image-upload")?.click()}
                    >
                      Elegir Archivos
                    </Button>
                    <p className="text-sm text-muted-foreground mt-2">
                      Formatos soportados: JPG, PNG, WebP (máx 10MB cada uno)
                    </p>
                  </div>
                )}
              </CardContent>
            </Card>

            <div className="flex flex-col sm:flex-row gap-4 justify-end">
              <Button variant="outline" type="button" size="lg">
                Guardar Borrador
              </Button>
              <Button type="submit" size="lg" className="bg-accent hover:bg-accent/90" disabled={isSubmitting}>
                {isSubmitting ? "Publicando..." : "Publicar Máquina"}
              </Button>
            </div>
          </form>
        </div>
      </div>
    </div>
  )
}
