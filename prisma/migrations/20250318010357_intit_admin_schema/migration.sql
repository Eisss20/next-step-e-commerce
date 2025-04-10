-- CreateTable
CREATE TABLE "admin" (
    "admin_id" UUID NOT NULL DEFAULT gen_random_uuid(),
    "first_name" TEXT NOT NULL,
    "last_name" TEXT NOT NULL,
    "email" TEXT NOT NULL,
    "password" TEXT NOT NULL,
    "position" TEXT NOT NULL,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "admin_pkey" PRIMARY KEY ("admin_id")
);

-- CreateTable
CREATE TABLE "admin_size" (
    "admin_size_id" SERIAL NOT NULL,
    "size_stock_id" INTEGER NOT NULL,
    "size_detail" VARCHAR(20) NOT NULL,
    "action_type" VARCHAR(10) NOT NULL,
    "created_by_admin_id" UUID NOT NULL,
    "updated_by_admin_id" UUID NOT NULL,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "admin_size_pkey" PRIMARY KEY ("admin_size_id")
);

-- CreateTable
CREATE TABLE "admin_product" (
    "admin_product_id" SERIAL NOT NULL,
    "product_id" VARCHAR(30) NOT NULL,
    "created_by_admin_id" UUID NOT NULL,
    "updated_by_admin_id" UUID NOT NULL,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "admin_product_pkey" PRIMARY KEY ("admin_product_id")
);

-- CreateTable
CREATE TABLE "admin_delivery_control" (
    "admin_delivery_control_id" SERIAL NOT NULL,
    "delivery_id" INTEGER,
    "created_by_admin_id" UUID NOT NULL,
    "updated_by_admin_id" UUID NOT NULL,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "admin_delivery_control_pkey" PRIMARY KEY ("admin_delivery_control_id")
);

-- CreateIndex
CREATE UNIQUE INDEX "admin_email_key" ON "admin"("email");

-- AddForeignKey
ALTER TABLE "admin_size" ADD CONSTRAINT "admin_size_created_by_admin_id_fkey" FOREIGN KEY ("created_by_admin_id") REFERENCES "admin"("admin_id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "admin_size" ADD CONSTRAINT "admin_size_updated_by_admin_id_fkey" FOREIGN KEY ("updated_by_admin_id") REFERENCES "admin"("admin_id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "admin_size" ADD CONSTRAINT "admin_size_size_stock_id_fkey" FOREIGN KEY ("size_stock_id") REFERENCES "size_stock"("size_stock_id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "admin_product" ADD CONSTRAINT "admin_product_created_by_admin_id_fkey" FOREIGN KEY ("created_by_admin_id") REFERENCES "admin"("admin_id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "admin_product" ADD CONSTRAINT "admin_product_updated_by_admin_id_fkey" FOREIGN KEY ("updated_by_admin_id") REFERENCES "admin"("admin_id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "admin_product" ADD CONSTRAINT "admin_product_product_id_fkey" FOREIGN KEY ("product_id") REFERENCES "product"("product_id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "admin_delivery_control" ADD CONSTRAINT "admin_delivery_control_created_by_admin_id_fkey" FOREIGN KEY ("created_by_admin_id") REFERENCES "admin"("admin_id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "admin_delivery_control" ADD CONSTRAINT "admin_delivery_control_updated_by_admin_id_fkey" FOREIGN KEY ("updated_by_admin_id") REFERENCES "admin"("admin_id") ON DELETE RESTRICT ON UPDATE CASCADE;
