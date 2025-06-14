"use client"

import type React from "react"

import { useState, useEffect } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Button } from "@/components/ui/button"

interface User {
  id: string
  name: string
  hourlyRate: number
}

export function UserSettings() {
  const [user, setUser] = useState<User | null>(null)
  const [name, setName] = useState("")
  const [hourlyRate, setHourlyRate] = useState("")
  const [isLoading, setIsLoading] = useState(false)

  useEffect(() => {
    fetchUser()
  }, [])

  const fetchUser = async () => {
    try {
      const response = await fetch("/api/user")
      const data = await response.json()
      setUser(data)
      setName(data.name)
      setHourlyRate(data.hourlyRate.toString())
    } catch (error) {
      console.error("Erro ao buscar usuário:", error)
    }
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsLoading(true)

    try {
      const response = await fetch("/api/user", {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          name,
          hourlyRate: Number.parseFloat(hourlyRate),
        }),
      })

      if (response.ok) {
        const updatedUser = await response.json()
        setUser(updatedUser)
        alert("Configurações salvas com sucesso!")
      }
    } catch (error) {
      console.error("Erro ao salvar configurações:", error)
    } finally {
      setIsLoading(false)
    }
  }

  if (!user) return <div>Carregando...</div>

  return (
    <Card>
      <CardHeader>
        <CardTitle>Configurações do Usuário</CardTitle>
      </CardHeader>
      <CardContent>
        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <Label htmlFor="name">Nome</Label>
            <Input id="name" value={name} onChange={(e) => setName(e.target.value)} placeholder="Seu nome" required />
          </div>

          <div>
            <Label htmlFor="hourlyRate">Valor por Hora (R$)</Label>
            <Input
              id="hourlyRate"
              type="number"
              step="0.01"
              min="0"
              value={hourlyRate}
              onChange={(e) => setHourlyRate(e.target.value)}
              placeholder="50.00"
              required
            />
          </div>

          <Button type="submit" disabled={isLoading}>
            {isLoading ? "Salvando..." : "Salvar Configurações"}
          </Button>
        </form>
      </CardContent>
    </Card>
  )
}
