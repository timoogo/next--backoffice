import { API_ROUTES } from "@/constants/api.routes.constants";
import { NextResponse } from "next/server";
import { Tag } from "../../../../types";

const DATA_SOURCE_URL = API_ROUTES.TAGS

export async function GET() {
    const response = await fetch(DATA_SOURCE_URL)
    const tags: Tag[] = await response.json()
    return NextResponse.json(tags, { status: 200 })
}

export async function DELETE(request: Request) {
   const { id }: Partial<Tag> = await request.json()
   
   if (!id) {
       return NextResponse.json({ message: 'Missing id' }, { status: 400 })
   }

   await fetch(`${DATA_SOURCE_URL}/${id}`, { method: 'DELETE', 
   headers: { 
    'Content-Type': 'application/json',
    //'API-KEY': API_ROUTES.API_KEY
 }
    }
)
    return NextResponse.json({ message: `Event ${id} deleted` }, { status: 200 })
}

export async function POST(request: Request) {
    const { id }: Partial<Tag> = await request.json()
    
    if (!id) {
        return NextResponse.json({ message: 'Missing id' }, { status: 400 })
    }

    await fetch(`${DATA_SOURCE_URL}/${id}`, { method: 'POST',
    headers: {
        'Content-Type': 'application/json',
        //'API-KEY': API_ROUTES.API_KEY
    }
    }
    )
    return NextResponse.json({ message: `Event ${id} created` }, { status: 200 })
}

