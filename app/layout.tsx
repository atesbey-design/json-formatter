import "./globals.css"
import type { Metadata } from "next"
import { Inter } from "next/font/google"
import { Toaster } from "@/components/ui/toaster"
import { ThemeProvider } from "@/components/theme-provider"
import { Header } from "@/components/header"

const inter = Inter({ subsets: ["latin"] })

export const metadata: Metadata = {
  title: "JSON Formatter - Format, Validate and Share JSON",
  description: "A modern JSON formatter and validator with advanced features",
  keywords: "json formatter, json validator, json editor, json tools, json beautifier, json parser",
  authors: [{ name: "JSON Formatter" }],
  creator: "JSON Formatter",
  publisher: "JSON Formatter",
  robots: "index, follow",
  metadataBase: new URL("https://json-formatter-pearl.vercel.app"),
  alternates: {
    canonical: "/",
  },
  viewport: {
    width: "device-width",
    initialScale: 1,
    maximumScale: 1,
  },
  icons: {
    icon: "/favicon.ico",
    apple: "/apple-touch-icon.png",
  },
  manifest: "/site.webmanifest",
  themeColor: [
    { media: "(prefers-color-scheme: light)", color: "white" },
    { media: "(prefers-color-scheme: dark)", color: "#000" },
  ],
  openGraph: {
    type: "website",
    locale: "en_US",
    url: "https://json-formatter-pearl.vercel.app/",
    title: "JSON Formatter - Format, Validate and Share JSON",
    description: "A modern JSON formatter and validator with advanced features",
    siteName: "JSON Formatter",
    images: [{
      url: "json-formatter.png",
      width: 1200,
      height: 630,
      alt: "JSON Formatter"
    }]
  },
  twitter: {
    card: "summary_large_image",
    title: "JSON Formatter - Format, Validate and Share JSON",
    description: "A modern JSON formatter and validator with advanced features",
    creator: "@jsonformatter",
    images: ["json-formatter.png"]
  }
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body className={inter.className}>
        <ThemeProvider
          attribute="class"
          defaultTheme="system"
          enableSystem
          disableTransitionOnChange
        >
          <div className="mx-auto max-w-[1920px]">
            <div className="flex justify-center">
              <Header />
            </div>
            {children}
          </div>
          <Toaster />
        </ThemeProvider>
      </body>
    </html>
  )
}