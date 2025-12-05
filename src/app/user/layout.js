import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";

export default function RootLayout({ children }) {
  return (
        <div className="min-h-screen bg-gradient-to-br from-blue-50 to-blue-100 pt-3">
        <Navbar/>
        {children}
        <Footer/>
        </div>
  );
}
