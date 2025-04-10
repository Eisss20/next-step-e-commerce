import { motion, useScroll, useTransform } from 'motion/react';
import { useRef } from 'react';
import ButtonMain from '../ui/ButtonMain';
import CardItemFlashSale from '../ui/CardItemFlashSale';

export default function HeroSection() {
  const ref = useRef(null);
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ['start end', 'end start'],
  });

  const opacity = useTransform(scrollYProgress, [0, 0.5, 1], [0, 1, 0]);
  const y = useTransform(scrollYProgress, [0, 0.5, 1], [-50, 0, 50]);

  return (
    <main ref={ref} className="relative flex h-screen w-full flex-col items-center overflow-hidden">
      {/* Desktop Background */}
      <div className="absolute top-0 left-0 hidden h-full w-full bg-[url('/images/home-imgaes/mainsneaker.png')] bg-cover bg-center bg-no-repeat lg:block"></div>
      {/* Mobile Background */}
      <div className="absolute inset-0 bg-[url('/images/home-imgaes/main_mobile.avif')] bg-cover bg-center bg-no-repeat lg:hidden"></div>

      <section className="container mx-auto my-auto flex w-full max-w-screen-xl flex-col lg:pb-[20rem]">
        {/* Content */}
        <motion.article
          initial={{ opacity: 0, y: -50 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: false }}
          transition={{ duration: 0.5 }}
          className="z-10 space-y-3 pl-5 lg:space-y-5 lg:pt-12 lg:pl-10"
        >
          <h1 className="text-4xl font-bold text-black drop-shadow-sm lg:text-8xl">
            Step-up Your Stride
          </h1>
          <div className="space-y-3 lg:space-y-5">
            <p className="text-xl text-black">Premium Athletic Footwear</p>
            <ButtonMain type="primary" onClick={() => {}}>
              SHOW NOW
            </ButtonMain>
          </div>
        </motion.article>

        {/* Card Item  */}
        <section className="w-full flex flex-row-reverse pt-[18rem] pr-5 lg:ml-12 lg:flex lg:pt-[10vh]">
          <CardItemFlashSale />
        </section>
      </section>
    </main>
  );
}
