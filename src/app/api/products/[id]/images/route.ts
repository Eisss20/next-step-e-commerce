// app/api/products/[id]/images/route.ts
import { NextRequest, NextResponse } from 'next/server';
import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

// GET - ดึงรูปภาพของสินค้าตาม product_id
export async function GET(request: NextRequest, { params }: { params: { id: string } }) {
  try {
    const productId = params.id;

    // ตรวจสอบว่าสินค้ามีอยู่หรือไม่
    const product = await prisma.product.findUnique({
      where: { product_id: productId },
    });

    if (!product) {
      return NextResponse.json(
        { success: false, message: 'ไม่พบสินค้าที่ต้องการ' },
        { status: 404 }
      );
    }

    const images = await prisma.product_image.findMany({
      where: { product_id: productId },
      orderBy: { position_image: 'asc' },
    });

    const formattedImages = images.map((image) => ({
      id: image.product_image_id,
      product_id: image.product_id,
      url: image.product_image_url,
      position: image.position_image,
      created_at: image.created_at,
      updated_at: image.updated_at,
    }));

    return NextResponse.json({
      success: true,
      data: formattedImages,
    });
  } catch (error) {
    console.error('Error fetching product images:', error);
    return NextResponse.json(
      { success: false, message: 'เกิดข้อผิดพลาดในการดึงรูปภาพสินค้า' },
      { status: 500 }
    );
  } finally {
    await prisma.$disconnect();
  }
}

// POST - เพิ่มรูปภาพใหม่ให้สินค้า
export async function POST(request: NextRequest, { params }: { params: { id: string } }) {
  try {
    const productId = params.id;
    const body = await request.json();

    // ตรวจสอบว่าสินค้ามีอยู่หรือไม่
    const product = await prisma.product.findUnique({
      where: { product_id: productId },
    });

    if (!product) {
      return NextResponse.json(
        { success: false, message: 'ไม่พบสินค้าที่ต้องการ' },
        { status: 404 }
      );
    }

    if (!body.product_image_url) {
      return NextResponse.json(
        { success: false, message: 'URL รูปภาพเป็นข้อมูลที่จำเป็น' },
        { status: 400 }
      );
    }

    // หา position ถัดไปถ้าไม่ได้ระบุ
    let position = body.position_image;
    if (!position) {
      const lastImage = await prisma.product_image.findFirst({
        where: { product_id: productId },
        orderBy: { position_image: 'desc' },
      });
      position = (lastImage?.position_image || 0) + 1;
    }

    const newImage = await prisma.product_image.create({
      data: {
        product_id: productId,
        product_image_url: body.product_image_url,
        position_image: position,
      },
    });

    return NextResponse.json(
      {
        success: true,
        message: 'เพิ่มรูปภาพสินค้าเรียบร้อยแล้ว',
        data: newImage,
      },
      { status: 201 }
    );
  } catch (error) {
    console.error('Error adding product image:', error);
    return NextResponse.json(
      { success: false, message: 'เกิดข้อผิดพลาดในการเพิ่มรูปภาพสินค้า' },
      { status: 500 }
    );
  } finally {
    await prisma.$disconnect();
  }
}