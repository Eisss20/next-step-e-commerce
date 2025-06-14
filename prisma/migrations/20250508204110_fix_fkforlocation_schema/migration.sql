-- AddForeignKey
ALTER TABLE "address" ADD CONSTRAINT "address_location_id_fkey" FOREIGN KEY ("location_id") REFERENCES "location"("location_id") ON DELETE RESTRICT ON UPDATE CASCADE;
