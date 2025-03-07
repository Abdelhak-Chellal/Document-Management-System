"use client"

import { useState, useEffect } from "react"
import { useNavigate } from "react-router-dom"
import { useDispatch, useSelector } from "react-redux"
import { login } from "../lib/features/auth/authSlice"
import { Button } from "../components/ui/button"
import { Input } from "../components/ui/input"
import { Label } from "../components/ui/label"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "../components/ui/card"
import { useToast } from "../components/ui/use-toast"
import { LockIcon, UserIcon } from "lucide-react"

function LoginPage() {
  const [username, setUsername] = useState("")
  const [password, setPassword] = useState("")
  const [isLoading, setIsLoading] = useState(false)
  const navigate = useNavigate()
  const dispatch = useDispatch()
  const { toast } = useToast()
  const { isAuthenticated } = useSelector((state) => state.auth)

  useEffect(() => {
    if (isAuthenticated) {
      navigate("/dashboard")
    }
  }, [isAuthenticated, navigate])

  const handleLogin = async (e) => {
    e.preventDefault()
    setIsLoading(true)

    try {
      // For demo purposes, we're using hardcoded credentials
      if (username === "admin" && password === "admin") {
        dispatch(
          login({
            user: {
              id: 1,
              username: "admin",
              name: "Admin User",
              email: "admin@example.com",
              role: "admin",
            },
            token: "demo-token",
          }),
        )
        navigate("/dashboard")
      } else {
        toast({
          title: "Authentication failed",
          description: "Invalid username or password",
          variant: "destructive",
        })
      }
    } catch (error) {
      toast({
        title: "Authentication failed",
        description: "An error occurred during login",
        variant: "destructive",
      })
    } finally {
      setIsLoading(false)
    }
  }

  return (
    <div className="flex min-h-screen items-center justify-center bg-gray-50 px-4 py-12 sm:px-6 lg:px-8">
      <Card className="w-full max-w-md">
        <CardHeader className="space-y-1">
          <CardTitle className="text-2xl font-bold text-center">Document Management System</CardTitle>
          <CardDescription className="text-center">Enter your credentials to sign in</CardDescription>
        </CardHeader>
        <form onSubmit={handleLogin}>
          <CardContent className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="username">Username</Label>
              <div className="relative">
                <div className="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none text-gray-400">
                  <UserIcon className="h-5 w-5" />
                </div>
                <Input
                  id="username"
                  type="text"
                  placeholder="Username"
                  value={username}
                  onChange={(e) => setUsername(e.target.value)}
                  className="pl-10"
                  required
                />
              </div>
            </div>
            <div className="space-y-2">
              <Label htmlFor="password">Password</Label>
              <div className="relative">
                <div className="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none text-gray-400">
                  <LockIcon className="h-5 w-5" />
                </div>
                <Input
                  id="password"
                  type="password"
                  placeholder="Password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  className="pl-10"
                  required
                />
              </div>
              <p className="text-sm text-muted-foreground mt-1">
                Use username: <span className="font-medium">admin</span> and password:{" "}
                <span className="font-medium">admin</span>
              </p>
            </div>
          </CardContent>
          <CardFooter>
            <Button type="submit" className="w-full" disabled={isLoading}>
              {isLoading ? "Signing in..." : "Sign in"}
            </Button>
          </CardFooter>
        </form>
      </Card>
    </div>
  )
}

export default LoginPage

