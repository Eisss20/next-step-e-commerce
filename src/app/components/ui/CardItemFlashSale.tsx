import * as motion from "motion/react-client"
import ButtonMain from "./ButtonMain";


export default function CardItemFlashSale() {
    return (
      
    <motion.div
      initial={{ opacity: 0, y: 20 }} 
      animate={{ opacity: 1, y: 0 }} 
      transition={{ duration: 1, ease: "easeOut" }} 
      className="w-60 h-64 bg-white/30 backdrop-blur-xl rounded-lg shadow-lg overflow-hidden  lg:w-[30rem] lg:h-[16.5rem] lg:flex lg:flex-row "
      >
      <figure className="flex flex-col items-center space-y-5 justify-center pt-10   lg:justify-normal lg:p-5  "> 

          <div className="relative w-52 h-28 bg-white backdrop-blur-sm rounded-lg  lg:w-64 lg:h-56 "> 
             <div className="absolute  pl-3 pr-3  z-10 text-center rounded bg-amber-400 mt-1 ml-2 "> 
              <span className=" text-sm  text-slate-700 "> SALE </span>
              </div>
            <img src="/images/home-imgaes/sneakerCard2.jpg" alt="sneaker" className="w-full h-full rounded-lg object-cover scale-75  lg:object-contain lg:object-center lg:scale-[80%] " />
          </div>
          
          </figure>   

        <figcaption className="pl-5 flex flex-col mt-5">   
        <p className=" pt-5 font-bold"> Air Jordan 1 Low </p>
        <div className="flex flex-row items-center pt-2 "> 
        <p className=""> $140.00 </p> 
        <del className=" text-gray-500 pl-2">  $160.00 </del>
          </div>
          <div className="mt-20 hidden lg:block"> 
            <ButtonMain type="outline" >ADD TO CART</ButtonMain>
            </div>
        </figcaption>  

    </motion.div>
      
  );
}