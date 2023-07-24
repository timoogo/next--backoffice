import { API_ROUTES } from "@/constants/api.routes.constants";
import { NextResponse } from "next/server";
import { Event } from "../../../../types";

const DATA_SOURCE_URL = API_ROUTES.USERS

export async function GET() {
    const response = await fetch(DATA_SOURCE_URL)
    const events: Event[] = await response.json()
    return NextResponse.json(events, { status: 200 })
}