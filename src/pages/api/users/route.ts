import { API_ROUTES } from "@/constants/api.routes.constants";
import { NextResponse } from "next/server";

const DATA_SOURCE_URL = API_ROUTES.USERS

export async function GET() {
    const response = await fetch(DATA_SOURCE_URL)
    const users: User[] = await response.json()
    return NextResponse.json(users, { status: 200 })
}