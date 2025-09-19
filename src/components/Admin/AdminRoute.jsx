import React, { useState, useEffect } from "react";
import { Navigate } from "react-router-dom";
import { toast } from "react-hot-toast";
import AdminPanel from "./AdminPanel";

const AdminRoute = ({ modeToggle }) => {
  const [isAdmin, setIsAdmin] = useState(false);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const checkAdminAccess = () => {
      try {
        // Get current user from localStorage
        const currentUser = localStorage.getItem("username");

        // Get admin ID from environment variable
        const adminId = process.env.REACT_APP_admin_id;

        if (!adminId) {
          console.error("REACT_APP_admin_id environment variable not set");
          toast.error("Admin configuration error");
          setIsAdmin(false);
          setIsLoading(false);
          return;
        }

        // Check if current user matches the admin ID
        const hasAdminAccess =
          currentUser && currentUser.toLowerCase() === adminId.toLowerCase();

        if (!hasAdminAccess) {
          toast.error(
            "Access denied. You must be logged in as an admin to access this page."
          );
        }

        setIsAdmin(hasAdminAccess);
      } catch (error) {
        console.error("Error checking admin access:", error);
        setIsAdmin(false);
        toast.error("Error verifying admin access");
      } finally {
        setIsLoading(false);
      }
    };

    checkAdminAccess();
  }, []);

  if (isLoading) {
    return (
      <div
        style={{
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          minHeight: "50vh",
          flexDirection: "column",
          gap: "20px",
        }}
      >
        <div
          style={{
            width: "40px",
            height: "40px",
            border: "4px solid #f3f3f3",
            borderTop: "4px solid #667eea",
            borderRadius: "50%",
            animation: "spin 1s linear infinite",
          }}
        ></div>
        <p>Verifying admin access...</p>
      </div>
    );
  }

  // Redirect to home if not admin
  if (!isAdmin) {
    return <Navigate to="/" replace />;
  }

  // Render admin panel if user is admin
  return <AdminPanel modeToggle={modeToggle} />;
};

export default AdminRoute;
