import Link from "next/link";
import NavBar from "./NavBar";
import Image from "next/image";

const Header = () => {
  return (
    <header className="flex items-center h-16 shadow-bottom-md relative z-10 bg-white bg-opacity-85">
      <div className="container flex items-center justify-between gap-7 w-full">
        <Link
          href="/"
          className="text-gray-700 font-semibold text-2xl uppercase"
        >
          <Image
            src="/logo.jpg"
            alt="Logo"
            width={80}
            height={80}
            className="rounded-full w-12 h-12"
          />
        </Link>

        <NavBar />
      </div>
    </header>
  );
};

export default Header;
