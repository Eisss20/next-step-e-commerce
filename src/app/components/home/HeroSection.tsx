import ButtonMain from "../ui/ButtonMain";
import CardItem from "../ui/CardItemFlashSale";


export default function HeroSection() {
  return (
    <section 
      className=" w-full h-svh flex flex-col justify-center bg-contain   items-start  bg-no-repeat 
      lg:bg-[url('/images/home-imgaes/mainsneaker.png')] 
      bg-[url('/images/home-imgaes/main_mobile.avif')]"
    >
      {/* Content */}
      <article className="pl-5 py-30 w-full h-full space-y-3">
        <h1 className="text-black drop-shadow-xl text-4xl font-bold">Step-up Your Stride</h1>
        <p className="text-black text-xl">Premium Athletic Footwear</p>
        <ButtonMain type="primary">SHOW NOW</ButtonMain>
      </article>

      <section className="w-full flex flex-row-reverse space-x-5  pb-52 pr-3.5 z-10  ">
        <CardItem />
      </section>
      
    </section>
  );
}
