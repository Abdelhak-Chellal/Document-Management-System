"use client"

import { Button } from "@/components/ui/button"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { Badge } from "@/components/ui/badge"
import { MoreHorizontalIcon, PencilIcon, TrashIcon } from "lucide-react"
import { deleteUser } from "@/lib/api"
import { useToast } from "@/components/ui/use-toast"
import { useQueryClient } from "@tanstack/react-query"

export function UserColumns({ onEdit }) {
  const { toast } = useToast()
  const queryClient = useQueryClient()

  const handleDelete = async (userId) => {
    try {
      await deleteUser(userId)
      toast({
        title: "User deleted",
        description: "The user has been deleted successfully",
      })
      queryClient.invalidateQueries({ queryKey: ["users"] })
    } catch (error) {
      toast({
        title: "Error",
        description: "Failed to delete user",
        variant: "destructive",
      })
    }
  }

  return [
    {
      accessorKey: "name",
      header: "Name",
      cell: ({ row }) => <div className="font-medium">{row.getValue("name")}</div>,
    },
    {
      accessorKey: "email",
      header: "Email",
    },
    {
      accessorKey: "username",
      header: "Username",
    },
    {
      accessorKey: "role",
      header: "Role",
      cell: ({ row }) => {
        const role = row.getValue("role")
        return (
          <Badge variant={role === "admin" ? "default" : role === "editor" ? "secondary" : "outline"}>{role}</Badge>
        )
      },
    },
    {
      accessorKey: "status",
      header: "Status",
      cell: ({ row }) => {
        const status = row.getValue("status")
        return (
          <Badge variant={status === "active" ? "success" : status === "inactive" ? "destructive" : "outline"}>
            {status}
          </Badge>
        )
      },
    },
    {
      accessorKey: "created_at",
      header: "Created At",
      cell: ({ row }) => {
        return new Date(row.getValue("created_at")).toLocaleDateString()
      },
    },
    {
      id: "actions",
      cell: ({ row }) => {
        const user = row.original

        return (
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant="ghost" className="h-8 w-8 p-0">
                <span className="sr-only">Open menu</span>
                <MoreHorizontalIcon className="h-4 w-4" />
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end">
              <DropdownMenuLabel>Actions</DropdownMenuLabel>
              <DropdownMenuSeparator />
              <DropdownMenuItem onClick={() => onEdit(user)}>
                <PencilIcon className="mr-2 h-4 w-4" />
                Edit
              </DropdownMenuItem>
              <DropdownMenuItem
                onClick={() => handleDelete(user.id)}
                className="text-destructive focus:text-destructive"
              >
                <TrashIcon className="mr-2 h-4 w-4" />
                Delete
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        )
      },
    },
  ]
}

