import Image from "next/image";


export default function HeroSection() {
  return (
    <div className="relative w-full h-screen flex overflow-hidden">

      {/* รูปสำหรับ Mobile */}
      <div className="absolute inset-0 lg:hidden">
        <Image
          src="/images/home-imgaes/main_mobile.avif"
          alt="Sneaker"
          quality={100}
          fill
          className="object-cover"
        />
      </div>

      {/* รูปสำหรับ Desktop */}
      <Image
        src="/images/home-imgaes/mainsneaker.png"
        alt="Sneaker"
        width={1920}
        height={1080}
        quality={100}
        className="lg:block hidden w-full h-full object-cover"
      />


      <article className="absolute  justify-start pl-5 py-30 w-full h-full flex flex-col space-y-2 ">
        <h1 className="text-black drop-shadow-xl text-4xl font-bold">Step-up Your Stride</h1>
        <p className="text-black text-xl"> Premium Athletic Footwear </p>
      </article>
      

    </div>
  );
}
