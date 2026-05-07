import { Outlet, useLocation } from "react-router";
import { Header } from "./Header";
import { Footer } from "./Footer";
import { AuthRedirect } from "./AuthRedirect";

export function Layout() {
  const location = useLocation();
  // Hide header/footer on login page
  const isLoginPage = location.pathname === "/login";
  
  // In a real app, this would come from cart context/state
  const cartItemCount = 2;

  if (isLoginPage) {
    return <Outlet />;
  }

  return (
    <div className="flex flex-col min-h-screen">
      <AuthRedirect />
      <Header cartItemCount={cartItemCount} />
      <main className="flex-1">
        <Outlet />
      </main>
      <Footer />
    </div>
  );
}