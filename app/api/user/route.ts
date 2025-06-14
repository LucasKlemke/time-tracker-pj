import { NextResponse } from "next/server"
import { prisma } from "@/lib/prisma"

export async function GET() {
  try {
    const user = await prisma.user.findFirst({
      where: { id: "default-user" },
    })

    if (!user) {
      const newUser = await prisma.user.create({
        data: {
          id: "default-user",
          name: "Freelancer",
          hourlyRate: 50.0,
        },
      })
      return NextResponse.json(newUser)
    }

    return NextResponse.json(user)
  } catch (error) {
    return NextResponse.json({ error: "Erro ao buscar usuário" }, { status: 500 })
  }
}

export async function PUT(request: Request) {
  try {
    const body = await request.json()
    const { name, hourlyRate } = body

    const user = await prisma.user.update({
      where: { id: "default-user" },
      data: { name, hourlyRate: Number.parseFloat(hourlyRate) },
    })

    return NextResponse.json(user)
  } catch (error) {
    return NextResponse.json({ error: "Erro ao atualizar usuário" }, { status: 500 })
  }
}
