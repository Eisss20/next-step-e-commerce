import { NextRequest, NextResponse } from 'next/server';
import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

// GET - ดึงข้อมูลป้ายกำกับทั้งหมด
export async function GET() {
  try {
    const labels = await prisma.label.findMany({
      include: {
        _count: {
          select: { products: true },
        },
      },
      orderBy: { label_name: 'asc' },
    });

    const formattedLabels = labels.map((label) => ({
      id: label.label_id,
      name: label.label_name,
      product_count: label._count.products,
    }));

    return NextResponse.json({
      success: true,
      data: formattedLabels,
    });
  } catch (error) {
    console.error('Error fetching labels:', error);
    return NextResponse.json(
      { success: false, message: 'เกิดข้อผิดพลาดในการดึงข้อมูลป้ายกำกับ' },
      { status: 500 }
    );
  } finally {
    await prisma.$disconnect();
  }
}

// POST - สร้างป้ายกำกับใหม่
export async function POST(request: NextRequest) {
  try {
    const body = await request.json();

    if (!body.label_name) {
      return NextResponse.json(
        { success: false, message: 'ชื่อป้ายกำกับเป็นข้อมุลที่จำเป็น' },
        { status: 400 }
      );
    }

    // ตรวจสอบว่าชื่อป้ายกำกับซ้ำหรือไม่
    const existingLabel = await prisma.label.findUnique({
      where: { label_name: body.label_name },
    });

    if (existingLabel) {
      return NextResponse.json(
        { success: false, message: 'ชื่อป้ายกำกับนี้มีอยู่ในระบบแล้ว' },
        { status: 400 }
      );
    }

    const newLabel = await prisma.label.create({
      data: { label_name: body.label_name },
    });

    return NextResponse.json(
      {
        success: true,
        message: 'สร้างป้ายกำกับเรียบร้อยแล้ว',
        data: newLabel,
      },
      { status: 201 }
    );
  } catch (error) {
    console.error('Error creating label:', error);
    return NextResponse.json(
      { success: false, message: 'เกิดข้อผิดพลาดในการสร้างป้ายกำกับ' },
      { status: 500 }
    );
  } finally {
    await prisma.$disconnect();
  }
}