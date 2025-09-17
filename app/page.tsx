"use client"

import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Badge } from "@/components/ui/badge"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Slider } from "@/components/ui/slider"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import {
  Search,
  MapPin,
  Clock,
  Wrench,
  Plus,
  TrendingUp,
  Shield,
  MessageCircle,
  Filter,
  FileText,
  Calendar,
  User,
  MoreVertical,
  Edit,
  Trash2,
} from "lucide-react"
import Link from "next/link"
import { useState, useEffect } from "react"
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "@/components/ui/dropdown-menu"

export default function HomePage() {
  const [filters, setFilters] = useState({
    priceRange: [0, 500000],
    location: "all",
    maxHours: 5000,
    status: "all",
  })

  const [showFilters, setShowFilters] = useState(false)
  const [selectedMachine, setSelectedMachine] = useState(null)
  const [userMachines, setUserMachines] = useState([])
  const [editingMachine, setEditingMachine] = useState(null)
  const [showEditModal, setShowEditModal] = useState(false)
  const [deletedDefaultMachines, setDeletedDefaultMachines] = useState([])

  const defaultMachines = [
    {
      id: 1,
      name: "Excavadora Caterpillar 320",
      location: "Bogotá",
      price: 280000,
      hours: 2450,
      status: "Disponible",
      weight: "20 toneladas",
      image: "/heavy-excavator-construction-site.jpg",
      statusColor: "bg-green-600",
      isDefault: true, // Adding flag to identify default machines
    },
    {
      id: 2,
      name: "Bulldozer Komatsu D65",
      location: "Medellín",
      price: 320000,
      hours: 1890,
      status: "En Uso",
      weight: "18 toneladas",
      image: "/bulldozer-construction.png",
      statusColor: "bg-yellow-600",
      isDefault: true,
    },
    {
      id: 3,
      name: "Grúa Liebherr LTM 1050",
      location: "Cali",
      price: 450000,
      hours: 3200,
      status: "Disponible",
      capacity: "50 toneladas",
      image: "/mobile-crane-construction-site.jpg",
      statusColor: "bg-green-600",
      isDefault: true,
    },
    {
      id: 4,
      name: "Retroexcavadora JCB 3CX",
      location: "Barranquilla",
      price: 180000,
      hours: 1200,
      status: "Disponible",
      weight: "8 toneladas",
      image: "/retroexcavadora-jcb-amarilla-en-obra.jpg",
      statusColor: "bg-green-600",
      isDefault: true,
    },
    {
      id: 5,
      name: "Compactadora Caterpillar CS56",
      location: "Cartagena",
      price: 150000,
      hours: 800,
      status: "Mantenimiento",
      weight: "12 toneladas",
      image: "/compactadora-de-suelo-amarilla.jpg",
      statusColor: "bg-red-600",
      isDefault: true,
    },
    {
      id: 6,
      name: "Minicargadora Bobcat S650",
      location: "Bogotá",
      price: 120000,
      hours: 950,
      status: "Disponible",
      weight: "3 toneladas",
      image: "/minicargadora-bobcat-blanca.jpg",
      statusColor: "bg-green-600",
      isDefault: true,
    },
  ]

  const visibleDefaultMachines = defaultMachines.filter((machine) => !deletedDefaultMachines.includes(machine.id))
  const allMachines = [...visibleDefaultMachines, ...userMachines]

  const filteredMachines = allMachines.filter((machine) => {
    const isWithinPriceRange = machine.price >= filters.priceRange[0] && machine.price <= filters.priceRange[1]
    const isWithinLocation = filters.location === "all" || machine.location === filters.location
    const isWithinMaxHours = machine.hours <= filters.maxHours
    const isWithinStatus = filters.status === "all" || machine.status === filters.status

    return isWithinPriceRange && isWithinLocation && isWithinMaxHours && isWithinStatus
  })

  useEffect(() => {
    const savedMachines = localStorage.getItem("userMachines")
    if (savedMachines) {
      const parsedMachines = JSON.parse(savedMachines)
      const formattedMachines = parsedMachines.map((machine) => ({
        ...machine,
        status:
          machine.status === "available"
            ? "Disponible"
            : machine.status === "in-use"
              ? "En Uso"
              : machine.status === "maintenance"
                ? "Mantenimiento"
                : "Inactiva",
        statusColor:
          machine.status === "available"
            ? "bg-green-600"
            : machine.status === "in-use"
              ? "bg-yellow-600"
              : machine.status === "maintenance"
                ? "bg-red-600"
                : "bg-gray-600",
        weight: machine.weight,
        hours: machine.currentHours || 0,
        price: machine.hourlyPrice || 0,
      }))
      setUserMachines(formattedMachines)
    }

    const deletedMachines = localStorage.getItem("deletedDefaultMachines")
    if (deletedMachines) {
      setDeletedDefaultMachines(JSON.parse(deletedMachines))
    }
  }, [])

  const handleRentalRequest = (machine) => {
    setSelectedMachine(machine)
  }

  const handleContractSubmit = (e) => {
    e.preventDefault()
    alert(`Contrato creado exitosamente para ${selectedMachine?.name}`)
    setSelectedMachine(null)
  }

  const handleDeleteMachine = (machineId, isDefault = false) => {
    if (isDefault) {
      // For default machines, add to deleted list
      const updatedDeletedMachines = [...deletedDefaultMachines, machineId]
      setDeletedDefaultMachines(updatedDeletedMachines)
      localStorage.setItem("deletedDefaultMachines", JSON.stringify(updatedDeletedMachines))
    } else {
      // For user machines, remove from user machines list
      const updatedMachines = userMachines.filter((machine) => machine.id !== machineId)
      setUserMachines(updatedMachines)
      localStorage.setItem("userMachines", JSON.stringify(updatedMachines))
    }
  }

  const handleEditMachine = (machineId, isDefault = false) => {
    let machineToEdit
    if (isDefault) {
      machineToEdit = defaultMachines.find((machine) => machine.id === machineId)
    } else {
      machineToEdit = userMachines.find((machine) => machine.id === machineId)
    }

    if (machineToEdit) {
      setEditingMachine({ ...machineToEdit, isDefault })
      setShowEditModal(true)
    }
  }

  const handleEditSubmit = (e) => {
    e.preventDefault()
    const formData = new FormData(e.target)

    const updatedMachine = {
      ...editingMachine,
      name: formData.get("name"),
      model: formData.get("model"),
      location: formData.get("location"),
      weight: formData.get("weight"),
      hourlyPrice: Number.parseInt(formData.get("hourlyPrice")),
      currentHours: Number.parseInt(formData.get("currentHours")),
      status: formData.get("status"),
      description: formData.get("description"),
      price: Number.parseInt(formData.get("hourlyPrice")),
      hours: Number.parseInt(formData.get("currentHours")),
    }

    updatedMachine.statusColor =
      updatedMachine.status === "available"
        ? "bg-green-600"
        : updatedMachine.status === "in-use"
          ? "bg-yellow-600"
          : updatedMachine.status === "maintenance"
            ? "bg-red-600"
            : "bg-gray-600"

    updatedMachine.status =
      updatedMachine.status === "available"
        ? "Disponible"
        : updatedMachine.status === "in-use"
          ? "En Uso"
          : updatedMachine.status === "maintenance"
            ? "Mantenimiento"
            : "Inactiva"

    if (editingMachine.isDefault) {
      // For default machines, convert to user machine and remove from default
      const newUserMachine = { ...updatedMachine, id: Date.now(), isDefault: false }
      const updatedUserMachines = [...userMachines, newUserMachine]
      setUserMachines(updatedUserMachines)
      localStorage.setItem("userMachines", JSON.stringify(updatedUserMachines))

      // Mark original as deleted
      const updatedDeletedMachines = [...deletedDefaultMachines, editingMachine.id]
      setDeletedDefaultMachines(updatedDeletedMachines)
      localStorage.setItem("deletedDefaultMachines", JSON.stringify(updatedDeletedMachines))
    } else {
      // For user machines, update normally
      const updatedMachines = userMachines.map((machine) =>
        machine.id === editingMachine.id ? updatedMachine : machine,
      )
      setUserMachines(updatedMachines)
      localStorage.setItem("userMachines", JSON.stringify(updatedMachines))
    }

    setShowEditModal(false)
    setEditingMachine(null)
  }

  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <header className="border-b border-border bg-card">
        <div className="container mx-auto px-4 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2">
              <img src="/maquisoluciones-logo.png" alt="MaquiSoluciones Logo" className="w-8 h-8" />
              <h1 className="text-xl font-bold text-foreground">MakiLibre</h1>
            </div>
            <nav className="hidden md:flex items-center gap-6">
              <a href="#" className="text-muted-foreground hover:text-foreground transition-colors">
                Mercado
              </a>
              <a href="#" className="text-muted-foreground hover:text-foreground transition-colors">
                Mi Equipo
              </a>
              <Link href="/operator" className="text-muted-foreground hover:text-foreground transition-colors">
                Portal Operador
              </Link>
              <Link href="/maintenance" className="text-muted-foreground hover:text-foreground transition-colors">
                Mantenimiento
              </Link>
              <Link href="/analytics" className="text-muted-foreground hover:text-foreground transition-colors">
                Análisis
              </Link>
              <Link href="/chatbot" className="text-muted-foreground hover:text-foreground transition-colors">
                <MessageCircle className="w-4 h-4 inline mr-1" />
                Asistente IA
              </Link>
            </nav>
            <div className="flex items-center gap-3">
              <Button variant="outline" size="sm">
                Iniciar Sesión
              </Button>
              <Button size="sm" className="bg-accent hover:bg-accent/90 text-accent-foreground" asChild>
                <Link href="/add-machine">
                  <Plus className="w-4 h-4 mr-2" />
                  Agregar Máquina
                </Link>
              </Button>
            </div>
          </div>
        </div>
      </header>

      {/* Hero Section */}
      <section className="bg-gradient-to-br from-muted to-card py-16">
        <div className="container mx-auto px-4 text-center">
          <h2 className="text-4xl md:text-5xl font-bold text-foreground mb-4 text-balance">
            Plataforma Digital de Alquiler de Maquinaria Pesada
          </h2>
          <p className="text-xl text-muted-foreground mb-8 max-w-2xl mx-auto text-pretty">
            Conecta propietarios de equipos, contratistas y operadores con procesos digitales transparentes. Elimina el
            tiempo de inactividad, reduce disputas y maximiza la rentabilidad.
          </p>

          {/* Search Bar */}
          <div className="max-w-2xl mx-auto mb-8">
            <div className="flex gap-2">
              <div className="relative flex-1">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground w-4 h-4" />
                <Input placeholder="Buscar excavadoras, bulldozers, grúas..." className="pl-10 h-12 text-base" />
              </div>
              <Button size="lg" className="px-8 bg-accent hover:bg-accent/90 text-accent-foreground">
                Buscar
              </Button>
            </div>
          </div>

          {/* Agregando botón para acceder al chatbot */}
          <div className="flex justify-center">
            <Button size="lg" variant="outline" className="px-8 bg-transparent" asChild>
              <Link href="/chatbot">
                <MessageCircle className="w-5 h-5 mr-2" />
                ¿Necesitas ayuda encontrando maquinaria? Habla con nuestro asistente IA
              </Link>
            </Button>
          </div>
        </div>
      </section>

      {/* Featured Equipment */}
      <section className="py-16">
        <div className="container mx-auto px-4">
          <div className="flex items-center justify-between mb-8">
            <h3 className="text-3xl font-bold text-foreground">Equipos Disponibles</h3>
            <Button variant="outline" onClick={() => setShowFilters(!showFilters)} className="flex items-center gap-2">
              <Filter className="w-4 h-4" />
              {showFilters ? "Ocultar Filtros" : "Mostrar Filtros"}
            </Button>
          </div>

          {showFilters && (
            <Card className="mb-8 p-6">
              <h4 className="text-lg font-semibold mb-4">Filtrar Maquinaria</h4>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                {/* Filtro de Precio */}
                <div>
                  <label className="text-sm font-medium mb-2 block">Rango de Precio (COP/hora)</label>
                  <div className="px-2">
                    <Slider
                      value={filters.priceRange}
                      onValueChange={(value) => setFilters({ ...filters, priceRange: value })}
                      max={500000}
                      min={0}
                      step={10000}
                      className="mb-2"
                    />
                    <div className="flex justify-between text-xs text-muted-foreground">
                      <span>₡{filters.priceRange[0].toLocaleString()}</span>
                      <span>₡{filters.priceRange[1].toLocaleString()}</span>
                    </div>
                  </div>
                </div>

                {/* Filtro de Ubicación */}
                <div>
                  <label className="text-sm font-medium mb-2 block">Ubicación</label>
                  <Select
                    value={filters.location}
                    onValueChange={(value) => setFilters({ ...filters, location: value })}
                  >
                    <SelectTrigger>
                      <SelectValue placeholder="Todas las ciudades" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="all">Todas las ciudades</SelectItem>
                      <SelectItem value="Bogotá">Bogotá</SelectItem>
                      <SelectItem value="Medellín">Medellín</SelectItem>
                      <SelectItem value="Cali">Cali</SelectItem>
                      <SelectItem value="Barranquilla">Barranquilla</SelectItem>
                      <SelectItem value="Cartagena">Cartagena</SelectItem>
                    </SelectContent>
                  </Select>
                </div>

                {/* Filtro de Horas Máximas */}
                <div>
                  <label className="text-sm font-medium mb-2 block">
                    Horas Máximas: {filters.maxHours.toLocaleString()}
                  </label>
                  <div className="px-2">
                    <Slider
                      value={[filters.maxHours]}
                      onValueChange={(value) => setFilters({ ...filters, maxHours: value[0] })}
                      max={5000}
                      min={0}
                      step={100}
                    />
                  </div>
                </div>

                {/* Filtro de Estado */}
                <div>
                  <label className="text-sm font-medium mb-2 block">Estado</label>
                  <Select value={filters.status} onValueChange={(value) => setFilters({ ...filters, status: value })}>
                    <SelectTrigger>
                      <SelectValue placeholder="Todos los estados" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="all">Todos los estados</SelectItem>
                      <SelectItem value="Disponible">Disponible</SelectItem>
                      <SelectItem value="En Uso">En Uso</SelectItem>
                      <SelectItem value="Mantenimiento">Mantenimiento</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </div>

              {/* Botón para limpiar filtros */}
              <div className="mt-4 flex justify-end">
                <Button
                  variant="outline"
                  onClick={() =>
                    setFilters({ priceRange: [0, 500000], location: "all", maxHours: 5000, status: "all" })
                  }
                >
                  Limpiar Filtros
                </Button>
              </div>
            </Card>
          )}

          <div className="mb-4 text-muted-foreground">
            Mostrando {filteredMachines.length} de {allMachines.length} máquinas
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {filteredMachines.map((machine) => (
              <Card key={machine.id} className="overflow-hidden hover:shadow-lg transition-shadow">
                <div className="aspect-video bg-muted relative">
                  <img
                    src={machine.image || "/placeholder.svg"}
                    alt={machine.name}
                    className="w-full h-full object-cover"
                  />
                  <Badge
                    className={`absolute top-3 left-3 ${machine.statusColor} text-white hover:${machine.statusColor}`}
                  >
                    {machine.status}
                  </Badge>
                  <DropdownMenu>
                    <DropdownMenuTrigger asChild>
                      <Button
                        variant="ghost"
                        size="sm"
                        className="absolute top-3 right-3 h-8 w-8 p-0 bg-white/80 hover:bg-white/90 text-black"
                      >
                        <MoreVertical className="h-4 w-4" />
                      </Button>
                    </DropdownMenuTrigger>
                    <DropdownMenuContent align="end">
                      <DropdownMenuItem onClick={() => handleEditMachine(machine.id, machine.isDefault)}>
                        <Edit className="mr-2 h-4 w-4" />
                        Editar
                      </DropdownMenuItem>
                      <DropdownMenuItem
                        onClick={() => handleDeleteMachine(machine.id, machine.isDefault)}
                        className="text-red-600 focus:text-red-600"
                      >
                        <Trash2 className="mr-2 h-4 w-4" />
                        Borrar
                      </DropdownMenuItem>
                    </DropdownMenuContent>
                  </DropdownMenu>
                </div>
                <CardHeader>
                  <div className="flex items-start justify-between">
                    <div>
                      <CardTitle className="text-lg">{machine.name}</CardTitle>
                      <CardDescription className="flex items-center gap-1 mt-1">
                        <MapPin className="w-4 h-4" />
                        {machine.location}, Colombia
                      </CardDescription>
                    </div>
                    <div className="text-right">
                      <div className="text-2xl font-bold text-primary">₡{machine.price.toLocaleString()}</div>
                      <div className="text-sm text-muted-foreground">por hora</div>
                    </div>
                  </div>
                </CardHeader>
                <CardContent>
                  <div className="grid grid-cols-2 gap-4 text-sm mb-4">
                    <div>
                      <span className="text-muted-foreground">{machine.weight ? "Peso:" : "Capacidad:"}</span>
                      <div className="font-medium">{machine.weight || machine.capacity}</div>
                    </div>
                    <div>
                      <span className="text-muted-foreground">Horas:</span>
                      <div className="font-medium">{machine.hours.toLocaleString()} hrs</div>
                    </div>
                  </div>
                  {machine.status === "Disponible" ? (
                    <Dialog>
                      <DialogTrigger asChild>
                        <Button
                          className="w-full bg-accent hover:bg-accent/90 text-black"
                          onClick={() => setSelectedMachine(machine)}
                        >
                          Solicitar Alquiler
                        </Button>
                      </DialogTrigger>
                      <DialogContent className="max-w-2xl max-h-[90vh] overflow-y-auto">
                        <DialogHeader>
                          <DialogTitle className="flex items-center gap-2">
                            <FileText className="w-5 h-5" />
                            Crear Contrato de Alquiler
                          </DialogTitle>
                          <DialogDescription>
                            Complete los detalles para crear un contrato digital para {machine.name}
                          </DialogDescription>
                        </DialogHeader>

                        <form onSubmit={handleContractSubmit} className="space-y-6">
                          {/* Información de la Máquina */}
                          <div className="bg-muted p-4 rounded-lg">
                            <h3 className="font-semibold mb-2">Equipo Seleccionado</h3>
                            <div className="grid grid-cols-2 gap-4 text-sm">
                              <div>
                                <span className="text-muted-foreground">Máquina:</span>
                                <div className="font-medium">{machine.name}</div>
                              </div>
                              <div>
                                <span className="text-muted-foreground">Ubicación:</span>
                                <div className="font-medium">{machine.location}</div>
                              </div>
                              <div>
                                <span className="text-muted-foreground">Precio por hora:</span>
                                <div className="font-medium text-lg">₡{machine.price.toLocaleString()}</div>
                              </div>
                              <div>
                                <span className="text-muted-foreground">Horas de uso:</span>
                                <div className="font-medium">{machine.hours.toLocaleString()} hrs</div>
                              </div>
                            </div>
                          </div>

                          {/* Información del Contratista */}
                          <div className="space-y-4">
                            <h3 className="font-semibold flex items-center gap-2">
                              <User className="w-4 h-4" />
                              Información del Contratista
                            </h3>
                            <div className="grid grid-cols-2 gap-4">
                              <div>
                                <Label htmlFor="company">Empresa</Label>
                                <Input id="company" placeholder="Nombre de la empresa" required />
                              </div>
                              <div>
                                <Label htmlFor="contact">Persona de Contacto</Label>
                                <Input id="contact" placeholder="Nombre completo" required />
                              </div>
                              <div>
                                <Label htmlFor="phone">Teléfono</Label>
                                <Input id="phone" type="tel" placeholder="+57 300 123 4567" required />
                              </div>
                              <div>
                                <Label htmlFor="email">Email</Label>
                                <Input id="email" type="email" placeholder="contacto@empresa.com" required />
                              </div>
                            </div>
                          </div>

                          {/* Detalles del Contrato */}
                          <div className="space-y-4">
                            <h3 className="font-semibold flex items-center gap-2">
                              <Calendar className="w-4 h-4" />
                              Detalles del Alquiler
                            </h3>
                            <div className="grid grid-cols-2 gap-4">
                              <div>
                                <Label htmlFor="startDate">Fecha de Inicio</Label>
                                <Input id="startDate" type="date" required />
                              </div>
                              <div>
                                <Label htmlFor="endDate">Fecha de Finalización</Label>
                                <Input id="endDate" type="date" required />
                              </div>
                              <div>
                                <Label htmlFor="minHours">Horas Mínimas Garantizadas</Label>
                                <Input id="minHours" type="number" placeholder="40" min="1" required />
                              </div>
                              <div>
                                <Label htmlFor="maxHours">Horas Máximas por Día</Label>
                                <Input id="maxHours" type="number" placeholder="8" min="1" max="24" required />
                              </div>
                            </div>
                            <div>
                              <Label htmlFor="workLocation">Ubicación del Trabajo</Label>
                              <Input id="workLocation" placeholder="Dirección completa del proyecto" required />
                            </div>
                            <div>
                              <Label htmlFor="projectDescription">Descripción del Proyecto</Label>
                              <Textarea
                                id="projectDescription"
                                placeholder="Breve descripción del trabajo a realizar..."
                                rows={3}
                                required
                              />
                            </div>
                          </div>

                          {/* Términos y Condiciones */}
                          <div className="space-y-4">
                            <h3 className="font-semibold">Términos del Contrato</h3>
                            <div className="bg-muted p-4 rounded-lg text-sm space-y-2">
                              <div className="flex justify-between">
                                <span>Tarifa por hora:</span>
                                <span className="font-medium">₡{machine.price.toLocaleString()}</span>
                              </div>
                              <div className="flex justify-between">
                                <span>Depósito de garantía:</span>
                                <span className="font-medium">₡{(machine.price * 8).toLocaleString()}</span>
                              </div>
                              <div className="flex justify-between">
                                <span>Combustible:</span>
                                <span className="font-medium">Por cuenta del contratista</span>
                              </div>
                              <div className="flex justify-between">
                                <span>Operador:</span>
                                <span className="font-medium">Incluido</span>
                              </div>
                              <div className="flex justify-between">
                                <span>Mantenimiento:</span>
                                <span className="font-medium">Por cuenta del propietario</span>
                              </div>
                            </div>
                          </div>

                          <div className="flex gap-3 pt-4">
                            <Button type="submit" className="flex-1 bg-accent hover:bg-accent/90 text-black">
                              Crear Contrato Digital
                            </Button>
                            <DialogTrigger asChild>
                              <Button type="button" variant="outline" className="flex-1 bg-transparent">
                                Cancelar
                              </Button>
                            </DialogTrigger>
                          </div>
                        </form>
                      </DialogContent>
                    </Dialog>
                  ) : machine.status === "En Uso" ? (
                    <Button variant="outline" className="w-full bg-transparent" disabled>
                      Disponible 15 Ene
                    </Button>
                  ) : (
                    <Button variant="outline" className="w-full bg-transparent" disabled>
                      En Mantenimiento
                    </Button>
                  )}
                </CardContent>
              </Card>
            ))}
          </div>

          {filteredMachines.length === 0 && (
            <div className="text-center py-12">
              <p className="text-lg text-muted-foreground mb-4">
                No se encontraron máquinas con los filtros seleccionados
              </p>
              <Button
                variant="outline"
                onClick={() => setFilters({ priceRange: [0, 500000], location: "all", maxHours: 5000, status: "all" })}
              >
                Limpiar Filtros
              </Button>
            </div>
          )}
        </div>
      </section>

      {/* Edit Machine Modal */}
      <Dialog open={showEditModal} onOpenChange={setShowEditModal}>
        <DialogContent className="max-w-2xl max-h-[90vh] overflow-y-auto">
          <DialogHeader>
            <DialogTitle className="flex items-center gap-2">
              <Edit className="w-5 h-5" />
              Editar Máquina
            </DialogTitle>
            <DialogDescription>Modifica los detalles de {editingMachine?.name}</DialogDescription>
          </DialogHeader>

          {editingMachine && (
            <form onSubmit={handleEditSubmit} className="space-y-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <Label htmlFor="edit-name">Nombre de la Máquina</Label>
                  <Input
                    id="edit-name"
                    name="name"
                    defaultValue={editingMachine.name}
                    placeholder="Ej: Excavadora Caterpillar 320"
                    required
                  />
                </div>

                <div>
                  <Label htmlFor="edit-model">Modelo</Label>
                  <Input
                    id="edit-model"
                    name="model"
                    defaultValue={editingMachine.model}
                    placeholder="Ej: CAT 320D"
                    required
                  />
                </div>

                <div>
                  <Label htmlFor="edit-location">Ubicación</Label>
                  <Select name="location" defaultValue={editingMachine.location}>
                    <SelectTrigger>
                      <SelectValue placeholder="Selecciona una ciudad" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="Bogotá">Bogotá</SelectItem>
                      <SelectItem value="Medellín">Medellín</SelectItem>
                      <SelectItem value="Cali">Cali</SelectItem>
                      <SelectItem value="Barranquilla">Barranquilla</SelectItem>
                      <SelectItem value="Cartagena">Cartagena</SelectItem>
                      <SelectItem value="Bucaramanga">Bucaramanga</SelectItem>
                      <SelectItem value="Pereira">Pereira</SelectItem>
                      <SelectItem value="Santa Marta">Santa Marta</SelectItem>
                    </SelectContent>
                  </Select>
                </div>

                <div>
                  <Label htmlFor="edit-weight">Peso/Capacidad</Label>
                  <Input
                    id="edit-weight"
                    name="weight"
                    defaultValue={editingMachine.weight || editingMachine.capacity}
                    placeholder="Ej: 20 toneladas"
                    required
                  />
                </div>

                <div>
                  <Label htmlFor="edit-hourlyPrice">Precio por Hora (COP)</Label>
                  <Input
                    id="edit-hourlyPrice"
                    name="hourlyPrice"
                    type="number"
                    defaultValue={editingMachine.hourlyPrice || editingMachine.price}
                    placeholder="280000"
                    min="1"
                    required
                  />
                </div>

                <div>
                  <Label htmlFor="edit-currentHours">Horas Actuales del Horómetro</Label>
                  <Input
                    id="edit-currentHours"
                    name="currentHours"
                    type="number"
                    defaultValue={editingMachine.currentHours || editingMachine.hours}
                    placeholder="2450"
                    min="0"
                    required
                  />
                </div>

                <div className="md:col-span-2">
                  <Label htmlFor="edit-status">Estado Operacional</Label>
                  <Select
                    name="status"
                    defaultValue={
                      editingMachine.status === "Disponible"
                        ? "available"
                        : editingMachine.status === "En Uso"
                          ? "in-use"
                          : editingMachine.status === "Mantenimiento"
                            ? "maintenance"
                            : "inactive"
                    }
                  >
                    <SelectTrigger>
                      <SelectValue placeholder="Selecciona el estado" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="available">Disponible</SelectItem>
                      <SelectItem value="in-use">En Uso</SelectItem>
                      <SelectItem value="maintenance">En Mantenimiento</SelectItem>
                      <SelectItem value="inactive">Inactiva</SelectItem>
                    </SelectContent>
                  </Select>
                </div>

                <div className="md:col-span-2">
                  <Label htmlFor="edit-description">Descripción Adicional</Label>
                  <Textarea
                    id="edit-description"
                    name="description"
                    defaultValue={editingMachine.description}
                    placeholder="Información adicional sobre la máquina, condiciones especiales, etc."
                    rows={3}
                  />
                </div>
              </div>

              <div className="flex gap-3 pt-4">
                <Button type="submit" className="flex-1 bg-accent hover:bg-accent/90 text-black">
                  Guardar Cambios
                </Button>
                <Button
                  type="button"
                  variant="outline"
                  className="flex-1 bg-transparent"
                  onClick={() => setShowEditModal(false)}
                >
                  Cancelar
                </Button>
              </div>
            </form>
          )}
        </DialogContent>
      </Dialog>

      {/* Platform Benefits */}
      <section className="py-16 bg-muted">
        <div className="container mx-auto px-4">
          <h3 className="text-3xl font-bold text-center text-foreground mb-12">¿Por Qué Elegir MaquiSoluciones?</h3>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            <div className="text-center">
              <div className="w-16 h-16 bg-accent rounded-full flex items-center justify-center mx-auto mb-4">
                <Shield className="w-8 h-8 text-accent-foreground" />
              </div>
              <h4 className="text-xl font-semibold text-foreground mb-2">Contratos Digitales</h4>
              <p className="text-muted-foreground text-pretty">
                Contratos digitales validados legalmente eliminan disputas y aseguran transparencia
              </p>
            </div>

            <div className="text-center">
              <div className="w-16 h-16 bg-accent rounded-full flex items-center justify-center mx-auto mb-4">
                <Clock className="w-8 h-8 text-accent-foreground" />
              </div>
              <h4 className="text-xl font-semibold text-foreground mb-2">Seguimiento de Horas</h4>
              <p className="text-muted-foreground text-pretty">
                Monitoreo en tiempo real del horómetro con registro de operadores y análisis de uso
              </p>
            </div>

            <div className="text-center">
              <div className="w-16 h-16 bg-accent rounded-full flex items-center justify-center mx-auto mb-4">
                <Wrench className="w-8 h-8 text-accent-foreground" />
              </div>
              <h4 className="text-xl font-semibold text-foreground mb-2">Mantenimiento Preventivo</h4>
              <p className="text-muted-foreground text-pretty">
                Alertas de mantenimiento con IA previenen averías y reducen costos de inactividad
              </p>
            </div>

            <div className="text-center">
              <div className="w-16 h-16 bg-accent rounded-full flex items-center justify-center mx-auto mb-4">
                <TrendingUp className="w-8 h-8 text-accent-foreground" />
              </div>
              <h4 className="text-xl font-semibold text-foreground mb-2">Análisis Financiero</h4>
              <p className="text-muted-foreground text-pretty">
                Rastrea proyecciones de ingresos e identifica pérdidas por inactividad con reportes detallados
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-16 bg-primary text-primary-foreground">
        <div className="container mx-auto px-4 text-center">
          <h3 className="text-3xl font-bold mb-4">¿Listo para Digitalizar tus Operaciones?</h3>
          <p className="text-xl mb-8 opacity-90 max-w-2xl mx-auto text-pretty">
            Únete a la plataforma que está transformando el alquiler de maquinaria pesada con procesos transparentes e
            insights basados en datos.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button size="lg" variant="secondary" className="px-8" asChild>
              <Link href="/add-machine">
                <Plus className="w-5 h-5 mr-2" />
                Listar tu Equipo
              </Link>
            </Button>
            <Button
              size="lg"
              variant="outline"
              className="px-8 border-primary-foreground text-primary-foreground hover:bg-primary-foreground hover:text-primary bg-transparent"
            >
              Explorar Mercado
            </Button>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-card border-t border-border py-12">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
            <div>
              <div className="flex items-center gap-2 mb-4">
                <img src="/maquisoluciones-logo.png" alt="MaquiSoluciones Logo" className="w-8 h-8" />
                <h4 className="text-lg font-bold text-foreground">MaquiSoluciones</h4>
              </div>
              <p className="text-muted-foreground text-pretty">
                Digitalizando el alquiler de maquinaria pesada para máxima eficiencia y rentabilidad.
              </p>
            </div>

            <div>
              <h5 className="font-semibold text-foreground mb-3">Plataforma</h5>
              <ul className="space-y-2 text-muted-foreground">
                <li>
                  <a href="#" className="hover:text-foreground transition-colors">
                    Mercado
                  </a>
                </li>
                <li>
                  <a href="#" className="hover:text-foreground transition-colors">
                    Agregar Equipo
                  </a>
                </li>
                <li>
                  <a href="#" className="hover:text-foreground transition-colors">
                    Contratos Digitales
                  </a>
                </li>
                <li>
                  <a href="#" className="hover:text-foreground transition-colors">
                    Análisis
                  </a>
                </li>
              </ul>
            </div>

            <div>
              <h5 className="font-semibold text-foreground mb-3">Soporte</h5>
              <ul className="space-y-2 text-muted-foreground">
                <li>
                  <a href="#" className="hover:text-foreground transition-colors">
                    Centro de Ayuda
                  </a>
                </li>
                <li>
                  <a href="#" className="hover:text-foreground transition-colors">
                    Contáctanos
                  </a>
                </li>
                <li>
                  <a href="#" className="hover:text-foreground transition-colors">
                    Documentación
                  </a>
                </li>
                <li>
                  <a href="#" className="hover:text-foreground transition-colors">
                    API
                  </a>
                </li>
              </ul>
            </div>

            <div>
              <h5 className="font-semibold text-foreground mb-3">Empresa</h5>
              <ul className="space-y-2 text-muted-foreground">
                <li>
                  <a href="#" className="hover:text-foreground transition-colors">
                    Acerca de
                  </a>
                </li>
                <li>
                  <a href="#" className="hover:text-foreground transition-colors">
                    Privacidad
                  </a>
                </li>
                <li>
                  <a href="#" className="hover:text-foreground transition-colors">
                    Términos
                  </a>
                </li>
                <li>
                  <a href="#" className="hover:text-foreground transition-colors">
                    Seguridad
                  </a>
                </li>
              </ul>
            </div>
          </div>

          <div className="border-t border-border mt-8 pt-8 text-center text-muted-foreground">
            <p>&copy; 2024 MaquiSoluciones. Todos los derechos reservados.</p>
          </div>
        </div>
      </footer>
    </div>
  )
}
