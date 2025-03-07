// Mock API functions to simulate backend interactions

// Mock data
let users = [
  {
    id: 1,
    name: "Admin User",
    username: "admin",
    email: "admin@example.com",
    role: "admin",
    status: "active",
    created_at: "2023-01-01T00:00:00.000Z",
  },
  {
    id: 2,
    name: "John Doe",
    username: "johndoe",
    email: "john@example.com",
    role: "editor",
    status: "active",
    created_at: "2023-01-15T00:00:00.000Z",
  },
  {
    id: 3,
    name: "Jane Smith",
    username: "janesmith",
    email: "jane@example.com",
    role: "viewer",
    status: "active",
    created_at: "2023-02-01T00:00:00.000Z",
  },
  {
    id: 4,
    name: "Bob Johnson",
    username: "bobjohnson",
    email: "bob@example.com",
    role: "editor",
    status: "inactive",
    created_at: "2023-02-15T00:00:00.000Z",
  },
  {
    id: 5,
    name: "Alice Williams",
    username: "alicew",
    email: "alice@example.com",
    role: "viewer",
    status: "active",
    created_at: "2023-03-01T00:00:00.000Z",
  },
]

let documents = [
  {
    id: 1,
    title: "Annual Report 2023",
    description: "Annual financial report for the year 2023",
    type: "pdf",
    size: 2500000,
    owner_id: 1,
    owner_name: "Admin User",
    status: "active",
    created_at: "2023-12-15T00:00:00.000Z",
  },
  {
    id: 2,
    title: "Project Proposal",
    description: "Proposal for the new client project",
    type: "docx",
    size: 1200000,
    owner_id: 2,
    owner_name: "John Doe",
    status: "active",
    created_at: "2024-01-10T00:00:00.000Z",
  },
  {
    id: 3,
    title: "Marketing Strategy",
    description: "Q1 2024 marketing strategy and plan",
    type: "pptx",
    size: 3500000,
    owner_id: 3,
    owner_name: "Jane Smith",
    status: "active",
    created_at: "2024-01-20T00:00:00.000Z",
  },
  {
    id: 4,
    title: "Budget Spreadsheet",
    description: "Department budget allocation for 2024",
    type: "xlsx",
    size: 950000,
    owner_id: 1,
    owner_name: "Admin User",
    status: "active",
    created_at: "2024-02-05T00:00:00.000Z",
  },
  {
    id: 5,
    title: "Meeting Notes",
    description: "Notes from the quarterly review meeting",
    type: "txt",
    size: 50000,
    owner_id: 4,
    owner_name: "Bob Johnson",
    status: "archived",
    created_at: "2024-02-15T00:00:00.000Z",
  },
  {
    id: 6,
    title: "Product Mockups",
    description: "Design mockups for the new product line",
    type: "png",
    size: 4500000,
    owner_id: 5,
    owner_name: "Alice Williams",
    status: "draft",
    created_at: "2024-03-01T00:00:00.000Z",
  },
]

// API functions
export async function fetchUsers() {
  // Simulate API delay
  await new Promise((resolve) => setTimeout(resolve, 500))
  return [...users]
}

export async function fetchUser(id) {
  await new Promise((resolve) => setTimeout(resolve, 300))
  return users.find((user) => user.id === id)
}

export async function createUser(userData) {
  await new Promise((resolve) => setTimeout(resolve, 800))
  const newUser = {
    id: users.length + 1,
    ...userData,
    created_at: new Date().toISOString(),
  }
  users.push(newUser)
  return newUser
}

export async function updateUser(id, userData) {
  await new Promise((resolve) => setTimeout(resolve, 800))
  const index = users.findIndex((user) => user.id === id)
  if (index !== -1) {
    users[index] = { ...users[index], ...userData }
    return users[index]
  }
  throw new Error("User not found")
}

export async function deleteUser(id) {
  await new Promise((resolve) => setTimeout(resolve, 600))
  const index = users.findIndex((user) => user.id === id)
  if (index !== -1) {
    users = users.filter((user) => user.id !== id)
    return { success: true }
  }
  throw new Error("User not found")
}

export async function fetchDocuments() {
  await new Promise((resolve) => setTimeout(resolve, 500))
  return [...documents]
}

export async function fetchDocument(id) {
  await new Promise((resolve) => setTimeout(resolve, 300))
  return documents.find((doc) => doc.id === id)
}

export async function createDocument(documentData) {
  await new Promise((resolve) => setTimeout(resolve, 800))
  const owner = users.find((user) => user.id === documentData.owner_id)
  const newDocument = {
    id: documents.length + 1,
    ...documentData,
    owner_name: owner?.name || "Unknown",
    created_at: new Date().toISOString(),
  }
  documents.push(newDocument)
  return newDocument
}

export async function updateDocument(id, documentData) {
  await new Promise((resolve) => setTimeout(resolve, 800))
  const index = documents.findIndex((doc) => doc.id === id)
  if (index !== -1) {
    if (documentData.owner_id && documentData.owner_id !== documents[index].owner_id) {
      const owner = users.find((user) => user.id === documentData.owner_id)
      documentData.owner_name = owner?.name || "Unknown"
    }
    documents[index] = { ...documents[index], ...documentData }
    return documents[index]
  }
  throw new Error("Document not found")
}

export async function deleteDocument(id) {
  await new Promise((resolve) => setTimeout(resolve, 600))
  const index = documents.findIndex((doc) => doc.id === id)
  if (index !== -1) {
    documents = documents.filter((doc) => doc.id !== id)
    return { success: true }
  }
  throw new Error("Document not found")
}

