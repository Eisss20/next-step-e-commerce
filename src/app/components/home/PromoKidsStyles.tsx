import { motion, useScroll, useTransform } from "motion/react";
import ButtonMain from "../ui/ButtonMain";
import CardItemFlashSale from "../ui/CardItemFlashSale";
import { useRef } from "react";

export default function PromoKidsStyles() {
  const ref = useRef(null);
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start end", "end start"]
  });

  const opacity = useTransform(scrollYProgress, [0, 0.5, 1], [0, 1, 0]);
  const y = useTransform(scrollYProgress, [0, 0.5, 1], [-50, 0, 50]);

  return (
    <main ref={ref} className="relative flex flex-col w-full h-screen items-center overflow-hidden">
      {/* Desktop Background */}
      <div className="hidden lg:block absolute top-0 left-0 w-full h-full bg-no-repeat bg-cover bg-center bg-[url('/images/home-imgaes/secondsneaker.avif')]"></div>
      {/* Mobile Background */}
      <div className="lg:hidden absolute inset-0 bg-no-repeat bg-cover bg-center bg-[url('/images/home-imgaes/second_mobile.avif')]"></div>

      <section className="lg:pb-[20rem] max-w-screen-xl w-full mx-auto my-auto container flex flex-col">
        <motion.article 
          style={{ opacity, y }}
          className="pl-5 lg:pl-10 space-y-3 z-10 lg:space-y-5 lg:pt-12"
        >
          <h1 className="text-black drop-shadow-sm text-4xl font-bold lg:text-8xl">20% Off <br /> Kids Styles</h1>
          <div className="space-y-3 lg:space-y-5"> 
            <p className="text-black text-xl">Exclusive, one-time offer</p>
            <ButtonMain type="primary">SHOW NOW</ButtonMain>
          </div>
        </motion.article>

        {/* Card Item  */}
        <section className="w-full pr-5 lg:flex flex flex-row-reverse pt-[18rem] lg:pt-[0vh] lg:ml-12">
          <CardItemFlashSale />
        </section> 
      </section>
    </main>
  );
}
