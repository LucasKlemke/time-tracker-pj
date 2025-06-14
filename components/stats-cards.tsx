"use client"

import { useState, useEffect } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Clock, DollarSign, Activity } from "lucide-react"
import { formatDuration, formatCurrency } from "@/lib/utils"
import { Button } from "./ui/button"
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"


interface Stats {
  totalMinutes: number
  totalValue: number
  totalActivities: number
}

interface StatsCardsProps {
  refresh: number
}

export function StatsCards({  refresh }: StatsCardsProps) {
  const [stats, setStats] = useState<Stats>({
    totalMinutes: 0,
    totalValue: 0,
    totalActivities: 0,
  })

  const [period, setPeriod] = useState<"today" | "week" | "month">("today")

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
    <div>
      <label className="block text-sm font-medium text-muted-foreground mb-2" htmlFor="stats-period-select">
        Período
      </label>
      <Select
        value={period}
        onValueChange={(value) => setPeriod(value as "today" | "week" | "month")}
      >
        <SelectTrigger id="stats-period-select" className="w-[180px]">
          <SelectValue placeholder="Período" />
        </SelectTrigger>
        <SelectContent>
          <SelectItem value="today">Hoje</SelectItem>
          <SelectItem value="week">Esta Semana</SelectItem>
          <SelectItem value="month">Este Mês</SelectItem>
        </SelectContent>
      </Select>
      <div className="h-4" /> {/* spacing */}
         <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
  
      <Card>
        <CardContent className="flex flex-col items-start">
          <div className="flex w-full justify-between"><CardTitle className="text-xl font-medium">Tempo Total - {getPeriodLabel()}</CardTitle>
          <Clock className="h-4 w-4 text-muted-foreground" /></div>
          <Button size={'lg'} className="text-4xl font-bold ">{formatDuration(stats.totalMinutes)}</Button>
        </CardContent>
      </Card>

      <Card>
       
        <CardContent>
          <div className="flex w-full justify-between"><CardTitle className="text-xl font-medium">Valor Total - {getPeriodLabel()}</CardTitle>
          <DollarSign className="h-4 w-4 text-muted-foreground" /></div>
          <Button size={'lg'} className="text-4xl font-bold ">{formatCurrency(stats.totalValue)}</Button>
        </CardContent>
      </Card>

      <Card>
            <CardContent>
          <div className="flex w-full justify-between"><CardTitle className="text-xl font-medium">Atividades - {getPeriodLabel()}</CardTitle>
          <Activity className="h-4 w-4 text-muted-foreground" /></div>
          <Button size={'lg'} className="text-4xl font-bold ">{stats.totalActivities}</Button>
        </CardContent>
      </Card>
    </div></div>
         
   
  )
}
