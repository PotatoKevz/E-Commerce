export interface User {
  id: string;
  email: string;
  role: "admin" | "seller" | "customer";
  name: string;
  status: "active" | "suspended";
  createdAt: string;
}

export const mockUsers: User[] = [
  {
    id: "1",
    email: "admin@soletrack.com",
    role: "admin",
    name: "Admin User",
    status: "active",
    createdAt: "2024-01-15"
  },
  {
    id: "2",
    email: "seller@soletrack.com",
    role: "seller",
    name: "Maria Santos",
    status: "active",
    createdAt: "2024-02-20"
  },
  {
    id: "3",
    email: "customer@soletrack.com",
    role: "customer",
    name: "Juan Dela Cruz",
    status: "active",
    createdAt: "2024-03-10"
  },
  {
    id: "4",
    email: "seller2@soletrack.com",
    role: "seller",
    name: "Pedro Reyes",
    status: "active",
    createdAt: "2024-03-15"
  },
  {
    id: "5",
    email: "customer2@soletrack.com",
    role: "customer",
    name: "Ana Garcia",
    status: "active",
    createdAt: "2024-03-20"
  },
  {
    id: "6",
    email: "suspended@soletrack.com",
    role: "customer",
    name: "Suspended User",
    status: "suspended",
    createdAt: "2024-02-05"
  }
];
