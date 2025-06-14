import type React from "react"
import type { Metadata } from "next"
import { Jersey_10 } from "next/font/google"
import "./globals.css"

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
      <body className={jersey.className}>{children}</body>
    </html>
  )
}
