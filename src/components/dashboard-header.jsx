"use client"

import { useState, useEffect } from "react"
import { useDispatch, useSelector } from "react-redux"
import { logout } from "../lib/features/auth/authSlice"
import { useNavigate } from "react-router-dom"
import { Button } from "./ui/button"
import { MoonIcon, SunIcon, MenuIcon } from "lucide-react"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "./ui/dropdown-menu"
import { Avatar, AvatarFallback } from "./ui/avatar"

export function DashboardHeader() {
  const { user } = useSelector((state) => state.auth)
  const dispatch = useDispatch()
  const navigate = useNavigate()
  const [theme, setTheme] = useState("light")
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false)

  useEffect(() => {
    // Check if user prefers dark mode
    if (window.matchMedia && window.matchMedia("(prefers-color-scheme: dark)").matches) {
      setTheme("dark")
      document.documentElement.classList.add("dark")
    }
  }, [])

  const toggleTheme = () => {
    if (theme === "light") {
      setTheme("dark")
      document.documentElement.classList.add("dark")
    } else {
      setTheme("light")
      document.documentElement.classList.remove("dark")
    }
  }

  const handleLogout = () => {
    dispatch(logout())
    navigate("/login")
  }

  const toggleMobileMenu = () => {
    setIsMobileMenuOpen(!isMobileMenuOpen)
  }

  const getInitials = (name) => {
    return name
      .split(" ")
      .map((n) => n[0])
      .join("")
      .toUpperCase()
  }

  return (
    <header className="sticky top-0 z-10 border-b bg-background">
      <div className="flex h-16 items-center justify-between px-4 sm:px-6">
        <div className="flex items-center">
          <Button variant="ghost" size="icon" className="md:hidden" onClick={toggleMobileMenu}>
            <MenuIcon className="h-5 w-5" />
            <span className="sr-only">Toggle menu</span>
          </Button>
          <h1 className="text-xl font-bold">Document Management</h1>
        </div>

        <div className="flex items-center gap-4">
          <Button variant="ghost" size="icon" onClick={toggleTheme} className="rounded-full">
            {theme === "light" ? <MoonIcon className="h-5 w-5" /> : <SunIcon className="h-5 w-5" />}
            <span className="sr-only">Toggle theme</span>
          </Button>

          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant="ghost" className="relative h-8 w-8 rounded-full">
                <Avatar className="h-8 w-8">
                  <AvatarFallback>{user?.name ? getInitials(user.name) : "U"}</AvatarFallback>
                </Avatar>
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end">
              <DropdownMenuLabel>My Account</DropdownMenuLabel>
              <DropdownMenuSeparator />
              <DropdownMenuItem>
                <span>{user?.name}</span>
              </DropdownMenuItem>
              <DropdownMenuItem>
                <span>{user?.email}</span>
              </DropdownMenuItem>
              <DropdownMenuItem>
                <span>Role: {user?.role}</span>
              </DropdownMenuItem>
              <DropdownMenuSeparator />
              <DropdownMenuItem onClick={handleLogout}>Log out</DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        </div>
      </div>
    </header>
  )
}

