import { NextResponse } from "next/server";
import { API_ROUTES } from "../../../constants/api.routes.constants";
import { Organization } from "../../../../types";

const DATA_SOURCE_URL = API_ROUTES.ORGANIZATIONS

export async function GET() {
    const response = await fetch(DATA_SOURCE_URL)
    const organizations: Organization[] = await response.json()
    return NextResponse.json(organizations, { status: 200 })
}