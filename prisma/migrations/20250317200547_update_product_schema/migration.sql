/*
  Warnings:

  - The primary key for the `product` table will be changed. If it partially fails, the table could be left without primary key constraint.

*/
-- AlterTable
ALTER TABLE "product" DROP CONSTRAINT "product_pkey",
ALTER COLUMN "product_id" SET DEFAULT '',
ALTER COLUMN "product_id" SET DATA TYPE VARCHAR(30),
ADD CONSTRAINT "product_pkey" PRIMARY KEY ("product_id");
