/*
  Warnings:

  - You are about to drop the column `tag_id` on the `product` table. All the data in the column will be lost.
  - You are about to drop the `tag` table. If the table is not empty, all the data it contains will be lost.
  - Added the required column `label_id` to the `product` table without a default value. This is not possible if the table is not empty.

*/
-- DropForeignKey
ALTER TABLE "product" DROP CONSTRAINT "product_tag_id_fkey";

-- AlterTable
ALTER TABLE "product" DROP COLUMN "tag_id",
ADD COLUMN     "discout_percent" INTEGER,
ADD COLUMN     "label_id" INTEGER NOT NULL,
ADD COLUMN     "sale_status" BOOLEAN NOT NULL DEFAULT false;

-- DropTable
DROP TABLE "tag";

-- CreateTable
CREATE TABLE "label" (
    "label_id" SERIAL NOT NULL,
    "label_name" TEXT NOT NULL,

    CONSTRAINT "label_pkey" PRIMARY KEY ("label_id")
);

-- CreateIndex
CREATE UNIQUE INDEX "label_label_name_key" ON "label"("label_name");

-- AddForeignKey
ALTER TABLE "product" ADD CONSTRAINT "product_label_id_fkey" FOREIGN KEY ("label_id") REFERENCES "label"("label_id") ON DELETE RESTRICT ON UPDATE CASCADE;
