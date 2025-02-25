import Link from 'next/link';
import SearchBarShopping from '../ui/SearchBarShopping';
import { PiShoppingCartSimpleLight, PiHeartFill } from 'react-icons/pi';
import { GoPerson } from 'react-icons/go';
import * as motion from 'motion/react-client';


export default function NavberUser() {

  const animation = {
    whileHover: { scale: 1.1}, // ขยายขึ้นเมื่อ hover
    transition: { duration: 0.3 }, // ทำให้ animation smooth
  };

  const menuItems: string[] = ["NEW", "MEN", "WOMEN", "KIDS"];
  
  const actionItems = [
    { id: "contract", label: "Contract us", type: "link" },
    { id: "person", icon: <GoPerson className="h-6 w-6" />, type: "icon" },
    { id: "heart", icon: <PiHeartFill className="h-6 w-6" />, type: "icon" },
    { id: "cart", icon: <PiShoppingCartSimpleLight className="h-6 w-6" />, type: "button" },
  ];

  const linkClass = "rounded-2xl p-2 hover:bg-gray-200 transition-all duration-300 hover:text-amber-600";

  return (
    <>
      <nav className="flex flex-row items-center justify-evenly bg-gray-100 p-5 pl-16">
        <img
          src="/images/next-step-logo.svg"
          width="120"
          height="120"
          className=""
          alt="Next Step Logo"
        />
        <article className="flex flex-row justify-start space-x-10 pl-24">
          {menuItems.map((item) => (
            <motion.div 
              key={item}
              {...animation}
              className={linkClass} >
            
            <Link href="#">{item}</Link>
            </motion.div>
         ))}
        </article>
        <section className="pb-5">
          <SearchBarShopping />
        </section>
        <figure className="flex flex-row items-center space-x-10">

  {actionItems.map((item) => (
    <motion.div
      key={item.id}
      {...animation}
      className={linkClass}
    >
      {item.type === "link" ? (
        <Link href="#">{item.label}</Link>
      ) : item.type === "button" ? (
        <button>{item.icon}</button>
      ) : (
        item.icon
      )}
    </motion.div>
  ))}


        </figure>
      </nav>
    </>
  );
}
