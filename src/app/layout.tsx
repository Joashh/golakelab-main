import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import "nprogress/nprogress.css";
import { Poppins } from "next/font/google";
import Providers from "./component/provider";


import Header from "./component/header";
import Footer from "./component/footer";
import TopLoader from "./component/toploader";
import { ThemeProvider } from "./themecontext";
import ThemeSetter from "./component/themesetter";

const poppins = Poppins({
  subsets: ["latin"],
  weight: ["300", "400", "500", "600", "700"],
  variable: "--font-poppins",
  display: "swap",
});

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "GoLAKE Lab - Knowledge Sharing Platform",
  description: "The Governance Leadership, Advocacy for Knowledge Enhancement Laboratory (Go LAKE Lab)is transforming small lake management by creating a dedicated platform within UPLB. We empower stakeholders with the skills, tools, and data to support evidence-based governance and sustainable lake management.",
  
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="en"
      className={`${poppins.variable} h-full antialiased `}
    >
      <body className="min-h-full flex flex-col">
        <ThemeProvider>
          <ThemeSetter>
            <Providers>
              <Header />
              <TopLoader />
              <main className="flex-1">
                {children}
              </main>
              <Footer />
            </Providers>
          </ThemeSetter>
        </ThemeProvider>
      </body>
    </html>
  );
}