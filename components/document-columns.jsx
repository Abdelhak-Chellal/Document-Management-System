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
import { MoreHorizontalIcon, PencilIcon, TrashIcon, DownloadIcon } from "lucide-react"
import { deleteDocument } from "@/lib/api"
import { useToast } from "@/components/ui/use-toast"
import { useQueryClient } from "@tanstack/react-query"

export function DocumentColumns({ onEdit }) {
  const { toast } = useToast()
  const queryClient = useQueryClient()

  const handleDelete = async (documentId) => {
    try {
      await deleteDocument(documentId)
      toast({
        title: "Document deleted",
        description: "The document has been deleted successfully",
      })
      queryClient.invalidateQueries({ queryKey: ["documents"] })
    } catch (error) {
      toast({
        title: "Error",
        description: "Failed to delete document",
        variant: "destructive",
      })
    }
  }

  const formatFileSize = (bytes) => {
    if (bytes < 1024) return bytes + " B"
    else if (bytes < 1048576) return (bytes / 1024).toFixed(2) + " KB"
    else return (bytes / 1048576).toFixed(2) + " MB"
  }

  return [
    {
      accessorKey: "title",
      header: "Title",
      cell: ({ row }) => <div className="font-medium">{row.getValue("title")}</div>,
    },
    {
      accessorKey: "type",
      header: "Type",
      cell: ({ row }) => {
        const type = row.getValue("type")
        return <Badge variant="outline">{type.toUpperCase()}</Badge>
      },
    },
    {
      accessorKey: "size",
      header: "Size",
      cell: ({ row }) => {
        return formatFileSize(row.getValue("size"))
      },
    },
    {
      accessorKey: "owner_name",
      header: "Owner",
    },
    {
      accessorKey: "status",
      header: "Status",
      cell: ({ row }) => {
        const status = row.getValue("status")
        return (
          <Badge variant={status === "active" ? "success" : status === "archived" ? "secondary" : "outline"}>
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
        const document = row.original

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
              <DropdownMenuItem onClick={() => onEdit(document)}>
                <PencilIcon className="mr-2 h-4 w-4" />
                Edit
              </DropdownMenuItem>
              <DropdownMenuItem>
                <DownloadIcon className="mr-2 h-4 w-4" />
                Download
              </DropdownMenuItem>
              <DropdownMenuItem
                onClick={() => handleDelete(document.id)}
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

