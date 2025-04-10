/*
  Warnings:

  - You are about to drop the column `updated_at` on the `admin_delivery_control` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE "admin_delivery_control" DROP COLUMN "updated_at",
ADD COLUMN     "update_date" TIMESTAMP(3),
ALTER COLUMN "created_at" DROP NOT NULL;

-- CreateTable
CREATE TABLE "checkout_item" (
    "checkout_item_id" SERIAL NOT NULL,
    "user_id" UUID NOT NULL,
    "product_id" VARCHAR(30) NOT NULL,
    "size_stock_id" INTEGER NOT NULL,
    "quantity" INTEGER NOT NULL,
    "delivery_fee" DECIMAL(10,2) NOT NULL,
    "net_price" DECIMAL(10,2) NOT NULL,
    "status_checkout" VARCHAR(100) NOT NULL,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "checkout_item_pkey" PRIMARY KEY ("checkout_item_id")
);

-- CreateTable
CREATE TABLE "payment" (
    "payment_id" SERIAL NOT NULL,
    "user_id" UUID NOT NULL,
    "checkout_item_id" INTEGER NOT NULL,
    "payment_intent_id" VARCHAR(100) NOT NULL,
    "net_price" DECIMAL(10,2) NOT NULL,
    "payment_method" VARCHAR(100) NOT NULL,
    "payment_status" VARCHAR(100) NOT NULL,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "payment_pkey" PRIMARY KEY ("payment_id")
);

-- CreateTable
CREATE TABLE "order" (
    "order_id" SERIAL NOT NULL,
    "payment_id" INTEGER NOT NULL,
    "total_price" DECIMAL(10,2) NOT NULL,
    "commend_user" VARCHAR(100) NOT NULL,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "order_pkey" PRIMARY KEY ("order_id")
);

-- CreateTable
CREATE TABLE "delivery" (
    "delivery_id" SERIAL NOT NULL,
    "order_id" INTEGER NOT NULL,
    "delivery_status" VARCHAR(100) NOT NULL,
    "tracking_number" VARCHAR(100),
    "carrier_name" VARCHAR(100),
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "delivery_pkey" PRIMARY KEY ("delivery_id")
);

-- CreateIndex
CREATE UNIQUE INDEX "payment_checkout_item_id_key" ON "payment"("checkout_item_id");

-- CreateIndex
CREATE UNIQUE INDEX "order_payment_id_key" ON "order"("payment_id");

-- CreateIndex
CREATE UNIQUE INDEX "delivery_order_id_key" ON "delivery"("order_id");

-- AddForeignKey
ALTER TABLE "admin_delivery_control" ADD CONSTRAINT "admin_delivery_control_delivery_id_fkey" FOREIGN KEY ("delivery_id") REFERENCES "delivery"("delivery_id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "checkout_item" ADD CONSTRAINT "checkout_item_user_id_fkey" FOREIGN KEY ("user_id") REFERENCES "user"("user_id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "checkout_item" ADD CONSTRAINT "checkout_item_product_id_fkey" FOREIGN KEY ("product_id") REFERENCES "product"("product_id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "checkout_item" ADD CONSTRAINT "checkout_item_size_stock_id_fkey" FOREIGN KEY ("size_stock_id") REFERENCES "size_stock"("size_stock_id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "payment" ADD CONSTRAINT "payment_user_id_fkey" FOREIGN KEY ("user_id") REFERENCES "user"("user_id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "payment" ADD CONSTRAINT "payment_checkout_item_id_fkey" FOREIGN KEY ("checkout_item_id") REFERENCES "checkout_item"("checkout_item_id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "order" ADD CONSTRAINT "order_payment_id_fkey" FOREIGN KEY ("payment_id") REFERENCES "payment"("payment_id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "delivery" ADD CONSTRAINT "delivery_order_id_fkey" FOREIGN KEY ("order_id") REFERENCES "order"("order_id") ON DELETE RESTRICT ON UPDATE CASCADE;
