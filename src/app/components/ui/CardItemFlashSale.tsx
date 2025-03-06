import Image from "next/image";
import * as motion from "motion/react-client"

// เหลือวาง Logic  วนลูปแสดงข้อมูลสินค้าที่มีในระบบ

export default function CardItem() {
    return (
      
    <motion.div
      initial={{ opacity: 0, y: 20 }} 
      animate={{ opacity: 1, y: 0 }} 
      transition={{ duration: 1, ease: "easeOut" }} 
      className="w-64 h-60 bg-white/30 backdrop-blur-xl rounded-lg shadow-lg overflow-hidden z-50 "
      >
      <figure className="flex flex-col items-center space-y-5 justify-center pt-10 "> 

        <div className="w-52 h-28 bg-[#E9E6DD] backdrop-blur-sm rounded-lg "> 
          
            <img src="/images/home-imgaes/sneakerCard.avif" alt="sneaker" className="w-full h-full rounded-lg object-cover scale-100 " />
            
        </div>
          </figure>   

        <p className="pl-5 pt-5"> Product name  </p>
        <div className="flex flex-row items-center space-x-3"> 
        <p className="pl-5"> $140.00 </p> 
        <del className="pl-5 text-gray-500">  $160.00 </del>
        </div>

    </motion.div>
      
  );
}