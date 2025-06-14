import { PrismaClient } from "@prisma/client";
import { NextResponse } from "next/server";

const prisma = new PrismaClient();

export async function GET(request: Request) {
  try {
    const url = new URL(request.url);
    const locationId = url.searchParams.get("locationId");

    const conditionLocationId = locationId ? { location_id: Number(locationId) } : undefined;

    const dataProvince = await prisma.province_state.findMany({
      where: conditionLocationId,
      select: {
        province_state_id: true,
        province_state_name: true,
        location: {
          select: {
            location_id: true,
            location_name: true,
          },
        },
      },
    });

    if (!dataProvince || dataProvince.length === 0) {
      return NextResponse.json({ data: [] }, { status: 404 });
    }

    return NextResponse.json({ data: dataProvince }, { status: 200 });
  } catch (error) {
    console.error("❌ Error:", error); 
    return NextResponse.json({ data: [] }, { status: 500 });
  }
}
