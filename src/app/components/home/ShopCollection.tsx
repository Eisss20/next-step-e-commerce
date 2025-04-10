import ButtonMain from '../ui/ButtonMain';
import CardCollection from '../ui/CardCollection';

export default function ShopCollection() {
  return (
    <>
      <div className="container mx-auto overflow-hidden ">
        <section className="container mx-auto mt-10 min-h-screen w-full pr-5 pl-5 lg:w-[100vw] lg:pr-10 lg:pl-10">
          <article className="item-center flex justify-between">
            <h1 className="flex items-center text-xl font-medium "> COLLECTION </h1>
            <ButtonMain type="primary">SHOW NOW</ButtonMain>
          </article>
          <CardCollection />
        </section>
      </div>
    </>
  );
}
