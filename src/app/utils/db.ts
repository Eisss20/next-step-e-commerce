import { Pool } from "pg";

// สร้าง Connection Pool
const connectionPool: Pool = new Pool({
  connectionString: process.env.CONNECTION_STRING as string, // ใช้ ENV ตัวเดียวกันกับ Supabase
});

export { connectionPool };