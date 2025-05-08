import { NextResponse } from "next/server";
import bcrypt from "bcrypt";
import { signJWT, verifyJWT } from "@/app/utils/jwtIntial";
import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient() 

// ขั้นตอนการทำงาน
// 1. รับข้อมูลจากผู้ใช้
// 2. ตรวจสอบความถูกต้องของข้อมูล
// 3. ทำการ bcrypt รหัสผ่าน
// 4. หากผ่านก็จะสร้าง payload 
// 5. และสร้าง token และส่งผลลัพธ์กลับไปยังผู้ใช้

interface LoginData {
    email: string;
    password: string;
    username: string;
}



export async function POST(request: Request) {

try {

    const userPassword = await request.json() as LoginData;

    const { email, password, username } = userPassword;

    const user = await prisma.user.findUnique({
        where: {
            email: email,
            username: username,
        }
    });

    if (!user || !user.password) {
        return NextResponse.json({ error: "please fill all the fields" }, { status: 401 });

    }

    if (!user) {
        return NextResponse.json({ error: "Invalid email or password" }, { status: 401 });

      }
  

      const isPasswordValid = await bcrypt.compare(password, user.password);
      if (!isPasswordValid) {
          return NextResponse.json({ error: "Invalid email or password" }, { status: 401 });
    }
    

    const payload = {
    email: email,
    username: username,
    password: password
    }

    console.log("✅ Payload will be signed:", payload);
    
    const token = signJWT(payload, process.env.JWT_SECRET || 'secret');

    console.log(process.env.JWT_SECRET)

    return NextResponse.json({ token, user: { email, username, password } });
    
 

} catch (error: any) {

    console.error('Login error:', error);
    console.log("Internal server error");
    console.log(error);
    return NextResponse.json(
        { error: error.message || "Internal server error" }, 
        { status: 500 }
    );
}



}