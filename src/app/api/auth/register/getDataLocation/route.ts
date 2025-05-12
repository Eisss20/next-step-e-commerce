import { NextResponse } from "next/server";
import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

export async function GET(request: Request) {
    try {
        const dataLocation = await prisma.location.findMany();
        console.log(dataLocation);
    if (!dataLocation) {
        return NextResponse.json({ message: "Data not found" }, { status: 404 });
    }

    return NextResponse.json(dataLocation);
} catch (error) {
    return NextResponse.json({ message: "Internal server error" }, { status: 500 });
}
}
