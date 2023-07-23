import { NextResponse } from "next/server";

const DATA_SOURCE_URL = 'http://localhost:3001/api/users'

export async function GET() {
    const response = await fetch(DATA_SOURCE_URL)
    const users: User[] = await response.json()
    return NextResponse.json(users, { status: 200 })
}