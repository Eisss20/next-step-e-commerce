-- CreateTable
CREATE TABLE "product" (
    "product_id" VARCHAR(20) NOT NULL,
    "product_name" VARCHAR(50) NOT NULL,
    "color_name" VARCHAR(100) NOT NULL,
    "price_per_unit" DECIMAL(10,2) NOT NULL,
    "net_price" DECIMAL(10,2) NOT NULL,
    "discount_price" DECIMAL(10,2) NOT NULL,
    "description" TEXT NOT NULL,
    "category_id" INTEGER NOT NULL,
    "head_detail" TEXT NOT NULL,
    "detail_product" TEXT NOT NULL,
    "tag_id" INTEGER NOT NULL,

    CONSTRAINT "product_pkey" PRIMARY KEY ("product_id")
);

-- CreateTable
CREATE TABLE "tag" (
    "tag_id" SERIAL NOT NULL,
    "tag_name" TEXT NOT NULL,

    CONSTRAINT "tag_pkey" PRIMARY KEY ("tag_id")
);

-- CreateTable
CREATE TABLE "category" (
    "category_id" SERIAL NOT NULL,
    "category_name" TEXT NOT NULL,

    CONSTRAINT "category_pkey" PRIMARY KEY ("category_id")
);

-- CreateTable
CREATE TABLE "product_image" (
    "product_image_id" SERIAL NOT NULL,
    "product_id" TEXT NOT NULL,
    "product_image_url" TEXT NOT NULL,

    CONSTRAINT "product_image_pkey" PRIMARY KEY ("product_image_id")
);

-- CreateTable
CREATE TABLE "size_stock" (
    "size_stock_id" SERIAL NOT NULL,
    "product_id" TEXT NOT NULL,
    "size_detail" VARCHAR(20) NOT NULL,
    "stock_quantity" INTEGER NOT NULL,
    "status_stock" VARCHAR(100) NOT NULL,

    CONSTRAINT "size_stock_pkey" PRIMARY KEY ("size_stock_id")
);

-- CreateTable
CREATE TABLE "product_stock" (
    "product_stock_id" SERIAL NOT NULL,
    "product_id" TEXT NOT NULL,
    "size_stock_id" INTEGER NOT NULL,

    CONSTRAINT "product_stock_pkey" PRIMARY KEY ("product_stock_id")
);

-- CreateIndex
CREATE UNIQUE INDEX "product_product_id_key" ON "product"("product_id");

-- CreateIndex
CREATE UNIQUE INDEX "tag_tag_name_key" ON "tag"("tag_name");

-- CreateIndex
CREATE UNIQUE INDEX "category_category_name_key" ON "category"("category_name");

-- AddForeignKey
ALTER TABLE "product" ADD CONSTRAINT "product_tag_id_fkey" FOREIGN KEY ("tag_id") REFERENCES "tag"("tag_id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "product" ADD CONSTRAINT "product_category_id_fkey" FOREIGN KEY ("category_id") REFERENCES "category"("category_id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "product_image" ADD CONSTRAINT "product_image_product_id_fkey" FOREIGN KEY ("product_id") REFERENCES "product"("product_id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "size_stock" ADD CONSTRAINT "size_stock_product_id_fkey" FOREIGN KEY ("product_id") REFERENCES "product"("product_id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "product_stock" ADD CONSTRAINT "product_stock_product_id_fkey" FOREIGN KEY ("product_id") REFERENCES "product"("product_id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "product_stock" ADD CONSTRAINT "product_stock_size_stock_id_fkey" FOREIGN KEY ("size_stock_id") REFERENCES "size_stock"("size_stock_id") ON DELETE RESTRICT ON UPDATE CASCADE;
