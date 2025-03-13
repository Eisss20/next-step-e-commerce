import ButtonMain from "../ui/ButtonMain";
import CardBestSeller from "../products/CardBestSeller";

export default function BestSellersSection() {
  
  return (
    <> 

    <section className="container h-[100rem] mt-10 pl-5 pr-5 mx-auto">
    <article  className="flex justify-between item-center   ">  
          <h1 className=" flex  items-center  "> BEST SELLERS </h1>
                 <ButtonMain type="primary">SHOW NOW</ButtonMain>
    </article>
        
    <CardBestSeller />

      </section>
  
      </>
  );
}