"use client"

import type React from "react"

import { useState, useRef, useEffect } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Card, CardContent } from "@/components/ui/card"
import { Send, Bot, User, ArrowLeft, Loader2 } from "lucide-react"
import Link from "next/link"

interface Message {
  id: string
  content: string
  sender: "user" | "bot"
  timestamp: Date
  suggestions?: string[]
}

export default function ChatbotPage() {
  const [messages, setMessages] = useState<Message[]>([
    {
      id: "1",
      content:
        "¡Hola! Soy tu asistente de MaquiSoluciones. Te ayudo a encontrar la maquinaria perfecta para tu proyecto. ¿Qué tipo de trabajo necesitas realizar?",
      sender: "bot",
      timestamp: new Date(),
      suggestions: [
        "Excavación y movimiento de tierra",
        "Construcción de edificios",
        "Demolición",
        "Trabajo en carreteras",
      ],
    },
  ])
  const [inputMessage, setInputMessage] = useState("")
  const [isTyping, setIsTyping] = useState(false)
  const messagesEndRef = useRef<HTMLDivElement>(null)

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" })
  }

  useEffect(() => {
    scrollToBottom()
  }, [messages])

  const generateBotResponse = (userMessage: string): Message => {
    const lowerMessage = userMessage.toLowerCase()

    // Respuestas basadas en palabras clave
    if (lowerMessage.includes("excavad") || lowerMessage.includes("excav")) {
      return {
        id: Date.now().toString(),
        content:
          "Perfecto para excavación tenemos varias opciones:\n\n🚜 **Excavadora Caterpillar 320** - Bogotá\n• 20 toneladas, ideal para excavaciones medianas\n• ₡280,000 COP/hora\n• Disponible ahora\n\n🚜 **Excavadora Komatsu PC200** - Medellín\n• 22 toneladas, excelente para proyectos grandes\n• ₡310,000 COP/hora\n• Disponible desde mañana\n\n¿Te interesa alguna de estas opciones o necesitas especificaciones diferentes?",
        sender: "bot",
        timestamp: new Date(),
        suggestions: ["Ver más excavadoras", "Necesito más capacidad", "Precios en otras ciudades"],
      }
    }

    if (lowerMessage.includes("grúa") || lowerMessage.includes("grua")) {
      return {
        id: Date.now().toString(),
        content:
          "Excelente elección para trabajos de altura:\n\n🏗️ **Grúa Liebherr LTM 1050** - Cali\n• Capacidad: 50 toneladas\n• Altura máxima: 48 metros\n• ₡450,000 COP/hora\n• Incluye operador certificado\n\n🏗️ **Grúa Tadano ATF 70G** - Barranquilla\n• Capacidad: 70 toneladas\n• Todo terreno\n• ₡520,000 COP/hora\n\n¿Qué altura y peso necesitas manejar?",
        sender: "bot",
        timestamp: new Date(),
        suggestions: ["Necesito más capacidad", "Grúas en Bogotá", "Incluye transporte?"],
      }
    }

    if (lowerMessage.includes("bulldozer") || lowerMessage.includes("buldozer")) {
      return {
        id: Date.now().toString(),
        content:
          "Para movimiento de tierra y nivelación:\n\n🚛 **Bulldozer Komatsu D65** - Medellín\n• 18 toneladas, perfecto para nivelación\n• ₡320,000 COP/hora\n• Disponible en 2 días\n\n🚛 **Bulldozer CAT D6T** - Bogotá\n• 20 toneladas, ideal para trabajos pesados\n• ₡380,000 COP/hora\n• Disponible ahora\n\n¿Cuántas hectáreas necesitas trabajar aproximadamente?",
        sender: "bot",
        timestamp: new Date(),
        suggestions: ["Menos de 1 hectárea", "1-5 hectáreas", "Más de 5 hectáreas"],
      }
    }

    if (lowerMessage.includes("precio") || lowerMessage.includes("costo") || lowerMessage.includes("tarifa")) {
      return {
        id: Date.now().toString(),
        content:
          "Nuestros precios varían según el tipo de maquinaria:\n\n💰 **Rangos de precios por hora:**\n• Excavadoras: ₡250,000 - ₡400,000\n• Bulldozers: ₡300,000 - ₡450,000\n• Grúas: ₡400,000 - ₡600,000\n• Retroexcavadoras: ₡180,000 - ₡280,000\n\n📋 **Incluye:**\n✅ Combustible\n✅ Operador certificado\n✅ Mantenimiento básico\n✅ Seguro de responsabilidad\n\n¿Qué tipo de maquinaria te interesa específicamente?",
        sender: "bot",
        timestamp: new Date(),
        suggestions: ["Ver excavadoras", "Ver grúas", "Ver bulldozers"],
      }
    }

    if (lowerMessage.includes("ubicación") || lowerMessage.includes("ciudad") || lowerMessage.includes("donde")) {
      return {
        id: Date.now().toString(),
        content:
          "Tenemos maquinaria disponible en las principales ciudades:\n\n🏙️ **Ciudades con mayor inventario:**\n• **Bogotá** - 45+ máquinas disponibles\n• **Medellín** - 32+ máquinas disponibles\n• **Cali** - 28+ máquinas disponibles\n• **Barranquilla** - 18+ máquinas disponibles\n• **Bucaramanga** - 15+ máquinas disponibles\n\n🚚 **Servicio de transporte disponible** entre ciudades con costo adicional.\n\n¿En qué ciudad necesitas la maquinaria?",
        sender: "bot",
        timestamp: new Date(),
        suggestions: ["Bogotá", "Medellín", "Cali", "Otra ciudad"],
      }
    }

    // Respuesta por defecto
    return {
      id: Date.now().toString(),
      content:
        "Entiendo que necesitas ayuda con maquinaria. Para darte la mejor recomendación, ¿podrías contarme más sobre:\n\n🔍 **Información útil:**\n• ¿Qué tipo de proyecto vas a realizar?\n• ¿En qué ciudad necesitas la maquinaria?\n• ¿Tienes algún presupuesto en mente?\n• ¿Cuánto tiempo la necesitarías?\n\nCon esta información puedo sugerirte las mejores opciones disponibles.",
      sender: "bot",
      timestamp: new Date(),
      suggestions: ["Excavación", "Construcción", "Demolición", "Ver catálogo completo"],
    }
  }

  const handleSendMessage = async () => {
    if (!inputMessage.trim()) return

    const userMessage: Message = {
      id: Date.now().toString(),
      content: inputMessage,
      sender: "user",
      timestamp: new Date(),
    }

    setMessages((prev) => [...prev, userMessage])
    setInputMessage("")
    setIsTyping(true)

    // Simular tiempo de respuesta del bot
    setTimeout(() => {
      const botResponse = generateBotResponse(inputMessage)
      setMessages((prev) => [...prev, botResponse])
      setIsTyping(false)
    }, 1500)
  }

  const handleSuggestionClick = (suggestion: string) => {
    setInputMessage(suggestion)
  }

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault()
      handleSendMessage()
    }
  }

  return (
    <div className="min-h-screen bg-background flex flex-col">
      {/* Header */}
      <header className="border-b border-border bg-card p-4">
        <div className="flex items-center gap-4">
          <Button variant="ghost" size="sm" asChild>
            <Link href="/">
              <ArrowLeft className="w-4 h-4 mr-2" />
              Volver al inicio
            </Link>
          </Button>
          <div className="flex items-center gap-2">
            <div className="w-8 h-8 bg-accent rounded-full flex items-center justify-center">
              <Bot className="w-5 h-5 text-accent-foreground" />
            </div>
            <div>
              <h1 className="font-semibold text-foreground">Asistente de Maquinaria IA</h1>
              <p className="text-sm text-muted-foreground">Te ayudo a encontrar el equipo perfecto</p>
            </div>
          </div>
        </div>
      </header>

      {/* Chat Messages */}
      <div className="flex-1 overflow-y-auto p-4 space-y-4">
        <div className="max-w-4xl mx-auto">
          {messages.map((message) => (
            <div
              key={message.id}
              className={`flex gap-3 ${message.sender === "user" ? "justify-end" : "justify-start"}`}
            >
              {message.sender === "bot" && (
                <div className="w-8 h-8 bg-accent rounded-full flex items-center justify-center flex-shrink-0">
                  <Bot className="w-4 h-4 text-accent-foreground" />
                </div>
              )}

              <div className={`max-w-2xl ${message.sender === "user" ? "order-first" : ""}`}>
                <Card className={`${message.sender === "user" ? "bg-primary text-primary-foreground" : "bg-card"}`}>
                  <CardContent className="p-4">
                    <div className="whitespace-pre-wrap text-sm leading-relaxed">{message.content}</div>
                    {message.suggestions && (
                      <div className="flex flex-wrap gap-2 mt-3">
                        {message.suggestions.map((suggestion, index) => (
                          <Button
                            key={index}
                            variant="outline"
                            size="sm"
                            onClick={() => handleSuggestionClick(suggestion)}
                            className="text-xs"
                          >
                            {suggestion}
                          </Button>
                        ))}
                      </div>
                    )}
                  </CardContent>
                </Card>
                <div className="text-xs text-muted-foreground mt-1 px-2">
                  {message.timestamp.toLocaleTimeString("es-CO", { hour: "2-digit", minute: "2-digit" })}
                </div>
              </div>

              {message.sender === "user" && (
                <div className="w-8 h-8 bg-muted rounded-full flex items-center justify-center flex-shrink-0">
                  <User className="w-4 h-4 text-muted-foreground" />
                </div>
              )}
            </div>
          ))}

          {isTyping && (
            <div className="flex gap-3 justify-start">
              <div className="w-8 h-8 bg-accent rounded-full flex items-center justify-center flex-shrink-0">
                <Bot className="w-4 h-4 text-accent-foreground" />
              </div>
              <Card className="bg-card">
                <CardContent className="p-4">
                  <div className="flex items-center gap-2">
                    <Loader2 className="w-4 h-4 animate-spin" />
                    <span className="text-sm text-muted-foreground">Escribiendo...</span>
                  </div>
                </CardContent>
              </Card>
            </div>
          )}

          <div ref={messagesEndRef} />
        </div>
      </div>

      {/* Input Area */}
      <div className="border-t border-border bg-card p-4">
        <div className="max-w-4xl mx-auto">
          <div className="flex gap-2">
            <Input
              value={inputMessage}
              onChange={(e) => setInputMessage(e.target.value)}
              onKeyPress={handleKeyPress}
              placeholder="Escribe tu pregunta sobre maquinaria..."
              className="flex-1"
              disabled={isTyping}
            />
            <Button
              onClick={handleSendMessage}
              disabled={!inputMessage.trim() || isTyping}
              className="bg-accent hover:bg-accent/90 text-accent-foreground"
            >
              <Send className="w-4 h-4" />
            </Button>
          </div>
          <p className="text-xs text-muted-foreground mt-2 text-center">
            Presiona Enter para enviar • El asistente puede cometer errores, verifica información importante
          </p>
        </div>
      </div>
    </div>
  )
}
