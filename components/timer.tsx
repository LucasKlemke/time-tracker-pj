"use client"

import { useState, useEffect } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { Play, Pause, Square } from "lucide-react"

interface TimerProps {
  onActivitySaved: () => void
}

export function Timer({ onActivitySaved }: TimerProps) {
  const [isRunning, setIsRunning] = useState(false)
  const [seconds, setSeconds] = useState(0)
  const [title, setTitle] = useState("")
  const [description, setDescription] = useState("")
  const [startTime, setStartTime] = useState<Date | null>(null)

  useEffect(() => {
    let interval: NodeJS.Timeout | null = null

    if (isRunning) {
      interval = setInterval(() => {
        setSeconds((seconds) => seconds + 1)
      }, 1000)
    } else if (!isRunning && seconds !== 0) {
      if (interval) clearInterval(interval)
    }

    return () => {
      if (interval) clearInterval(interval)
    }
  }, [isRunning, seconds])

  const handleStart = () => {
    if (!title.trim()) {
      alert("Por favor, insira um título para a atividade")
      return
    }

    setIsRunning(true)
    setStartTime(new Date())
  }

  const handlePause = () => {
    setIsRunning(false)
  }

  const handleStop = async () => {
    if (!title.trim()) {
      alert("Por favor, insira um título para a atividade")
      return
    }

    const endTime = new Date()
    const duration = Math.floor(seconds / 60) // converter para minutos

    try {
      const response = await fetch("/api/activities", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          title,
          description,
          duration,
          isManual: false,
          startTime: startTime?.toISOString(),
          endTime: endTime.toISOString(),
        }),
      })

      if (response.ok) {
        // Reset timer
        setIsRunning(false)
        setSeconds(0)
        setTitle("")
        setDescription("")
        setStartTime(null)
        onActivitySaved()
      }
    } catch (error) {
      console.error("Erro ao salvar atividade:", error)
    }
  }

  const minutes = Math.floor(seconds / 60)
  const displaySeconds = seconds % 60

  return (
    <Card>
      <CardHeader>
        <CardTitle>Timer de Atividade</CardTitle>
      </CardHeader>
      <CardContent className="space-y-4">
        <div className="text-center">
          <div className="text-6xl font-mono font-bold">
            {String(Math.floor(minutes / 60)).padStart(2, "0")}:{String(minutes % 60).padStart(2, "0")}:
            {String(displaySeconds).padStart(2, "0")}
          </div>
        </div>

        <div className="space-y-2">
          <Input
            placeholder="Título da atividade"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            disabled={isRunning}
          />
          <Textarea
            placeholder="Descrição (opcional)"
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            disabled={isRunning}
          />
        </div>

        <div className="flex gap-2 justify-center">
          {!isRunning ? (
            <Button onClick={handleStart} size="lg">
              <Play className="w-4 h-4 mr-2" />
              Iniciar
            </Button>
          ) : (
            <>
              <Button onClick={handlePause} variant="outline" size="lg">
                <Pause className="w-4 h-4 mr-2" />
                Pausar
              </Button>
              <Button onClick={handleStop} variant="destructive" size="lg">
                <Square className="w-4 h-4 mr-2" />
                Finalizar
              </Button>
            </>
          )}
        </div>
      </CardContent>
    </Card>
  )
}
