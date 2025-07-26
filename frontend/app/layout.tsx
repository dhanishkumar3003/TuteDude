import type React from "react"
import type { Metadata } from "next"
import { Inter } from "next/font/google"
import "./globals.css"
import { LanguageProvider } from "@/lib/language-context"
import { TranslationProvider } from "@/lib/translation-context"

const inter = Inter({ subsets: ["latin"] })

export const metadata: Metadata = {
  title: "VendorConnect - Street Food Vendor Supply Chain Platform",
  description:
    "Connect street food vendors with verified suppliers for better prices and reliable supply chain management",
    generator: 'v0.dev'
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <body className={inter.className}>
        <TranslationProvider>
          <LanguageProvider>{children}</LanguageProvider>
        </TranslationProvider>
      </body>
    </html>
  )
}
