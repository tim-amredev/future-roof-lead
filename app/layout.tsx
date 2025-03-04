import type React from "react"
import type { Metadata } from "next"
import { Space_Grotesk } from "next/font/google"
import "./globals.css"
import Header from "@/components/header"
import Footer from "@/components/footer"

const spaceGrotesk = Space_Grotesk({
  subsets: ["latin"],
  variable: "--font-space-grotesk",
})

export const metadata: Metadata = {
  title: "Instant Roofing Prices | Advanced Roofing Solutions",
  description:
    "Experience the future of roofing with instant, AI-powered quotes for roof installation, repair, and replacement. Professional roofing services with cutting-edge technology.",
  keywords:
    "future roofing, smart roof, advanced roofing technology, instant roof quote, AI roofing estimate, modern roof solutions",
    generator: 'v0.dev'
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="en">
      <body className={`${spaceGrotesk.variable} font-sans bg-background text-foreground grid-background min-h-screen`}>
        <div className="relative">
          {/* Ambient background gradient */}
          <div className="fixed inset-0 bg-gradient-to-br from-background via-background to-primary/5 -z-10" />

          <Header />
          <main>{children}</main>
          <Footer />
        </div>
      </body>
    </html>
  )
}



import './globals.css'