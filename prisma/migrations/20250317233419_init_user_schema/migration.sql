-- AlterTable
ALTER TABLE "product_image" ADD COLUMN     "position_image" INTEGER;

-- CreateTable
CREATE TABLE "user" (
    "user_id" UUID NOT NULL DEFAULT gen_random_uuid(),
    "username" TEXT NOT NULL,
    "password" TEXT NOT NULL,
    "email" TEXT NOT NULL,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "user_pkey" PRIMARY KEY ("user_id")
);

-- CreateTable
CREATE TABLE "user_profile" (
    "user_profile_id" SERIAL NOT NULL,
    "user_id" UUID NOT NULL,
    "first_name" TEXT NOT NULL,
    "last_name" TEXT NOT NULL,
    "phone_number" TEXT NOT NULL,
    "address_id" INTEGER NOT NULL,
    "age" INTEGER NOT NULL,
    "gender" TEXT NOT NULL,
    "date_of_birth" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "user_profile_pkey" PRIMARY KEY ("user_profile_id")
);

-- CreateTable
CREATE TABLE "address" (
    "address_id" SERIAL NOT NULL,
    "detail_address" TEXT NOT NULL,
    "location_id" INTEGER NOT NULL,
    "city_id" INTEGER NOT NULL,
    "province_state_id" INTEGER NOT NULL,
    "zipcode_id" INTEGER NOT NULL,
    "telephone_number" VARCHAR(15) NOT NULL,

    CONSTRAINT "address_pkey" PRIMARY KEY ("address_id")
);

-- CreateTable
CREATE TABLE "location" (
    "location_id" SERIAL NOT NULL,
    "location_name" TEXT NOT NULL,

    CONSTRAINT "location_pkey" PRIMARY KEY ("location_id")
);

-- CreateTable
CREATE TABLE "province_state" (
    "province_state_id" SERIAL NOT NULL,
    "province_state_name" TEXT NOT NULL,
    "location_id" INTEGER NOT NULL,
    "type" VARCHAR(10) NOT NULL,

    CONSTRAINT "province_state_pkey" PRIMARY KEY ("province_state_id")
);

-- CreateTable
CREATE TABLE "city" (
    "city_id" SERIAL NOT NULL,
    "province_state_id" INTEGER NOT NULL,
    "city_name" TEXT NOT NULL,

    CONSTRAINT "city_pkey" PRIMARY KEY ("city_id")
);

-- CreateTable
CREATE TABLE "zipcode" (
    "zipcode_id" SERIAL NOT NULL,
    "zipcode" VARCHAR(10) NOT NULL,
    "city_id" INTEGER NOT NULL,

    CONSTRAINT "zipcode_pkey" PRIMARY KEY ("zipcode_id")
);

-- CreateIndex
CREATE UNIQUE INDEX "user_username_key" ON "user"("username");

-- CreateIndex
CREATE UNIQUE INDEX "user_email_key" ON "user"("email");

-- CreateIndex
CREATE UNIQUE INDEX "location_location_name_key" ON "location"("location_name");

-- CreateIndex
CREATE UNIQUE INDEX "province_state_province_state_name_key" ON "province_state"("province_state_name");

-- CreateIndex
CREATE UNIQUE INDEX "city_city_name_key" ON "city"("city_name");

-- CreateIndex
CREATE UNIQUE INDEX "zipcode_zipcode_key" ON "zipcode"("zipcode");

-- AddForeignKey
ALTER TABLE "user_profile" ADD CONSTRAINT "user_profile_user_id_fkey" FOREIGN KEY ("user_id") REFERENCES "user"("user_id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "user_profile" ADD CONSTRAINT "user_profile_address_id_fkey" FOREIGN KEY ("address_id") REFERENCES "address"("address_id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "address" ADD CONSTRAINT "address_city_id_fkey" FOREIGN KEY ("city_id") REFERENCES "city"("city_id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "address" ADD CONSTRAINT "address_province_state_id_fkey" FOREIGN KEY ("province_state_id") REFERENCES "province_state"("province_state_id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "address" ADD CONSTRAINT "address_zipcode_id_fkey" FOREIGN KEY ("zipcode_id") REFERENCES "zipcode"("zipcode_id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "province_state" ADD CONSTRAINT "province_state_location_id_fkey" FOREIGN KEY ("location_id") REFERENCES "location"("location_id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "city" ADD CONSTRAINT "city_province_state_id_fkey" FOREIGN KEY ("province_state_id") REFERENCES "province_state"("province_state_id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "zipcode" ADD CONSTRAINT "zipcode_city_id_fkey" FOREIGN KEY ("city_id") REFERENCES "city"("city_id") ON DELETE RESTRICT ON UPDATE CASCADE;
