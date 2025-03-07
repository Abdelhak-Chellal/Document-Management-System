"use client"

import { useEffect } from "react"
import { useRouter } from "next/navigation"
import { useSelector } from "react-redux"
import { DashboardNav } from "@/components/dashboard-nav"
import { DashboardHeader } from "@/components/dashboard-header"

export default function DashboardLayout({ children }) {
  const router = useRouter()
  const { isAuthenticated } = useSelector((state) => state.auth)

  useEffect(() => {
    if (!isAuthenticated) {
      router.push("/login")
    }
  }, [isAuthenticated, router])

  if (!isAuthenticated) {
    return null
  }

  return (
    <div className="flex min-h-screen flex-col">
      <DashboardHeader />
      <div className="flex flex-1 flex-col md:flex-row">
        <DashboardNav />
        <main className="flex-1 p-6 md:p-8">{children}</main>
      </div>
    </div>
  )
}

