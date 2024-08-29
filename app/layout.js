import { Inter } from "next/font/google";
import "./globals.css";
import Header from "../components/Header";
import { Footer } from "@/components/Footer";
import { CartProvider } from "@/components/context/CartContext";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { AuthProvider } from "@/components/context/AuthContext";

const inter = Inter({ subsets: ["latin"] });

export const metadata = {
  title: "Create Next App",
  description: "Generated by create next app",
};

export default function RootLayout({ children }) {
  return (
    <html lang="es">
      <body className={`${inter.className} relative`}>
        <AuthProvider>
          <ToastContainer />
          <CartProvider>
            <Header />
            {children}
            <Footer />
          </CartProvider>
        </AuthProvider>
      </body>
    </html>
  );
}
