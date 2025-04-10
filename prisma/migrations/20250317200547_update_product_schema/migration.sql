/*
  Warnings:

  - The primary key for the `product` table will be changed. If it partially fails, the table could be left without primary key constraint.

*/
-- First drop the foreign key constraints
ALTER TABLE "product_image" DROP CONSTRAINT "product_image_product_id_fkey";
ALTER TABLE "size_stock" DROP CONSTRAINT "size_stock_product_id_fkey";
ALTER TABLE "product_stock" DROP CONSTRAINT "product_stock_product_id_fkey";

-- AlterTable
ALTER TABLE "product" DROP CONSTRAINT "product_pkey",
ALTER COLUMN "product_id" SET DEFAULT '',
ALTER COLUMN "product_id" SET DATA TYPE VARCHAR(30),
ADD CONSTRAINT "product_pkey" PRIMARY KEY ("product_id");

-- Recreate the foreign key constraints
ALTER TABLE "product_image" ADD CONSTRAINT "product_image_product_id_fkey" FOREIGN KEY ("product_id") REFERENCES "product"("product_id") ON DELETE CASCADE;
ALTER TABLE "size_stock" ADD CONSTRAINT "size_stock_product_id_fkey" FOREIGN KEY ("product_id") REFERENCES "product"("product_id") ON DELETE CASCADE;
ALTER TABLE "product_stock" ADD CONSTRAINT "product_stock_product_id_fkey" FOREIGN KEY ("product_id") REFERENCES "product"("product_id") ON DELETE CASCADE;
