import { NextResponse } from "next/server"

export async function POST(req: Request) {
  try {
    const formData = await req.formData()
    const file = formData.get("file")

    if (!file) {
      return NextResponse.json({ error: "No file received" }, { status: 400 })
    }

    // Dummy response (abhi model nahi laga)
    return NextResponse.json({
      prediction: "Leaf Rust"
    })

  } catch (error) {
    console.log(error)
    return NextResponse.json({ error: "Server error" }, { status: 500 })
  }
}