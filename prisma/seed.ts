import { PrismaClient } from '@prisma/client'

const prisma = new PrismaClient()

async function main() {
  // ลบข้อมูลเก่าทั้งหมด
  await prisma.product_stock.deleteMany()
  await prisma.size_stock.deleteMany()
  await prisma.product_image.deleteMany()
  await prisma.product.deleteMany()
  await prisma.category.deleteMany()
  await prisma.tag.deleteMany()

  // สร้าง Tags
  const tags = await Promise.all([
    prisma.tag.create({
      data: {
        tag_name: 'Sale',
      },
    }),
    prisma.tag.create({
      data: {
        tag_name: 'New Arrival',
      },
    }),
    prisma.tag.create({
      data: {
        tag_name: 'Best Seller',
      },
    }), 
    prisma.tag.create({
      data: {
        tag_name: 'Limited Edition',
      },
    }),
    prisma.tag.create({
      data: {
        tag_name: 'Popular',
      },
    }),
  ])

  // สร้าง Categories
  const categories = await Promise.all([
    prisma.category.create({
      data: {
        category_name: 'Kids',
      },
    }),
    prisma.category.create({
      data: {
        category_name: 'Men',
      },
    }),
    prisma.category.create({
      data: {
        category_name: 'Women',
      },
    }),
  ])

    // สร้าง Products
    /// กลับมาแก้ไข discount_price เป็น null เพื่อให้เป็นราคาตั้ง
  const products = await Promise.all([
    prisma.product.create({
      data: {
        product_id: "1",
        product_name: 'Nike Air Max 270',
        color_name: 'Red',
        price_per_unit: 150.00,
        net_price: 150.00,
        discount_price: 120.00,
        description: 'The Nike Air Max 270 delivers unrivaled comfort with its large Air unit.',
        category_id: categories[0].category_id,
        head_detail: 'Premium Comfort',
        detail_product: 'Detailed description of Nike Air Max 270',
        tag_id: tags[0].tag_id,
      },
    }),
    prisma.product.create({
      data: {
        product_id: "2",
        product_name: 'Nike Zoom Fly 5',
        color_name: 'Blue',
        price_per_unit: 160.00,
        net_price: 160.00,
        discount_price: 140.00,
        description: 'The Nike Zoom Fly 5 is designed for speed and comfort.',
        category_id: categories[1].category_id,
        head_detail: 'Speed Performance',
        detail_product: 'Detailed description of Nike Zoom Fly 5',
        tag_id: tags[1].tag_id,
      },
    }),
    prisma.product.create({
      data: {
        product_id: "3",
        product_name: 'Nike LeBron 20',
        color_name: 'Green',
        price_per_unit: 200.00,
        net_price: 200.00,
        discount_price: 180.00,
        description: 'The LeBron 20 features responsive cushioning and lockdown fit.',
        category_id: categories[2].category_id,
        head_detail: 'Basketball Excellence',
        detail_product: 'Detailed description of Nike LeBron 20',
        tag_id: tags[2].tag_id,
      },
    }),
    prisma.product.create({
      data: {
        product_id: "4",
        product_name: 'Adidas Ultraboost',
        color_name: 'Black',
        price_per_unit: 180.00,
        net_price: 180.00,
        discount_price: 150.00,
        description: 'Experience incredible energy return with the Adidas Ultraboost.',
        category_id: categories[1].category_id,
        head_detail: 'Energy Return',
        detail_product: 'Detailed description of Adidas Ultraboost',
        tag_id: tags[3].tag_id,
      },
    }),
    prisma.product.create({
      data: {
        product_id: "5",
        product_name: 'Puma RS-X',
        color_name: 'White',
        price_per_unit: 120.00,
        net_price: 120.00,
        discount_price: 100.00,
        description: 'The Puma RS-X celebrates retro-inspired chunky design.',
        category_id: categories[0].category_id,
        head_detail: 'Retro Design',
        detail_product: 'Detailed description of Puma RS-X',
        tag_id: tags[0].tag_id,
      },
    }),
  ])

  // สร้าง Product Images
  await Promise.all([
    prisma.product_image.create({
      data: {
        product_id: products[0].product_id,
        product_image_url: '/images/products/nike-air-max-270.jpg',
      },
    }),
    prisma.product_image.create({
      data: {
        product_id: products[1].product_id,
        product_image_url: '/images/products/nike-zoom-fly-5.jpg',
      },
    }),
    prisma.product_image.create({
      data: {
        product_id: products[2].product_id,
        product_image_url: '/images/products/nike-lebron-20.jpg',
      },
    }),
    prisma.product_image.create({
      data: {
        product_id: products[3].product_id,
        product_image_url: '/images/products/adidas-ultraboost.jpg',
      },
    }),
    prisma.product_image.create({
      data: {
        product_id: products[4].product_id,
        product_image_url: '/images/products/puma-rs-x.jpg',
      },
    }),
  ])

  // สร้าง Size Stocks
  const sizeStocks = await Promise.all([
    prisma.size_stock.create({
      data: {
        product_id: products[0].product_id,
        size_detail: 'US 8',
        stock_quantity: 100,
        status_stock: 'In Stock',
      },
    }),
    prisma.size_stock.create({
      data: {
        product_id: products[0].product_id,
        size_detail: 'US 9',
        stock_quantity: 80,
        status_stock: 'In Stock',
      },
    }),
    prisma.size_stock.create({
      data: {
        product_id: products[1].product_id,
        size_detail: 'US 9',
        stock_quantity: 50,
        status_stock: 'In Stock',
      },
    }),
    prisma.size_stock.create({
      data: {
        product_id: products[2].product_id,
        size_detail: 'US 10',
        stock_quantity: 30,
        status_stock: 'In Stock',
      },
    }),
    prisma.size_stock.create({
      data: {
        product_id: products[3].product_id,
        size_detail: 'US 8',
        stock_quantity: 45,
        status_stock: 'In Stock',
      },
    }),
    prisma.size_stock.create({
      data: {
        product_id: products[4].product_id,
        size_detail: 'US 7',
        stock_quantity: 60,
        status_stock: 'In Stock',
      },
    }),
  ])

  // สร้าง Product Stocks
  await Promise.all([
    prisma.product_stock.create({
      data: {
        product_id: products[0].product_id,
        size_stock_id: sizeStocks[0].size_stock_id,
      },
    }),
    prisma.product_stock.create({
      data: {
        product_id: products[0].product_id,
        size_stock_id: sizeStocks[1].size_stock_id,
      },
    }),
    prisma.product_stock.create({
      data: {
        product_id: products[1].product_id,
        size_stock_id: sizeStocks[2].size_stock_id,
      },
    }),
    prisma.product_stock.create({
      data: {
        product_id: products[2].product_id,
        size_stock_id: sizeStocks[3].size_stock_id,
      },
    }),
    prisma.product_stock.create({
      data: {
        product_id: products[3].product_id,
        size_stock_id: sizeStocks[4].size_stock_id,
      },
    }),
    prisma.product_stock.create({
      data: {
        product_id: products[4].product_id,
        size_stock_id: sizeStocks[5].size_stock_id,
      },
    }),
  ])

  console.log('Seed data created successfully!')
}

main()
  .catch((e) => {
    console.error(e)
    process.exit(1)
  })
  .finally(async () => {
    await prisma.$disconnect()
  }) 