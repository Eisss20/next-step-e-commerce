import { NextRequest, NextResponse } from 'next/server';
import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

// GET - ดึงข้อมูลหมวดหมู่ทั้งหมด
export async function GET() {
  try {
    const categories = await prisma.category.findMany({
      include: {
        _count: {
          select: { products: true },
        },
      },
      orderBy: { category_name: 'asc' },
    });

    const formattedCategories = categories.map((category) => ({
      id: category.category_id,
      name: category.category_name,
      product_count: category._count.products,
    }));

    return NextResponse.json({
      success: true,
      data: formattedCategories,
    });
  } catch (error) {
    console.error('Error fetching categories:', error);
    return NextResponse.json(
      { success: false, message: 'เกิดข้อผิดพลาดในการดึงข้อมูลหมวดหมู่' },
      { status: 500 }
    );
  } finally {
    await prisma.$disconnect();
  }
}

// POST - สร้างหมวดหมู่ใหม่
export async function POST(request: NextRequest) {
  try {
    const body = await request.json();

    if (!body.category_name) {
      return NextResponse.json(
        { success: false, message: 'ชื่อหมวดหมู่เป็นข้อมูลที่จำเป็น' },
        { status: 400 }
      );
    }

    // ตรวจสอบว่าชื่อหมวดหมู่ซ้ำหรือไม่
    const existingCategory = await prisma.category.findUnique({
      where: { category_name: body.category_name },
    });

    if (existingCategory) {
      return NextResponse.json(
        { success: false, message: 'ชื่อหมวดหมู่นี้มีอยู่ในระบบแล้ว' },
        { status: 400 }
      );
    }

    const newCategory = await prisma.category.create({
      data: { category_name: body.category_name },
    });

    return NextResponse.json(
      {
        success: true,
        message: 'สร้างหมวดหมู่เรียบร้อยแล้ว',
        data: newCategory,
      },
      { status: 201 }
    );
  } catch (error) {
    console.error('Error creating category:', error);
    return NextResponse.json(
      { success: false, message: 'เกิดข้อผิดพลาดในการสร้างหมวดหมู่' },
      { status: 500 }
    );
  } finally {
    await prisma.$disconnect();
  }
}
