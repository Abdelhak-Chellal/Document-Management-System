"use client"

import { useState } from "react"
import { useQuery } from "@tanstack/react-query"
import { fetchDocuments } from "../lib/api"
import { Button } from "../components/ui/button"
import { Input } from "../components/ui/input"
import { DataTable } from "../components/data-table"
import { DocumentColumns } from "../components/document-columns"
import { PlusIcon, SearchIcon } from "lucide-react"
import { DocumentDialog } from "../components/document-dialog"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "../components/ui/select"

function DocumentsPage() {
  const [searchQuery, setSearchQuery] = useState("")
  const [typeFilter, setTypeFilter] = useState("all")
  const [isDialogOpen, setIsDialogOpen] = useState(false)
  const [selectedDocument, setSelectedDocument] = useState(null)

  const {
    data: documents = [],
    isLoading,
    refetch,
  } = useQuery({
    queryKey: ["documents"],
    queryFn: fetchDocuments,
  })

  const filteredDocuments = documents.filter((doc) => {
    const matchesSearch =
      doc.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      doc.description.toLowerCase().includes(searchQuery.toLowerCase())

    const matchesType = typeFilter === "all" || doc.type === typeFilter

    return matchesSearch && matchesType
  })

  const documentTypes = Array.from(new Set(documents.map((doc) => doc.type)))

  const handleCreateDocument = () => {
    setSelectedDocument(null)
    setIsDialogOpen(true)
  }

  const handleEditDocument = (document) => {
    setSelectedDocument(document)
    setIsDialogOpen(true)
  }

  const handleCloseDialog = () => {
    setIsDialogOpen(false)
    refetch()
  }

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold tracking-tight">Documents</h1>
          <p className="text-muted-foreground">Manage documents and files in the system</p>
        </div>
        <Button onClick={handleCreateDocument}>
          <PlusIcon className="mr-2 h-4 w-4" />
          Add Document
        </Button>
      </div>

      <div className="flex flex-col gap-4 sm:flex-row">
        <div className="relative flex-1">
          <SearchIcon className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
          <Input
            placeholder="Search documents..."
            className="pl-8"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
          />
        </div>
        <Select value={typeFilter} onValueChange={setTypeFilter}>
          <SelectTrigger className="w-full sm:w-[180px]">
            <SelectValue placeholder="Filter by type" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="all">All Types</SelectItem>
            {documentTypes.map((type) => (
              <SelectItem key={type} value={type}>
                {type}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
      </div>

      <DataTable
        columns={DocumentColumns({ onEdit: handleEditDocument })}
        data={filteredDocuments}
        isLoading={isLoading}
      />

      <DocumentDialog open={isDialogOpen} onOpenChange={handleCloseDialog} document={selectedDocument} />
    </div>
  )
}

export default DocumentsPage

