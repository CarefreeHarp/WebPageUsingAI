"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Label } from "@/components/ui/label"
import { Badge } from "@/components/ui/badge"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Progress } from "@/components/ui/progress"
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, PieChart, Pie, Cell } from "recharts"
import { Calculator, DollarSign, FileText, TrendingDown, TrendingUp, AlertTriangle, Target, Wrench } from "lucide-react"
import Link from "next/link"

const machinesData = {
  "cat-320": {
    name: "Excavadora Caterpillar 320",
    revenueData: [
      { month: "Jul", projected: 15000000, actual: 14000000, downtime: 1000000 },
      { month: "Ago", projected: 16000000, actual: 15500000, downtime: 500000 },
      { month: "Sep", projected: 17000000, actual: 16300000, downtime: 700000 },
      { month: "Oct", projected: 16500000, actual: 16200000, downtime: 300000 },
      { month: "Nov", projected: 18000000, actual: 17200000, downtime: 800000 },
      { month: "Dic", projected: 19000000, actual: 18500000, downtime: 500000 },
    ],
    totalRevenue: 98200000,
    totalCosts: 28500000,
    profit: 69700000,
    utilization: 85,
    costBreakdown: [
      { name: "Mantenimiento", value: 8500000, color: "#ef4444" },
      { name: "Combustible", value: 6200000, color: "#f97316" },
      { name: "Operador", value: 5800000, color: "#eab308" },
      { name: "Seguro", value: 4500000, color: "#22c55e" },
      { name: "Otros", value: 3500000, color: "#6366f1" },
    ],
    alerts: [
      {
        type: "warning",
        title: "Altos Costos de Mantenimiento",
        description: "Los costos de mantenimiento han aumentado 15% este trimestre.",
        recommendation: "Considerar un programa de mantenimiento preventivo más riguroso.",
      },
    ],
  },
  "kom-d65": {
    name: "Bulldozer Komatsu D65",
    revenueData: [
      { month: "Jul", projected: 12000000, actual: 11500000, downtime: 500000 },
      { month: "Ago", projected: 13000000, actual: 12800000, downtime: 200000 },
      { month: "Sep", projected: 14000000, actual: 13600000, downtime: 400000 },
      { month: "Oct", projected: 13500000, actual: 13200000, downtime: 300000 },
      { month: "Nov", projected: 15000000, actual: 14500000, downtime: 500000 },
      { month: "Dic", projected: 16000000, actual: 15800000, downtime: 200000 },
    ],
    totalRevenue: 81400000,
    totalCosts: 22800000,
    profit: 58600000,
    utilization: 78,
    costBreakdown: [
      { name: "Mantenimiento", value: 6800000, color: "#ef4444" },
      { name: "Combustible", value: 5200000, color: "#f97316" },
      { name: "Operador", value: 4800000, color: "#eab308" },
      { name: "Seguro", value: 3500000, color: "#22c55e" },
      { name: "Otros", value: 2500000, color: "#6366f1" },
    ],
    alerts: [
      {
        type: "success",
        title: "Excelente Rendimiento",
        description: "Mejora del 22% en el margen de ganancia este trimestre.",
        recommendation: "Mantener las prácticas actuales de operación y mantenimiento.",
      },
    ],
  },
  "lib-ltm": {
    name: "Grúa Liebherr LTM 1050",
    revenueData: [
      { month: "Jul", projected: 18000000, actual: 16500000, downtime: 1500000 },
      { month: "Ago", projected: 19000000, actual: 18200000, downtime: 800000 },
      { month: "Sep", projected: 21000000, actual: 19100000, downtime: 1900000 },
      { month: "Oct", projected: 20000000, actual: 19100000, downtime: 900000 },
      { month: "Nov", projected: 22000000, actual: 20300000, downtime: 1700000 },
      { month: "Dic", projected: 23000000, actual: 21700000, downtime: 1300000 },
    ],
    totalRevenue: 114900000,
    totalCosts: 32200000,
    profit: 82700000,
    utilization: 92,
    costBreakdown: [
      { name: "Mantenimiento", value: 9200000, color: "#ef4444" },
      { name: "Combustible", value: 6800000, color: "#f97316" },
      { name: "Operador", value: 5200000, color: "#eab308" },
      { name: "Seguro", value: 5500000, color: "#22c55e" },
      { name: "Otros", value: 5500000, color: "#6366f1" },
    ],
    alerts: [
      {
        type: "warning",
        title: "Utilización Decreciente",
        description: "La utilización bajó del 95% al 92% este mes.",
        recommendation: "Revisar la demanda del mercado y considerar ajustes de precios.",
      },
    ],
  },
  "jcb-3cx": {
    name: "Retroexcavadora JCB 3CX",
    revenueData: [
      { month: "Jul", projected: 8000000, actual: 7800000, downtime: 200000 },
      { month: "Ago", projected: 8500000, actual: 8200000, downtime: 300000 },
      { month: "Sep", projected: 9000000, actual: 8700000, downtime: 300000 },
      { month: "Oct", projected: 8800000, actual: 8500000, downtime: 300000 },
      { month: "Nov", projected: 9200000, actual: 8900000, downtime: 300000 },
      { month: "Dic", projected: 9500000, actual: 9200000, downtime: 300000 },
    ],
    totalRevenue: 51300000,
    totalCosts: 18200000,
    profit: 33100000,
    utilization: 88,
    costBreakdown: [
      { name: "Mantenimiento", value: 5200000, color: "#ef4444" },
      { name: "Combustible", value: 4800000, color: "#f97316" },
      { name: "Operador", value: 3600000, color: "#eab308" },
      { name: "Seguro", value: 2800000, color: "#22c55e" },
      { name: "Otros", value: 1800000, color: "#6366f1" },
    ],
    alerts: [
      {
        type: "success",
        title: "Rendimiento Estable",
        description: "Mantiene una utilización constante del 88% con bajos costos de mantenimiento.",
        recommendation: "Continuar con el programa de mantenimiento actual y buscar oportunidades de expansión.",
      },
    ],
  },
  "cat-cs56": {
    name: "Compactadora Caterpillar CS56",
    revenueData: [
      { month: "Jul", projected: 6000000, actual: 5200000, downtime: 800000 },
      { month: "Ago", projected: 6500000, actual: 5800000, downtime: 700000 },
      { month: "Sep", projected: 7000000, actual: 6100000, downtime: 900000 },
      { month: "Oct", projected: 6800000, actual: 5900000, downtime: 900000 },
      { month: "Nov", projected: 7200000, actual: 6300000, downtime: 900000 },
      { month: "Dic", projected: 7500000, actual: 6500000, downtime: 1000000 },
    ],
    totalRevenue: 35800000,
    totalCosts: 16500000,
    profit: 19300000,
    utilization: 72,
    costBreakdown: [
      { name: "Mantenimiento", value: 6200000, color: "#ef4444" },
      { name: "Combustible", value: 3800000, color: "#f97316" },
      { name: "Operador", value: 2900000, color: "#eab308" },
      { name: "Seguro", value: 2100000, color: "#22c55e" },
      { name: "Otros", value: 1500000, color: "#6366f1" },
    ],
    alerts: [
      {
        type: "warning",
        title: "Máquina en Mantenimiento",
        description: "Actualmente fuera de servicio por mantenimiento programado. Altos costos de reparación.",
        recommendation: "Evaluar el costo-beneficio de reparaciones mayores vs. reemplazo de equipo.",
      },
    ],
  },
  "bobcat-s650": {
    name: "Minicargadora Bobcat S650",
    revenueData: [
      { month: "Jul", projected: 5000000, actual: 4900000, downtime: 100000 },
      { month: "Ago", projected: 5200000, actual: 5100000, downtime: 100000 },
      { month: "Sep", projected: 5500000, actual: 5300000, downtime: 200000 },
      { month: "Oct", projected: 5300000, actual: 5200000, downtime: 100000 },
      { month: "Nov", projected: 5600000, actual: 5400000, downtime: 200000 },
      { month: "Dic", projected: 5800000, actual: 5600000, downtime: 200000 },
    ],
    totalRevenue: 31500000,
    totalCosts: 12800000,
    profit: 18700000,
    utilization: 91,
    costBreakdown: [
      { name: "Mantenimiento", value: 3200000, color: "#ef4444" },
      { name: "Combustible", value: 3800000, color: "#f97316" },
      { name: "Operador", value: 2400000, color: "#eab308" },
      { name: "Seguro", value: 1800000, color: "#22c55e" },
      { name: "Otros", value: 1600000, color: "#6366f1" },
    ],
    alerts: [
      {
        type: "success",
        title: "Excelente Eficiencia",
        description: "Alta utilización del 91% con costos operativos muy controlados.",
        recommendation: "Modelo a seguir para otras máquinas. Considerar adquirir equipos similares.",
      },
    ],
  },
}

export default function AnalisisFinanciero() {
  const [selectedPeriod, setSelectedPeriod] = useState("6m")
  const [selectedMachine, setSelectedMachine] = useState("cat-320")

  const currentMachineData = machinesData[selectedMachine as keyof typeof machinesData]

  const handleExportReport = () => {
    const reportData = {
      periodo: selectedPeriod,
      maquina: selectedMachine,
      datos: currentMachineData,
      fecha: new Date().toLocaleDateString("es-ES"),
    }

    const dataStr = JSON.stringify(reportData, null, 2)
    const dataBlob = new Blob([dataStr], { type: "application/json" })
    const url = URL.createObjectURL(dataBlob)
    const link = document.createElement("a")
    link.href = url
    link.download = `reporte-${selectedMachine}-${new Date().toISOString().split("T")[0]}.json`
    link.click()
    URL.revokeObjectURL(url)
  }

  const handleSetTargets = () => {
    const newTarget = prompt(
      `Ingrese el objetivo de ingresos anuales para ${currentMachineData.name} (en millones COP):`,
      "200",
    )
    if (newTarget) {
      alert(`Objetivo establecido para ${currentMachineData.name}: ₡${newTarget}M anuales`)
    }
  }

  const formatCurrency = (value: number) => {
    return `₡${(value / 1000000).toFixed(1)}M`
  }

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
                  <Calculator className="w-5 h-5 text-primary-foreground" />
                </div>
                <h1 className="text-xl font-bold text-foreground">Análisis Financiero</h1>
                <span className="text-muted-foreground">- {currentMachineData.name}</span>
              </div>
            </div>
            <div className="flex items-center gap-3">
              <Button variant="outline" size="sm" onClick={handleExportReport}>
                <FileText className="w-4 h-4 mr-2" />
                Exportar Reporte
              </Button>
              <Button size="sm" className="bg-accent hover:bg-accent/90 text-black" onClick={handleSetTargets}>
                <Target className="w-4 h-4 mr-2" />
                Establecer Objetivos
              </Button>
            </div>
          </div>
        </div>
      </header>

      <div className="container mx-auto px-4 py-6">
        {/* Filters */}
        <div className="flex flex-col sm:flex-row gap-4 mb-6">
          <div className="flex-1">
            <Label htmlFor="period-filter">Período de Tiempo</Label>
            <Select value={selectedPeriod} onValueChange={setSelectedPeriod}>
              <SelectTrigger>
                <SelectValue placeholder="Seleccionar período" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="1m">Último Mes</SelectItem>
                <SelectItem value="3m">Últimos 3 Meses</SelectItem>
                <SelectItem value="6m">Últimos 6 Meses</SelectItem>
                <SelectItem value="1y">Último Año</SelectItem>
              </SelectContent>
            </Select>
          </div>
          <div className="flex-1">
            <Label htmlFor="machine-filter">Seleccionar Máquina</Label>
            <Select value={selectedMachine} onValueChange={setSelectedMachine}>
              <SelectTrigger>
                <SelectValue placeholder="Seleccionar máquina" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="cat-320">Excavadora Caterpillar 320</SelectItem>
                <SelectItem value="kom-d65">Bulldozer Komatsu D65</SelectItem>
                <SelectItem value="lib-ltm">Grúa Liebherr LTM 1050</SelectItem>
                <SelectItem value="jcb-3cx">Retroexcavadora JCB 3CX</SelectItem>
                <SelectItem value="cat-cs56">Compactadora Caterpillar CS56</SelectItem>
                <SelectItem value="bobcat-s650">Minicargadora Bobcat S650</SelectItem>
              </SelectContent>
            </Select>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-6">
          <Card>
            <CardHeader className="pb-2">
              <CardTitle className="text-sm font-medium text-muted-foreground">Ingresos Totales (6M)</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="flex items-center gap-3">
                <div className="text-3xl font-bold text-primary">{formatCurrency(currentMachineData.totalRevenue)}</div>
                <div className="flex items-center gap-1 text-green-600">
                  <TrendingUp className="w-4 h-4" />
                  <span className="text-sm">+18%</span>
                </div>
              </div>
              <p className="text-sm text-muted-foreground mt-1">vs. 6 meses anteriores</p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="pb-2">
              <CardTitle className="text-sm font-medium text-muted-foreground">Ganancia Neta</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="flex items-center gap-3">
                <div className="text-3xl font-bold text-green-600">{formatCurrency(currentMachineData.profit)}</div>
                <div className="flex items-center gap-1 text-green-600">
                  <TrendingUp className="w-4 h-4" />
                  <span className="text-sm">+22%</span>
                </div>
              </div>
              <p className="text-sm text-muted-foreground mt-1">
                {Math.round((currentMachineData.profit / currentMachineData.totalRevenue) * 100)}% margen de ganancia
              </p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="pb-2">
              <CardTitle className="text-sm font-medium text-muted-foreground">Costos Operativos</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="flex items-center gap-3">
                <div className="text-3xl font-bold text-red-600">{formatCurrency(currentMachineData.totalCosts)}</div>
                <div className="flex items-center gap-1 text-red-600">
                  <TrendingDown className="w-4 h-4" />
                  <span className="text-sm">-5%</span>
                </div>
              </div>
              <p className="text-sm text-muted-foreground mt-1">
                {Math.round((currentMachineData.totalCosts / currentMachineData.totalRevenue) * 100)}% de ingresos
                totales
              </p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="pb-2">
              <CardTitle className="text-sm font-medium text-muted-foreground">Utilización</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="flex items-center gap-3">
                <div className="text-3xl font-bold text-blue-600">{currentMachineData.utilization}%</div>
                <div className="flex items-center gap-1 text-green-600">
                  <TrendingUp className="w-4 h-4" />
                  <span className="text-sm">+3%</span>
                </div>
              </div>
              <p className="text-sm text-muted-foreground mt-1">promedio mensual</p>
            </CardContent>
          </Card>
        </div>

        <Card className="mb-6">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <DollarSign className="w-5 h-5" />
              Rendimiento de Ingresos - {currentMachineData.name}
            </CardTitle>
            <CardDescription>
              Comparación mensual de ingresos proyectados vs reales para esta máquina específica
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="h-80">
              <ResponsiveContainer width="100%" height="100%">
                <BarChart data={currentMachineData.revenueData}>
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis dataKey="month" />
                  <YAxis tickFormatter={(value) => formatCurrency(value)} />
                  <Tooltip formatter={(value) => formatCurrency(Number(value))} />
                  <Bar dataKey="projected" fill="#6366f1" name="Ingresos Proyectados" />
                  <Bar dataKey="actual" fill="#22c55e" name="Ingresos Reales" />
                  <Bar dataKey="downtime" fill="#ef4444" name="Pérdidas por Inactividad" />
                </BarChart>
              </ResponsiveContainer>
            </div>
          </CardContent>
        </Card>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-6">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Calculator className="w-5 h-5" />
                Desglose de Costos - {currentMachineData.name}
              </CardTitle>
              <CardDescription>Distribución de gastos operacionales para esta máquina</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="h-64">
                <ResponsiveContainer width="100%" height="100%">
                  <PieChart>
                    <Pie
                      data={currentMachineData.costBreakdown}
                      cx="50%"
                      cy="50%"
                      outerRadius={80}
                      fill="#8884d8"
                      dataKey="value"
                      label={({ name, percent }) => `${name} ${(percent * 100).toFixed(0)}%`}
                    >
                      {currentMachineData.costBreakdown.map((entry, index) => (
                        <Cell key={`cell-${index}`} fill={entry.color} />
                      ))}
                    </Pie>
                    <Tooltip formatter={(value) => formatCurrency(Number(value))} />
                  </PieChart>
                </ResponsiveContainer>
              </div>
              <div className="grid grid-cols-2 gap-4 mt-4">
                {currentMachineData.costBreakdown.map((item, index) => (
                  <div key={index} className="flex items-center gap-2">
                    <div className="w-3 h-3 rounded-full" style={{ backgroundColor: item.color }} />
                    <span className="text-sm text-muted-foreground">{item.name}</span>
                    <span className="text-sm font-semibold">{formatCurrency(item.value)}</span>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Wrench className="w-5 h-5" />
                Métricas de Rendimiento
              </CardTitle>
              <CardDescription>Indicadores clave para {currentMachineData.name}</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <div className="flex justify-between items-center">
                  <span className="text-muted-foreground">Margen de Ganancia</span>
                  <div className="flex items-center gap-2">
                    <span className="font-semibold">
                      {Math.round((currentMachineData.profit / currentMachineData.totalRevenue) * 100)}%
                    </span>
                    <Badge variant="secondary" className="bg-green-100 text-green-800">
                      Excelente
                    </Badge>
                  </div>
                </div>

                <div className="flex justify-between items-center">
                  <span className="text-muted-foreground">Utilización</span>
                  <div className="flex items-center gap-2">
                    <span className="font-semibold">{currentMachineData.utilization}%</span>
                    <Badge
                      variant="secondary"
                      className={
                        currentMachineData.utilization >= 85
                          ? "bg-green-100 text-green-800"
                          : "bg-yellow-100 text-yellow-800"
                      }
                    >
                      {currentMachineData.utilization >= 85 ? "Excelente" : "Bueno"}
                    </Badge>
                  </div>
                </div>

                <div className="flex justify-between items-center">
                  <span className="text-muted-foreground">Costo por Hora</span>
                  <div className="flex items-center gap-2">
                    <span className="font-semibold">
                      ₡
                      {Math.round(
                        currentMachineData.totalCosts / ((currentMachineData.utilization * 8 * 30 * 6) / 100),
                      ).toLocaleString()}
                    </span>
                    <Badge variant="secondary" className="bg-yellow-100 text-yellow-800">
                      Monitorear
                    </Badge>
                  </div>
                </div>

                <div className="flex justify-between items-center">
                  <span className="text-muted-foreground">Ingresos por Hora</span>
                  <div className="flex items-center gap-2">
                    <span className="font-semibold">
                      ₡
                      {Math.round(
                        currentMachineData.totalRevenue / ((currentMachineData.utilization * 8 * 30 * 6) / 100),
                      ).toLocaleString()}
                    </span>
                    <Badge variant="secondary" className="bg-green-100 text-green-800">
                      Fuerte
                    </Badge>
                  </div>
                </div>

                <div className="space-y-2">
                  <div className="flex justify-between text-sm">
                    <span>Progreso de Utilización</span>
                    <span>{currentMachineData.utilization}%</span>
                  </div>
                  <Progress value={currentMachineData.utilization} className="h-2" />
                </div>
              </div>
            </CardContent>
          </Card>
        </div>

        <Card className="mb-6">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <AlertTriangle className="w-5 h-5 text-yellow-600" />
              Alertas y Recomendaciones - {currentMachineData.name}
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {currentMachineData.alerts.map((alert, index) => (
                <div
                  key={index}
                  className={`flex items-start gap-3 p-4 border rounded-lg ${
                    alert.type === "warning"
                      ? "bg-yellow-50 border-yellow-200"
                      : alert.type === "error"
                        ? "bg-red-50 border-red-200"
                        : "bg-green-50 border-green-200"
                  }`}
                >
                  <AlertTriangle
                    className={`w-5 h-5 mt-0.5 ${
                      alert.type === "warning"
                        ? "text-yellow-600"
                        : alert.type === "error"
                          ? "text-red-600"
                          : "text-green-600"
                    }`}
                  />
                  <div>
                    <div
                      className={`font-semibold ${
                        alert.type === "warning"
                          ? "text-yellow-800"
                          : alert.type === "error"
                            ? "text-red-800"
                            : "text-green-800"
                      }`}
                    >
                      {alert.title}
                    </div>
                    <div
                      className={`text-sm mb-2 ${
                        alert.type === "warning"
                          ? "text-yellow-700"
                          : alert.type === "error"
                            ? "text-red-700"
                            : "text-green-700"
                      }`}
                    >
                      {alert.description}
                    </div>
                    <div
                      className={`text-sm ${
                        alert.type === "warning"
                          ? "text-yellow-600"
                          : alert.type === "error"
                            ? "text-red-600"
                            : "text-green-600"
                      }`}
                    >
                      Recomendación: {alert.recommendation}
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Target className="w-5 h-5" />
              Proyecciones Financieras - {currentMachineData.name}
            </CardTitle>
            <CardDescription>Ingresos pronosticados basados en el rendimiento actual de esta máquina</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <div className="flex justify-between items-center p-3 border border-border rounded-lg">
                <div>
                  <div className="font-semibold">Próximo Mes</div>
                  <div className="text-sm text-muted-foreground">Basado en utilización actual</div>
                </div>
                <div className="text-right">
                  <div className="text-xl font-bold text-primary">
                    {formatCurrency((currentMachineData.totalRevenue / 6) * 1.05)}
                  </div>
                  <div className="text-sm text-green-600">+5% vs promedio</div>
                </div>
              </div>

              <div className="flex justify-between items-center p-3 border border-border rounded-lg">
                <div>
                  <div className="font-semibold">Próximo Trimestre</div>
                  <div className="text-sm text-muted-foreground">Escenario optimista</div>
                </div>
                <div className="text-right">
                  <div className="text-xl font-bold text-primary">
                    {formatCurrency((currentMachineData.totalRevenue / 2) * 1.1)}
                  </div>
                  <div className="text-sm text-green-600">+10% vs actual</div>
                </div>
              </div>

              <div className="flex justify-between items-center p-3 border border-border rounded-lg">
                <div>
                  <div className="font-semibold">Objetivo Anual</div>
                  <div className="text-sm text-muted-foreground">Proyección conservadora</div>
                </div>
                <div className="text-right">
                  <div className="text-xl font-bold text-primary">
                    {formatCurrency(currentMachineData.totalRevenue * 2)}
                  </div>
                  <div className="text-sm text-blue-600">Meta establecida</div>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}
