import { NextResponse } from "next/server";
import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

export async function GET(request: Request) {
    try {
        const locations = await prisma.location.findMany({
            select: {
                location_id: true,
                location_name: true
            }
        });
        
        if (!locations || locations.length === 0) {
            return NextResponse.json({
                data: []
            });
        }

        return NextResponse.json({
            data: locations
        });
    } catch (error) {
        return NextResponse.json({
            data: []
        }, { status: 500 });
    }
}
