import React, { useState, useEffect, useMemo } from "react";
import { db } from "../../firebase/auth";
import {
  collection,
  getDocs,
  doc,
  updateDoc,
  deleteDoc,
  query,
  where,
  orderBy,
  limit,
  startAfter,
} from "firebase/firestore";
import { toast } from "react-hot-toast";
import classes from "./AdminPanel.module.css";
import { CardSkeleton } from "../common/Skeleton/Skeleton";

const AdminPanel = ({ modeToggle }) => {
  const [pendingButtons, setPendingButtons] = useState([]);
  const [approvedButtons, setApprovedButtons] = useState([]);
  const [rejectedButtons, setRejectedButtons] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [activeTab, setActiveTab] = useState("pending");
  const [currentPage, setCurrentPage] = useState(1);
  const [isAdmin, setIsAdmin] = useState(false);
  const [adminLoading, setAdminLoading] = useState(true);

  const itemsPerPage = 10;

  // Check if user is admin using environment variable
  useEffect(() => {
    const checkAdminStatus = async () => {
      try {
        // Get current user from localStorage or Firebase Auth
        const currentUser = localStorage.getItem("username");

        // Get admin ID from environment variable
        const adminId = process.env.REACT_APP_ADMIN_ID;

        // Debug logging
        console.log("Debug Admin Check:");
        console.log("Current user:", currentUser);
        console.log("Admin ID from env:", adminId);
        console.log(
          "All env vars:",
          Object.keys(process.env).filter((key) => key.startsWith("REACT_APP"))
        );

        if (!adminId) {
          console.error("REACT_APP_ADMIN_ID environment variable not set");
          setIsAdmin(false);
          toast.error(
            "Admin configuration error - Environment variable not found"
          );
          return;
        }

        // Check if current user matches the admin ID
        const isUserAdmin =
          currentUser && currentUser.toLowerCase() === adminId.toLowerCase();
        console.log("Is user admin?", isUserAdmin);

        setIsAdmin(isUserAdmin);

        if (!isUserAdmin) {
          toast.error(
            `Access denied. Current user: "${currentUser}", Required: "${adminId}"`
          );
        }
      } catch (error) {
        console.error("Error checking admin status:", error);
        setIsAdmin(false);
      } finally {
        setAdminLoading(false);
      }
    };

    checkAdminStatus();
  }, []);

  // Fetch buttons based on status
  const fetchButtonsByStatus = async (status, page = 1) => {
    try {
      setIsLoading(true);

      const buttonsRef = collection(db, "buttons");
      let q;

      if (status === "pending") {
        q = query(
          buttonsRef,
          where("status", "==", "pending"),
          orderBy("createdAt", "desc"),
          limit(itemsPerPage)
        );
      } else if (status === "approved") {
        q = query(
          buttonsRef,
          where("status", "==", "approved"),
          orderBy("createdAt", "desc"),
          limit(itemsPerPage)
        );
      } else {
        q = query(
          buttonsRef,
          where("status", "==", "rejected"),
          orderBy("createdAt", "desc"),
          limit(itemsPerPage)
        );
      }

      const snapshot = await getDocs(q);
      const buttons = snapshot.docs.map((doc) => ({
        id: doc.id,
        ...doc.data(),
      }));

      if (status === "pending") {
        setPendingButtons(buttons);
      } else if (status === "approved") {
        setApprovedButtons(buttons);
      } else {
        setRejectedButtons(buttons);
      }
    } catch (error) {
      console.error("Error fetching buttons:", error);
      toast.error(`Failed to fetch ${status} buttons`);
    } finally {
      setIsLoading(false);
    }
  };

  // Initial data fetch
  useEffect(() => {
    if (isAdmin) {
      fetchButtonsByStatus("pending");
      fetchButtonsByStatus("approved");
      fetchButtonsByStatus("rejected");
    }
  }, [isAdmin]);

  // Handle button approval
  const handleApprove = async (buttonId) => {
    try {
      const buttonRef = doc(db, "buttons", buttonId);
      await updateDoc(buttonRef, {
        status: "approved",
        approvedAt: new Date(),
        approvedBy: localStorage.getItem("username"),
      });

      // Remove from pending and refresh
      setPendingButtons((prev) => prev.filter((btn) => btn.id !== buttonId));
      toast.success("Button approved successfully!");

      // Refresh approved list
      fetchButtonsByStatus("approved");
    } catch (error) {
      console.error("Error approving button:", error);
      toast.error("Failed to approve button");
    }
  };

  // Handle button rejection
  const handleReject = async (buttonId, reason = "") => {
    try {
      const buttonRef = doc(db, "buttons", buttonId);
      await updateDoc(buttonRef, {
        status: "rejected",
        rejectedAt: new Date(),
        rejectedBy: localStorage.getItem("username"),
        rejectionReason: reason,
      });

      // Remove from pending and refresh
      setPendingButtons((prev) => prev.filter((btn) => btn.id !== buttonId));
      toast.success("Button rejected");

      // Refresh rejected list
      fetchButtonsByStatus("rejected");
    } catch (error) {
      console.error("Error rejecting button:", error);
      toast.error("Failed to reject button");
    }
  };

  // Handle button deletion
  const handleDelete = async (buttonId) => {
    const confirmDelete = window.confirm(
      "Are you sure you want to permanently delete this button? This action cannot be undone."
    );

    if (!confirmDelete) return;

    try {
      await deleteDoc(doc(db, "buttons", buttonId));

      // Remove from current list
      setPendingButtons((prev) => prev.filter((btn) => btn.id !== buttonId));
      setApprovedButtons((prev) => prev.filter((btn) => btn.id !== buttonId));
      setRejectedButtons((prev) => prev.filter((btn) => btn.id !== buttonId));

      toast.success("Button deleted permanently");
    } catch (error) {
      console.error("Error deleting button:", error);
      toast.error("Failed to delete button");
    }
  };

  // Get current buttons based on active tab
  const getCurrentButtons = () => {
    switch (activeTab) {
      case "pending":
        return pendingButtons;
      case "approved":
        return approvedButtons;
      case "rejected":
        return rejectedButtons;
      default:
        return [];
    }
  };

  // Button preview component
  const ButtonPreview = ({ button }) => (
    <div
      className={`${classes.button_card} ${
        modeToggle ? classes.dark : classes.light
      }`}
    >
      <div className={classes.preview_section}>
        <iframe
          className={classes.preview_iframe}
          title={`Button ${button.id}`}
          srcDoc={`
            <html>
              <head>
                <meta charset="UTF-8">
                <meta name="viewport" content="width=device-width, initial-scale=1.0">
                <style>${button.css || ""}</style>
              </head>
              <body>
                ${button.html || ""}
                <script>${button.js || ""}</script>
              </body>
            </html>
          `}
          sandbox="allow-scripts allow-same-origin"
        />
      </div>

      <div className={classes.button_info}>
        <div className={classes.button_meta}>
          <h3>{button.name || "Unnamed Button"}</h3>
          <p>
            by <strong>{button.githubUsername}</strong>
          </p>
          <p>
            Created:{" "}
            {button.createdAt?.toDate?.()?.toLocaleDateString() || "Unknown"}
          </p>
          {button.description && (
            <p className={classes.description}>{button.description}</p>
          )}
        </div>

        <div className={classes.button_actions}>
          {activeTab === "pending" && (
            <>
              <button
                onClick={() => handleApprove(button.id)}
                className={`${classes.action_btn} ${classes.approve_btn}`}
              >
                ✓ Approve
              </button>
              <button
                onClick={() => {
                  const reason = prompt("Rejection reason (optional):");
                  handleReject(button.id, reason || "");
                }}
                className={`${classes.action_btn} ${classes.reject_btn}`}
              >
                ✗ Reject
              </button>
            </>
          )}

          {activeTab === "rejected" && (
            <button
              onClick={() => handleApprove(button.id)}
              className={`${classes.action_btn} ${classes.approve_btn}`}
            >
              ✓ Approve
            </button>
          )}

          <button
            onClick={() => handleDelete(button.id)}
            className={`${classes.action_btn} ${classes.delete_btn}`}
          >
            🗑 Delete
          </button>
        </div>
      </div>
    </div>
  );

  if (adminLoading) {
    return (
      <div className={classes.loading_container}>
        <div className={classes.spinner}></div>
        <p>Verifying admin access...</p>
      </div>
    );
  }

  if (!isAdmin) {
    return (
      <div className={classes.access_denied}>
        <h2>Access Denied</h2>
        <p>You don't have permission to access the admin panel.</p>
      </div>
    );
  }

  const currentButtons = getCurrentButtons();

  return (
    <div
      className={`${classes.admin_panel} ${
        modeToggle ? classes.dark_theme : classes.light_theme
      }`}
    >
      <div className={classes.header}>
        <h1>Admin Panel</h1>
        <p>Manage and review submitted buttons</p>
      </div>

      <div className={classes.tabs}>
        <button
          onClick={() => setActiveTab("pending")}
          className={`${classes.tab} ${
            activeTab === "pending" ? classes.active : ""
          }`}
        >
          Pending ({pendingButtons.length})
        </button>
        <button
          onClick={() => setActiveTab("approved")}
          className={`${classes.tab} ${
            activeTab === "approved" ? classes.active : ""
          }`}
        >
          Approved ({approvedButtons.length})
        </button>
        <button
          onClick={() => setActiveTab("rejected")}
          className={`${classes.tab} ${
            activeTab === "rejected" ? classes.active : ""
          }`}
        >
          Rejected ({rejectedButtons.length})
        </button>
      </div>

      <div className={classes.content}>
        {isLoading ? (
          <div className={classes.skeleton_container}>
            {Array.from({ length: 3 }, (_, i) => (
              <CardSkeleton key={i} />
            ))}
          </div>
        ) : currentButtons.length === 0 ? (
          <div className={classes.empty_state}>
            <h3>No {activeTab} buttons found</h3>
            <p>All caught up! 🎉</p>
          </div>
        ) : (
          <div className={classes.buttons_grid}>
            {currentButtons.map((button) => (
              <ButtonPreview key={button.id} button={button} />
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default AdminPanel;
