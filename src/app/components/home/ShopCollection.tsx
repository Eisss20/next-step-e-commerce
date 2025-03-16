import ButtonMain from "../ui/ButtonMain";
import CardBestSeller from "../products/CardBestSeller";

export default function ShopCollection() {
  
  
  return (
    <> 
    <div className="overflow-hidden container mx-auto">
    <section className="container min-h-screen   w-full mt-10 pl-5 pr-5 lg:pl-10 lg:pr-10 lg:w-[100vw] mx-auto">
    <article  className="flex justify-between item-center   ">  
          <h1 className=" flex  items-center text-xl font-medium  "> BEST SELLERS </h1>
                 <ButtonMain type="primary">SHOW NOW</ButtonMain>
    </article>
    <CardBestSeller />  
      </section>
    </div>
      </>
  );
}