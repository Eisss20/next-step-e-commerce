import ButtonMain from "../ui/ButtonMain";
import CardItem from "../ui/CardItemFlashSale";

export default function HeroSection() {
  return (
    <main className="relative flex flex-col justify-center items-center bg-white w-full overflow-x-hidden">
      {/* Desktop Background */}
      <div className="hidden lg:block absolute top-0 left-0 w-full h-full bg-no-repeat bg-cover bg-center bg-[url('/images/home-imgaes/mainsneaker.png')]"></div>
      {/* Mobile Background */}
      <div className="lg:hidden absolute inset-0 bg-no-repeat bg-cover bg-center bg-[url('/images/home-imgaes/main_mobile.avif')]"></div>

      <section className="relative w-full flex flex-col justify-center items-start min-h-screen">
        {/* Content */}
        <article className="pl-5 lg:pl-10 space-y-3 lg:space-y-5 lg:pt-12">
          <h1 className="text-black drop-shadow-sm text-4xl font-bold lg:text-8xl">Step-up Your Stride</h1>
          <div className="space-y-3 lg:space-y-5"> 
            <p className="text-black text-xl">Premium Athletic Footwear</p>
            <ButtonMain type="primary">SHOW NOW</ButtonMain>
          </div>
        </article>

        {/* Card Item */}
        <section className="w-full flex flex-row-reverse pt-[18rem]  z-10 lg:pr-20">
          <CardItem />
        </section>
      </section>
    </main>
  );
}
