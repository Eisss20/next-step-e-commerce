import ButtonMain from "../ui/ButtonMain";
import CardItemFlashSale from "../ui/CardItemFlashSale";


export default function CommitSection() {
  return (
    <main className="relative flex flex-col  w-full h-screen items-center overflow-hidden ">
      {/* Desktop Background */}
      <div className="hidden lg:block absolute top-0 left-0 w-full h-full bg-no-repeat bg-cover bg-center  bg-[url('/images/home-imgaes/thirdsneaker.avif')]"></div>
      {/* Mobile Background */}
      <div className="lg:hidden absolute inset-0 bg-no-repeat bg-cover bg-center bg-[url('/images/home-imgaes/third_mobile.avif')]"></div>

      <section className=" lg:pb-[20rem] max-w-screen-xl   w-full mx-auto my-auto container flex flex-col  ">
        {/* Content */}
        <article className=" pl-5 lg:pl-10 space-y-3 z-10  lg:space-y-5 lg:pt-12">
          <h1 className="text-black drop-shadow-sm text-4xl font-bold lg:text-8xl">Committed
          <br/> to Sustainability</h1>
        </article>

        {/* Card info */}

      </section>
    </main>
  );
}
