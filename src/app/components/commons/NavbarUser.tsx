import Link from "next/link";
import SearchBarShopping from "../ui/SearchBarShopping";
import { PiHeartFill } from "react-icons/pi";
import { GoPerson } from "react-icons/go";
import * as motion from "motion/react-client";
import CartButton from "../ui/CartButton";

export default function NavbarUser() {
  const animation = {
    whileHover: { scale: 1.1 },
    transition: { duration: 0.3 },
  };

  // ✅ แก้ไขชื่อ interface เป็น `MenuItem`
  interface MenuItem {
    id: number;
    label: string; // ✅ แก้ `lable` เป็น `label`
    route: string;
  }

  const menuItems: MenuItem[] = [
    { id: 1, label: "NEW", route: "#" },
    { id: 2, label: "MEN", route: "#" },
    { id: 3, label: "WOMEN", route: "#" },
    { id: 4, label: "KIDS", route: "#" },
  ];

  // ✅ แก้ไข Type ของ `actionItems`
  interface ActionItem {
    id: string;
    label?: string;
    icon?: JSX.Element;
    type: "link" | "button";
    route: string;
  }

  const actionItems: ActionItem[] = [
    { id: "contract", label: "Contact us", type: "link", route: "#" },
    { id: "person", icon: <GoPerson className="h-6 w-6" />, type: "link", route: "#" },
    { id: "heart", icon: <PiHeartFill className="h-6 w-6" />, type: "link", route: "#" },
  ];

  const linkClass =
    "rounded-2xl p-2 whitespace-nowrap flex justify-center hover:bg-gray-200 transition-all duration-300 hover:text-amber-600";

  return (
    <nav className="hidden sm:hidden lg:flex lg:flex-row cursor-pointer lg:items-center lg:justify-between lg:bg-gray-100 lg:px-16 lg:py-3">
      <img src="/images/next-step-logo.svg" width="120" height="120" alt="Next Step Logo" />

      {/* ✅ แสดงเฉพาะ Label ของเมนู */}
      <article className="flex flex-row justify-start space-x-10 pl-24">
        {menuItems.map((item) => (
          <motion.div key={item.id} {...animation} className={linkClass}>
            {item.label} {/* ✅ ใช้ item.label แทน JSX */}
          </motion.div>
        ))}
      </article>

      <section className="pb-5">
        <SearchBarShopping />
      </section>

      {/* ✅ แสดงไอคอน & Action Menu */}
      <figure className="flex flex-row items-center space-x-10 justify-end px-5 pr-10">
        {actionItems.map((item) => (
          <motion.div key={item.id} {...animation} className={linkClass}>
            {item.type === "link" ? (
              <Link href={item.route}>{item.label || item.icon}</Link>
            ) : item.type === "button" ? (
              <button>{item.icon}</button>
            ) : (
              item.icon
            )}
          </motion.div>
        ))}

       <CartButton/>
      </figure>
    </nav>
  );
}
