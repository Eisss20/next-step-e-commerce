import { PrismaClient } from "@prisma/client";
import { NextResponse } from "next/server";

const prisma = new PrismaClient();

export async function GET(request: Request) {
  try {
    const dataCity = await prisma.city.findMany({
      select: {
        city_id: true,
        city_name: true,
        province_state: {
          select: {
            province_state_id: true,
            province_state_name: true,
          }
        }
      }
    });

    if (!dataCity || dataCity.length === 0) {
      return NextResponse.json({ message: "Data not found" }, { status: 404 });
    }
    console.log(dataCity);
    return NextResponse.json(dataCity);
  } catch (error) {
    console.error("❌ Error in GET city:", error);
    return NextResponse.json({ message: "Internal server error" }, { status: 500 });
  }
}

