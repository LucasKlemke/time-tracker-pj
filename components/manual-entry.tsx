"use client"

import type React from "react"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { Label } from "@/components/ui/label"
import { DatePicker } from "@/components/ui/date-picker"

interface ManualEntryProps {
  onActivitySaved: () => void 
}

export function ManualEntry({ onActivitySaved }: ManualEntryProps) {
  const [title, setTitle] = useState("")
  const [date, setDate] = useState(() => {
    // Default to today in yyyy-mm-dd format
    const today = new Date()
    const yyyy = today.getFullYear()
    const mm = String(today.getMonth() + 1).padStart(2, "0")
    const dd = String(today.getDate()).padStart(2, "0")
    return `${yyyy}-${mm}-${dd}`
  })
  const [description, setDescription] = useState("")
  const [hours, setHours] = useState("")
  const [minutes, setMinutes] = useState("")
  const [isLoading, setIsLoading] = useState(false)

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()

    if (!title.trim()) {
      alert("Por favor, insira um título para a atividade")
      return
    }

    const totalMinutes = (Number.parseInt(hours) || 0) * 60 + (Number.parseInt(minutes) || 0)

    if (totalMinutes === 0) {
      alert("Por favor, insira um tempo válido")
      return
    }

    setIsLoading(true)

    try {
      const response = await fetch("/api/activities", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          title,
          description,
          duration: totalMinutes,
          isManual: true,
          date, // include date in payload if needed
        }),
      })

      if (response.ok) {
        setTitle("")
        setDescription("")
        setHours("")
        setMinutes("")
        // Reset date to today after save
        const today = new Date()
        const yyyy = today.getFullYear()
        const mm = String(today.getMonth() + 1).padStart(2, "0")
        const dd = String(today.getDate()).padStart(2, "0")
        setDate(`${yyyy}-${mm}-${dd}`)
        onActivitySaved()
      }
    } catch (error) {
      console.error("Erro ao salvar atividade:", error)
    } finally {
      setIsLoading(false)
    }
  }

  return (
    <Card>
      <CardHeader>
        <CardTitle>Registro Manual</CardTitle>
      </CardHeader>
      <CardContent>
        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <Label htmlFor="title">Título da Atividade</Label>
            <Input
              id="title"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              placeholder="Ex: Desenvolvimento de website"
              required
            />
          </div>
          <div>
            <Label htmlFor="date">Data da Atividade</Label>
            <Input
              id="date"
              type="date"
              value={date}
              onChange={(e) => setDate(e.target.value)}
              placeholder="Ex: 2025-01-01"
              required
            />
          </div>

          <div>
            <Label htmlFor="description">Descrição (opcional)</Label>
            <Textarea
              id="description"
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              placeholder="Detalhes sobre a atividade..."
            />
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div>
              <Label htmlFor="hours">Horas</Label>
              <Input
                id="hours"
                type="number"
                min="0"
                value={hours}
                onChange={(e) => setHours(e.target.value)}
                placeholder="0"
              />
            </div>
            <div>
              <Label htmlFor="minutes">Minutos</Label>
              <Input
                id="minutes"
                type="number"
                min="0"
                max="59"
                value={minutes}
                onChange={(e) => setMinutes(e.target.value)}
                placeholder="0"
              />
            </div>
          </div>

          <Button type="submit" className="w-full" disabled={isLoading}>
            {isLoading ? "Salvando..." : "Salvar Atividade"}
          </Button>
        </form>
      </CardContent>
    </Card>
  )
}
