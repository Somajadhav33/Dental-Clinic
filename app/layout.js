import { Arimo } from "next/font/google";
import "./globals.css";
import { Toaster } from "sonner";
import { NavigationBar } from "@/components/NavBar";

const arimo = Arimo({
  weight: ["400", "500", "600", "700"],
  subsets: ["latin"],
});

export const metadata = {
  title: "Aabha Dental Clinic & Smile Centre",
  description:
    "Modern Dentistry with a Human Touch. Providing comprehensive dental care in Miraj and Bedag.",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body className={arimo.className}>
        <NavigationBar/>
        {children}
        <Toaster position="top-right" richColors />
      </body>
    </html>
  );
}
