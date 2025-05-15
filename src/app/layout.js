import { Inter } from "next/font/google";
import "./globals.css";
import Navbar from "@/components/NavBar";
import Footer from "@/components/Footer";
import { Toaster } from "react-hot-toast";
const inter = Inter({ subsets: ["latin"] });


export const metadata = {
  title: "NoteNest  – Organize Your Thoughts Privately",
  description: "Create, pin, and manage your notes privately. Built with Next.js for speed and simplicity.",
  keywords: ["next.js notes app", "private notes", "note-taking", "productivity", "pinned notes"],
  openGraph: {
    title: "NoteNest  – Private Note-Taking App",
    description: "Take notes privately and securely. Your data, your control.",
    siteName: "NoteNest ",


  },
  twitter: {
    card: "summary_large_image",
    title: "NoteNest – Take Private Notes",
    description: "A secure and simple way to manage personal notes.",
    // images: ["https://yourdomain.com/og-image.png"],
  },
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body className={inter.className}>



        <div className="flex flex-col min-h-screen ">
          <Toaster position="top-center" toastOptions={{
            style: { fontSize: "1rem" },
            loading: { duration: 3000, }
          }} />
          <Navbar />

          {/* <main className=" flex-grow lg:h-1"   > */}
          <main className=" flex-grow"   >
            {children}
          </main>
          <Footer />
        </div>

      </body>
    </html>
  );
}
