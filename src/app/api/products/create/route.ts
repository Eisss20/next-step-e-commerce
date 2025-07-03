import { NextRequest, NextResponse } from 'next/server';
import { PrismaClient } from '@prisma/client';
import { CreateProductBody, ProductImageInput, APIResponse } from '@/types/types';

const prisma = new PrismaClient();

// POST - สร้างสินค้าใหม่
export async function POST(request: NextRequest) {
  try {
    const body: CreateProductBody = await request.json();

    // ตรวจสอบข้อมูลที่จำเป็น - แก้ไขแล้ว
    const requiredFields: string[] = [
      'product_id',
      'product_name',
      'color_name',
      'price_per_unit',
      'net_price',
      'description',
      'category_id',
      'head_detail',
      'detail_product',
      'label_id',
    ];

    for (const field of requiredFields) {
      if (!body[field as keyof CreateProductBody]) {
        return NextResponse.json<APIResponse>(
          { success: false, message: `ข้อมูล ${field} เป็นข้อมูลที่จำเป็น` },
          { status: 400 }
        );
      }
    }

    // ตรวจสอบว่า product_id ซ้ำหรือไม่
    const existingProduct = await prisma.product.findUnique({
      where: { product_id: body.product_id },
    });

    if (existingProduct) {
      return NextResponse.json<APIResponse>(
        { success: false, message: 'รหัสสินค้านี้มีอยู่ในระบบแล้ว' },
        { status: 400 }
      );
    }

    // ตรวจสอบว่า category_id และ label_id มีอยู่ในระบบหรือไม่
    const [category, label] = await Promise.all([
      prisma.category.findUnique({ where: { category_id: body.category_id } }),
      prisma.label.findUnique({ where: { label_id: body.label_id } }),
    ]);

    if (!category) {
      return NextResponse.json<APIResponse>(
        { success: false, message: 'ไม่พบหมวดหมู่ที่ระบุ' },
        { status: 400 }
      );
    }

    if (!label) {
      return NextResponse.json<APIResponse>(
        { success: false, message: 'ไม่พบป้ายกำกับที่ระบุ' },
        { status: 400 }
      );
    }

    // สร้างสินค้าใหม่
    const newProduct = await prisma.product.create({
      data: {
        product_id: body.product_id,
        product_name: body.product_name,
        color_name: body.color_name,
        price_per_unit: body.price_per_unit,
        net_price: body.net_price,
        description: body.description,
        category_id: body.category_id,
        head_detail: body.head_detail,
        detail_product: body.detail_product,
        label_id: body.label_id,
        discout_percent: body.discout_percent || 0,
        sale_status: body.sale_status || false,
      },
      include: {
        category: true,
        label: true,
      },
    });

    // เพิ่มรูปภาพสินค้า (ถ้ามี)
    if (body.images && Array.isArray(body.images)) {
      await prisma.product_image.createMany({
        data: body.images.map((img: ProductImageInput, index: number) => ({
          product_id: newProduct.product_id,
          product_image_url: img.url,
          position_image: img.position || index + 1,
        })),
      });
    }

    // เพิ่มข้อมูลขนาดและสต็อก (ถ้ามี)
    if (body.sizes && Array.isArray(body.sizes)) {
      for (const size of body.sizes) {
        const sizeStock = await prisma.size_stock.create({
          data: {
            product_id: newProduct.product_id,
            size_detail: size.size,
            stock_quantity: size.stock || 0,
            status_stock: size.status || 'available',
          },
        });

        // สร้าง product_stock เพื่อเชื่อมโยง
        await prisma.product_stock.create({
          data: {
            product_id: newProduct.product_id,
            size_stock_id: sizeStock.size_stock_id,
          },
        });
      }
    }

    return NextResponse.json<APIResponse>(
      {
        success: true,
        message: 'สร้างสินค้าเรียบร้อยแล้ว',
        data: newProduct,
      },
      { status: 201 }
    );
  } catch (error) {
    console.error('Error creating product:', error);
    return NextResponse.json<APIResponse>(
      { success: false, message: 'เกิดข้อผิดพลาดในการสร้างสินค้า' },
      { status: 500 }
    );
  } finally {
    await prisma.$disconnect();
  }
}