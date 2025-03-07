import { Link, useLocation } from "react-router-dom"
import { cn } from "../lib/utils"
import { LayoutDashboardIcon, UsersIcon, FileTextIcon, SettingsIcon } from "lucide-react"

const navItems = [
  {
    title: "Dashboard",
    href: "/dashboard",
    icon: LayoutDashboardIcon,
  },
  {
    title: "Users",
    href: "/dashboard/users",
    icon: UsersIcon,
  },
  {
    title: "Documents",
    href: "/dashboard/documents",
    icon: FileTextIcon,
  },
  {
    title: "Settings",
    href: "/dashboard/settings",
    icon: SettingsIcon,
  },
]

export function DashboardNav() {
  const location = useLocation()

  return (
    <nav className="grid items-start gap-2 md:w-52 lg:w-64 md:sticky md:top-16 md:self-start md:py-6 md:px-4 md:border-r">
      {navItems.map((item) => (
        <Link
          key={item.href}
          to={item.href}
          className={cn(
            "flex items-center gap-3 rounded-lg px-3 py-2 text-sm font-medium transition-all hover:text-primary",
            location.pathname === item.href ? "bg-primary/10 text-primary" : "text-muted-foreground",
          )}
        >
          <item.icon className="h-4 w-4" />
          <span>{item.title}</span>
        </Link>
      ))}
    </nav>
  )
}

