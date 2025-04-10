import { motion} from "motion/react";
import ButtonMain from "../ui/ButtonMain";
import CardItemFlashSale from "../ui/CardItemFlashSale";

export default function PromoKidsStyles() {

  return (
    <main  className="relative flex flex-col w-full h-screen items-center overflow-hidden">
      {/* Desktop Background */}
      <div className="hidden lg:block absolute top-0 left-0 w-full h-full bg-no-repeat bg-cover bg-center bg-[url('/images/home-imgaes/secondsneaker.avif')]"></div>
      {/* Mobile Background */}
      <div className="lg:hidden absolute inset-0 bg-no-repeat bg-cover bg-center bg-[url('/images/home-imgaes/second_mobile.avif')]"></div>

      <section className="lg:pb-[20rem] max-w-screen-xl w-full mx-auto my-auto container flex flex-col">
      <motion.article 
            initial={{ opacity: 0, y: -50 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: false }}
            transition={{ duration: 1 }}
            className="pl-5 lg:pl-10 space-y-3 z-10 lg:space-y-5 lg:pt-12"
          >
          <h1 className="text-black drop-shadow-sm text-4xl font-bold lg:text-8xl">20% Off <br /> Kids Styles</h1>
          <div className="space-y-3 lg:space-y-5"> 
            <p className="text-black text-xl">Exclusive, one-time offer</p>
            <ButtonMain type="primary" onClick={() => {}}>SHOW NOW</ButtonMain>
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
