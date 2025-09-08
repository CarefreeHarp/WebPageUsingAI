"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Checkbox } from "@/components/ui/checkbox"
import { ArrowLeft, FileText, Users, Calendar, DollarSign, Shield, Send } from "lucide-react"
import Link from "next/link"

export default function NewContractPage() {
  const [contractData, setContractData] = useState({
    template: "",
    contractorName: "",
    contractorEmail: "",
    contractorPhone: "",
    machine: "",
    startDate: "",
    endDate: "",
    hourlyRate: "",
    minimumHours: "",
    totalHours: "",
    location: "",
    specialTerms: "",
    insuranceRequired: true,
    maintenanceIncluded: false,
    operatorIncluded: false,
  })

  const handleInputChange = (field: string, value: string | boolean) => {
    setContractData((prev) => ({ ...prev, [field]: value }))
  }

  const calculateTotalValue = () => {
    const rate = Number.parseFloat(contractData.hourlyRate) || 0
    const hours = Number.parseFloat(contractData.totalHours) || 0
    return rate * hours
  }

  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <header className="border-b border-border bg-card">
        <div className="container mx-auto px-4 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-4">
              <Link href="/contracts" className="flex items-center gap-2 text-muted-foreground hover:text-foreground">
                <ArrowLeft className="w-5 h-5" />
                Volver a Contratos
              </Link>
              <div className="w-px h-6 bg-border" />
              <div className="flex items-center gap-2">
                <div className="w-8 h-8 bg-primary rounded-lg flex items-center justify-center">
                  <FileText className="w-5 h-5 text-primary-foreground" />
                </div>
                <h1 className="text-xl font-bold text-foreground">Crear Nuevo Contrato</h1>
              </div>
            </div>
            <div className="flex items-center gap-3">
              <Button variant="outline" size="sm">
                Guardar Borrador
              </Button>
              <Button size="sm" className="bg-accent hover:bg-accent/90">
                <Send className="w-4 h-4 mr-2" />
                Enviar para Firma
              </Button>
            </div>
          </div>
        </div>
      </header>

      <div className="container mx-auto px-4 py-6 max-w-4xl">
        <div className="space-y-8">
          {/* Contract Template Selection */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <FileText className="w-5 h-5" />
                Plantilla de Contrato
              </CardTitle>
              <CardDescription>Elige una plantilla o comienza desde cero</CardDescription>
            </CardHeader>
            <CardContent>
              <Select value={contractData.template} onValueChange={(value) => handleInputChange("template", value)}>
                <SelectTrigger>
                  <SelectValue placeholder="Seleccionar una plantilla de contrato" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="standard">Alquiler de Equipo Estándar</SelectItem>
                  <SelectItem value="long-term">Contrato de Proyecto a Largo Plazo</SelectItem>
                  <SelectItem value="emergency">Acuerdo de Alquiler de Emergencia</SelectItem>
                  <SelectItem value="custom">Contrato Personalizado</SelectItem>
                </SelectContent>
              </Select>
            </CardContent>
          </Card>

          {/* Contractor Information */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Users className="w-5 h-5" />
                Información del Contratista
              </CardTitle>
              <CardDescription>Detalles de la parte contratante</CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="space-y-2">
                  <Label htmlFor="contractorName">Nombre de Empresa/Contratista *</Label>
                  <Input
                    id="contractorName"
                    placeholder="ej., Constructora ABC S.A.S"
                    value={contractData.contractorName}
                    onChange={(e) => handleInputChange("contractorName", e.target.value)}
                    required
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="contractorEmail">Dirección de Email *</Label>
                  <Input
                    id="contractorEmail"
                    type="email"
                    placeholder="contacto@constructora-abc.com"
                    value={contractData.contractorEmail}
                    onChange={(e) => handleInputChange("contractorEmail", e.target.value)}
                    required
                  />
                </div>
              </div>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="space-y-2">
                  <Label htmlFor="contractorPhone">Número de Teléfono</Label>
                  <Input
                    id="contractorPhone"
                    placeholder="+57 300 123 4567"
                    value={contractData.contractorPhone}
                    onChange={(e) => handleInputChange("contractorPhone", e.target.value)}
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="location">Ubicación del Proyecto *</Label>
                  <Input
                    id="location"
                    placeholder="Bogotá, Cundinamarca, Colombia"
                    value={contractData.location}
                    onChange={(e) => handleInputChange("location", e.target.value)}
                    required
                  />
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Equipment and Terms */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Calendar className="w-5 h-5" />
                Equipo y Términos de Alquiler
              </CardTitle>
              <CardDescription>Especifica el equipo y condiciones de alquiler</CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="space-y-2">
                <Label htmlFor="machine">Seleccionar Máquina *</Label>
                <Select value={contractData.machine} onValueChange={(value) => handleInputChange("machine", value)}>
                  <SelectTrigger>
                    <SelectValue placeholder="Elegir equipo para alquiler" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="cat-320-001">Excavadora CAT 320 - 001 (Disponible)</SelectItem>
                    <SelectItem value="kom-d65-002">Bulldozer Komatsu D65 - 002 (Disponible)</SelectItem>
                    <SelectItem value="lib-ltm-003">Grúa Liebherr LTM - 003 (Disponible)</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="space-y-2">
                  <Label htmlFor="startDate">Fecha de Inicio *</Label>
                  <Input
                    id="startDate"
                    type="date"
                    value={contractData.startDate}
                    onChange={(e) => handleInputChange("startDate", e.target.value)}
                    required
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="endDate">Fecha de Finalización *</Label>
                  <Input
                    id="endDate"
                    type="date"
                    value={contractData.endDate}
                    onChange={(e) => handleInputChange("endDate", e.target.value)}
                    required
                  />
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Financial Terms */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <DollarSign className="w-5 h-5" />
                Términos Financieros
              </CardTitle>
              <CardDescription>Precios y condiciones de pago</CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                <div className="space-y-2">
                  <Label htmlFor="hourlyRate">Tarifa por Hora (COP) *</Label>
                  <Input
                    id="hourlyRate"
                    placeholder="280000"
                    value={contractData.hourlyRate}
                    onChange={(e) => handleInputChange("hourlyRate", e.target.value)}
                    required
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="minimumHours">Horas Mínimas *</Label>
                  <Input
                    id="minimumHours"
                    placeholder="100"
                    value={contractData.minimumHours}
                    onChange={(e) => handleInputChange("minimumHours", e.target.value)}
                    required
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="totalHours">Horas Totales Estimadas</Label>
                  <Input
                    id="totalHours"
                    placeholder="400"
                    value={contractData.totalHours}
                    onChange={(e) => handleInputChange("totalHours", e.target.value)}
                  />
                </div>
              </div>

              {contractData.hourlyRate && contractData.totalHours && (
                <div className="bg-muted p-4 rounded-lg">
                  <h4 className="font-medium text-foreground mb-2">Cálculo del Valor del Contrato</h4>
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-4 text-sm">
                    <div>
                      <span className="text-muted-foreground">Tarifa por Hora:</span>
                      <div className="font-bold">₡{Number.parseFloat(contractData.hourlyRate).toLocaleString()}</div>
                    </div>
                    <div>
                      <span className="text-muted-foreground">Horas Totales:</span>
                      <div className="font-bold">{contractData.totalHours} hrs</div>
                    </div>
                    <div>
                      <span className="text-muted-foreground">Valor Total del Contrato:</span>
                      <div className="font-bold text-lg text-primary">
                        ₡{calculateTotalValue().toLocaleString()} COP
                      </div>
                    </div>
                  </div>
                </div>
              )}
            </CardContent>
          </Card>

          {/* Additional Terms */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Shield className="w-5 h-5" />
                Términos y Condiciones Adicionales
              </CardTitle>
              <CardDescription>Especifica condiciones adicionales del contrato y requerimientos</CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="space-y-4">
                <div className="flex items-center space-x-2">
                  <Checkbox
                    id="insuranceRequired"
                    checked={contractData.insuranceRequired}
                    onCheckedChange={(checked) => handleInputChange("insuranceRequired", checked as boolean)}
                  />
                  <Label
                    htmlFor="insuranceRequired"
                    className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
                  >
                    Cobertura de seguro del contratista requerida
                  </Label>
                </div>
                <div className="flex items-center space-x-2">
                  <Checkbox
                    id="maintenanceIncluded"
                    checked={contractData.maintenanceIncluded}
                    onCheckedChange={(checked) => handleInputChange("maintenanceIncluded", checked as boolean)}
                  />
                  <Label
                    htmlFor="maintenanceIncluded"
                    className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
                  >
                    Mantenimiento y reparaciones incluidas en el alquiler
                  </Label>
                </div>
                <div className="flex items-center space-x-2">
                  <Checkbox
                    id="operatorIncluded"
                    checked={contractData.operatorIncluded}
                    onCheckedChange={(checked) => handleInputChange("operatorIncluded", checked as boolean)}
                  />
                  <Label
                    htmlFor="operatorIncluded"
                    className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
                  >
                    Operador certificado incluido con el equipo
                  </Label>
                </div>
              </div>

              <div className="space-y-2">
                <Label htmlFor="specialTerms">Términos y Condiciones Especiales</Label>
                <Textarea
                  id="specialTerms"
                  placeholder="Agrega cualquier condición especial, términos de pago, penalidades o cláusulas adicionales..."
                  value={contractData.specialTerms}
                  onChange={(e) => handleInputChange("specialTerms", e.target.value)}
                  rows={4}
                />
              </div>
            </CardContent>
          </Card>

          {/* Action Buttons */}
          <div className="flex flex-col sm:flex-row gap-4 justify-end">
            <Button variant="outline" size="lg">
              Guardar Borrador
            </Button>
            <Button variant="outline" size="lg">
              Vista Previa del Contrato
            </Button>
            <Button size="lg" className="bg-accent hover:bg-accent/90">
              <Send className="w-4 h-4 mr-2" />
              Enviar para Firma Digital
            </Button>
          </div>
        </div>
      </div>
    </div>
  )
}
