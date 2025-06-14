"use client"

import { useState, useEffect } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Clock, DollarSign, Activity } from "lucide-react"
import { formatDuration, formatCurrency } from "@/lib/utils"
import { Button } from "./ui/button"

interface Stats {
  totalMinutes: number
  totalValue: number
  totalActivities: number
}

interface StatsCardsProps {
  period: "today" | "week" | "month"
  refresh: number
}

export function StatsCards({ period, refresh }: StatsCardsProps) {
  const [stats, setStats] = useState<Stats>({
    totalMinutes: 0,
    totalValue: 0,
    totalActivities: 0,
  })

  useEffect(() => {
    fetchStats()
  }, [period, refresh])

  const fetchStats = async () => {
    try {
      const response = await fetch(`/api/stats?period=${period}`)
      const data = await response.json()
      setStats(data)
    } catch (error) {
      console.error("Erro ao buscar estatísticas:", error)
    }
  }

  const getPeriodLabel = () => {
    switch (period) {
      case "today":
        return "Hoje"
      case "week":
        return "Esta Semana"
      case "month":
        return "Este Mês"
    }
  }

  return (
    <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
      <Card>
        <CardHeader className="flex flex-row items-center justify-between space-y-0">
          <CardTitle className="text-sm font-medium">Tempo Total - {getPeriodLabel()}</CardTitle>
          <Clock className="h-4 w-4 text-muted-foreground" />
        </CardHeader>
        <CardContent>
          <Button size={'lg'} className="text-2xl font-bold rounded-full">{formatDuration(stats.totalMinutes)}</Button>
        </CardContent>
      </Card>

      <Card>
        <CardHeader className="flex flex-row items-center justify-between space-y-0">
          <CardTitle className="text-sm font-medium">Valor Total - {getPeriodLabel()}</CardTitle>
          <DollarSign className="h-4 w-4 text-muted-foreground" />
        </CardHeader>
        <CardContent>
          <Button size={'lg'} className="text-2xl font-bold rounded-full">{formatCurrency(stats.totalValue)}</Button>
        </CardContent>
      </Card>

      <Card>
        <CardHeader className="flex flex-row items-center justify-between space-y-0">
          <CardTitle className=" font-medium">Atividades - {getPeriodLabel()}</CardTitle>
          <Activity className="h-4 w-4 text-muted-foreground" />
        </CardHeader>
        <CardContent>
          <Button size={'lg'} className="text-2xl font-bold rounded-full">{stats.totalActivities}</Button>
        </CardContent>
      </Card>
    </div>
  )
}
