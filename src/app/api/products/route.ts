// app/api/products/route.ts
import { NextRequest, NextResponse } from 'next/server';
import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

// GET - ดึงข้อมูลสินค้าทั้งหมด พร้อมตัวกรอง
export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url);

    // เก็บค่าพารามิเตอร์ที่ใช้กรอง
    const category_id = searchParams.get('category_id');
    const label_id = searchParams.get('label_id');
    const min_price = searchParams.get('min_price');
    const max_price = searchParams.get('max_price');
    const search = searchParams.get('search');
    const sale_status = searchParams.get('sale_status');
    const page = parseInt(searchParams.get('page') || '1');
    const limit = parseInt(searchParams.get('limit') || '10');
    //แปลงค่า page กับ limit เป็นตัวเลข (default: หน้า 1, 10 รายการต่อหน้า)

    // คำนวณ offset สำหรับ pagination
    const skip = (page - 1) * limit;

    // สร้างเงื่อนไขการกรอง
    const where: any = {};

    if (category_id) {
      where.category_id = parseInt(category_id);
    }

    if (label_id) {
      where.label_id = parseInt(label_id);
    }

    if (min_price || max_price) {
      where.net_price = {};
      if (min_price) where.net_price.gte = parseFloat(min_price);
      if (max_price) where.net_price.lte = parseFloat(max_price);
    }

    if (search) {
      where.OR = [
        { product_name: { contains: search, mode: 'insensitive' } },
        { description: { contains: search, mode: 'insensitive' } },
        { color_name: { contains: search, mode: 'insensitive' } },
      ];
    }

    if (sale_status) {
      where.sale_status = sale_status === 'true';
    }

    // ดึงข้อมูลสินค้าจากฐานข้อมูล
    const products = await prisma.product.findMany({
      where,
      include: {
        category: true,
        label: true,
        product_images: {
          orderBy: { position_image: 'asc' },
        },
        size_stocks: {
          include: {
            product_stocks: true,
          },
        },
      },
      skip,
      take: limit,
      orderBy: { product_id: 'desc' },
    });

    // นับจำนวนสินค้าทั้งหมดสำหรับ pagination
    const totalProducts = await prisma.product.count({ where });
    const totalPages = Math.ceil(totalProducts / limit);

    // แปลงข้อมูลให้เหมาะสมกับ Frontend
    const formattedProducts = products.map((product) => ({
      id: product.product_id,
      name: product.product_name,
      color: product.color_name,
      price_per_unit: parseFloat(product.price_per_unit.toString()),
      net_price: parseFloat(product.net_price.toString()),
      description: product.description,
      head_detail: product.head_detail,
      detail_product: product.detail_product,
      discount_percent: product.discout_percent,
      sale_status: product.sale_status,
      category: {
        id: product.category.category_id,
        name: product.category.category_name,
      },
      label: {
        id: product.label.label_id,
        name: product.label.label_name,
      },
      images: product.product_images.map((img) => ({
        id: img.product_image_id,
        url: img.product_image_url,
        position: img.position_image,
      })),
      sizes: product.size_stocks.map((size) => ({
        id: size.size_stock_id,
        size: size.size_detail,
        stock: size.stock_quantity,
        status: size.status_stock,
      })),
    }));

    return NextResponse.json({
      success: true,
      data: formattedProducts,
      pagination: {
        current_page: page,
        total_pages: totalPages,
        total_items: totalProducts,
        items_per_page: limit,
      },
    });
  } catch (error) {
    console.error('Error fetching products:', error);
    return NextResponse.json(
      { success: false, message: 'เกิดข้อผิดพลาดในการดึงข้อมูลสินค้า' },
      { status: 500 }
    );
  } finally {
    await prisma.$disconnect();
  }
}
