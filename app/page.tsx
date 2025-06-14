"use client"

import { useState } from "react"
import { useSearchParams } from "next/navigation"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Timer } from "@/components/timer"
import { ManualEntry } from "@/components/manual-entry"
import { StatsCards } from "@/components/stats-cards"
import { ActivityList } from "@/components/activity-list"
import { UserSettings } from "@/components/user-settings"

const tabConfig = {
  dashboard: {
    title: "Dashboard",
    description: "Visão geral das suas atividades e ganhos"
  },
  timer: {
    title: "Registrar Atividade",
    description: "Registre seu tempo ou adicione atividades manualmente"
  },
  history: {
    title: "Histórico",
    description: "Visualize seu histórico de atividades e ganhos"
  },
  settings: {
    title: "Configurações",
    description: "Configure suas preferências e taxa horária"
  }
} as const

export default function HomePage() {
  const [refreshKey, setRefreshKey] = useState(0)
  const searchParams = useSearchParams()
  const currentTab = searchParams.get("tab") || "dashboard"
  const { title, description } = tabConfig[currentTab as keyof typeof tabConfig]

  const handleActivitySaved = () => {
    setRefreshKey((prev) => prev + 1)
  }

  return (
    <div className="container mx-auto p-4 max-w-6xl">
      <div className="mb-8">
        <h1 className="text-3xl font-bold mb-2">{title}</h1>
        <p className="text-muted-foreground">{description}</p>
      </div>
      

      {currentTab === "dashboard" && (
        <div className="space-y-6">
          <StatsCards  refresh={refreshKey} />
          <div>
            <h2 className="text-xl font-semibold mb-4">Atividades de Hoje</h2>
            <ActivityList period="today" refresh={refreshKey} />
          </div>
        </div>
      )}

      {currentTab === "timer" && (
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          <Timer onActivitySaved={handleActivitySaved} />
          <ManualEntry onActivitySaved={handleActivitySaved} />
        </div>
      )}

      {currentTab === "history" && (
        <div className="space-y-6">
          <Tabs defaultValue="today">
            <TabsList>
              <TabsTrigger value="today">Hoje</TabsTrigger>
              <TabsTrigger value="week">Esta Semana</TabsTrigger>
              <TabsTrigger value="month">Este Mês</TabsTrigger>
              <TabsTrigger value="all">Todas</TabsTrigger>
            </TabsList>

            <TabsContent value="today" className="space-y-4">
              <StatsCards  refresh={refreshKey} />
              <ActivityList period="today" refresh={refreshKey} />
            </TabsContent>

            <TabsContent value="week" className="space-y-4">
              <StatsCards refresh={refreshKey} />
              <ActivityList period="week" refresh={refreshKey} />
            </TabsContent>

            <TabsContent value="month" className="space-y-4">
              <StatsCards refresh={refreshKey} />
              <ActivityList period="month" refresh={refreshKey} />
            </TabsContent>

            <TabsContent value="all">
              <ActivityList period="all" refresh={refreshKey} />
            </TabsContent>
          </Tabs>
        </div>
      )}

      {currentTab === "settings" && (
        <div className="max-w-2xl mx-auto">
          <UserSettings />
        </div>
      )}
    </div>
  )
}
