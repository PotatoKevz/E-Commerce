import { useEffect } from "react";
import { useNavigate, useLocation } from "react-router";
import { useAuth } from "../context/AuthContext";

export function AuthRedirect() {
  const { user, isAdmin, isSeller } = useAuth();
  const navigate = useNavigate();
  const location = useLocation();

  useEffect(() => {
    // Only redirect if user just logged in and is on root path
    if (user && location.pathname === "/") {
      if (isAdmin) {
        navigate("/admin");
      } else if (isSeller) {
        navigate("/seller");
      }
      // Customers stay on home page
    }
  }, [user, isAdmin, isSeller, navigate, location.pathname]);

  return null;
}
