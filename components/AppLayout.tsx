"use client";

import { usePathname } from "next/navigation";
import ModelSidebar from "@/components/ModelSidebar";

export default function AppLayout({
    children,
}: {
    children: React.ReactNode;
}) {
    const pathname = usePathname();

    // Define paths where sidebar should NOT be shown
    // The user asked to remove it from home page.
    // And logically it shouldn't be on login page either.
    // So we show it only when NOT on home ("/") and NOT on login ("/login")
    // Or simpler: Show it only if path starts with "/papers" as requested "add it's when on papers page"

    // Re-reading user request: "remove the left bar on the home page add it's when on papers page"
    // This implies it should be visible on /papers/* but hidden on /.

    const showSidebar = pathname.startsWith("/papers");

    return (
        <div className="flex min-h-screen">
            {showSidebar && <ModelSidebar />}
            <div className="flex-1 transition-all duration-300">
                {children}
            </div>
        </div>
    );
}
