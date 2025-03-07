import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "../components/ui/card"
import { useSelector } from "react-redux"
import { UsersIcon, FileTextIcon, FileIcon, UserIcon } from "lucide-react"
import { useQuery } from "@tanstack/react-query"
import { fetchUsers, fetchDocuments } from "../lib/api"

function DashboardPage() {
  const { user } = useSelector((state) => state.auth)

  const { data: users = [] } = useQuery({
    queryKey: ["users"],
    queryFn: fetchUsers,
  })

  const { data: documents = [] } = useQuery({
    queryKey: ["documents"],
    queryFn: fetchDocuments,
  })

  const stats = [
    {
      title: "Total Users",
      value: users.length,
      icon: <UsersIcon className="h-6 w-6 text-blue-500" />,
      description: "Active users in the system",
    },
    {
      title: "Total Documents",
      value: documents.length,
      icon: <FileTextIcon className="h-6 w-6 text-green-500" />,
      description: "Documents stored in the system",
    },
    {
      title: "Recent Documents",
      value: documents.filter((doc) => {
        const createdDate = new Date(doc.created_at)
        const now = new Date()
        const diffTime = Math.abs(now.getTime() - createdDate.getTime())
        const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24))
        return diffDays <= 7
      }).length,
      icon: <FileIcon className="h-6 w-6 text-amber-500" />,
      description: "Documents added in the last 7 days",
    },
    {
      title: "Your Documents",
      value: documents.filter((doc) => doc.owner_id === user?.id).length,
      icon: <UserIcon className="h-6 w-6 text-purple-500" />,
      description: "Documents owned by you",
    },
  ]

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold tracking-tight">Dashboard</h1>
        <p className="text-muted-foreground">
          Welcome back, {user?.name}! Here's an overview of your document management system.
        </p>
      </div>

      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
        {stats.map((stat, index) => (
          <Card key={index}>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">{stat.title}</CardTitle>
              {stat.icon}
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{stat.value}</div>
              <p className="text-xs text-muted-foreground">{stat.description}</p>
            </CardContent>
          </Card>
        ))}
      </div>

      <div className="grid gap-6 md:grid-cols-2">
        <Card>
          <CardHeader>
            <CardTitle>Recent Users</CardTitle>
            <CardDescription>Recently added users to the system</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {users.slice(0, 5).map((user) => (
                <div key={user.id} className="flex items-center gap-4">
                  <div className="flex h-10 w-10 items-center justify-center rounded-full bg-primary/10">
                    <UserIcon className="h-5 w-5 text-primary" />
                  </div>
                  <div className="flex-1">
                    <p className="text-sm font-medium">{user.name}</p>
                    <p className="text-xs text-muted-foreground">{user.email}</p>
                  </div>
                  <div className="text-xs text-muted-foreground">{new Date(user.created_at).toLocaleDateString()}</div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Recent Documents</CardTitle>
            <CardDescription>Recently added documents to the system</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {documents.slice(0, 5).map((doc) => (
                <div key={doc.id} className="flex items-center gap-4">
                  <div className="flex h-10 w-10 items-center justify-center rounded-full bg-primary/10">
                    <FileTextIcon className="h-5 w-5 text-primary" />
                  </div>
                  <div className="flex-1">
                    <p className="text-sm font-medium">{doc.title}</p>
                    <p className="text-xs text-muted-foreground">
                      {doc.type} • {(doc.size / 1024).toFixed(2)} KB
                    </p>
                  </div>
                  <div className="text-xs text-muted-foreground">{new Date(doc.created_at).toLocaleDateString()}</div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}

export default DashboardPage

