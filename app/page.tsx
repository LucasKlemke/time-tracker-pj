"use client"

import { useState } from "react"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Timer } from "@/components/timer"
import { ManualEntry } from "@/components/manual-entry"
import { StatsCards } from "@/components/stats-cards"
import { ActivityList } from "@/components/activity-list"
import { UserSettings } from "@/components/user-settings"

export default function HomePage() {
  const [refreshKey, setRefreshKey] = useState(0)

  const handleActivitySaved = () => {
    setRefreshKey((prev) => prev + 1)
  }

  return (
    <div className="container mx-auto p-4 max-w-6xl">
      <div className="mb-8">
        <h1 className="text-3xl font-bold mb-2">Controle de Horas</h1>
        <p className="text-muted-foreground">Gerencie seu tempo e calcule seus ganhos como freelancer</p>
      </div>

      <Tabs defaultValue="dashboard" className="space-y-6">
        <TabsList className="grid w-full grid-cols-4">
          <TabsTrigger value="dashboard">Dashboard</TabsTrigger>
          <TabsTrigger value="timer">Registrar</TabsTrigger>
          <TabsTrigger value="history">Histórico</TabsTrigger>
          <TabsTrigger value="settings">Configurações</TabsTrigger>
        </TabsList>

        <TabsContent value="dashboard" className="space-y-6">
          <StatsCards period="today" refresh={refreshKey} />

        

          <div>
            <h2 className="text-xl font-semibold mb-4">Atividades de Hoje</h2>
            <ActivityList period="today" refresh={refreshKey} />
          </div>
        </TabsContent>

        <TabsContent value="timer">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            <Timer onActivitySaved={handleActivitySaved} />
            <ManualEntry onActivitySaved={handleActivitySaved} />
          </div>
        </TabsContent>

        <TabsContent value="history" className="space-y-6">
          <Tabs defaultValue="today">
            <TabsList>
              <TabsTrigger value="today">Hoje</TabsTrigger>
              <TabsTrigger value="week">Esta Semana</TabsTrigger>
              <TabsTrigger value="month">Este Mês</TabsTrigger>
              <TabsTrigger value="all">Todas</TabsTrigger>
            </TabsList>

            <TabsContent value="today" className="space-y-4">
              <StatsCards period="today" refresh={refreshKey} />
              <ActivityList period="today" refresh={refreshKey} />
            </TabsContent>

            <TabsContent value="week" className="space-y-4">
              <StatsCards period="week" refresh={refreshKey} />
              <ActivityList period="week" refresh={refreshKey} />
            </TabsContent>

            <TabsContent value="month" className="space-y-4">
              <StatsCards period="month" refresh={refreshKey} />
              <ActivityList period="month" refresh={refreshKey} />
            </TabsContent>

            <TabsContent value="all">
              <ActivityList period="all" refresh={refreshKey} />
            </TabsContent>
          </Tabs>
        </TabsContent>

        <TabsContent value="settings">
          <div className="max-w-2xl mx-auto">
            <UserSettings />
          </div>
        </TabsContent>
      </Tabs>
    </div>
  )
}
