import { PrismaClient } from '@prisma/client'

const prisma = new PrismaClient()

async function main() {
  // ลบข้อมูลเก่าทั้งหมด
  await prisma.admin_delivery_control.deleteMany()
  await prisma.delivery.deleteMany()
  await prisma.order.deleteMany()
  await prisma.payment.deleteMany()
  await prisma.checkout_item.deleteMany()
  await prisma.admin_product.deleteMany()
  await prisma.admin_size.deleteMany()
  await prisma.admin.deleteMany()
  await prisma.user_profile.deleteMany()
  await prisma.address.deleteMany() 
  await prisma.zipcode.deleteMany()
  await prisma.city.deleteMany()
  await prisma.province_state.deleteMany()
  await prisma.location.deleteMany()
  await prisma.user.deleteMany()
  await prisma.product_stock.deleteMany()
  await prisma.size_stock.deleteMany()
  await prisma.product_image.deleteMany()
  await prisma.product.deleteMany()
  await prisma.category.deleteMany()
  await prisma.label.deleteMany()

  // สร้าง Labels
  const labels = await Promise.all([
    prisma.label.create({
      data: {
        label_name: 'Sale',
      },
    }),
    prisma.label.create({
      data: {
        label_name: 'New Arrival',
      },
    }),
    prisma.label.create({
      data: {
        label_name: 'Best Seller',
      },
    }), 
    prisma.label.create({
      data: {
        label_name: 'Limited Edition',
      },
    }),
    prisma.label.create({
      data: {
        label_name: 'Popular',
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
        description: 'The Nike Air Max 270 delivers unrivaled comfort with its large Air unit.',
        category_id: categories[0].category_id,
        head_detail: 'Premium Comfort',
        detail_product: 'Detailed description of Nike Air Max 270',
        label_id: labels[0].label_id,
        discout_percent: 20,
        sale_status: true
      },
    }),
    prisma.product.create({
      data: {
        product_id: "2",
        product_name: 'Nike Zoom Fly 5',
        color_name: 'Blue',
        price_per_unit: 160.00,
        net_price: 160.00,
        description: 'The Nike Zoom Fly 5 is designed for speed and comfort.',
        category_id: categories[1].category_id,
        head_detail: 'Speed Performance',
        detail_product: 'Detailed description of Nike Zoom Fly 5',
        label_id: labels[1].label_id,
        discout_percent: null,
        sale_status: false
      },
    }),
    prisma.product.create({
      data: {
        product_id: "3",
        product_name: 'Nike LeBron 20',
        color_name: 'Green',
        price_per_unit: 200.00,
        net_price: 200.00,
        description: 'The LeBron 20 features responsive cushioning and lockdown fit.',
        category_id: categories[2].category_id,
        head_detail: 'Basketball Excellence',
        detail_product: 'Detailed description of Nike LeBron 20',
        label_id: labels[2].label_id,
        discout_percent: null,
        sale_status: false
      },
    }),
    prisma.product.create({
      data: {
        product_id: "4",
        product_name: 'Adidas Ultraboost',
        color_name: 'Black',
        price_per_unit: 180.00,
        net_price: 180.00,
        description: 'Experience incredible energy return with the Adidas Ultraboost.',
        category_id: categories[1].category_id,
        head_detail: 'Energy Return',
        detail_product: 'Detailed description of Adidas Ultraboost',
        label_id: labels[3].label_id,
        discout_percent: 16,
        sale_status: true
      },
    }),
    prisma.product.create({
      data: {
        product_id: "5",
        product_name: 'Puma RS-X',
        color_name: 'White',
        price_per_unit: 120.00,
        net_price: 120.00,
        description: 'The Puma RS-X celebrates retro-inspired chunky design.',
        category_id: categories[0].category_id,
        head_detail: 'Retro Design',
        detail_product: 'Detailed description of Puma RS-X',
        label_id: labels[0].label_id,
        discout_percent: 16,
        sale_status: true
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

    // ---------------- user section ----------------
    
    
  // สร้างข้อมูล Location (ประเทศ)
  const locations = await Promise.all([
    prisma.location.create({
      data: {
        location_name: 'Thailand'
      }
    }),
    prisma.location.create({
      data: {
        location_name: 'Japan'
      }
    }),
    prisma.location.create({
      data: {
        location_name: 'United States'
      }
    }),
    prisma.location.create({
      data: {
        location_name: 'Singapore'
      }
    }),
    prisma.location.create({
      data: {
        location_name: 'South Korea'
      }
    }),
    prisma.location.create({
      data: {
        location_name: 'China'
      }
    }),
  ]);

  // สร้างข้อมูล Province/State (จังหวัด)
  const provinces = await Promise.all([
    // จังหวัดในประเทศไทย
    prisma.province_state.create({
      data: {
        province_state_name: 'กรุงเทพมหานคร',
        location_id: locations[0].location_id, // Thailand
        type: 'จังหวัด'
      }
    }),
    prisma.province_state.create({
      data: {
        province_state_name: 'เชียงใหม่',
        location_id: locations[0].location_id, // Thailand
        type: 'จังหวัด'
      }
    }),
    prisma.province_state.create({
      data: {
        province_state_name: 'ภูเก็ต',
        location_id: locations[0].location_id, // Thailand
        type: 'จังหวัด'
      }
    }),
    
    // จังหวัด/รัฐในญี่ปุ่น
    prisma.province_state.create({
      data: {
        province_state_name: 'Tokyo',
        location_id: locations[1].location_id, // Japan
        type: 'Prefecture'
      }
    }),
    prisma.province_state.create({
      data: {
        province_state_name: 'Osaka',
        location_id: locations[1].location_id, // Japan
        type: 'Prefecture'
      }
    }),
    prisma.province_state.create({
      data: {
        province_state_name: 'Hokkaido',
        location_id: locations[1].location_id, // Japan
        type: 'Prefecture'
      }
    }),
    
    // จังหวัด/รัฐในสหรัฐอเมริกา
    prisma.province_state.create({
      data: {
        province_state_name: 'New York',
        location_id: locations[2].location_id, // USA
        type: 'State'
      }
    }),
    prisma.province_state.create({
      data: {
        province_state_name: 'California',
        location_id: locations[2].location_id, // USA
        type: 'State'
      }
    }),
    prisma.province_state.create({
      data: {
        province_state_name: 'Texas',
        location_id: locations[2].location_id, // USA
        type: 'State'
      }
    }),
    
    // เขตในสิงคโปร์
    prisma.province_state.create({
      data: {
        province_state_name: 'Central Region',
        location_id: locations[3].location_id, // Singapore
        type: 'Region'
      }
    }),
    prisma.province_state.create({
      data: {
        province_state_name: 'East Region',
        location_id: locations[3].location_id, // Singapore
        type: 'Region'
      }
    }),
    prisma.province_state.create({
      data: {
        province_state_name: 'North Region',
        location_id: locations[3].location_id, // Singapore
        type: 'Region'
      }
    }),
    
    // จังหวัดในเกาหลีใต้
    prisma.province_state.create({
      data: {
        province_state_name: 'Seoul',
        location_id: locations[4].location_id, // South Korea
        type: 'Province'
      }
    }),
    prisma.province_state.create({
      data: {
        province_state_name: 'Busan',
        location_id: locations[4].location_id, // South Korea
        type: 'Province'
      }
    }),
    prisma.province_state.create({
      data: {
        province_state_name: 'Jeju',
        location_id: locations[4].location_id, // South Korea
        type: 'Province'
      }
    }),
    
    // จังหวัดในจีน
    prisma.province_state.create({
      data: {
        province_state_name: 'Shanghai',
        location_id: locations[5].location_id, // China
        type: 'Province'
      }
    }),
    prisma.province_state.create({
      data: {
        province_state_name: 'Beijing',
        location_id: locations[5].location_id, // China
        type: 'Province'
      }
    }),
    prisma.province_state.create({
      data: {
        province_state_name: 'Guangdong',
        location_id: locations[5].location_id, // China
        type: 'Province'
      }
    }),
  ]);

  // สร้างข้อมูล City (เมือง/เขต/อำเภอ)
  const cities = await Promise.all([
    // เขตในกรุงเทพฯ
    prisma.city.create({
      data: {
        city_name: 'เขตปทุมวัน',
        province_state_id: provinces[0].province_state_id // กรุงเทพฯ
      }
    }),
    prisma.city.create({
      data: {
        city_name: 'เขตลาดพร้าว',
        province_state_id: provinces[0].province_state_id // กรุงเทพฯ
      }
    }),
    prisma.city.create({
      data: {
        city_name: 'เขตบางรัก',
        province_state_id: provinces[0].province_state_id // กรุงเทพฯ
      }
    }),
    
    // อำเภอในเชียงใหม่
    prisma.city.create({
      data: {
        city_name: 'อำเภอเมืองเชียงใหม่',
        province_state_id: provinces[1].province_state_id // เชียงใหม่
      }
    }),
    prisma.city.create({
      data: {
        city_name: 'อำเภอแม่ริม',
        province_state_id: provinces[1].province_state_id // เชียงใหม่
      }
    }),
    prisma.city.create({
      data: {
        city_name: 'อำเภอสันทราย',
        province_state_id: provinces[1].province_state_id // เชียงใหม่
      }
    }),
    
    // อำเภอในภูเก็ต
    prisma.city.create({
      data: {
        city_name: 'อำเภอเมืองภูเก็ต',
        province_state_id: provinces[2].province_state_id // ภูเก็ต
      }
    }),
    prisma.city.create({
      data: {
        city_name: 'อำเภอกะทู้',
        province_state_id: provinces[2].province_state_id // ภูเก็ต
      }
    }),
    prisma.city.create({
      data: {
        city_name: 'อำเภอถลาง',
        province_state_id: provinces[2].province_state_id // ภูเก็ต
      }
    }),
    
    // เมืองในโตเกียว
    prisma.city.create({
      data: {
        city_name: 'Shibuya',
        province_state_id: provinces[3].province_state_id // Tokyo
      }
    }),
    prisma.city.create({
      data: {
        city_name: 'Shinjuku',
        province_state_id: provinces[3].province_state_id // Tokyo
      }
    }),
    prisma.city.create({
      data: {
        city_name: 'Ginza',
        province_state_id: provinces[3].province_state_id // Tokyo
      }
    }),
    
    // เมืองในโอซาก้า
    prisma.city.create({
      data: {
        city_name: 'Umeda',
        province_state_id: provinces[4].province_state_id // Osaka
      }
    }),
    prisma.city.create({
      data: {
        city_name: 'Namba',
        province_state_id: provinces[4].province_state_id // Osaka
      }
    }),
    prisma.city.create({
      data: {
        city_name: 'Sakai',
        province_state_id: provinces[4].province_state_id // Osaka
      }
    }),
    
    // เมืองในฮอกไกโด
    prisma.city.create({
      data: {
        city_name: 'Sapporo',
        province_state_id: provinces[5].province_state_id // Hokkaido
      }
    }),
    prisma.city.create({
      data: {
        city_name: 'Hakodate',
        province_state_id: provinces[5].province_state_id // Hokkaido
      }
    }),
    prisma.city.create({
      data: {
        city_name: 'Asahikawa',
        province_state_id: provinces[5].province_state_id // Hokkaido
      }
    }),
    
    // เมืองในนิวยอร์ก
    prisma.city.create({
      data: {
        city_name: 'Manhattan',
        province_state_id: provinces[6].province_state_id // New York
      }
    }),
    prisma.city.create({
      data: {
        city_name: 'Brooklyn',
        province_state_id: provinces[6].province_state_id // New York
      }
    }),
    prisma.city.create({
      data: {
        city_name: 'Queens',
        province_state_id: provinces[6].province_state_id // New York
      }
    }),
    
    // เมืองในแคลิฟอร์เนีย
    prisma.city.create({
      data: {
        city_name: 'Los Angeles',
        province_state_id: provinces[7].province_state_id // California
      }
    }),
    prisma.city.create({
      data: {
        city_name: 'San Francisco',
        province_state_id: provinces[7].province_state_id // California
      }
    }),
    prisma.city.create({
      data: {
        city_name: 'San Diego',
        province_state_id: provinces[7].province_state_id // California
      }
    }),
    
    // เมืองในเทกซัส
    prisma.city.create({
      data: {
        city_name: 'Houston',
        province_state_id: provinces[8].province_state_id // Texas
      }
    }),
    prisma.city.create({
      data: {
        city_name: 'Austin',
        province_state_id: provinces[8].province_state_id // Texas
      }
    }),
    prisma.city.create({
      data: {
        city_name: 'Dallas',
        province_state_id: provinces[8].province_state_id // Texas
      }
    }),
    
    // เมืองในสิงคโปร์ Central Region
    prisma.city.create({
      data: {
        city_name: 'Orchard',
        province_state_id: provinces[9].province_state_id // Central Region
      }
    }),
    prisma.city.create({
      data: {
        city_name: 'Marina Bay',
        province_state_id: provinces[9].province_state_id // Central Region
      }
    }),
    prisma.city.create({
      data: {
        city_name: 'Bukit Merah',
        province_state_id: provinces[9].province_state_id // Central Region
      }
    }),
    
    // เมืองในสิงคโปร์ East Region
    prisma.city.create({
      data: {
        city_name: 'Changi',
        province_state_id: provinces[10].province_state_id // East Region
      }
    }),
    prisma.city.create({
      data: {
        city_name: 'Bedok',
        province_state_id: provinces[10].province_state_id // East Region
      }
    }),
    prisma.city.create({
      data: {
        city_name: 'Tampines',
        province_state_id: provinces[10].province_state_id // East Region
      }
    }),
    
    // เมืองในสิงคโปร์ North Region
    prisma.city.create({
      data: {
        city_name: 'Woodlands',
        province_state_id: provinces[11].province_state_id // North Region
      }
    }),
    prisma.city.create({
      data: {
        city_name: 'Yishun',
        province_state_id: provinces[11].province_state_id // North Region
      }
    }),
    prisma.city.create({
      data: {
        city_name: 'Sembawang',
        province_state_id: provinces[11].province_state_id // North Region
      }
    }),
    
    // เมืองในโซล
    prisma.city.create({
      data: {
        city_name: 'Gangnam',
        province_state_id: provinces[12].province_state_id // Seoul
      }
    }),
    prisma.city.create({
      data: {
        city_name: 'Itaewon',
        province_state_id: provinces[12].province_state_id // Seoul
      }
    }),
    prisma.city.create({
      data: {
        city_name: 'Myeongdong',
        province_state_id: provinces[12].province_state_id // Seoul
      }
    }),
    
    // เมืองในปูซาน
    prisma.city.create({
      data: {
        city_name: 'Haeundae',
        province_state_id: provinces[13].province_state_id // Busan
      }
    }),
    prisma.city.create({
      data: {
        city_name: 'Seomyeon',
        province_state_id: provinces[13].province_state_id // Busan
      }
    }),
    prisma.city.create({
      data: {
        city_name: 'Gwangalli',
        province_state_id: provinces[13].province_state_id // Busan
      }
    }),
    
    // เมืองในเชจู
    prisma.city.create({
      data: {
        city_name: 'Jeju City',
        province_state_id: provinces[14].province_state_id // Jeju
      }
    }),
    prisma.city.create({
      data: {
        city_name: 'Seogwipo',
        province_state_id: provinces[14].province_state_id // Jeju
      }
    }),
    prisma.city.create({
      data: {
        city_name: 'Hallim',
        province_state_id: provinces[14].province_state_id // Jeju
      }
    }),
    
    // เมืองในเซี่ยงไฮ้
    prisma.city.create({
      data: {
        city_name: 'Pudong',
        province_state_id: provinces[15].province_state_id // Shanghai
      }
    }),
    prisma.city.create({
      data: {
        city_name: 'The Bund',
        province_state_id: provinces[15].province_state_id // Shanghai
      }
    }),
    prisma.city.create({
      data: {
        city_name: 'Xujiahui',
        province_state_id: provinces[15].province_state_id // Shanghai
      }
    }),
    
    // เมืองในปักกิ่ง
    prisma.city.create({
      data: {
        city_name: 'Chaoyang',
        province_state_id: provinces[16].province_state_id // Beijing
      }
    }),
    prisma.city.create({
      data: {
        city_name: 'Haidian',
        province_state_id: provinces[16].province_state_id // Beijing
      }
    }),
    prisma.city.create({
      data: {
        city_name: 'Dongcheng',
        province_state_id: provinces[16].province_state_id // Beijing
      }
    }),
    
    // กวางตุ้ง
    prisma.city.create({
      data: {
        city_name: 'Guangzhou',
        province_state_id: provinces[17].province_state_id // Guangdong
      }
    }),
    prisma.city.create({
      data: {
        city_name: 'Shenzhen',
        province_state_id: provinces[17].province_state_id // Guangdong
      }
    }),
    prisma.city.create({
      data: {
        city_name: 'Dongguan',
        province_state_id: provinces[17].province_state_id // Guangdong
      }
    }),
  ]);

  // สร้างข้อมูล Zipcode
  const zipcodes = await Promise.all([
    // --- ประเทศไทย ---
    // กรุงเทพฯ
    prisma.zipcode.create({
      data: {
        zipcode: '10330',
        city_id: cities[0].city_id // เขตปทุมวัน
      }
    }),
    prisma.zipcode.create({
      data: {
        zipcode: '10230',
        city_id: cities[1].city_id // เขตลาดพร้าว
      }
    }),
    prisma.zipcode.create({
      data: {
        zipcode: '10500',
        city_id: cities[2].city_id // เขตบางรัก
      }
    }),
    
    // เชียงใหม่
    prisma.zipcode.create({
      data: {
        zipcode: '50000',
        city_id: cities[3].city_id // อำเภอเมืองเชียงใหม่
      }
    }),
    prisma.zipcode.create({
      data: {
        zipcode: '50180',
        city_id: cities[4].city_id // อำเภอแม่ริม
      }
    }),
    prisma.zipcode.create({
      data: {
        zipcode: '50210',
        city_id: cities[5].city_id // อำเภอสันทราย
      }
    }),
    
    // ภูเก็ต
    prisma.zipcode.create({
      data: {
        zipcode: '83000',
        city_id: cities[6].city_id // อำเภอเมืองภูเก็ต
      }
    }),
    prisma.zipcode.create({
      data: {
        zipcode: '83120',
        city_id: cities[7].city_id // อำเภอกะทู้
      }
    }),
    prisma.zipcode.create({
      data: {
        zipcode: '83110',
        city_id: cities[8].city_id // อำเภอถลาง
      }
    }),
    
    // --- ประเทศญี่ปุ่น ---
    // โตเกียว
    prisma.zipcode.create({
      data: {
        zipcode: '150-0002',
        city_id: cities[9].city_id // Shibuya
      }
    }),
    prisma.zipcode.create({
      data: {
        zipcode: '160-0022',
        city_id: cities[10].city_id // Shinjuku
      }
    }),
    prisma.zipcode.create({
      data: {
        zipcode: '104-0061',
        city_id: cities[11].city_id // Ginza
      }
    }),
    
    // โอซาก้า
    prisma.zipcode.create({
      data: {
        zipcode: '530-0001',
        city_id: cities[12].city_id // Umeda
      }
    }),
    prisma.zipcode.create({
      data: {
        zipcode: '542-0076',
        city_id: cities[13].city_id // Namba
      }
    }),
    prisma.zipcode.create({
      data: {
        zipcode: '590-0078',
        city_id: cities[14].city_id // Sakai
      }
    }),
    
    // ฮอกไกโด
    prisma.zipcode.create({
      data: {
        zipcode: '060-0000',
        city_id: cities[15].city_id // Sapporo
      }
    }),
    prisma.zipcode.create({
      data: {
        zipcode: '040-0000',
        city_id: cities[16].city_id // Hakodate
      }
    }),
    prisma.zipcode.create({
      data: {
        zipcode: '070-0000',
        city_id: cities[17].city_id // Asahikawa
      }
    }),
    
    // --- สหรัฐอเมริกา ---
    // นิวยอร์ก
    prisma.zipcode.create({
      data: {
        zipcode: '10001',
        city_id: cities[18].city_id // Manhattan
      }
    }),
    prisma.zipcode.create({
      data: {
        zipcode: '11201',
        city_id: cities[19].city_id // Brooklyn
      }
    }),
    prisma.zipcode.create({
      data: {
        zipcode: '11354',
        city_id: cities[20].city_id // Queens
      }
    }),
    
    // แคลิฟอร์เนีย
    prisma.zipcode.create({
      data: {
        zipcode: '90001',
        city_id: cities[21].city_id // Los Angeles
      }
    }),
    prisma.zipcode.create({
      data: {
        zipcode: '94016',
        city_id: cities[22].city_id // San Francisco
      }
    }),
    prisma.zipcode.create({
      data: {
        zipcode: '92101',
        city_id: cities[23].city_id // San Diego
      }
    }),
    
    // เทกซัส
    prisma.zipcode.create({
      data: {
        zipcode: '77001',
        city_id: cities[24].city_id // Houston
      }
    }),
    prisma.zipcode.create({
      data: {
        zipcode: '73301',
        city_id: cities[25].city_id // Austin
      }
    }),
    prisma.zipcode.create({
      data: {
        zipcode: '75201',
        city_id: cities[26].city_id // Dallas
      }
    }),
    
    // --- สิงคโปร์ ---
    // Central Region
    prisma.zipcode.create({
      data: {
        zipcode: '238875',
        city_id: cities[27].city_id // Orchard
      }
    }),
    prisma.zipcode.create({
      data: {
        zipcode: '018956',
        city_id: cities[28].city_id // Marina Bay
      }
    }),
    prisma.zipcode.create({
      data: {
        zipcode: '150000',
        city_id: cities[29].city_id // Bukit Merah
      }
    }),
    
    // East Region
    prisma.zipcode.create({
      data: {
        zipcode: '486825',
        city_id: cities[30].city_id // Changi
      }
    }),
    prisma.zipcode.create({
      data: {
        zipcode: '460000',
        city_id: cities[31].city_id // Bedok
      }
    }),
    prisma.zipcode.create({
      data: {
        zipcode: '520000',
        city_id: cities[32].city_id // Tampines
      }
    }),
    
    // North Region
    prisma.zipcode.create({
      data: {
        zipcode: '730000',
        city_id: cities[33].city_id // Woodlands
      }
    }),
    prisma.zipcode.create({
      data: {
        zipcode: '760000',
        city_id: cities[34].city_id // Yishun
      }
    }),
    prisma.zipcode.create({
      data: {
        zipcode: '750000',
        city_id: cities[35].city_id // Sembawang
      }
    }),
    
    // --- เกาหลีใต้ ---
    // โซล
    prisma.zipcode.create({
      data: {
        zipcode: '06088',
        city_id: cities[36].city_id // Gangnam
      }
    }),
    prisma.zipcode.create({
      data: {
        zipcode: '04392',
        city_id: cities[37].city_id // Itaewon
      }
    }),
    prisma.zipcode.create({
      data: {
        zipcode: '04527',
        city_id: cities[38].city_id // Myeongdong
      }
    }),
    
    // ปูซาน
    prisma.zipcode.create({
      data: {
        zipcode: '48100',
        city_id: cities[39].city_id // Haeundae
      }
    }),
    prisma.zipcode.create({
      data: {
        zipcode: '47292',
        city_id: cities[40].city_id // Seomyeon
      }
    }),
    prisma.zipcode.create({
      data: {
        zipcode: '48093',
        city_id: cities[41].city_id // Gwangalli
      }
    }),
    
    // เชจู
    prisma.zipcode.create({
      data: {
        zipcode: '63125',
        city_id: cities[42].city_id // Jeju City
      }
    }),
    prisma.zipcode.create({
      data: {
        zipcode: '63530',
        city_id: cities[43].city_id // Seogwipo
      }
    }),
    prisma.zipcode.create({
      data: {
        zipcode: '63040',
        city_id: cities[44].city_id // Hallim
      }
    }),
    
    // --- จีน ---
    // เซี่ยงไฮ้
    prisma.zipcode.create({
      data: {
        zipcode: '200120',
        city_id: cities[45].city_id // Pudong
      }
    }),
    prisma.zipcode.create({
      data: {
        zipcode: '200002',
        city_id: cities[46].city_id // The Bund
      }
    }),
    prisma.zipcode.create({
      data: {
        zipcode: '200030',
        city_id: cities[47].city_id // Xujiahui
      }
    }),
    
    // ปักกิ่ง
    prisma.zipcode.create({
      data: {
        zipcode: '100020',
        city_id: cities[48].city_id // Chaoyang
      }
    }),
    prisma.zipcode.create({
      data: {
        zipcode: '100080',
        city_id: cities[49].city_id // Haidian
      }
    }),
    prisma.zipcode.create({
      data: {
        zipcode: '100010',
        city_id: cities[50].city_id // Dongcheng
      }
    }),
    
    // กวางตุ้ง
    prisma.zipcode.create({
      data: {
        zipcode: '510000',
        city_id: cities[51].city_id // Guangzhou
      }
    }),
    prisma.zipcode.create({
      data: {
        zipcode: '518000',
        city_id: cities[52].city_id // Shenzhen
      }
    }),
    prisma.zipcode.create({
      data: {
        zipcode: '523000',
        city_id: cities[53].city_id // Dongguan
      }
    }),
  ]);

  // สร้างข้อมูล User สำหรับแต่ละประเทศ
  const users = await Promise.all([
    // ผู้ใช้จากประเทศไทย (3 คน)
    prisma.user.create({
      data: {
        username: 'somchai',
        password: 'password123',
        email: 'somchai@example.com',
      }
    }),
    prisma.user.create({
      data: {
        username: 'siriporn',
        password: 'password789',
        email: 'siriporn@example.com',
      }
    }),
    prisma.user.create({
      data: {
        username: 'somsak',
        password: 'passworddef',
        email: 'somsak@example.com',
      }
    }),

    // ผู้ใช้จากญี่ปุ่น (3 คน)
    prisma.user.create({
      data: {
        username: 'tanaka',
        password: 'japanpw123',
        email: 'tanaka@example.jp',
      }
    }),
    prisma.user.create({
      data: {
        username: 'suzuki',
        password: 'japanpw456',
        email: 'suzuki@example.jp',
      }
    }),
    prisma.user.create({
      data: {
        username: 'yamamoto',
        password: 'japanpw789',
        email: 'yamamoto@example.jp',
      }
    }),

    // ผู้ใช้จากสหรัฐอเมริกา (3 คน)
    prisma.user.create({
      data: {
        username: 'johnsmith',
        password: 'usapw123',
        email: 'john@example.com',
      }
    }),
    prisma.user.create({
      data: {
        username: 'michaelbrown',
        password: 'usapw456',
        email: 'michael@example.com',
      }
    }),
    prisma.user.create({
      data: {
        username: 'sarahjones',
        password: 'usapw789',
        email: 'sarah@example.com',
      }
    }),

    // ผู้ใช้จากสิงคโปร์ (3 คน)
    prisma.user.create({
      data: {
        username: 'leekuan',
        password: 'singaporepw123',
        email: 'lee@example.sg',
      }
    }),
    prisma.user.create({
      data: {
        username: 'tanweiming',
        password: 'singaporepw456',
        email: 'tan@example.sg',
      }
    }),
    prisma.user.create({
      data: {
        username: 'chengsoon',
        password: 'singaporepw789',
        email: 'cheng@example.sg',
      }
    }),

    // ผู้ใช้จากเกาหลีใต้ (3 คน)
    prisma.user.create({
      data: {
        username: 'kimpark',
        password: 'koreapw123',
        email: 'kim@example.kr',
      }
    }),
    prisma.user.create({
      data: {
        username: 'leejunho',
        password: 'koreapw456',
        email: 'lee.kr@example.kr',
      }
    }),
    prisma.user.create({
      data: {
        username: 'parkjiyoung',
        password: 'koreapw789',
        email: 'park@example.kr',
      }
    }),

    // ผู้ใช้จากจีน (3 คน)
    prisma.user.create({
      data: {
        username: 'liyiming',
        password: 'chinapw123',
        email: 'li@example.cn',
      }
    }),
    prisma.user.create({
      data: {
        username: 'wangwei',
        password: 'chinapw456',
        email: 'wang@example.cn',
      }
    }),
    prisma.user.create({
      data: {
        username: 'zhangmin',
        password: 'chinapw789',
        email: 'zhang@example.cn',
      }
    }),
  ]);


  const addresses = await Promise.all([
    // --- ประเทศไทย ---
    // กรุงเทพฯ - เขตปทุมวัน
    prisma.address.create({
      data: {
        detail_address: '123 ถนนพระราม 1 แขวงปทุมวัน',
        location_id: locations[0].location_id, // Thailand
        city_id: cities[0].city_id, // เขตปทุมวัน
        province_state_id: provinces[0].province_state_id, // กรุงเทพฯ
        zipcode_id: zipcodes[0].zipcode_id, // 10330
        telephone_number: '+66812345678'
      }
    }),
    // กรุงเทพฯ - เขตลาดพร้าว
    prisma.address.create({
      data: {
        detail_address: '456 ซอยลาดพร้าว 101 แขวงคลองจั่น',
        location_id: locations[0].location_id, // Thailand
        city_id: cities[1].city_id, // เขตลาดพร้าว
        province_state_id: provinces[0].province_state_id, // กรุงเทพฯ
        zipcode_id: zipcodes[1].zipcode_id, // 10230
        telephone_number: '+66823456789'
      }
    }),
    // กรุงเทพฯ - เขตบางรัก
    prisma.address.create({
      data: {
        detail_address: '789 ถนนสีลม แขวงสีลม',
        location_id: locations[0].location_id, // Thailand
        city_id: cities[2].city_id, // เขตบางรัก
        province_state_id: provinces[0].province_state_id, // กรุงเทพฯ
        zipcode_id: zipcodes[2].zipcode_id, // 10500
        telephone_number: '+66834567890'
      }
    }),
    // เชียงใหม่ - อำเภอเมืองเชียงใหม่
    prisma.address.create({
      data: {
        detail_address: '123 ถนนนิมมานเหมินทร์ ตำบลสุเทพ',
        location_id: locations[0].location_id, // Thailand
        city_id: cities[3].city_id, // อำเภอเมืองเชียงใหม่
        province_state_id: provinces[1].province_state_id, // เชียงใหม่
        zipcode_id: zipcodes[3].zipcode_id, // 50000
        telephone_number: '+66845678901'
      }
    }),
    // ภูเก็ต - อำเภอเมืองภูเก็ต
    prisma.address.create({
      data: {
        detail_address: '101 ถนนทองหล่อ ตำบลป่าตอง',
        location_id: locations[0].location_id, // Thailand
        city_id: cities[6].city_id, // อำเภอเมืองภูเก็ต
        province_state_id: provinces[2].province_state_id, // ภูเก็ต
        zipcode_id: zipcodes[6].zipcode_id, // 83000
        telephone_number: '+66856789012'
      }
    }),

    // --- ประเทศญี่ปุ่น ---
    // โตเกียว - Shibuya
    prisma.address.create({
      data: {
        detail_address: '1-2-3 Shibuya, Shibuya-ku',
        location_id: locations[1].location_id, // Japan
        city_id: cities[9].city_id, // Shibuya
        province_state_id: provinces[3].province_state_id, // Tokyo
        zipcode_id: zipcodes[9].zipcode_id, // 150-0002
        telephone_number: '+819012345678'
      }
    }),
    // โอซาก้า - Namba
    prisma.address.create({
      data: {
        detail_address: '5-6-7 Namba, Chuo-ku',
        location_id: locations[1].location_id, // Japan
        city_id: cities[13].city_id, // Namba
        province_state_id: provinces[4].province_state_id, // Osaka
        zipcode_id: zipcodes[13].zipcode_id, // 542-0076
        telephone_number: '+819087654321'
      }
    }),
    // ฮอกไกโด - Sapporo
    prisma.address.create({
      data: {
        detail_address: '9-10-11 Odori, Chuo-ku',
        location_id: locations[1].location_id, // Japan
        city_id: cities[15].city_id, // Sapporo
        province_state_id: provinces[5].province_state_id, // Hokkaido
        zipcode_id: zipcodes[15].zipcode_id, // 060-0000
        telephone_number: '+819023456789'
      }
    }),

    // --- สหรัฐอเมริกา ---
    // นิวยอร์ก - Manhattan
    prisma.address.create({
      data: {
        detail_address: '123 Broadway St, Manhattan',
        location_id: locations[2].location_id, // United States
        city_id: cities[18].city_id, // Manhattan
        province_state_id: provinces[6].province_state_id, // New York
        zipcode_id: zipcodes[18].zipcode_id, // 10001
        telephone_number: '+12125551234'
      }
    }),
    // แคลิฟอร์เนีย - Los Angeles
    prisma.address.create({
      data: {
        detail_address: '456 Hollywood Blvd',
        location_id: locations[2].location_id, // United States
        city_id: cities[21].city_id, // Los Angeles
        province_state_id: provinces[7].province_state_id, // California
        zipcode_id: zipcodes[21].zipcode_id, // 90001
        telephone_number: '+13105557890'
      }
    }),
    // เทกซัส - Austin
    prisma.address.create({
      data: {
        detail_address: '789 Congress Ave',
        location_id: locations[2].location_id, // United States
        city_id: cities[25].city_id, // Austin
        province_state_id: provinces[8].province_state_id, // Texas
        zipcode_id: zipcodes[25].zipcode_id, // 73301
        telephone_number: '+15125559876'
      }
    }),

    // --- สิงคโปร์ ---
    // Central Region - Orchard
    prisma.address.create({
      data: {
        detail_address: '42 Orchard Road',
        location_id: locations[3].location_id, // Singapore
        city_id: cities[27].city_id, // Orchard
        province_state_id: provinces[9].province_state_id, // Central Region
        zipcode_id: zipcodes[27].zipcode_id, // 238875
        telephone_number: '+6591234567'
      }
    }),
    // East Region - Changi
    prisma.address.create({
      data: {
        detail_address: '78 Airport Boulevard',
        location_id: locations[3].location_id, // Singapore
        city_id: cities[30].city_id, // Changi
        province_state_id: provinces[10].province_state_id, // East Region
        zipcode_id: zipcodes[30].zipcode_id, // 486825
        telephone_number: '+6598765432'
      }
    }),
    // North Region - Woodlands
    prisma.address.create({
      data: {
        detail_address: '123 Woodlands Drive',
        location_id: locations[3].location_id, // Singapore
        city_id: cities[33].city_id, // Woodlands
        province_state_id: provinces[11].province_state_id, // North Region
        zipcode_id: zipcodes[33].zipcode_id, // 730000
        telephone_number: '+6596543210'
      }
    }),

    // --- เกาหลีใต้ ---
    // โซล - Gangnam
    prisma.address.create({
      data: {
        detail_address: '123 Gangnam-gu, Teheran-ro',
        location_id: locations[4].location_id, // South Korea
        city_id: cities[36].city_id, // Gangnam
        province_state_id: provinces[12].province_state_id, // Seoul
        zipcode_id: zipcodes[36].zipcode_id, // 06088
        telephone_number: '+821012345678'
      }
    }),
    // ปูซาน - Haeundae
    prisma.address.create({
      data: {
        detail_address: '456 Haeundae-gu, Marine City',
        location_id: locations[4].location_id, // South Korea
        city_id: cities[39].city_id, // Haeundae
        province_state_id: provinces[13].province_state_id, // Busan
        zipcode_id: zipcodes[39].zipcode_id, // 48100
        telephone_number: '+821098765432'
      }
    }),
    // เชจู - Jeju City
    prisma.address.create({
      data: {
        detail_address: '789 Jeju-si, Ildo-2-dong',
        location_id: locations[4].location_id, // South Korea
        city_id: cities[42].city_id, // Jeju City
        province_state_id: provinces[14].province_state_id, // Jeju
        zipcode_id: zipcodes[42].zipcode_id, // 63125
        telephone_number: '+821087654321'
      }
    }),

    // --- จีน ---
    // เซี่ยงไฮ้ - Pudong
    prisma.address.create({
      data: {
        detail_address: '123 Pudong New Area, Century Avenue',
        location_id: locations[5].location_id, // China
        city_id: cities[45].city_id, // Pudong
        province_state_id: provinces[15].province_state_id, // Shanghai
        zipcode_id: zipcodes[45].zipcode_id, // 200120
        telephone_number: '+8613800138000'
      }
    }),
    // ปักกิ่ง - Chaoyang
    prisma.address.create({
      data: {
        detail_address: '456 Chaoyang District, Guomao',
        location_id: locations[5].location_id, // China
        city_id: cities[48].city_id, // Chaoyang
        province_state_id: provinces[16].province_state_id, // Beijing
        zipcode_id: zipcodes[48].zipcode_id, // 100020
        telephone_number: '+8613900139000'
      }
    }),
    // กวางตุ้ง - Guangzhou
    prisma.address.create({
      data: {
        detail_address: '789 Tianhe District, Zhujiang New Town',
        location_id: locations[5].location_id, // China
        city_id: cities[51].city_id, // Guangzhou
        province_state_id: provinces[17].province_state_id, // Guangdong
        zipcode_id: zipcodes[51].zipcode_id, // 510000
        telephone_number: '+8613600136000'
      }
    }),
  ]);

  // สร้าง User Profile สำหรับผู้ใช้
  await Promise.all([
    // ผู้ใช้จากประเทศไทย (3 คน)
    prisma.user_profile.create({
      data: {
        user_id: users[0].user_id,
        first_name: 'สมชาย',
        last_name: 'ใจดี',
        phone_number: '+66812345678', // Thailand (+66)
        address_id: addresses[0].address_id, // กรุงเทพฯ - เขตปทุมวัน
        age: 30,
        gender: 'Male',
        date_of_birth: new Date('1994-05-15'),
      }
    }),
    prisma.user_profile.create({
      data: {
        user_id: users[1].user_id,
        first_name: 'ศิริพร',
        last_name: 'สุขสวัสดิ์',
        phone_number: '+66834567890', // Thailand (+66)
        address_id: addresses[2].address_id, // กรุงเทพฯ - เขตบางรัก
        age: 35,
        gender: 'Female',
        date_of_birth: new Date('1989-12-03'),
      }
    }),
    prisma.user_profile.create({
      data: {
        user_id: users[2].user_id,
        first_name: 'สมศักดิ์',
        last_name: 'มั่งมี',
        phone_number: '+66856789012', // Thailand (+66)
        address_id: addresses[4].address_id, // ภูเก็ต - อำเภอเมืองภูเก็ต
        age: 40,
        gender: 'Male',
        date_of_birth: new Date('1984-03-12'),
      }
    }),

    // ผู้ใช้จากญี่ปุ่น (3 คน)
    prisma.user_profile.create({
      data: {
        user_id: users[3].user_id,
        first_name: 'Taro',
        last_name: 'Tanaka',
        phone_number: '+819012345678', // Japan (+81)
        address_id: addresses[5].address_id, // โตเกียว - Shibuya
        age: 32,
        gender: 'Male',
        date_of_birth: new Date('1991-07-15'),
      }
    }),
    prisma.user_profile.create({
      data: {
        user_id: users[4].user_id,
        first_name: 'Kenji',
        last_name: 'Suzuki',
        phone_number: '+819087654321', // Japan (+81)
        address_id: addresses[6].address_id, // โอซาก้า - Namba
        age: 29,
        gender: 'Male',
        date_of_birth: new Date('1994-09-24'),
      }
    }),
    prisma.user_profile.create({
      data: {
        user_id: users[5].user_id,
        first_name: 'Akira',
        last_name: 'Yamamoto',
        phone_number: '+819023456789', // Japan (+81)
        address_id: addresses[7].address_id, // ฮอกไกโด - Sapporo
        age: 36,
        gender: 'Male',
        date_of_birth: new Date('1988-11-30'),
      }
    }),

    // ผู้ใช้จากสหรัฐอเมริกา (3 คน)
    prisma.user_profile.create({
      data: {
        user_id: users[6].user_id,
        first_name: 'John',
        last_name: 'Smith',
        phone_number: '+12125551234', // USA (+1)
        address_id: addresses[8].address_id, // นิวยอร์ก - Manhattan
        age: 42,
        gender: 'Male',
        date_of_birth: new Date('1982-01-15'),
      }
    }),
    prisma.user_profile.create({
      data: {
        user_id: users[7].user_id,
        first_name: 'Michael',
        last_name: 'Brown',
        phone_number: '+13105557890', // USA (+1)
        address_id: addresses[9].address_id, // แคลิฟอร์เนีย - Los Angeles
        age: 45,
        gender: 'Male',
        date_of_birth: new Date('1978-03-21'),
      }
    }),
    prisma.user_profile.create({
      data: {
        user_id: users[8].user_id,
        first_name: 'Sarah',
        last_name: 'Jones',
        phone_number: '+15125559876', // USA (+1)
        address_id: addresses[10].address_id, // เทกซัส - Austin
        age: 38,
        gender: 'Female',
        date_of_birth: new Date('1986-06-17'),
      }
    }),

    // ผู้ใช้จากสิงคโปร์ (3 คน)
    prisma.user_profile.create({
      data: {
        user_id: users[9].user_id,
        first_name: 'Kuan',
        last_name: 'Lee',
        phone_number: '+6591234567', // Singapore (+65)
        address_id: addresses[11].address_id, // Central Region - Orchard
        age: 29,
        gender: 'Male',
        date_of_birth: new Date('1994-11-08'),
      }
    }),
    prisma.user_profile.create({
      data: {
        user_id: users[10].user_id,
        first_name: 'Wei Ming',
        last_name: 'Tan',
        phone_number: '+6598765432', // Singapore (+65)
        address_id: addresses[12].address_id, // East Region - Changi
        age: 34,
        gender: 'Male',
        date_of_birth: new Date('1989-08-12'),
      }
    }),
    prisma.user_profile.create({
      data: {
        user_id: users[11].user_id,
        first_name: 'Soon Huat',
        last_name: 'Cheng',
        phone_number: '+6596543210', // Singapore (+65)
        address_id: addresses[13].address_id, // North Region - Woodlands
        age: 31,
        gender: 'Male',
        date_of_birth: new Date('1992-04-25'),
      }
    }),

    // ผู้ใช้จากเกาหลีใต้ (3 คน)
    prisma.user_profile.create({
      data: {
        user_id: users[12].user_id,
        first_name: 'Ji-hoon',
        last_name: 'Kim',
        phone_number: '+821012345678', // South Korea (+82)
        address_id: addresses[14].address_id, // โซล - Gangnam
        age: 27,
        gender: 'Male',
        date_of_birth: new Date('1996-05-25'),
      }
    }),
    prisma.user_profile.create({
      data: {
        user_id: users[13].user_id,
        first_name: 'Jun-ho',
        last_name: 'Lee',
        phone_number: '+821098765432', // South Korea (+82)
        address_id: addresses[15].address_id, // ปูซาน - Haeundae
        age: 33,
        gender: 'Male',
        date_of_birth: new Date('1990-02-14'),
      }
    }),
    prisma.user_profile.create({
      data: {
        user_id: users[14].user_id,
        first_name: 'Ji-young',
        last_name: 'Park',
        phone_number: '+821087654321', // South Korea (+82)
        address_id: addresses[16].address_id, // เชจู - Jeju City
        age: 25,
        gender: 'Female',
        date_of_birth: new Date('1998-12-30'),
      }
    }),

    // ผู้ใช้จากจีน (3 คน)
    prisma.user_profile.create({
      data: {
        user_id: users[15].user_id,
        first_name: 'Yiming',
        last_name: 'Li',
        phone_number: '+8613800138000', // China (+86)
        address_id: addresses[17].address_id, // เซี่ยงไฮ้ - Pudong
        age: 31,
        gender: 'Female',
        date_of_birth: new Date('1992-09-18'),
      }
    }),
    prisma.user_profile.create({
      data: {
        user_id: users[16].user_id,
        first_name: 'Wei',
        last_name: 'Wang',
        phone_number: '+8613900139000', // China (+86)
        address_id: addresses[18].address_id, // ปักกิ่ง - Chaoyang
        age: 37,
        gender: 'Male',
        date_of_birth: new Date('1986-07-22'),
      }
    }),
    prisma.user_profile.create({
      data: {
        user_id: users[17].user_id,
        first_name: 'Min',
        last_name: 'Zhang',
        phone_number: '+8613600136000', // China (+86)
        address_id: addresses[19].address_id, // กวางตุ้ง - Guangzhou
        age: 28,
        gender: 'Female',
        date_of_birth: new Date('1995-11-05'),
      }
    }),
  ]);

  // สร้างข้อมูล checkout_item
  const checkoutItems = await Promise.all([
    prisma.checkout_item.create({
      data: {
        user_id: users[0].user_id,
        product_id: products[0].product_id,
        size_stock_id: sizeStocks[0].size_stock_id,
        quantity: 1,
        delivery_fee: 50.00,
        net_price: 200.00,
        status_checkout: 'Completed'
      }
    }),
    prisma.checkout_item.create({
      data: {
        user_id: users[1].user_id,
        product_id: products[1].product_id,
        size_stock_id: sizeStocks[2].size_stock_id,
        quantity: 2,
        delivery_fee: 50.00,
        net_price: 370.00,
        status_checkout: 'Completed'
      }
    }),
    prisma.checkout_item.create({
      data: {
        user_id: users[2].user_id,
        product_id: products[2].product_id,
        size_stock_id: sizeStocks[3].size_stock_id,
        quantity: 1,
        delivery_fee: 50.00,
        net_price: 250.00,
        status_checkout: 'Completed'
      }
    }),
  ]);

  // สร้างข้อมูล payment
  const payments = await Promise.all([
    prisma.payment.create({
      data: {
        user_id: users[0].user_id,
        checkout_item_id: checkoutItems[0].checkout_item_id,
        payment_intent_id: 'pi_1Ngs7tKFgvmF92',
        net_price: 200.00,
        payment_method: 'Credit Card',
        payment_status: 'Completed'
      }
    }),
    prisma.payment.create({
      data: {
        user_id: users[1].user_id,
        checkout_item_id: checkoutItems[1].checkout_item_id,
        payment_intent_id: 'pi_1Ngs7tKFgvmF93',
        net_price: 370.00,
        payment_method: 'PayPal',
        payment_status: 'Completed'
      }
    }),
    prisma.payment.create({
      data: {
        user_id: users[2].user_id,
        checkout_item_id: checkoutItems[2].checkout_item_id,
        payment_intent_id: 'pi_1Ngs7tKFgvmF94',
        net_price: 250.00,
        payment_method: 'Credit Card',
        payment_status: 'Completed'
      }
    })
  ]);

  // สร้างข้อมูล order
  const orders = await Promise.all([
    prisma.order.create({
      data: {
        payment_id: payments[0].payment_id,
        total_price: 200.00,
        commend_user: 'Please deliver carefully.'
      }
    }),
    prisma.order.create({
      data: {
        payment_id: payments[1].payment_id,
        total_price: 370.00,
        commend_user: 'Leave package at the door.'
      }
    }),
    prisma.order.create({
      data: {
        payment_id: payments[2].payment_id,
        total_price: 250.00,
        commend_user: 'Call before delivery.'
      }
    })
  ]);

  // สร้างข้อมูล delivery
  const deliveries = await Promise.all([
    prisma.delivery.create({
      data: {
        order_id: orders[0].order_id,
        delivery_status: 'Shipped',
        tracking_number: 'TH1234567890',
        carrier_name: 'Thai Post'
      }
    }),
    prisma.delivery.create({
      data: {
        order_id: orders[1].order_id,
        delivery_status: 'Processing',
        tracking_number: 'TH0987654321',
        carrier_name: 'Kerry Express'
      }
    }),
    prisma.delivery.create({
      data: {
        order_id: orders[2].order_id,
        delivery_status: 'Pending',
        tracking_number: null,
        carrier_name: null
      }
    })
  ]);

  // สร้างข้อมูล admin
  const admin1 = await prisma.admin.create({
    data: {
      first_name: 'สมชาย',
      last_name: 'ใจดี',
      email: 'somchai@example.com',
      password: 'password123',
      position: 'Manager'
    }
  })

  const admin2 = await prisma.admin.create({
    data: {
      first_name: 'วิชัย',
      last_name: 'รักษ์ดี',
      email: 'wichai@example.com',
      password: 'password123',
      position: 'Supervisor'
    }
  })

  const admin3 = await prisma.admin.create({
    data: {
      first_name: 'มานี',
      last_name: 'มานะ',
      email: 'manee@example.com',
      password: 'password123',
      position: 'Staff'
    }
  })

  // สร้างข้อมูล admin_product
  const adminProducts = await Promise.all([
    prisma.admin_product.create({
      data: {
        product_id: products[0].product_id,
        created_by_admin_id: admin1.admin_id,
        updated_by_admin_id: admin1.admin_id
      }
    }),
    prisma.admin_product.create({
      data: {
        product_id: products[1].product_id,
        created_by_admin_id: admin2.admin_id,
        updated_by_admin_id: admin2.admin_id
      }
    }),
    prisma.admin_product.create({
      data: {
        product_id: products[2].product_id,
        created_by_admin_id: admin3.admin_id,
        updated_by_admin_id: admin1.admin_id
      }
    }),
    prisma.admin_product.create({
      data: {
        product_id: products[3].product_id,
        created_by_admin_id: admin1.admin_id,
        updated_by_admin_id: admin3.admin_id
      }
    }),
    prisma.admin_product.create({
      data: {
        product_id: products[4].product_id,
        created_by_admin_id: admin2.admin_id,
        updated_by_admin_id: admin2.admin_id
      }
    })
  ])

  // สร้างข้อมูล admin_size
  const adminSizes = await Promise.all([
    prisma.admin_size.create({
      data: {
        size_stock_id: sizeStocks[0].size_stock_id,
        size_detail: 'US 8',
        action_type: 'ADD',
        created_by_admin_id: admin1.admin_id,
        updated_by_admin_id: admin1.admin_id
      }
    }),
    prisma.admin_size.create({
      data: {
        size_stock_id: sizeStocks[1].size_stock_id,
        size_detail: 'US 9',
        action_type: 'ADD',
        created_by_admin_id: admin1.admin_id,
        updated_by_admin_id: admin2.admin_id
      }
    }),
    prisma.admin_size.create({
      data: {
        size_stock_id: sizeStocks[2].size_stock_id,
        size_detail: 'US 9',
        action_type: 'ADD',
        created_by_admin_id: admin2.admin_id,
        updated_by_admin_id: admin3.admin_id
      }
    }),
    prisma.admin_size.create({
      data: {
        size_stock_id: sizeStocks[3].size_stock_id,
        size_detail: 'US 10',
        action_type: 'ADD',
        created_by_admin_id: admin3.admin_id,
        updated_by_admin_id: admin1.admin_id
      }
    }),
    prisma.admin_size.create({
      data: {
        size_stock_id: sizeStocks[4].size_stock_id,
        size_detail: 'US 8',
        action_type: 'ADD',
        created_by_admin_id: admin1.admin_id,
        updated_by_admin_id: admin2.admin_id
      }
    }),
    prisma.admin_size.create({
      data: {
        size_stock_id: sizeStocks[5].size_stock_id,
        size_detail: 'US 7',
        action_type: 'ADD',
        created_by_admin_id: admin2.admin_id,
        updated_by_admin_id: admin3.admin_id
      }
    })
  ])

  // สร้างข้อมูล admin_delivery_control
  const adminDeliveries = await Promise.all([
    prisma.admin_delivery_control.create({
      data: {
        delivery_id: deliveries[0].delivery_id,
        created_by_admin_id: admin1.admin_id,
        updated_by_admin_id: admin1.admin_id
      }
    }),
    prisma.admin_delivery_control.create({
      data: {
        delivery_id: deliveries[1].delivery_id,
        created_by_admin_id: admin2.admin_id,
        updated_by_admin_id: admin3.admin_id
      }
    }),
    prisma.admin_delivery_control.create({
      data: {
        delivery_id: deliveries[2].delivery_id,
        created_by_admin_id: admin3.admin_id,
        updated_by_admin_id: admin2.admin_id
      }
    })
  ])

  console.log('Created 3 admin records')
  console.log('Created 3 admin_size records')
  console.log('Created 3 admin_product records')
  console.log('Created 3 admin_delivery_control records')
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