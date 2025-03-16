import * as motion from "motion/react-client"
import HeroSection from "./components/home/HeroSection";
import BestSellersSection from "./components/home/BestSellersSection";
import PromoKidsStyles from "./components/home/PromoKidsStyles";
import ShopCollection from "./components/home/ShopCollection";
import CommitSection from "./components/home/CommitSection";
export default function Home() {
 
  return (
    <>   
      <HeroSection />
      <BestSellersSection />
      <PromoKidsStyles />
      <ShopCollection />
      <CommitSection />
    </>
  );
}
