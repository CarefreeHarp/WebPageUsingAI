"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Label } from "@/components/ui/label"
import { Badge } from "@/components/ui/badge"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Progress } from "@/components/ui/progress"
import {
  AlertTriangle,
  Calendar,
  CheckCircle,
  Clock,
  DollarSign,
  FileText,
  Plus,
  Settings,
  TrendingDown,
  TrendingUp,
  Wrench,
  XCircle,
} from "lucide-react"
import Link from "next/link"

export default function MaintenanceDashboard() {
  const [selectedMachine, setSelectedMachine] = useState("all")
  const [selectedTimeframe, setSelectedTimeframe] = useState("30d")

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
                  <Wrench className="w-5 h-5 text-primary-foreground" />
                </div>
                <h1 className="text-xl font-bold text-foreground">Panel de Mantenimiento</h1>
              </div>
            </div>
            <div className="flex items-center gap-3">
              <Button variant="outline" size="sm">
                <FileText className="w-4 h-4 mr-2" />
                Exportar Reporte
              </Button>
              <Button size="sm" className="bg-accent hover:bg-accent/90">
                <Plus className="w-4 h-4 mr-2" />
                Programar Mantenimiento
              </Button>
            </div>
          </div>
        </div>
      </header>

      <div className="container mx-auto px-4 py-6">
        {/* Filters */}
        <div className="flex flex-col sm:flex-row gap-4 mb-6">
          <div className="flex-1">
            <Label htmlFor="machine-filter">Filtro de Máquina</Label>
            <Select value={selectedMachine} onValueChange={setSelectedMachine}>
              <SelectTrigger>
                <SelectValue placeholder="Seleccionar máquina" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">Todas las Máquinas</SelectItem>
                <SelectItem value="cat-320-001">Excavadora CAT 320 - 001</SelectItem>
                <SelectItem value="kom-d65-002">Bulldozer Komatsu D65 - 002</SelectItem>
                <SelectItem value="lib-ltm-003">Grúa Liebherr LTM - 003</SelectItem>
              </SelectContent>
            </Select>
          </div>
          <div className="flex-1">
            <Label htmlFor="timeframe-filter">Período de Tiempo</Label>
            <Select value={selectedTimeframe} onValueChange={setSelectedTimeframe}>
              <SelectTrigger>
                <SelectValue placeholder="Seleccionar período" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="7d">Últimos 7 Días</SelectItem>
                <SelectItem value="30d">Últimos 30 Días</SelectItem>
                <SelectItem value="90d">Últimos 90 Días</SelectItem>
                <SelectItem value="1y">Último Año</SelectItem>
              </SelectContent>
            </Select>
          </div>
        </div>

        {/* Critical Alerts */}
        <Card className="mb-6 border-red-200 bg-red-50">
          <CardHeader>
            <CardTitle className="flex items-center gap-2 text-red-800">
              <AlertTriangle className="w-5 h-5" />
              Alertas Críticas de Mantenimiento
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              <div className="flex items-start gap-3 p-4 bg-white border border-red-200 rounded-lg">
                <XCircle className="w-5 h-5 text-red-600 mt-0.5" />
                <div className="flex-1">
                  <div className="font-semibold text-red-800">Excavadora CAT 320 - Mantenimiento Vencido</div>
                  <div className="text-sm text-red-700 mb-2">
                    Servicio de 500 horas vencido por 15.3 horas. Se requiere mantenimiento inmediato.
                  </div>
                  <div className="flex items-center gap-4 text-sm">
                    <span className="text-red-600">Actual: 2,515.3 hrs</span>
                    <span className="text-red-600">Vencimiento: 2,500.0 hrs</span>
                    <Badge variant="destructive">VENCIDO</Badge>
                  </div>
                </div>
                <Button size="sm" className="bg-red-600 hover:bg-red-700">
                  Programar Ahora
                </Button>
              </div>

              <div className="flex items-start gap-3 p-4 bg-white border border-yellow-200 rounded-lg">
                <AlertTriangle className="w-5 h-5 text-yellow-600 mt-0.5" />
                <div className="flex-1">
                  <div className="font-semibold text-yellow-800">Komatsu D65 - Mantenimiento Próximo</div>
                  <div className="text-sm text-yellow-700 mb-2">
                    Servicio de 1000 horas vence en 23.7 horas. Programar en los próximos 3 días.
                  </div>
                  <div className="flex items-center gap-4 text-sm">
                    <span className="text-yellow-600">Actual: 1,976.3 hrs</span>
                    <span className="text-yellow-600">Vencimiento: 2,000.0 hrs</span>
                    <Badge variant="secondary" className="bg-yellow-100 text-yellow-800">
                      PRÓXIMO
                    </Badge>
                  </div>
                </div>
                <Button size="sm" variant="outline">
                  Programar
                </Button>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Key Metrics */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-6">
          <Card>
            <CardHeader className="pb-2">
              <CardTitle className="text-sm font-medium text-muted-foreground">Puntuación de Salud de Flota</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="flex items-center gap-3">
                <div className="text-3xl font-bold text-green-600">87%</div>
                <div className="flex items-center gap-1 text-green-600">
                  <TrendingUp className="w-4 h-4" />
                  <span className="text-sm">+5%</span>
                </div>
              </div>
              <Progress value={87} className="mt-2" />
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="pb-2">
              <CardTitle className="text-sm font-medium text-muted-foreground">Costos de Mantenimiento (30d)</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="flex items-center gap-3">
                <div className="text-3xl font-bold text-primary">₡2.4M</div>
                <div className="flex items-center gap-1 text-red-600">
                  <TrendingUp className="w-4 h-4" />
                  <span className="text-sm">+12%</span>
                </div>
              </div>
              <p className="text-sm text-muted-foreground mt-1">vs. mes anterior</p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="pb-2">
              <CardTitle className="text-sm font-medium text-muted-foreground">Horas de Inactividad</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="flex items-center gap-3">
                <div className="text-3xl font-bold text-orange-600">18.5</div>
                <div className="flex items-center gap-1 text-green-600">
                  <TrendingDown className="w-4 h-4" />
                  <span className="text-sm">-8%</span>
                </div>
              </div>
              <p className="text-sm text-muted-foreground mt-1">horas este mes</p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="pb-2">
              <CardTitle className="text-sm font-medium text-muted-foreground">Preventivo vs Reactivo</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="flex items-center gap-3">
                <div className="text-3xl font-bold text-blue-600">78%</div>
                <div className="flex items-center gap-1 text-green-600">
                  <TrendingUp className="w-4 h-4" />
                  <span className="text-sm">+15%</span>
                </div>
              </div>
              <p className="text-sm text-muted-foreground mt-1">mantenimiento preventivo</p>
            </CardContent>
          </Card>
        </div>

        {/* Machine Status Overview */}
        <Card className="mb-6">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Settings className="w-5 h-5" />
              Resumen del Estado de Máquinas
            </CardTitle>
            <CardDescription>Estado actual de mantenimiento y próximos requerimientos de servicio</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {/* Machine 1 */}
              <div className="flex items-center justify-between p-4 border border-border rounded-lg">
                <div className="flex items-center gap-4">
                  <div className="w-3 h-3 bg-red-500 rounded-full" />
                  <div>
                    <div className="font-semibold">Excavadora Caterpillar 320</div>
                    <div className="text-sm text-muted-foreground">CAT-320-001 • Sitio A Bogotá</div>
                  </div>
                </div>
                <div className="flex items-center gap-6">
                  <div className="text-right">
                    <div className="text-sm text-muted-foreground">Horas Actuales</div>
                    <div className="font-mono font-semibold">2,515.3</div>
                  </div>
                  <div className="text-right">
                    <div className="text-sm text-muted-foreground">Próximo Servicio</div>
                    <div className="font-semibold text-red-600">VENCIDO</div>
                  </div>
                  <div className="text-right">
                    <div className="text-sm text-muted-foreground">Puntuación de Salud</div>
                    <div className="font-semibold text-red-600">65%</div>
                  </div>
                  <Button size="sm" variant="destructive">
                    Programar
                  </Button>
                </div>
              </div>

              {/* Machine 2 */}
              <div className="flex items-center justify-between p-4 border border-border rounded-lg">
                <div className="flex items-center gap-4">
                  <div className="w-3 h-3 bg-yellow-500 rounded-full" />
                  <div>
                    <div className="font-semibold">Bulldozer Komatsu D65</div>
                    <div className="text-sm text-muted-foreground">KOM-D65-002 • Sitio B Medellín</div>
                  </div>
                </div>
                <div className="flex items-center gap-6">
                  <div className="text-right">
                    <div className="text-sm text-muted-foreground">Horas Actuales</div>
                    <div className="font-mono font-semibold">1,976.3</div>
                  </div>
                  <div className="text-right">
                    <div className="text-sm text-muted-foreground">Próximo Servicio</div>
                    <div className="font-semibold text-yellow-600">23.7 hrs</div>
                  </div>
                  <div className="text-right">
                    <div className="text-sm text-muted-foreground">Puntuación de Salud</div>
                    <div className="font-semibold text-yellow-600">82%</div>
                  </div>
                  <Button size="sm" variant="outline">
                    Programar
                  </Button>
                </div>
              </div>

              {/* Machine 3 */}
              <div className="flex items-center justify-between p-4 border border-border rounded-lg">
                <div className="flex items-center gap-4">
                  <div className="w-3 h-3 bg-green-500 rounded-full" />
                  <div>
                    <div className="font-semibold">Grúa Liebherr LTM 1050</div>
                    <div className="text-sm text-muted-foreground">LIB-LTM-003 • Sitio C Cali</div>
                  </div>
                </div>
                <div className="flex items-center gap-6">
                  <div className="text-right">
                    <div className="text-sm text-muted-foreground">Horas Actuales</div>
                    <div className="font-mono font-semibold">3,245.8</div>
                  </div>
                  <div className="text-right">
                    <div className="text-sm text-muted-foreground">Próximo Servicio</div>
                    <div className="font-semibold text-green-600">254.2 hrs</div>
                  </div>
                  <div className="text-right">
                    <div className="text-sm text-muted-foreground">Puntuación de Salud</div>
                    <div className="font-semibold text-green-600">94%</div>
                  </div>
                  <Button size="sm" variant="outline">
                    Ver Detalles
                  </Button>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-6">
          {/* Upcoming Maintenance */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Calendar className="w-5 h-5" />
                Mantenimiento Próximo
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <div className="flex items-start gap-3 p-3 border border-border rounded-lg">
                  <Calendar className="w-5 h-5 text-blue-600 mt-0.5" />
                  <div className="flex-1">
                    <div className="font-semibold">Servicio de 500 Horas</div>
                    <div className="text-sm text-muted-foreground">Excavadora CAT 320</div>
                    <div className="text-sm text-red-600 font-medium">Vencido por 15.3 horas</div>
                  </div>
                  <Badge variant="destructive">URGENTE</Badge>
                </div>

                <div className="flex items-start gap-3 p-3 border border-border rounded-lg">
                  <Calendar className="w-5 h-5 text-yellow-600 mt-0.5" />
                  <div className="flex-1">
                    <div className="font-semibold">Servicio de 1000 Horas</div>
                    <div className="text-sm text-muted-foreground">Bulldozer Komatsu D65</div>
                    <div className="text-sm text-yellow-600 font-medium">Vence en 23.7 horas</div>
                  </div>
                  <Badge variant="secondary" className="bg-yellow-100 text-yellow-800">
                    PRÓXIMO
                  </Badge>
                </div>

                <div className="flex items-start gap-3 p-3 border border-border rounded-lg">
                  <Calendar className="w-5 h-5 text-green-600 mt-0.5" />
                  <div className="flex-1">
                    <div className="font-semibold">Inspección Anual</div>
                    <div className="text-sm text-muted-foreground">Grúa Liebherr LTM</div>
                    <div className="text-sm text-green-600 font-medium">Vence en 45 días</div>
                  </div>
                  <Badge variant="secondary" className="bg-green-100 text-green-800">
                    PROGRAMADO
                  </Badge>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Recent Maintenance History */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <CheckCircle className="w-5 h-5" />
                Mantenimiento Reciente
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <div className="flex items-start gap-3 p-3 border border-border rounded-lg">
                  <CheckCircle className="w-5 h-5 text-green-600 mt-0.5" />
                  <div className="flex-1">
                    <div className="font-semibold">Cambio de Aceite y Reemplazo de Filtro</div>
                    <div className="text-sm text-muted-foreground">Grúa Liebherr LTM • 15 Ene, 2024</div>
                    <div className="text-sm text-green-600">Completado • ₡450,000</div>
                  </div>
                </div>

                <div className="flex items-start gap-3 p-3 border border-border rounded-lg">
                  <CheckCircle className="w-5 h-5 text-green-600 mt-0.5" />
                  <div className="flex-1">
                    <div className="font-semibold">Servicio del Sistema Hidráulico</div>
                    <div className="text-sm text-muted-foreground">Bulldozer Komatsu D65 • 12 Ene, 2024</div>
                    <div className="text-sm text-green-600">Completado • ₡1,200,000</div>
                  </div>
                </div>

                <div className="flex items-start gap-3 p-3 border border-border rounded-lg">
                  <XCircle className="w-5 h-5 text-red-600 mt-0.5" />
                  <div className="flex-1">
                    <div className="font-semibold">Reparación de Emergencia - Cadena de Oruga</div>
                    <div className="text-sm text-muted-foreground">Excavadora CAT 320 • 8 Ene, 2024</div>
                    <div className="text-sm text-red-600">Reactivo • ₡3,500,000</div>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Usage Analytics */}
        <Card className="mb-6">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Clock className="w-5 h-5" />
              Análisis de Uso y Patrones
            </CardTitle>
            <CardDescription>Estadísticas del horómetro y análisis de patrones de uso</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              <div className="space-y-4">
                <h4 className="font-semibold text-foreground">Uso Diario Promedio</h4>
                <div className="space-y-3">
                  <div className="flex justify-between items-center">
                    <span className="text-sm text-muted-foreground">Excavadora CAT 320</span>
                    <div className="flex items-center gap-2">
                      <span className="font-semibold">8.2 hrs/día</span>
                      <Badge variant="secondary" className="bg-red-100 text-red-800">
                        ALTO
                      </Badge>
                    </div>
                  </div>
                  <div className="flex justify-between items-center">
                    <span className="text-sm text-muted-foreground">Komatsu D65</span>
                    <div className="flex items-center gap-2">
                      <span className="font-semibold">6.8 hrs/día</span>
                      <Badge variant="secondary" className="bg-green-100 text-green-800">
                        NORMAL
                      </Badge>
                    </div>
                  </div>
                  <div className="flex justify-between items-center">
                    <span className="text-sm text-muted-foreground">Liebherr LTM</span>
                    <div className="flex items-center gap-2">
                      <span className="font-semibold">4.1 hrs/día</span>
                      <Badge variant="secondary" className="bg-yellow-100 text-yellow-800">
                        BAJO
                      </Badge>
                    </div>
                  </div>
                </div>
              </div>

              <div className="space-y-4">
                <h4 className="font-semibold text-foreground">Tendencias de Eficiencia</h4>
                <div className="space-y-3">
                  <div className="flex justify-between items-center">
                    <span className="text-sm text-muted-foreground">Esta Semana</span>
                    <div className="flex items-center gap-2">
                      <span className="font-semibold">92%</span>
                      <TrendingUp className="w-4 h-4 text-green-600" />
                    </div>
                  </div>
                  <div className="flex justify-between items-center">
                    <span className="text-sm text-muted-foreground">Semana Pasada</span>
                    <div className="flex items-center gap-2">
                      <span className="font-semibold">88%</span>
                      <TrendingDown className="w-4 h-4 text-red-600" />
                    </div>
                  </div>
                  <div className="flex justify-between items-center">
                    <span className="text-sm text-muted-foreground">Promedio Mensual</span>
                    <span className="font-semibold">90%</span>
                  </div>
                </div>
              </div>

              <div className="space-y-4">
                <h4 className="font-semibold text-foreground">Impacto en Costos</h4>
                <div className="space-y-3">
                  <div className="flex justify-between items-center">
                    <span className="text-sm text-muted-foreground">Ahorros Preventivos</span>
                    <span className="font-semibold text-green-600">₡8.2M</span>
                  </div>
                  <div className="flex justify-between items-center">
                    <span className="text-sm text-muted-foreground">Pérdidas por Inactividad</span>
                    <span className="font-semibold text-red-600">₡2.1M</span>
                  </div>
                  <div className="flex justify-between items-center">
                    <span className="text-sm text-muted-foreground">Ahorros Netos</span>
                    <span className="font-semibold text-primary">₡6.1M</span>
                  </div>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Maintenance Costs Breakdown */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <DollarSign className="w-5 h-5" />
              Desglose de Costos de Mantenimiento
            </CardTitle>
            <CardDescription>Análisis detallado de costos y seguimiento de presupuesto</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
              <div className="text-center p-4 border border-border rounded-lg">
                <div className="text-2xl font-bold text-blue-600">₡1.8M</div>
                <div className="text-sm text-muted-foreground">Preventivo</div>
                <div className="text-xs text-green-600">75% del total</div>
              </div>
              <div className="text-center p-4 border border-border rounded-lg">
                <div className="text-2xl font-bold text-red-600">₡600K</div>
                <div className="text-sm text-muted-foreground">Reactivo</div>
                <div className="text-xs text-red-600">25% del total</div>
              </div>
              <div className="text-center p-4 border border-border rounded-lg">
                <div className="text-2xl font-bold text-orange-600">₡320K</div>
                <div className="text-sm text-muted-foreground">Repuestos</div>
                <div className="text-xs text-muted-foreground">13% del total</div>
              </div>
              <div className="text-center p-4 border border-border rounded-lg">
                <div className="text-2xl font-bold text-purple-600">₡180K</div>
                <div className="text-sm text-muted-foreground">Mano de Obra</div>
                <div className="text-xs text-muted-foreground">8% del total</div>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}
