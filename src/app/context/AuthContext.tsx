import { createContext, useContext, useState, ReactNode } from "react";

interface User {
  email: string;
  role: "admin" | "seller" | "customer";
}

interface AuthContextType {
  user: User | null;
  login: (email: string, password: string) => boolean;
  logout: () => void;
  isAdmin: boolean;
  isSeller: boolean;
  isCustomer: boolean;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

// Demo credentials
const DEMO_ADMIN = { email: "admin@soletrack.com", password: "admin123", role: "admin" as const };
const DEMO_SELLER = { email: "seller@soletrack.com", password: "seller123", role: "seller" as const };
const DEMO_USER = { email: "customer@soletrack.com", password: "customer123", role: "customer" as const };

export function AuthProvider({ children }: { children: ReactNode }) {
  const [user, setUser] = useState<User | null>(null);

  const login = (email: string, password: string): boolean => {
    if (email === DEMO_ADMIN.email && password === DEMO_ADMIN.password) {
      setUser({ email: DEMO_ADMIN.email, role: DEMO_ADMIN.role });
      return true;
    }
    if (email === DEMO_SELLER.email && password === DEMO_SELLER.password) {
      setUser({ email: DEMO_SELLER.email, role: DEMO_SELLER.role });
      return true;
    }
    if (email === DEMO_USER.email && password === DEMO_USER.password) {
      setUser({ email: DEMO_USER.email, role: DEMO_USER.role });
      return true;
    }
    return false;
  };

  const logout = () => {
    setUser(null);
  };

  const isAdmin = user?.role === "admin";
  const isSeller = user?.role === "seller";
  const isCustomer = user?.role === "customer";

  return (
    <AuthContext.Provider value={{ user, login, logout, isAdmin, isSeller, isCustomer }}>
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error("useAuth must be used within AuthProvider");
  }
  return context;
}