import { Routes, Route, Navigate } from "react-router-dom"
import { useSelector } from "react-redux"
import { Toaster } from "./components/ui/toaster"

// Pages
import LoginPage from "./pages/LoginPage"
import DashboardLayout from "./layouts/DashboardLayout"
import DashboardPage from "./pages/DashboardPage"
import UsersPage from "./pages/UsersPage"
import DocumentsPage from "./pages/DocumentsPage"
import SettingsPage from "./pages/SettingsPage"

// Protected Route Component
const ProtectedRoute = ({ children }) => {
  const { isAuthenticated } = useSelector((state) => state.auth)

  if (!isAuthenticated) {
    return <Navigate to="/login" replace />
  }

  return children
}

function App() {
  const { isAuthenticated } = useSelector((state) => state.auth)

  return (
    <>
      <Routes>
        <Route path="/" element={isAuthenticated ? <Navigate to="/dashboard" /> : <Navigate to="/login" />} />
        <Route path="/login" element={<LoginPage />} />

        <Route
          path="/dashboard"
          element={
            <ProtectedRoute>
              <DashboardLayout />
            </ProtectedRoute>
          }
        >
          <Route index element={<DashboardPage />} />
          <Route path="users" element={<UsersPage />} />
          <Route path="documents" element={<DocumentsPage />} />
          <Route path="settings" element={<SettingsPage />} />
        </Route>

        <Route path="*" element={<Navigate to="/" replace />} />
      </Routes>
      <Toaster />
    </>
  )
}

export default App

