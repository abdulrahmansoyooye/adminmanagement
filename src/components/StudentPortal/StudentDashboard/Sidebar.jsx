// src/student-dashboard/Sidebar.jsx
import { useState, memo } from "react";
import { Link, useLocation } from "react-router-dom";
import {
  ChevronLeft,
  ChevronRight,
  LayoutDashboard,
 
} from "lucide-react";

import logo from "../../assets/sdm2_logo.png";
import identityCardIcon from "../../assets/id-card.png";
import printIcon from "../../assets/print.png";
import { useSession } from "../../../context/session";

/* =========================
   NAV CONFIG (single source)
========================= */
const NAV_ITEMS = [
  {
    id: "dashboard",
    label: "Dashboard",
    icon: <LayoutDashboard size={20} />,
    to: "/",
  },
  {
    id: "id-card",
    label: "ID Card",
    icon: <img src={identityCardIcon} alt="" className="w-5" />,
    to: "/identity-cards",
  },
 
  {
    id: "print",
    label: "Print ID Card",
    icon: <img src={printIcon} alt="" className="w-5" />,
    to: "/print-id-card",
  },
];

export default function Sidebar() {
  const { logout, } = useSession();
  const { pathname } = useLocation();

  const [expanded, setExpanded] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);

  const handleLogout = () => {
    logout();
    window.location.reload();
  };

  return (
    <>
      {/* ===== Mobile Toggle Button ===== */}
      <button
        aria-label="Toggle sidebar"
        className="fixed top-4 left-4 z-50 rounded-lg bg-white p-2 shadow md:hidden"
        onClick={() => setMobileOpen((p) => !p)}
      >
        {mobileOpen ? <ChevronLeft /> : <ChevronRight />}
      </button>

      {/* ===== Overlay (Mobile) ===== */}
      {mobileOpen && (
        <div
          className="fixed inset-0 bg-black/40 z-40 md:hidden"
          onClick={() => setMobileOpen(false)}
        />
      )}

      {/* ===== Sidebar ===== */}
      <aside
        className={`
          fixed z-50 h-screen bg-white shadow-lg transition-all duration-300 border flex flex-col
          ${expanded ? "w-64" : "w-20"}
          ${mobileOpen ? "left-0" : "-left-full"}
          md:left-0
        `}
      >
        {/* Logo */}
        <div className="flex flex-col gap-3 px-4 py-6 border-b">
      
          {expanded && (
            <span className="font-semibold text-gray-800">
              Dashboard
            </span>
          )}
           <button
            aria-label="Expand sidebar"
            onClick={() => setExpanded((p) => !p)}
            className="hidden md:flex items-center justify-center w-full rounded-md bg-gray-100 p-2 hover:bg-gray-200"
          >
            {expanded ? <ChevronLeft /> : <ChevronRight />}
          </button>
        </div>

        {/* Nav */}
        <nav className="flex flex-col gap-1 px-2 py-4 justify-even ">
        
          {NAV_ITEMS.map((item) => {
            const active = pathname === item.to;

            return (
              <NavItem
                key={item.id}
                {...item}
                expanded={expanded}
                active={active}
                onClick={() => setMobileOpen(false)}
              />
            );
          })}
        </nav>

        {/* Footer */}
        <div className="mt-auto border-t px-3 py-4 space-y-3">
          <div className="flex items-center gap-3">
            

            {expanded && (
              <div className="flex-1">
              
                <button
                  onClick={handleLogout}
                  className="mt-4 w-full border py-2 rounded hover:bg-gray-100"
                >
                  Logout
                </button>
              </div>
            )}
          </div>

          {/* Expand Toggle (Desktop) */}
         
        </div>
      </aside>
    </>
  );
}

/* =========================
   Nav Item (Memoized)
========================= */
const NavItem = memo(function NavItem({
  icon,
  label,
  to,
  expanded,
  active,
  onClick,
}) {
  return (
    <Link
      to={to}
      onClick={onClick}
      className={`
        flex items-center gap-3 rounded-md px-3 py-3 text-sm font-medium transition
        ${active ? "bg-indigo-600 text-white" : "text-gray-600 hover:bg-indigo-50"}
      `}
      aria-current={active ? "page" : undefined}
    >
      {icon}
      {expanded && <span>{label}</span>}
    </Link>
  );
});
