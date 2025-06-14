import { NextResponse } from "next/server"
import { prisma } from "@/lib/prisma"

export async function GET(request: Request) {
  try {
    const { searchParams } = new URL(request.url)
    const period = searchParams.get("period") || "all"

    let whereClause = { userId: "default-user" }

    if (period !== "all") {
      const now = new Date()
      const today = new Date(now.getFullYear(), now.getMonth(), now.getDate())

      switch (period) {
        case "today":
          whereClause = {
            ...whereClause,
            date: {
              gte: today,
              lt: new Date(today.getTime() + 24 * 60 * 60 * 1000),
            },
          }
          break
        case "week":
          const weekStart = new Date(today)
          weekStart.setDate(today.getDate() - today.getDay())
          whereClause = {
            ...whereClause,
            date: {
              gte: weekStart,
              lt: new Date(weekStart.getTime() + 7 * 24 * 60 * 60 * 1000),
            },
          }
          break
        case "month":
          const monthStart = new Date(now.getFullYear(), now.getMonth(), 1)
          const monthEnd = new Date(now.getFullYear(), now.getMonth() + 1, 1)
          whereClause = {
            ...whereClause,
            date: { gte: monthStart, lt: monthEnd },
          }
          break
      }
    }

    const activities = await prisma.activity.findMany({
      where: whereClause,
      orderBy: { date: "desc" },
    })

    return NextResponse.json(activities)
  } catch (error) {
    return NextResponse.json({ error: "Erro ao buscar atividades" }, { status: 500 })
  }
}

export async function POST(request: Request) {
  try {
    const body = await request.json()
    const { title, description, duration, isManual, startTime, endTime } = body

    // Buscar valor/hora do usuário
    const user = await prisma.user.findFirst({
      where: { id: "default-user" },
    })

    if (!user) {
      return NextResponse.json({ error: "Usuário não encontrado" }, { status: 404 })
    }

    const value = (duration / 60) * user.hourlyRate

    const activity = await prisma.activity.create({
      data: {
        title,
        description,
        duration: Number.parseInt(duration),
        isManual: Boolean(isManual),
        startTime: startTime ? new Date(startTime) : null,
        endTime: endTime ? new Date(endTime) : null,
        value,
        userId: "default-user",
      },
    })

    return NextResponse.json(activity)
  } catch (error) {
    return NextResponse.json({ error: "Erro ao criar atividade" }, { status: 500 })
  }
}
