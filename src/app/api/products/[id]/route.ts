
// GET - ดึงข้อมูลสินค้าตาม ID
import { NextRequest, NextResponse } from 'next/server';
import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

export async function GET(request: NextRequest) {
  const url = new URL(request.url);
  const productId = url.pathname.split('/').pop(); // ดึง id จาก path

  try {
    const product = await prisma.product.findUnique({
      where: { product_id: productId },
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
    });

    if (!product) {
      return NextResponse.json(
        { success: false, message: 'ไม่พบสินค้าที่ต้องการ' },
        { status: 404 }
      );
    }

    const formattedProduct = {
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
    };

    return NextResponse.json({
      success: true,
      data: formattedProduct,
    });
  } catch (error) {
    console.error('Error fetching product:', error);
    return NextResponse.json(
      { success: false, message: 'เกิดข้อผิดพลาดในการดึงข้อมูลสินค้า' },
      { status: 500 }
    );
  } finally {
    await prisma.$disconnect();
  }
}

// PUT - อัปเดตข้อมูลสินค้า
export async function PUT(request: NextRequest, { params }: { params: { id: string } }) {
  try {
    const productId = params.id;
    const body = await request.json();

    // ตรวจสอบว่าสินค้าที่ต้องการอัปเดตมีอยู่หรือไม่
    const existingProduct = await prisma.product.findUnique({
      where: { product_id: productId },
    });

    if (!existingProduct) {
      return NextResponse.json(
        { success: false, message: 'ไม่พบสินค้าที่ต้องการอัปเดต' },
        { status: 404 }
      );
    }

    // อัปเดตข้อมูลสินค้า
    const updatedProduct = await prisma.product.update({
      where: { product_id: productId },
      data: {
        ...(body.product_name && { product_name: body.product_name }),
        ...(body.color_name && { color_name: body.color_name }),
        ...(body.price_per_unit && { price_per_unit: body.price_per_unit }),
        ...(body.net_price && { net_price: body.net_price }),
        ...(body.description && { description: body.description }),
        ...(body.category_id && { category_id: body.category_id }),
        ...(body.head_detail && { head_detail: body.head_detail }),
        ...(body.detail_product && { detail_product: body.detail_product }),
        ...(body.label_id && { label_id: body.label_id }),
        ...(body.discout_percent !== undefined && { discout_percent: body.discout_percent }),
        ...(body.sale_status !== undefined && { sale_status: body.sale_status }),
      },
      include: {
        category: true,
        label: true,
        product_images: true,
        size_stocks: true,
      },
    });

    return NextResponse.json({
      success: true,
      message: 'อัปเดตข้อมูลสินค้าเรียบร้อยแล้ว',
      data: updatedProduct,
    });
  } catch (error) {
    console.error('Error updating product:', error);
    return NextResponse.json(
      { success: false, message: 'เกิดข้อผิดพลาดในการอัปเดตสินค้า' },
      { status: 500 }
    );
  } finally {
    await prisma.$disconnect();
  }
}

// DELETE - ลบสินค้า
export async function DELETE(request: NextRequest, { params }: { params: { id: string } }) {
  try {
    const productId = params.id;

    // ตรวจสอบว่าสินค้าที่ต้องการลบมีอยู่หรือไม่
    const existingProduct = await prisma.product.findUnique({
      where: { product_id: productId },
    });

    if (!existingProduct) {
      return NextResponse.json(
        { success: false, message: 'ไม่พบสินค้าที่ต้องการลบ' },
        { status: 404 }
      );
    }

    // ลบข้อมูลที่เกี่ยวข้องก่อน (cascade delete)
    await prisma.$transaction([
      prisma.product_stock.deleteMany({ where: { product_id: productId } }),
      prisma.size_stock.deleteMany({ where: { product_id: productId } }),
      prisma.product_image.deleteMany({ where: { product_id: productId } }),
      prisma.admin_product.deleteMany({ where: { product_id: productId } }),
      prisma.checkout_item.deleteMany({ where: { product_id: productId } }),
      prisma.product.delete({ where: { product_id: productId } }),
    ]);

    return NextResponse.json({
      success: true,
      message: 'ลบสินค้าเรียบร้อยแล้ว',
    });
  } catch (error) {
    console.error('Error deleting product:', error);
    return NextResponse.json(
      { success: false, message: 'เกิดข้อผิดพลาดในการลบสินค้า' },
      { status: 500 }
    );
  } finally {
    await prisma.$disconnect();
  }
}