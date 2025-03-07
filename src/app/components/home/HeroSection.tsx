import ButtonMain from "../ui/ButtonMain";
import CardItem from "../ui/CardItemFlashSale";


export default function HeroSection() {
  return (
    <main className="flex flex-col justify-center items-center bg-white">
    <section 
      className=" w-full  lg:h-full flex flex-col justify-center bg-contain   items-start  bg-no-repeat 
      lg:bg-[url('/images/home-imgaes/mainsneaker.png')] 
      bg-[url('/images/home-imgaes/main_mobile.avif')]"
    >
      {/* Content */}
      <article className="pl-5 lg:pl-10 py-30 space-y-3 lg:space-y-5 lg:mt-[0rem]">
        <h1 className="text-black drop-shadow-sm text-4xl font-bold lg:text-8xl  ">Step-up Your Stride</h1>
        <div className="space-y-3 lg:space-y-5"> 
        <p className="text-black text-xl ">Premium Athletic Footwear</p>
          <ButtonMain type="primary">SHOW NOW</ButtonMain>
        </div>
      </article>
{/* เหลือแก้ layout เล็กน้อย */}
      <section className="w-full flex flex-row-reverse  pb-30 mt-14 lg:pb-40 pr-3.5 z-10   lg:pr-20">
        <CardItem/>
      </section>
      </section>
      </main>
  );
}
