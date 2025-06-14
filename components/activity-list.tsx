"use client"

import { useState, useEffect } from "react"
import { Card, CardContent } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Trash2, Clock, DollarSign } from "lucide-react"
import { formatDuration, formatCurrency } from "@/lib/utils"

interface Activity {
  id: string
  title: string
  description?: string
  date: string
  duration: number
  value: number
  isManual: boolean
}

interface ActivityListProps {
  period: "today" | "week" | "month" | "all"
  refresh: number
}

export function ActivityList({ period, refresh }: ActivityListProps) {
  const [activities, setActivities] = useState<Activity[]>([])
  const [isLoading, setIsLoading] = useState(true)

  useEffect(() => {
    fetchActivities()
  }, [period, refresh])

  const fetchActivities = async () => {
    try {
      const response = await fetch(`/api/activities?period=${period}`)
      const data = await response.json()
      setActivities(data)
    } catch (error) {
      console.error("Erro ao buscar atividades:", error)
    } finally {
      setIsLoading(false)
    }
  }

  const handleDelete = async (id: string) => {
    if (!confirm("Tem certeza que deseja excluir esta atividade?")) return

    try {
      const response = await fetch(`/api/activities/${id}`, {
        method: "DELETE",
      })

      if (response.ok) {
        setActivities(activities.filter((activity) => activity.id !== id))
      }
    } catch (error) {
      console.error("Erro ao deletar atividade:", error)
    }
  }

  if (isLoading) {
    return <div>Carregando atividades...</div>
  }

  if (activities.length === 0) {
    return (
      <Card>
        <CardContent className="text-center py-8">
          <p className="text-muted-foreground">Nenhuma atividade encontrada para este período.</p>
        </CardContent>
      </Card>
    )
  }

  return (
    <div className="space-y-4">
      {activities.map((activity) => (
        <Card key={activity.id}>
          <CardContent className="">
            <div className="flex justify-between items-start">
              <div className="flex-1">
                <div className="flex items-center gap-2 mb-2">
                  <h3 className="font-semibold text-primary">{activity.title}</h3>
                  {/* <Badge variant={activity.isManual ? "secondary" : "default"}>
                    {activity.isManual ? "Manual" : "Timer"}
                  </Badge> */}
                   <span>{new Date(activity.date).toLocaleDateString("pt-BR")}</span>
                   
                </div>

                {activity.description && <p className="text-sm text- mb-2">{activity.description}</p>}

                <div className="flex items-center gap-4 text-sm text-muted-foreground">
                      <Badge variant="secondary">
                         <div className="flex items-center gap-1">
                    <DollarSign className="w-4 h-4" />
                    {formatCurrency(activity.value)}
                  </div>
                  </Badge>
                   <Badge variant="secondary">
                     <div className="flex items-center gap-1">
                    <Clock className="w-4 h-4" />
                    {formatDuration(activity.duration)}
                  </div>
                   </Badge>
                 
               
                 
          
                 
                </div>
              </div>

              <Button
                variant="ghost"
                size="sm"
                onClick={() => handleDelete(activity.id)}
                className="text-destructive hover:text-destructive"
              >
                <Trash2 className="w-4 h-4" />
              </Button>
            </div>
          </CardContent>
        </Card>
      ))}
    </div>
  )
}
