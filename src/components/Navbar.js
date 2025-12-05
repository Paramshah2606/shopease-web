import Link from "next/link";
import { FaShoppingBag, FaUser } from "react-icons/fa";

export default function Navbar() {
  return (
    <nav className="mt-8 mx-auto max-w-[80%] rounded-2xl bg-gradient-to-r from-white/80 to-blue-100/70 shadow-xl backdrop-blur-lg border border-white/40 px-8 py-4">
      <div className="flex items-center justify-between">
        {/* Logo and Brand on the left */}
        <Link href="/" className="flex items-center gap-2 group">
          <FaShoppingBag className="text-blue-500 text-2xl drop-shadow group-hover:scale-110 transition" />
          <span className="text-xl font-bold text-gray-800 tracking-wide drop-shadow">
            ShopEase
          </span>
        </Link>
        {/* Navigation Links on the right */}
        <ul className="flex gap-8 items-center">
          <li>
            <Link
              href="/user/home"
              className="text-gray-700 font-medium px-3 py-1 rounded-lg hover:bg-blue-100/70 hover:text-blue-600 transition"
            >
              Home
            </Link>
          </li>
          <li>
            <Link
              href="/user/product"
              className="text-gray-700 font-medium px-3 py-1 rounded-lg hover:bg-blue-100/70 hover:text-blue-600 transition"
            >
              Shop
            </Link>
          </li>
          <li>
            <Link
              href="/user/blog"
              className="text-gray-700 font-medium px-3 py-1 rounded-lg hover:bg-blue-100/70 hover:text-blue-600 transition"
            >
              Blog
            </Link>
          </li>
          <li>
            <Link
              href="/user/cart"
              className="text-gray-700 font-medium px-3 py-1 rounded-lg hover:bg-blue-100/70 hover:text-blue-600 transition"
            >
              Cart
            </Link>
          </li>
          <li>
            <Link
              href="/user/menu"
              className="flex items-center justify-center w-10 h-10 rounded-full hover:bg-blue-100/70 transition"
              aria-label="User Menu"
            >
              <FaUser className="text-blue-600 text-xl" />
            </Link>
          </li>
        </ul>
      </div>
    </nav>
  );
}
