import { Outlet } from "react-router-dom"
import { DashboardHeader } from "../components/dashboard-header"
import { DashboardNav } from "../components/dashboard-nav"

function DashboardLayout() {
  return (
    <div className="flex min-h-screen flex-col">
      <DashboardHeader />
      <div className="flex flex-1 flex-col md:flex-row">
        <DashboardNav />
        <main className="flex-1 p-6 md:p-8">
          <Outlet />
        </main>
      </div>
    </div>
  )
}

export default DashboardLayout

