import { motion, useScroll, useTransform } from "motion/react";
import ButtonMain from "../ui/ButtonMain";
import CardItemFlashSale from "../ui/CardItemFlashSale";
import { useRef } from "react";
import CardReview from "../ui/CardReview";


export default function CommitSection() {

  const ref = useRef(null);
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ['start end', 'end start'],
  });

  const opacity = useTransform(scrollYProgress, [0, 0.5, 1], [0, 1, 0]);
  const y = useTransform(scrollYProgress, [0, 0.5, 1], [-50, 0, 50]); 




  return (
    <main className="relative flex flex-col  w-full h-screen items-center overflow-hidden ">
      {/* Desktop Background */}
      <div className="hidden lg:block absolute top-0 left-0 w-full h-full bg-no-repeat bg-cover bg-center  bg-[url('/images/home-imgaes/thirdsneaker.avif')]"></div>
      {/* Mobile Background */}
      <div className="lg:hidden absolute inset-0 bg-no-repeat bg-cover bg-center bg-[url('/images/home-imgaes/third_mobile.avif')]"></div>

      <section className=" lg:pb-[20rem] max-w-screen-xl   w-full mx-auto my-auto container flex flex-col  ">
        {/* Content */}
          <motion.article 
            initial={{ opacity: 0, y: -50 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: false }}
            transition={{ duration: 0.5 }}
            className="pl-5 lg:pl-10 space-y-3 z-10 lg:space-y-5 lg:pt-12"
          >
            <h1 className="text-black drop-shadow-sm text-4xl font-bold lg:text-8xl">
              Committed to Sustainability
            </h1>
          </motion.article>

        {/* Card info */}
        <section className="w-full flex flex-row-reverse pt-[18rem] pr-5 lg:pr-5  lg:ml-12 lg:flex lg:pt-[10vh]">
        <CardReview />
        </section>
      </section>
    </main>
  );
}
