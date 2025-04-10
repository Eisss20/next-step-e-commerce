import ButtonMain from '../ui/ButtonMain';
import CardBestSeller from '../ui/CardBestSeller';

export default function BestSellersSection() {
  return (
    <>
      <div className="container mx-auto overflow-hidden pb-10 lg:pb-0 ">
        <section className="container mx-auto mt-10 min-h-screen w-full pr-5 pl-5 lg:w-[100vw] lg:pr-10 lg:pl-10">
          <article className="item-center flex justify-between">
            <h1 className="flex items-center text-xl font-medium"> BEST SELLERS </h1>
            <ButtonMain type="primary" onClick={() => {}}>SHOP NOW</ButtonMain>
          </article>
          <CardBestSeller/>
        </section>
      </div>
    </>
  );
}
