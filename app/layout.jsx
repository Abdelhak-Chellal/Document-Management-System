import { Inter } from "next/font/google"
import "./globals.css"
import { Providers } from "@/lib/providers"
import { Toaster } from "@/components/ui/toaster"

const inter = Inter({ subsets: ["latin"] })

export const metadata = {
  title: "Document Management System",
  description: "A responsive document management system",
    generator: 'v0.dev'
}

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body className={inter.className}>
        <Providers>{children}</Providers>
        <Toaster />
      </body>
    </html>
  )
}



import './globals.css'