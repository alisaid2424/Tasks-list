"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useState } from "react";
import { IoMenu } from "react-icons/io5";
import { IoCloseSharp } from "react-icons/io5";

const NavBar = () => {
  const [toggle, setToggle] = useState(false);
  const pathname = usePathname();

  const links = [
    {
      id: crypto.randomUUID(),
      title: "Tasks",
      href: "/",
    },
    {
      id: crypto.randomUUID(),
      title: "Add Task",
      href: "/task/add",
    },
    {
      id: crypto.randomUUID(),
      title: "About",
      href: "/about",
    },
    {
      id: crypto.randomUUID(),
      title: "Contact",
      href: "/contact",
    },
  ];

  const isLinkActive = (href: string) => {
    return href === "/" ? pathname === "/" : pathname === href;
  };

  return (
    <>
      <div className="text-4xl cursor-pointer text-slate-800 md:hidden">
        {toggle ? (
          <IoCloseSharp onClick={() => setToggle((prev) => !prev)} />
        ) : (
          <IoMenu onClick={() => setToggle((prev) => !prev)} />
        )}
      </div>

      {/* Navigation links */}
      <div
        className="navLinksWraper p-10 sm:px-16 md:px-0 md:py-0 flex flex-col md:flex-row items-start md:items-center  md:justify-between"
        style={{
          clipPath: toggle ? "polygon(0 0, 100% 0, 100% 100%, 0 100%)" : "",
        }}
      >
        <ul className="navLinks relative z-50 flex items-start md:items-center flex-col md:flex-row  pb-3 md:pb-0 gap-6 md:gap-10">
          {links.map((link) => (
            <li key={link.id}>
              <Link
                onClick={() => setToggle(false)}
                href={link.href}
                className={`${
                  isLinkActive(link.href) ? "text-red-500" : "text-black"
                } hover:text-red-500 duration-200 transition-colors font-semibold`}
              >
                {link.title}
              </Link>
            </li>
          ))}
        </ul>
      </div>
    </>
  );
};

export default NavBar;
