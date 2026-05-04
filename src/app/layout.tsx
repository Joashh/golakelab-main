import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import "nprogress/nprogress.css";
import { Poppins } from "next/font/google";
import Providers from "./component/provider";
import ApolloWrapper from "./component/apolloprovider";
import { Header } from "./component/header";
import Script from "next/script";
import Footer from "./component/footer";
import TopLoader from "./component/toploader";
import { ThemeProvider } from "./themecontext";
import ThemeSetter from "./component/themesetter";
import Three from "./component/oldheader";
import MatomoTracker from "./component/matomotracker";



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
      className={`${geistSans.variable} ${geistMono.variable} h-full antialiased `}
    >
      <head>
    <Script id="matomo" strategy="afterInteractive">
      {`
        var _paq = window._paq = window._paq || [];
        _paq.push(['trackPageView']);
        _paq.push(['enableLinkTracking']);
        (function() {
          var u="//golakelab.dev.uplb.edu.ph/matomo/";
          _paq.push(['setTrackerUrl', u+'matomo.php']);
          _paq.push(['setSiteId', '1']);
          var d=document, g=d.createElement('script'), s=d.getElementsByTagName('script')[0];
          g.async=true; g.src=u+'matomo.js'; s.parentNode.insertBefore(g,s);
        })();
      `}
    </Script>
  </head>
      <body className="min-h-full flex flex-col">

        <ThemeProvider>
          <ThemeSetter>
            <Providers> 
              <Header/>
              <MatomoTracker/>
                
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