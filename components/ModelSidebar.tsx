"use client";

import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import { cn } from "@/lib/utils";
import { Bot, Sparkles, Brain, Search, Clock, FileText, Settings, PlusCircle, LogOut, LogIn } from "lucide-react";
import { useEffect, useState } from "react";
import { createClient } from "@/lib/supabase/client";
import { User } from "@supabase/supabase-js";
import { type ClassValue } from "clsx";
import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuLabel,
    DropdownMenuSeparator,
    DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";


interface ModelItem {
    name: string;
    icon: React.ElementType;
    href: string;
    description: string;
}

interface ChatHistory {
    id: string;
    paper_id: string;
    paper_title: string;
    last_opened_at: string;
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
    const router = useRouter();
    const [user, setUser] = useState<User | null>(null);
    const [history, setHistory] = useState<ChatHistory[]>([]);
    const supabase = createClient();

    useEffect(() => {
        const checkUser = async () => {
            const { data: { user } } = await supabase.auth.getUser();
            setUser(user);

            if (user) {
                const { data, error } = await supabase
                    .from('chats')
                    .select('*')
                    .order('last_opened_at', { ascending: false })
                    .limit(20);

                if (data) setHistory(data);
            }
        };

        checkUser();

        // Listen for auth changes
        const { data: authListener } = supabase.auth.onAuthStateChange((event: any, session: any) => {
            if (event === 'SIGNED_IN') {
                setUser(session?.user ?? null);
                checkUser();
            } else if (event === 'SIGNED_OUT') {
                setUser(null);
                setHistory([]);
            }
        });

        return () => {
            authListener.subscription.unsubscribe();
        };
    }, []);

    const handleSignOut = async () => {
        await supabase.auth.signOut();
        router.refresh();
    };

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
                <Link
                    href="/"
                    className="w-full flex items-center gap-2 px-4 py-2.5 rounded-lg bg-white/5 hover:bg-white/10 text-zinc-300 hover:text-white transition-all border border-white/5 hover:border-white/10 text-sm font-medium group"
                >
                    <PlusCircle className="w-4 h-4 text-zinc-400 group-hover:text-white" />
                    New Chat
                </Link>
            </div>

            <div className="flex-1 overflow-y-auto py-2 px-3 space-y-6">
                {/* Models List */}
                <div className="space-y-1">
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

                {/* History List (Only if logged in) */}
                {user && history.length > 0 && (
                    <div className="space-y-1">
                        <div className="px-3 mb-2 text-xs font-semibold text-zinc-500 uppercase tracking-wider flex items-center gap-2">
                            <Clock className="w-3 h-3" />
                            Recent Activity
                        </div>
                        {history.map((chat) => (
                            <Link
                                key={chat.id}
                                href={`/papers/${chat.paper_id}`}
                                className={cn(
                                    "flex items-center gap-3 px-3 py-2 rounded-lg text-zinc-400 hover:bg-white/5 hover:text-white transition-colors text-sm truncate"
                                )}
                            >
                                <FileText className="w-4 h-4 shrink-0" />
                                <span className="truncate">{chat.paper_title || chat.paper_id}</span>
                            </Link>
                        ))}
                    </div>
                )}
            </div>

            {/* Footer / Auth */}
            <div className="p-3 border-t border-white/10 bg-zinc-950/50">
                {user ? (
                    <DropdownMenu>
                        <DropdownMenuTrigger asChild>
                            <Button variant="ghost" className="w-full flex items-center justify-start gap-3 px-2 h-auto py-2 hover:bg-zinc-900 data-[state=open]:bg-zinc-900">
                                <Avatar className="h-8 w-8">
                                    <AvatarImage src={user.user_metadata?.avatar_url} />
                                    <AvatarFallback>{user.email?.charAt(0).toUpperCase()}</AvatarFallback>
                                </Avatar>
                                <div className="flex flex-col items-start min-w-0">
                                    <span className="text-sm font-medium text-zinc-200 truncate w-full text-left">{user.user_metadata?.full_name || user.email?.split('@')[0]}</span>
                                    <span className="text-xs text-zinc-500 truncate w-full text-left">{user.email}</span>
                                </div>
                            </Button>
                        </DropdownMenuTrigger>
                        <DropdownMenuContent align="end" className="w-[240px] bg-zinc-950 border-zinc-800 text-zinc-400">
                            <DropdownMenuLabel className="text-zinc-500">My Account</DropdownMenuLabel>
                            <DropdownMenuItem className="focus:bg-zinc-900 focus:text-white cursor-pointer">
                                <Settings className="mr-2 h-4 w-4" />
                                <span>Settings</span>
                            </DropdownMenuItem>
                            <DropdownMenuSeparator className="bg-zinc-800" />
                            <DropdownMenuItem className="focus:bg-red-900/10 focus:text-red-400 text-red-400 cursor-pointer" onClick={handleSignOut}>
                                <LogOut className="mr-2 h-4 w-4" />
                                <span>Log out</span>
                            </DropdownMenuItem>
                        </DropdownMenuContent>
                    </DropdownMenu>
                ) : (
                    <Link href="/login">
                        <Button variant="outline" className="w-full justify-start gap-2 border-zinc-800 bg-transparent text-zinc-400 hover:bg-zinc-900 hover:text-white">
                            <LogIn className="w-4 h-4" />
                            Sign In
                        </Button>
                    </Link>
                )}
            </div>
        </aside>
    );
}


