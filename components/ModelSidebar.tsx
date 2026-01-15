"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { cn } from "@/lib/utils";
import { Bot, Sparkles, Brain, Search, Clock, FileText, Settings, PlusCircle } from "lucide-react";

interface ModelItem {
    name: string;
    icon: React.ElementType;
    href: string;
    description: string;
}

const models: ModelItem[] = [
    {
        name: "Scholar AI",
        icon: Brain,
        href: "/",
        description: "Standard model"
    },
    {
        name: "Deep Research",
        icon: Search,
        href: "/research", // Placeholder
        description: "Advanced analysis"
    },
    {
        name: "Creative Writer",
        icon: Sparkles,
        href: "/creative", // Placeholder
        description: "Generative tasks"
    },
];

export default function ModelSidebar() {
    const pathname = usePathname();

    return (
        <aside className="w-64 h-screen shrink-0 border-r border-white/10 bg-black flex flex-col sticky top-0 overflow-hidden z-50">
            {/* Header / Brand */}
            <div className="h-16 flex items-center px-6 border-b border-white/10 shrink-0">
                <div className="flex items-center gap-2 text-white font-semibold tracking-tight">
                    <div className="w-8 h-8 rounded-full bg-gradient-to-tr from-blue-500 to-purple-500 flex items-center justify-center">
                        <Bot className="w-5 h-5 text-white" />
                    </div>
                    <span>Antigravity</span>
                </div>
            </div>

            {/* New Chat Button */}
            <div className="p-4">
                <button className="w-full flex items-center gap-2 px-4 py-2.5 rounded-lg bg-white/5 hover:bg-white/10 text-zinc-300 hover:text-white transition-all border border-white/5 hover:border-white/10 text-sm font-medium group">
                    <PlusCircle className="w-4 h-4 text-zinc-400 group-hover:text-white" />
                    New Chat
                </button>
            </div>

            {/* Models List */}
            <div className="flex-1 overflow-y-auto py-2 px-3 space-y-1">
                <div className="px-3 mb-2 text-xs font-semibold text-zinc-500 uppercase tracking-wider">
                    AI Models
                </div>

                {models.map((model) => {
                    const isActive = pathname === model.href || (model.href !== "/" && pathname.startsWith(model.href));
                    return (
                        <Link
                            key={model.name}
                            href={model.href}
                            className={cn(
                                "flex items-start gap-3 px-3 py-3 rounded-xl transition-all border border-transparent",
                                isActive
                                    ? "bg-blue-500/10 text-blue-100 border-blue-500/20"
                                    : "text-zinc-400 hover:bg-white/5 hover:text-white"
                            )}
                        >
                            <model.icon className={cn("w-5 h-5 shrink-0 mt-0.5", isActive ? "text-blue-400" : "text-zinc-500")} />
                            <div className="flex-1 min-w-0">
                                <span className="block text-sm font-medium truncate">{model.name}</span>
                                <span className="block text-xs text-zinc-500 truncate mt-0.5">{model.description}</span>
                            </div>
                        </Link>
                    )
                })}
            </div>

            {/* Footer / History */}
            <div className="p-3 border-t border-white/10 bg-zinc-950/50">
                <Link href="/history" className="flex items-center gap-3 px-3 py-2 rounded-lg text-zinc-400 hover:bg-white/5 hover:text-white transition-colors text-sm">
                    <Clock className="w-4 h-4" />
                    <span>Recent Activity</span>
                </Link>
                <Link href="/settings" className="flex items-center gap-3 px-3 py-2 rounded-lg text-zinc-400 hover:bg-white/5 hover:text-white transition-colors text-sm">
                    <Settings className="w-4 h-4" />
                    <span>Settings</span>
                </Link>
            </div>
        </aside>
    );
}
