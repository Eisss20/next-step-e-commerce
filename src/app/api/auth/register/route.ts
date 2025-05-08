
import { NextResponse } from "next/server";
import { PrismaClient } from '@prisma/client' 
import bcrypt from "bcrypt";

const prisma = new PrismaClient() 

/**
  1.รับข้อมูลจากผู้ใช้
  2 นำข้อมูลที่รับมา 3 ส่วน user , profile , address 
  3 ทำการ hash รหัสผ่าน
  4 สร้าง user ใหม่ในฐานข้อมูล
  5 สร้าง address ใหม่ในฐานข้อมูล
  6 สร้าง profile ใหม่ในฐานข้อมูล
  7 ส่งข้อมูลกลับให้กับผู้ใช้
 */

interface RegisterData {
    username: string;
    email: string;
    password: string;
    first_name: string;
    last_name: string;
    phone_number: string;
    gender: string;
    date_of_birth: string;
    detail_address: string;
    location_id: number;
    city_id: number;
    province_state_id: number;
    zipcode_id: number;
}

function calculateAge(dateOfBirth: string) {
    const today = new Date();
    const birthDate = new Date(dateOfBirth);
    let age = today.getFullYear() - birthDate.getFullYear();
    const monthDiff = today.getMonth() - birthDate.getMonth();
    if (monthDiff < 0 || (monthDiff === 0 && today.getDate() < birthDate.getDate())) {
        age--;
    }
    return age;
}

export async function POST(request: Request) {

try {

    const userProfileData = await request.json();   
    
    const { username, email, password, first_name, last_name, phone_number, gender, date_of_birth,  
             detail_address, location_id, city_id, province_state_id, zipcode_id } = userProfileData as RegisterData;


   const hashedPassword = await bcrypt.hash(password, 10);

   const userData = await prisma.user.create({
    data: {
           username,
           password: hashedPassword,
           email,
       }

       
   })
    
   const addressData = await prisma.address.create({
       data: {
        detail_address,
        location_id: location_id,
        city_id: city_id,
        province_state_id: province_state_id,
        zipcode_id: zipcode_id,
        telephone_number: phone_number,
    }
   })
    
    
   const createProfile = await prisma.user_profile.create({
    data: {
     user_id: userData.user_id,
     first_name,
     last_name,
     phone_number,
     address_id: addressData.address_id,
     gender,
     date_of_birth: new Date(date_of_birth),
     age: calculateAge(date_of_birth),   
 }
})
 
    console.log("userData:", userData);
    console.log("addressData:", addressData);
    console.log("createProfile:", createProfile);

    return NextResponse.json({ 
        message: "Registration successful",
        user: {
            user_id: userData.user_id,
            username: userData.username,
            email: userData.email,
            first_name,
            last_name
        }
    }, { status: 201 });

} catch (error) {
    if (error instanceof Error) {
        return NextResponse.json({ error: error.message }, { status: 400 });
    }
    return NextResponse.json({ error: "Internal error" }, { status: 500 });
}

