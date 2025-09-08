"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Badge } from "@/components/ui/badge"
import { Textarea } from "@/components/ui/textarea"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import {
  Clock,
  Play,
  Square,
  Wrench,
  AlertTriangle,
  CheckCircle,
  Calendar,
  Timer,
  Fuel,
  MapPin,
  Camera,
} from "lucide-react"

export default function OperatorDashboard() {
  const [isWorking, setIsWorking] = useState(false)
  const [currentSession, setCurrentSession] = useState<{
    startTime: string
    startHours: string
    machine: string
  } | null>(null)

  const [logData, setLogData] = useState({
    endHours: "",
    fuelLevel: "",
    condition: "",
    notes: "",
    issues: "",
  })

  const handleStartWork = () => {
    const now = new Date()
    setCurrentSession({
      startTime: now.toLocaleTimeString(),
      startHours: "",
      machine: "CAT-320-001",
    })
    setIsWorking(true)
  }

  const handleEndWork = () => {
    setIsWorking(false)
    setCurrentSession(null)
    setLogData({
      endHours: "",
      fuelLevel: "",
      condition: "",
      notes: "",
      issues: "",
    })
  }

  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <header className="border-b border-border bg-card">
        <div className="container mx-auto px-4 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2">
              <div className="w-8 h-8 bg-primary rounded-lg flex items-center justify-center">
                <Wrench className="w-5 h-5 text-primary-foreground" />
              </div>
              <div>
                <h1 className="text-xl font-bold text-foreground">Panel del Operador</h1>
                <p className="text-sm text-muted-foreground">Carlos Rodríguez - ID: OP-001</p>
              </div>
            </div>
            <Badge variant={isWorking ? "default" : "secondary"} className="px-3 py-1">
              {isWorking ? "Trabajando" : "Disponible"}
            </Badge>
          </div>
        </div>
      </header>

      <div className="container mx-auto px-4 py-6 max-w-4xl">
        {/* Current Assignment */}
        <Card className="mb-6">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <MapPin className="w-5 h-5" />
              Asignación Actual
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <div>
                <Label className="text-sm text-muted-foreground">Máquina</Label>
                <div className="font-semibold">Excavadora Caterpillar 320</div>
                <div className="text-sm text-muted-foreground">CAT-320-001</div>
              </div>
              <div>
                <Label className="text-sm text-muted-foreground">Ubicación</Label>
                <div className="font-semibold">Obra de Construcción A</div>
                <div className="text-sm text-muted-foreground">Bogotá, Zona Norte</div>
              </div>
              <div>
                <Label className="text-sm text-muted-foreground">Contrato</Label>
                <div className="font-semibold">CON-2024-001</div>
                <div className="text-sm text-muted-foreground">Vence: 30 Ene, 2024</div>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Work Session Control */}
        <Card className="mb-6">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Timer className="w-5 h-5" />
              Sesión de Trabajo
            </CardTitle>
            <CardDescription>
              Inicia y termina tus sesiones de trabajo con lecturas precisas del horómetro
            </CardDescription>
          </CardHeader>
          <CardContent>
            {!isWorking ? (
              <div className="space-y-4">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label htmlFor="startHours">Lectura Actual del Horómetro *</Label>
                    <Input
                      id="startHours"
                      placeholder="ej., 2450.5"
                      type="number"
                      step="0.1"
                      className="text-lg font-mono"
                    />
                    <p className="text-sm text-muted-foreground">
                      Ingresa la lectura exacta de la pantalla de la máquina
                    </p>
                  </div>
                  <div className="space-y-2">
                    <Label>Inspección Pre-Trabajo</Label>
                    <Select>
                      <SelectTrigger>
                        <SelectValue placeholder="Estado de la máquina" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="excellent">Excelente - Lista para trabajar</SelectItem>
                        <SelectItem value="good">Buena - Problemas menores notados</SelectItem>
                        <SelectItem value="fair">Regular - Requiere atención</SelectItem>
                        <SelectItem value="poor">Mala - Necesita mantenimiento</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                </div>
                <Button onClick={handleStartWork} size="lg" className="w-full bg-green-600 hover:bg-green-700">
                  <Play className="w-5 h-5 mr-2" />
                  Iniciar Sesión de Trabajo
                </Button>
              </div>
            ) : (
              <div className="space-y-6">
                {/* Active Session Info */}
                <div className="bg-green-50 border border-green-200 rounded-lg p-4">
                  <div className="flex items-center gap-2 mb-2">
                    <CheckCircle className="w-5 h-5 text-green-600" />
                    <span className="font-semibold text-green-800">Sesión de Trabajo Activa</span>
                  </div>
                  <div className="grid grid-cols-2 gap-4 text-sm">
                    <div>
                      <span className="text-green-600">Iniciada:</span>
                      <div className="font-medium">{currentSession?.startTime}</div>
                    </div>
                    <div>
                      <span className="text-green-600">Duración:</span>
                      <div className="font-medium">2h 15m</div>
                    </div>
                  </div>
                </div>

                {/* End Session Form */}
                <div className="space-y-4">
                  <h4 className="font-semibold text-foreground">Finalizar Sesión de Trabajo</h4>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div className="space-y-2">
                      <Label htmlFor="endHours">Lectura Final del Horómetro *</Label>
                      <Input
                        id="endHours"
                        placeholder="ej., 2452.8"
                        type="number"
                        step="0.1"
                        className="text-lg font-mono"
                        value={logData.endHours}
                        onChange={(e) => setLogData({ ...logData, endHours: e.target.value })}
                      />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="fuelLevel">Nivel de Combustible</Label>
                      <Select
                        value={logData.fuelLevel}
                        onValueChange={(value) => setLogData({ ...logData, fuelLevel: value })}
                      >
                        <SelectTrigger>
                          <SelectValue placeholder="Seleccionar nivel de combustible" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="full">Lleno (90-100%)</SelectItem>
                          <SelectItem value="high">Alto (70-89%)</SelectItem>
                          <SelectItem value="medium">Medio (40-69%)</SelectItem>
                          <SelectItem value="low">Bajo (20-39%)</SelectItem>
                          <SelectItem value="critical">Crítico (&lt;20%)</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="condition">Estado de la Máquina</Label>
                    <Select
                      value={logData.condition}
                      onValueChange={(value) => setLogData({ ...logData, condition: value })}
                    >
                      <SelectTrigger>
                        <SelectValue placeholder="Seleccionar estado de la máquina" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="excellent">Excelente - Sin problemas</SelectItem>
                        <SelectItem value="good">Buena - Desgaste menor</SelectItem>
                        <SelectItem value="fair">Regular - Algunas preocupaciones</SelectItem>
                        <SelectItem value="poor">Mala - Necesita mantenimiento</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="notes">Notas de Trabajo</Label>
                    <Textarea
                      id="notes"
                      placeholder="Describe el trabajo completado, áreas trabajadas, notas de productividad..."
                      value={logData.notes}
                      onChange={(e) => setLogData({ ...logData, notes: e.target.value })}
                      rows={3}
                    />
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="issues">Problemas o Necesidades de Mantenimiento</Label>
                    <Textarea
                      id="issues"
                      placeholder="Reporta cualquier problema mecánico, sonidos inusuales, fugas o requerimientos de mantenimiento..."
                      value={logData.issues}
                      onChange={(e) => setLogData({ ...logData, issues: e.target.value })}
                      rows={2}
                    />
                  </div>

                  <div className="flex gap-3">
                    <Button variant="outline" className="flex-1 bg-transparent">
                      <Camera className="w-4 h-4 mr-2" />
                      Agregar Fotos
                    </Button>
                    <Button onClick={handleEndWork} className="flex-1 bg-red-600 hover:bg-red-700">
                      <Square className="w-4 h-4 mr-2" />
                      Finalizar Sesión
                    </Button>
                  </div>
                </div>
              </div>
            )}
          </CardContent>
        </Card>

        {/* Today's Summary */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Calendar className="w-5 h-5" />
                Resumen de Hoy
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <div className="flex justify-between items-center">
                  <span className="text-muted-foreground">Horas Totales</span>
                  <span className="text-2xl font-bold text-primary">6.5</span>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-muted-foreground">Sesiones</span>
                  <span className="font-semibold">2</span>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-muted-foreground">Eficiencia</span>
                  <Badge variant="secondary" className="bg-green-100 text-green-800">
                    95%
                  </Badge>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-muted-foreground">Ingresos Generados</span>
                  <span className="font-bold text-green-600">₡1,820,000</span>
                </div>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Fuel className="w-5 h-5" />
                Estado de la Máquina
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <div className="flex justify-between items-center">
                  <span className="text-muted-foreground">Horas Actuales</span>
                  <span className="text-xl font-mono font-bold">2,456.8</span>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-muted-foreground">Nivel de Combustible</span>
                  <Badge variant="secondary" className="bg-yellow-100 text-yellow-800">
                    Medio
                  </Badge>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-muted-foreground">Próximo Mantenimiento</span>
                  <span className="text-sm">43.2 hrs</span>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-muted-foreground">Condición</span>
                  <Badge variant="secondary" className="bg-green-100 text-green-800">
                    Excelente
                  </Badge>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Recent Sessions */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Clock className="w-5 h-5" />
              Sesiones de Trabajo Recientes
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {/* Session 1 */}
              <div className="flex items-center justify-between p-4 border border-border rounded-lg">
                <div className="flex items-center gap-4">
                  <div className="w-2 h-2 bg-green-500 rounded-full" />
                  <div>
                    <div className="font-medium">Sesión Matutina</div>
                    <div className="text-sm text-muted-foreground">08:00 - 12:30 • 4.5 horas</div>
                  </div>
                </div>
                <div className="text-right">
                  <div className="font-semibold">2,450.5 → 2,455.0</div>
                  <div className="text-sm text-muted-foreground">₡1,260,000</div>
                </div>
              </div>

              {/* Session 2 */}
              <div className="flex items-center justify-between p-4 border border-border rounded-lg">
                <div className="flex items-center gap-4">
                  <div className="w-2 h-2 bg-green-500 rounded-full" />
                  <div>
                    <div className="font-medium">Sesión Vespertina</div>
                    <div className="text-sm text-muted-foreground">13:30 - 15:30 • 2.0 horas</div>
                  </div>
                </div>
                <div className="text-right">
                  <div className="font-semibold">2,455.0 → 2,457.0</div>
                  <div className="text-sm text-muted-foreground">₡560,000</div>
                </div>
              </div>

              {/* Session 3 - Yesterday */}
              <div className="flex items-center justify-between p-4 border border-border rounded-lg opacity-60">
                <div className="flex items-center gap-4">
                  <div className="w-2 h-2 bg-gray-400 rounded-full" />
                  <div>
                    <div className="font-medium">Ayer - Día Completo</div>
                    <div className="text-sm text-muted-foreground">07:30 - 17:00 • 8.5 horas</div>
                  </div>
                </div>
                <div className="text-right">
                  <div className="font-semibold">2,442.0 → 2,450.5</div>
                  <div className="text-sm text-muted-foreground">₡2,380,000</div>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Alerts */}
        <Card className="mt-6">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <AlertTriangle className="w-5 h-5 text-yellow-600" />
              Alertas y Notificaciones
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-3">
              <div className="flex items-start gap-3 p-3 bg-yellow-50 border border-yellow-200 rounded-lg">
                <AlertTriangle className="w-5 h-5 text-yellow-600 mt-0.5" />
                <div>
                  <div className="font-medium text-yellow-800">Mantenimiento Próximo</div>
                  <div className="text-sm text-yellow-700">
                    Servicio de 500 horas debido en 43.2 horas. Programa mantenimiento para evitar tiempo de
                    inactividad.
                  </div>
                </div>
              </div>

              <div className="flex items-start gap-3 p-3 bg-blue-50 border border-blue-200 rounded-lg">
                <Clock className="w-5 h-5 text-blue-600 mt-0.5" />
                <div>
                  <div className="font-medium text-blue-800">Alerta de Uso Elevado</div>
                  <div className="text-sm text-blue-700">
                    El uso de la máquina está 15% por encima del promedio esta semana. Monitorear patrones de sobreuso.
                  </div>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}
