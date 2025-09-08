"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Badge } from "@/components/ui/badge"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import {
  FileText,
  Plus,
  Search,
  Filter,
  Download,
  Eye,
  Edit,
  CheckCircle,
  Clock,
  AlertTriangle,
  Shield,
  Users,
  DollarSign,
} from "lucide-react"
import Link from "next/link"

export default function PaginaContratos() {
  const [selectedStatus, setSelectedStatus] = useState("all")
  const [searchTerm, setSearchTerm] = useState("")

  const contracts = [
    {
      id: "CON-2024-001",
      title: "Alquiler de Excavadora - Obra de Construcción A",
      contractor: "Constructora ABC S.A.S",
      machine: "Excavadora CAT 320",
      status: "active",
      startDate: "2024-01-15",
      endDate: "2024-03-15",
      hourlyRate: 280000,
      totalHours: 400,
      completedHours: 245,
      totalValue: 112000000,
      signedDate: "2024-01-10",
    },
    {
      id: "CON-2024-002",
      title: "Alquiler de Bulldozer - Proyecto de Carretera",
      contractor: "Vías y Construcciones Ltda",
      machine: "Bulldozer Komatsu D65",
      status: "pending",
      startDate: "2024-02-01",
      endDate: "2024-04-30",
      hourlyRate: 320000,
      totalHours: 600,
      completedHours: 0,
      totalValue: 192000000,
      signedDate: null,
    },
    {
      id: "CON-2023-045",
      title: "Alquiler de Grúa - Construcción de Edificio",
      contractor: "Edificaciones del Norte",
      machine: "Grúa Liebherr LTM 1050",
      status: "completed",
      startDate: "2023-10-01",
      endDate: "2023-12-31",
      hourlyRate: 450000,
      totalHours: 500,
      completedHours: 500,
      totalValue: 225000000,
      signedDate: "2023-09-25",
    },
  ]

  const handleExportContracts = () => {
    const contractData = {
      contratos: filteredContracts,
      fecha_exportacion: new Date().toLocaleDateString("es-ES"),
      total_contratos: filteredContracts.length,
      valor_total: filteredContracts.reduce((sum, contract) => sum + contract.totalValue, 0),
    }

    const dataStr = JSON.stringify(contractData, null, 2)
    const dataBlob = new Blob([dataStr], { type: "application/json" })
    const url = URL.createObjectURL(dataBlob)
    const link = document.createElement("a")
    link.href = url
    link.download = `contratos-${new Date().toISOString().split("T")[0]}.json`
    link.click()
    URL.revokeObjectURL(url)
  }

  const handleViewContract = (contractId: string) => {
    alert(`Visualizando contrato: ${contractId}`)
  }

  const handleEditContract = (contractId: string) => {
    alert(`Editando contrato: ${contractId}`)
  }

  const handleUseTemplate = (templateName: string) => {
    alert(`Usando plantilla: ${templateName}`)
  }

  const getStatusColor = (status: string) => {
    switch (status) {
      case "active":
        return "bg-green-100 text-green-800"
      case "pending":
        return "bg-yellow-100 text-yellow-800"
      case "completed":
        return "bg-blue-100 text-blue-800"
      case "expired":
        return "bg-red-100 text-red-800"
      default:
        return "bg-gray-100 text-gray-800"
    }
  }

  const getStatusIcon = (status: string) => {
    switch (status) {
      case "active":
        return <CheckCircle className="w-4 h-4" />
      case "pending":
        return <Clock className="w-4 h-4" />
      case "completed":
        return <CheckCircle className="w-4 h-4" />
      case "expired":
        return <AlertTriangle className="w-4 h-4" />
      default:
        return <FileText className="w-4 h-4" />
    }
  }

  const getStatusText = (status: string) => {
    switch (status) {
      case "active":
        return "Activo"
      case "pending":
        return "Pendiente"
      case "completed":
        return "Completado"
      case "expired":
        return "Expirado"
      default:
        return status
    }
  }

  const filteredContracts = contracts.filter((contract) => {
    const matchesStatus = selectedStatus === "all" || contract.status === selectedStatus
    const matchesSearch =
      contract.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
      contract.contractor.toLowerCase().includes(searchTerm.toLowerCase()) ||
      contract.id.toLowerCase().includes(searchTerm.toLowerCase())
    return matchesStatus && matchesSearch
  })

  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <header className="border-b border-border bg-card">
        <div className="container mx-auto px-4 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-4">
              <Link href="/" className="flex items-center gap-2 text-muted-foreground hover:text-foreground">
                ← Volver al Panel Principal
              </Link>
              <div className="w-px h-6 bg-border" />
              <div className="flex items-center gap-2">
                <div className="w-8 h-8 bg-primary rounded-lg flex items-center justify-center">
                  <FileText className="w-5 h-5 text-primary-foreground" />
                </div>
                <h1 className="text-xl font-bold text-foreground">Contratos Digitales</h1>
              </div>
            </div>
            <div className="flex items-center gap-3">
              <Button variant="outline" size="sm" onClick={handleExportContracts}>
                <Download className="w-4 h-4 mr-2" />
                Exportar
              </Button>
              <Button size="sm" className="bg-accent hover:bg-accent/90" asChild>
                <Link href="/contracts/new">
                  <Plus className="w-4 h-4 mr-2" />
                  Nuevo Contrato
                </Link>
              </Button>
            </div>
          </div>
        </div>
      </header>

      <div className="container mx-auto px-4 py-6">
        <Tabs defaultValue="overview" className="space-y-6">
          <TabsList className="grid w-full grid-cols-4">
            <TabsTrigger value="overview">Resumen</TabsTrigger>
            <TabsTrigger value="active">Contratos Activos</TabsTrigger>
            <TabsTrigger value="templates">Plantillas</TabsTrigger>
            <TabsTrigger value="compliance">Cumplimiento</TabsTrigger>
          </TabsList>

          <TabsContent value="overview" className="space-y-6">
            {/* Contract Statistics */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
              <Card>
                <CardHeader className="pb-2">
                  <CardTitle className="text-sm font-medium text-muted-foreground">Total de Contratos</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="flex items-center gap-3">
                    <div className="text-3xl font-bold text-primary">47</div>
                    <div className="flex items-center gap-1 text-green-600">
                      <CheckCircle className="w-4 h-4" />
                      <span className="text-sm">+12%</span>
                    </div>
                  </div>
                  <p className="text-sm text-muted-foreground mt-1">vs. trimestre anterior</p>
                </CardContent>
              </Card>

              <Card>
                <CardHeader className="pb-2">
                  <CardTitle className="text-sm font-medium text-muted-foreground">Contratos Activos</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="flex items-center gap-3">
                    <div className="text-3xl font-bold text-green-600">18</div>
                    <Badge variant="secondary" className="bg-green-100 text-green-800">
                      Activo
                    </Badge>
                  </div>
                  <p className="text-sm text-muted-foreground mt-1">₡2.1B valor total</p>
                </CardContent>
              </Card>

              <Card>
                <CardHeader className="pb-2">
                  <CardTitle className="text-sm font-medium text-muted-foreground">Valor de Contratos</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="flex items-center gap-3">
                    <div className="text-3xl font-bold text-primary">₡3.8B</div>
                    <div className="flex items-center gap-1 text-green-600">
                      <DollarSign className="w-4 h-4" />
                      <span className="text-sm">+28%</span>
                    </div>
                  </div>
                  <p className="text-sm text-muted-foreground mt-1">valor total contratado</p>
                </CardContent>
              </Card>

              <Card>
                <CardHeader className="pb-2">
                  <CardTitle className="text-sm font-medium text-muted-foreground">Tasa de Cumplimiento</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="flex items-center gap-3">
                    <div className="text-3xl font-bold text-green-600">98.5%</div>
                    <div className="flex items-center gap-1 text-green-600">
                      <Shield className="w-4 h-4" />
                      <span className="text-sm">Excelente</span>
                    </div>
                  </div>
                  <p className="text-sm text-muted-foreground mt-1">cumplimiento legal</p>
                </CardContent>
              </Card>
            </div>

            {/* Recent Contract Activity */}
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Clock className="w-5 h-5" />
                  Actividad Reciente de Contratos
                </CardTitle>
                <CardDescription>Últimas actualizaciones y acciones en sus contratos</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <div className="flex items-start gap-3 p-3 border border-border rounded-lg">
                    <CheckCircle className="w-5 h-5 text-green-600 mt-0.5" />
                    <div className="flex-1">
                      <div className="font-semibold">Hito Alcanzado en Contrato CON-2024-001</div>
                      <div className="text-sm text-muted-foreground">
                        El alquiler de excavadora ha completado 245 horas (61% del contrato)
                      </div>
                      <div className="text-sm text-green-600">Hace 2 horas</div>
                    </div>
                  </div>

                  <div className="flex items-start gap-3 p-3 border border-border rounded-lg">
                    <FileText className="w-5 h-5 text-blue-600 mt-0.5" />
                    <div className="flex-1">
                      <div className="font-semibold">Nuevo Contrato Pendiente de Firma</div>
                      <div className="text-sm text-muted-foreground">
                        CON-2024-002 esperando firma del contratista Vías y Construcciones
                      </div>
                      <div className="text-sm text-yellow-600">Hace 1 día</div>
                    </div>
                  </div>

                  <div className="flex items-start gap-3 p-3 border border-border rounded-lg">
                    <AlertTriangle className="w-5 h-5 text-yellow-600 mt-0.5" />
                    <div className="flex-1">
                      <div className="font-semibold">Enmienda de Contrato Requerida</div>
                      <div className="text-sm text-muted-foreground">
                        CON-2023-045 necesita extensión debido a retrasos climáticos
                      </div>
                      <div className="text-sm text-yellow-600">Hace 3 días</div>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="active" className="space-y-6">
            {/* Filters and Search */}
            <div className="flex flex-col sm:flex-row gap-4">
              <div className="flex-1">
                <div className="relative">
                  <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground w-4 h-4" />
                  <Input
                    placeholder="Buscar contratos, contratistas o máquinas..."
                    className="pl-10"
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                  />
                </div>
              </div>
              <div className="flex gap-2">
                <Select value={selectedStatus} onValueChange={setSelectedStatus}>
                  <SelectTrigger className="w-40">
                    <Filter className="w-4 h-4 mr-2" />
                    <SelectValue placeholder="Estado" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="all">Todos los Estados</SelectItem>
                    <SelectItem value="active">Activo</SelectItem>
                    <SelectItem value="pending">Pendiente</SelectItem>
                    <SelectItem value="completed">Completado</SelectItem>
                    <SelectItem value="expired">Expirado</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </div>

            {/* Contracts List */}
            <div className="space-y-4">
              {filteredContracts.map((contract) => (
                <Card key={contract.id} className="hover:shadow-md transition-shadow">
                  <CardContent className="p-6">
                    <div className="flex items-start justify-between mb-4">
                      <div className="flex-1">
                        <div className="flex items-center gap-3 mb-2">
                          <h3 className="text-lg font-semibold text-foreground">{contract.title}</h3>
                          <Badge className={getStatusColor(contract.status)}>
                            {getStatusIcon(contract.status)}
                            <span className="ml-1">{getStatusText(contract.status)}</span>
                          </Badge>
                        </div>
                        <div className="text-sm text-muted-foreground mb-1">
                          ID del Contrato: {contract.id} • {contract.contractor}
                        </div>
                        <div className="text-sm text-muted-foreground">Máquina: {contract.machine}</div>
                      </div>
                      <div className="flex gap-2">
                        <Button variant="outline" size="sm" onClick={() => handleViewContract(contract.id)}>
                          <Eye className="w-4 h-4 mr-2" />
                          Ver
                        </Button>
                        <Button variant="outline" size="sm" onClick={() => handleEditContract(contract.id)}>
                          <Edit className="w-4 h-4 mr-2" />
                          Editar
                        </Button>
                      </div>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-4">
                      <div>
                        <Label className="text-sm text-muted-foreground">Duración</Label>
                        <div className="font-semibold">
                          {contract.startDate} a {contract.endDate}
                        </div>
                      </div>
                      <div>
                        <Label className="text-sm text-muted-foreground">Tarifa por Hora</Label>
                        <div className="font-semibold">₡{contract.hourlyRate.toLocaleString()}</div>
                      </div>
                      <div>
                        <Label className="text-sm text-muted-foreground">Progreso</Label>
                        <div className="font-semibold">
                          {contract.completedHours} / {contract.totalHours} horas
                        </div>
                      </div>
                      <div>
                        <Label className="text-sm text-muted-foreground">Valor Total</Label>
                        <div className="font-semibold text-primary">₡{(contract.totalValue / 1000000).toFixed(1)}M</div>
                      </div>
                    </div>

                    {contract.status === "active" && (
                      <div className="space-y-2">
                        <div className="flex justify-between text-sm">
                          <span>Progreso del Contrato</span>
                          <span>{Math.round((contract.completedHours / contract.totalHours) * 100)}%</span>
                        </div>
                        <div className="w-full bg-secondary rounded-full h-2">
                          <div
                            className="bg-primary h-2 rounded-full transition-all"
                            style={{
                              width: `${(contract.completedHours / contract.totalHours) * 100}%`,
                            }}
                          />
                        </div>
                      </div>
                    )}
                  </CardContent>
                </Card>
              ))}
            </div>
          </TabsContent>

          <TabsContent value="templates" className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <FileText className="w-5 h-5" />
                  Plantillas de Contratos
                </CardTitle>
                <CardDescription>
                  Plantillas de contratos preconfiguradas para diferentes tipos de alquileres de maquinaria
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                  <Card className="border-2 border-dashed border-border hover:border-accent transition-colors cursor-pointer">
                    <CardContent className="p-6 text-center">
                      <Plus className="w-12 h-12 text-muted-foreground mx-auto mb-4" />
                      <h3 className="font-semibold mb-2">Crear Nueva Plantilla</h3>
                      <p className="text-sm text-muted-foreground">
                        Construya una plantilla de contrato personalizada para sus necesidades específicas
                      </p>
                    </CardContent>
                  </Card>

                  <Card className="hover:shadow-md transition-shadow cursor-pointer">
                    <CardContent className="p-6">
                      <div className="w-12 h-12 bg-blue-100 rounded-lg flex items-center justify-center mb-4">
                        <FileText className="w-6 h-6 text-blue-600" />
                      </div>
                      <h3 className="font-semibold mb-2">Alquiler Estándar de Excavadora</h3>
                      <p className="text-sm text-muted-foreground mb-4">
                        Términos estándar para alquileres de excavadoras con facturación por horas
                      </p>
                      <div className="flex gap-2">
                        <Button
                          variant="outline"
                          size="sm"
                          className="flex-1 bg-transparent"
                          onClick={() => handleUseTemplate("Alquiler Estándar de Excavadora")}
                        >
                          Usar Plantilla
                        </Button>
                        <Button variant="outline" size="sm">
                          <Edit className="w-4 h-4" />
                        </Button>
                      </div>
                    </CardContent>
                  </Card>

                  <Card className="hover:shadow-md transition-shadow cursor-pointer">
                    <CardContent className="p-6">
                      <div className="w-12 h-12 bg-green-100 rounded-lg flex items-center justify-center mb-4">
                        <FileText className="w-6 h-6 text-green-600" />
                      </div>
                      <h3 className="font-semibold mb-2">Contrato de Proyecto a Largo Plazo</h3>
                      <p className="text-sm text-muted-foreground mb-4">
                        Contratos extendidos con pagos por hitos y cláusulas de mantenimiento
                      </p>
                      <div className="flex gap-2">
                        <Button
                          variant="outline"
                          size="sm"
                          className="flex-1 bg-transparent"
                          onClick={() => handleUseTemplate("Contrato de Proyecto a Largo Plazo")}
                        >
                          Usar Plantilla
                        </Button>
                        <Button variant="outline" size="sm">
                          <Edit className="w-4 h-4" />
                        </Button>
                      </div>
                    </CardContent>
                  </Card>

                  <Card className="hover:shadow-md transition-shadow cursor-pointer">
                    <CardContent className="p-6">
                      <div className="w-12 h-12 bg-purple-100 rounded-lg flex items-center justify-center mb-4">
                        <FileText className="w-6 h-6 text-purple-600" />
                      </div>
                      <h3 className="font-semibold mb-2">Acuerdo de Alquiler de Emergencia</h3>
                      <p className="text-sm text-muted-foreground mb-4">
                        Contratos de despliegue rápido para necesidades urgentes de construcción
                      </p>
                      <div className="flex gap-2">
                        <Button
                          variant="outline"
                          size="sm"
                          className="flex-1 bg-transparent"
                          onClick={() => handleUseTemplate("Acuerdo de Alquiler de Emergencia")}
                        >
                          Usar Plantilla
                        </Button>
                        <Button variant="outline" size="sm">
                          <Edit className="w-4 h-4" />
                        </Button>
                      </div>
                    </CardContent>
                  </Card>
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="compliance" className="space-y-6">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <Shield className="w-5 h-5" />
                    Estado de Cumplimiento Legal
                  </CardTitle>
                  <CardDescription>Estado de cumplimiento regulatorio y validación legal</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    <div className="flex items-center justify-between p-3 border border-border rounded-lg">
                      <div className="flex items-center gap-3">
                        <CheckCircle className="w-5 h-5 text-green-600" />
                        <div>
                          <div className="font-semibold">Cumplimiento de Firma Digital</div>
                          <div className="text-sm text-muted-foreground">
                            Cumple con la ley colombiana de firma electrónica
                          </div>
                        </div>
                      </div>
                      <Badge variant="secondary" className="bg-green-100 text-green-800">
                        Cumple
                      </Badge>
                    </div>

                    <div className="flex items-center justify-between p-3 border border-border rounded-lg">
                      <div className="flex items-center gap-3">
                        <CheckCircle className="w-5 h-5 text-green-600" />
                        <div>
                          <div className="font-semibold">Validación de Términos del Contrato</div>
                          <div className="text-sm text-muted-foreground">Proceso de revisión y aprobación legal</div>
                        </div>
                      </div>
                      <Badge variant="secondary" className="bg-green-100 text-green-800">
                        Validado
                      </Badge>
                    </div>

                    <div className="flex items-center justify-between p-3 border border-border rounded-lg">
                      <div className="flex items-center gap-3">
                        <CheckCircle className="w-5 h-5 text-green-600" />
                        <div>
                          <div className="font-semibold">Protección de Datos (GDPR)</div>
                          <div className="text-sm text-muted-foreground">
                            Cumplimiento en el manejo de datos personales
                          </div>
                        </div>
                      </div>
                      <Badge variant="secondary" className="bg-green-100 text-green-800">
                        Cumple
                      </Badge>
                    </div>

                    <div className="flex items-center justify-between p-3 border border-border rounded-lg">
                      <div className="flex items-center gap-3">
                        <AlertTriangle className="w-5 h-5 text-yellow-600" />
                        <div>
                          <div className="font-semibold">Requisitos de Seguro</div>
                          <div className="text-sm text-muted-foreground">
                            Verificar cobertura de seguro del contratista
                          </div>
                        </div>
                      </div>
                      <Badge variant="secondary" className="bg-yellow-100 text-yellow-800">
                        Revisión Requerida
                      </Badge>
                    </div>
                  </div>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <Users className="w-5 h-5" />
                    Resolución de Disputas
                  </CardTitle>
                  <CardDescription>Disputas contractuales y mecanismos de resolución</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    <div className="text-center p-6 border border-border rounded-lg">
                      <CheckCircle className="w-12 h-12 text-green-600 mx-auto mb-4" />
                      <h3 className="font-semibold text-green-800 mb-2">Sin Disputas Activas</h3>
                      <p className="text-sm text-muted-foreground">
                        Todos los contratos están operando sin problemas sin disputas reportadas
                      </p>
                    </div>

                    <div className="space-y-3">
                      <h4 className="font-semibold">Características de Prevención de Disputas</h4>
                      <div className="space-y-2 text-sm">
                        <div className="flex items-center gap-2">
                          <CheckCircle className="w-4 h-4 text-green-600" />
                          <span>Seguimiento automatizado de horas y facturación</span>
                        </div>
                        <div className="flex items-center gap-2">
                          <CheckCircle className="w-4 h-4 text-green-600" />
                          <span>Monitoreo en tiempo real del rendimiento del contrato</span>
                        </div>
                        <div className="flex items-center gap-2">
                          <CheckCircle className="w-4 h-4 text-green-600" />
                          <span>Evidencia digital y pistas de auditoría</span>
                        </div>
                        <div className="flex items-center gap-2">
                          <CheckCircle className="w-4 h-4 text-green-600" />
                          <span>Canales de comunicación transparentes</span>
                        </div>
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>
          </TabsContent>
        </Tabs>
      </div>
    </div>
  )
}
