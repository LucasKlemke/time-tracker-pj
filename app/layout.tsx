import type React from "react"
import type { Metadata } from "next"
import { Jersey_10 } from "next/font/google"
import "./globals.css"
import { SidebarProvider, SidebarTrigger } from "@/components/ui/sidebar"
import { AppSidebar } from "@/components/app-sidebar"

const jersey = Jersey_10({ weight: ["400"] })

export const metadata: Metadata = {
  title: "Controle de Horas - Freelancer",
  description: "Aplicativo para controle de horas e cálculo de ganhos para freelancers",
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="pt-BR">
      <SidebarProvider>
        <AppSidebar />

      <body className={jersey.className}>
        <SidebarTrigger/>{children}</body>
            </SidebarProvider>
    </html>
  )
}
