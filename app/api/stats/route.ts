import { NextResponse } from "next/server"
import { prisma } from "@/lib/prisma"
import { getDateRange } from "@/lib/utils"

export async function GET(request: Request) {
  try {
    const { searchParams } = new URL(request.url)
    const period = (searchParams.get("period") as "today" | "week" | "month") || "today"

    const { start, end } = getDateRange(period)

    const activities = await prisma.activity.findMany({
      where: {
        userId: "default-user",
        date: {
          gte: start,
          lt: end,
        },
      },
    })

    const totalMinutes = activities.reduce((sum, activity) => sum + activity.duration, 0)
    const totalValue = activities.reduce((sum, activity) => sum + activity.value, 0)
    const totalActivities = activities.length

    return NextResponse.json({
      totalMinutes,
      totalValue,
      totalActivities,
      activities: activities.length,
    })
  } catch (error) {
    return NextResponse.json({ error: "Erro ao buscar estatísticas" }, { status: 500 })
  }
}
