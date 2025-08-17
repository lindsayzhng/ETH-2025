import React, { useEffect, useState } from "react";
import { Menu, ChevronLeft, ChevronRight } from "lucide-react";
import { NavLink } from "react-router-dom"; // Import NavLink for dynamic active state
import Button from "./button"; // Assuming you have a Button component
import Logo from "../assets/logo.png"; // Adjust path to your logo
export type SidebarItem = {
  label: string | React.ReactNode;
  href?: string;
  onClick?: () => void;
  icon?: React.ReactNode;
  transparent?: boolean;
  // Removed active prop; we'll handle it dynamically with NavLink
};

function useLocalStorage<T>(key: string, initial: T) {
  const [v, setV] = useState<T>(() => {
    try {
      const s = localStorage.getItem(key);
      return s ? (JSON.parse(s) as T) : initial;
    } catch {
      return initial;
    }
  });
  useEffect(() => {
    try {
      localStorage.setItem(key, JSON.stringify(v));
    } catch {}
  }, [key, v]);
  return [v, setV] as const;
}

export function Sidebar({
  items,
  footerItems = [],
  logo = "MintCondition",
  defaultCollapsed = false,
  children, // ← page content goes on the right
}: {
  items: SidebarItem[];
  footerItems?: SidebarItem[];
  logo?: React.ReactNode;
  defaultCollapsed?: boolean;
  children?: React.ReactNode;
}) {
  const [collapsed, setCollapsed] = useLocalStorage<boolean>(
    "sidebar:collapsed",
    defaultCollapsed
  );
  const [mobileOpen, setMobileOpen] = useState(false);

  const railW = collapsed ? "w-20" : "w-64";

  const Item = ({ item }: { item: SidebarItem }) => {
    if (item.href) {
      // Use NavLink for items with href to handle active state dynamically
      return (
        <NavLink
          to={item.href}
          className={({ isActive }) =>
            [
              "group flex items-center rounded-lg px-3 py-2 transition-colors outline-none",
              `gap-${collapsed ? "0" : "3"}`,
              collapsed ? "justify-center" : "",
              isActive
                ? "bg-black/60 text-white"
                : "text-gray-200 hover:bg-black/40 focus:bg-black/50",
              "focus-visible:ring-2 focus-visible:ring-white/40",
            ].join(" ")
          }
          title={collapsed ? item.label : undefined}
          aria-current={item.href ? "page" : undefined}
        >
          <span className="grid h-6 w-6 place-items-center shrink-0">
            {item.icon ?? (
              <span className="inline-block h-5 w-5 rounded bg-black/50" />
            )}
          </span>
          <span
            className={[
              "truncate transition-all duration-300",
              collapsed
                ? "opacity-0 max-w-0 pointer-events-none"
                : "opacity-100 max-w-[300px]",
            ].join(" ")}
          >
            {item.label}
          </span>
        </NavLink>
      );
    } else {
      // For items without href, use button
      return (
        <button
          onClick={item.onClick}
          className={[
            "group flex items-center transition-colors outline-none",
            item.transparent 
              ? "px-3 py-1 text-gray-400 hover:text-red-400 bg-transparent" 
              : "rounded-lg px-3 py-2 text-gray-200 hover:bg-black/40 focus:bg-black/50",
            `gap-${collapsed ? "0" : "3"}`,
            collapsed ? "justify-center" : "",
            "focus-visible:ring-2 focus-visible:ring-white/40",
          ].join(" ")}
          title={collapsed ? item.label : undefined}
        >
          <span className="grid h-6 w-6 place-items-center shrink-0">
            {item.icon ?? (
              <span className="inline-block h-5 w-5 rounded bg-black/50" />
            )}
          </span>
          <span
            className={[
              "truncate transition-all duration-300",
              collapsed
                ? "opacity-0 max-w-0 pointer-events-none"
                : "opacity-100 max-w-[300px]",
            ].join(" ")}
          >
            {item.label}
          </span>
        </button>
      );
    }
  };

  return (
    <>
      {/* Mobile top bar */}
      <div className="md:hidden sticky top-0 z-40 flex items-center gap-2 bg-gray-900 px-3 py-2 text-gray-100">
        <button
          onClick={() => setMobileOpen(true)}
          aria-label="Open sidebar"
          className="flex items-center gap-2 rounded px-2 py-1 hover:bg-black/40 focus-visible:ring-2 focus-visible:ring-white/40"
        >
          <Menu className="h-5 w-5" />
          <span>Menu</span>
        </button>
        <div className="ml-auto text-sm opacity-80">{logo}</div>
      </div>

      {/* Full-viewport layout: rail + page */}
      <div className="flex h-[100dvh] md:h-screen w-full overflow-hidden bg-black/50">
        {/* Mobile overlay */}
        {mobileOpen && (
          <div
            className="fixed inset-0 z-40 bg-black/40 md:hidden"
            onClick={() => setMobileOpen(false)}
            aria-hidden
          />
        )}

        {/* Sidebar rail (flex column so it fills height; nav scrolls) */}
        <aside
          aria-label="Sidebar"
          aria-expanded={!collapsed}
          className={[
            "fixed z-50 md:static h-full border-r border-gray-800",
            "bg-gray-900/95 text-gray-100 backdrop-blur",
            "transition-[width,transform] duration-300 ease-in-out",
            "flex flex-col", // ✅ fill height; header stays, nav scrolls
            railW,
            mobileOpen ? "translate-x-0" : "-translate-x-full md:translate-x-0",
          ].join(" ")}
        >
          {/* Header (doesn't scroll) */}
          <div
            className={`shrink-0 flex items-center ${
              collapsed ? "justify-center px-0" : "justify-between px-3"
            } py-3 border-b border-gray-800 relative`}
          >
            <div
              className={`flex items-center gap-2 ${collapsed ? "hidden" : ""}`}
            >
              <div className="grid h-10 w-10 place-items-center rounded">
                <img src={Logo} alt="Logo" className="h-8 w-8" />
              </div>
              <span
                className={[
                  "text-sm font-semibold",
                  collapsed ? "sr-only" : "",
                ].join(" ")}
              >
                {logo}
              </span>
            </div>

            <div className={`${collapsed ? "mx-auto" : ""}`}>
              <Button
                variant="outlined"
                onClick={() => setCollapsed((c) => !c)}
                aria-label={collapsed ? "Expand sidebar" : "Collapse sidebar"}
              >
                {collapsed ? (
                  <ChevronRight className="h-4 w-4" />
                ) : (
                  <ChevronLeft className="h-4 w-4" />
                )}
              </Button>
            </div>
          </div>

          {/* Nav (fills remaining height; scrolls as needed) */}
          <nav className="flex-1 overflow-y-auto px-2 py-3">
            {items.map((it, i) => (
              <Item key={i} item={it} />
            ))}
          </nav>

          {/* Footer (doesn't scroll) */}
          {footerItems.length > 0 && (
            <div className="shrink-0 border-t border-gray-800 px-2 py-3">
              {footerItems.map((it, i) => (
                <Item key={`f-${i}`} item={it} />
              ))}
            </div>
          )}
        </aside>

        {/* Page content (fills remaining width/height; scrolls) */}
        <main className="flex-1 min-w-0 overflow-auto p-6 md:ml-0" role="main">
          <div className="w-full">{children}</div>
        </main>
      </div>
    </>
  );
}

export default Sidebar;
