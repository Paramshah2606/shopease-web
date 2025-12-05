import { FaInstagram, FaTwitter, FaFacebookF } from "react-icons/fa";
import Link from "next/link";

export default function Footer() {
  return (
    <footer className="mt-20">
      <div className="max-w-[80%] mx-auto rounded-2xl bg-gradient-to-r from-white/70 to-blue-100/60 backdrop-blur-lg border border-white/40 shadow-xl px-8 py-10">
        <div className="flex flex-col md:flex-row md:justify-between md:items-center gap-8">
          {/* Brand and Statement */}
          <div>
            <div className="flex items-center gap-2 mb-3">
              <span className="text-xl font-bold text-blue-600">ShopEase</span>
            </div>
            <p className="text-gray-600 max-w-xs">
              ShopEase brings you curated collections, fast delivery, and a seamless shopping experience. Trusted by thousands since 2025.
            </p>
          </div>
          {/* Footer Navigation */}
          <div className="flex flex-col md:flex-row gap-10">
            <div>
              <h4 className="font-semibold text-gray-800 mb-2">Company</h4>
              <ul className="space-y-1 text-gray-600">
                <li><Link href="/about" className="hover:text-blue-600 transition">About Us</Link></li>
                <li><Link href="/user/blog" className="hover:text-blue-600 transition">Blog</Link></li>
                <li><Link href="/careers" className="hover:text-blue-600 transition">Careers</Link></li>
              </ul>
            </div>
            <div>
              <h4 className="font-semibold text-gray-800 mb-2">Support</h4>
              <ul className="space-y-1 text-gray-600">
                <li><Link href="/contact" className="hover:text-blue-600 transition">Contact</Link></li>
                <li><Link href="/faq" className="hover:text-blue-600 transition">FAQs</Link></li>
                <li><Link href="/shipping" className="hover:text-blue-600 transition">Shipping</Link></li>
              </ul>
            </div>
            <div>
              <h4 className="font-semibold text-gray-800 mb-2">Legal</h4>
              <ul className="space-y-1 text-gray-600">
                <li><Link href="/privacy" className="hover:text-blue-600 transition">Privacy Policy</Link></li>
                <li><Link href="/terms" className="hover:text-blue-600 transition">Terms of Service</Link></li>
              </ul>
            </div>
          </div>
          {/* Social Icons */}
          <div className="flex gap-4 items-center">
            <Link href="#" className="bg-blue-100/70 p-2 rounded-full hover:bg-blue-200 transition">
              <FaInstagram className="text-blue-600 text-lg" />
            </Link>
            <Link href="#" className="bg-blue-100/70 p-2 rounded-full hover:bg-blue-200 transition">
              <FaTwitter className="text-blue-600 text-lg" />
            </Link>
            <Link href="#" className="bg-blue-100/70 p-2 rounded-full hover:bg-blue-200 transition">
              <FaFacebookF className="text-blue-600 text-lg" />
            </Link>
          </div>
        </div>
        {/* Copyright */}
        <div className="border-t border-blue-100 mt-8 pt-4 text-center text-gray-500 text-sm">
          &copy; {new Date().getFullYear()} ShopEase. All rights reserved.
        </div>
      </div>
    </footer>
  );
}
