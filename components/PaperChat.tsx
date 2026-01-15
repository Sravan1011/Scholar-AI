"use client";

import { Send, Bot, User, Sparkles } from "lucide-react";
import { useState } from "react";
import { cn } from "@/lib/utils";

interface Message {
    role: "user" | "ai";
    content: string;
}

export default function PaperChat({ paperId }: { paperId: string }) {
    const [messages, setMessages] = useState<Message[]>([
        { role: "ai", content: `Hello! I've analyzed this paper (${paperId}). Ask me anything about its methodology, results, or conclusions.` }
    ]);
    const [input, setInput] = useState("");

    const handleSend = () => {
        if (!input.trim()) return;

        // Add user message
        const newMessages = [...messages, { role: "user" as const, content: input }];
        setMessages(newMessages);
        setInput("");

        // Simulate AI response
        setTimeout(() => {
            setMessages(prev => [...prev, {
                role: "ai",
                content: "I'm a demo AI. In a real implementation, I would search the paper's text to answer your question: \"" + input + "\""
            }]);
        }, 1000);
    };

    return (
        <div className="w-96 shrink-0 border-l border-white/10 bg-zinc-950 flex flex-col h-full">
            {/* Header */}
            <div className="h-16 flex items-center px-4 border-b border-white/10 shrink-0 bg-black/50 backdrop-blur-sm">
                <div className="flex items-center gap-2 text-zinc-200 font-medium">
                    <Sparkles className="w-4 h-4 text-blue-400" />
                    Chat with Paper
                </div>
            </div>

            {/* Messages */}
            <div className="flex-1 overflow-y-auto p-4 space-y-4">
                {messages.map((msg, i) => (
                    <div
                        key={i}
                        className={cn(
                            "flex gap-3 text-sm",
                            msg.role === "user" ? "flex-row-reverse" : "flex-row"
                        )}
                    >
                        <div className={cn(
                            "w-8 h-8 rounded-full flex items-center justify-center shrink-0",
                            msg.role === "ai" ? "bg-blue-500/10 text-blue-400" : "bg-zinc-800 text-zinc-400"
                        )}>
                            {msg.role === "ai" ? <Bot className="w-4 h-4" /> : <User className="w-4 h-4" />}
                        </div>
                        <div className={cn(
                            "rounded-2xl px-4 py-2.5 max-w-[85%] leading-relaxed",
                            msg.role === "ai"
                                ? "bg-zinc-900 border border-white/5 text-zinc-300" // AI style
                                : "bg-blue-600 text-white" // User style
                        )}>
                            {msg.content}
                        </div>
                    </div>
                ))}
            </div>

            {/* Input */}
            <div className="p-4 border-t border-white/10 bg-zinc-950">
                <div className="relative">
                    <input
                        type="text"
                        value={input}
                        onChange={(e) => setInput(e.target.value)}
                        onKeyDown={(e) => e.key === 'Enter' && handleSend()}
                        placeholder="Ask a question..."
                        className="w-full bg-zinc-900/50 border border-white/10 rounded-xl pl-4 pr-10 py-3 text-sm text-white focus:outline-none focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500/50 transition-all placeholder:text-zinc-600"
                    />
                    <button
                        onClick={handleSend}
                        className="absolute right-2 top-1/2 -translate-y-1/2 p-1.5 hover:bg-blue-500/20 rounded-lg text-zinc-400 hover:text-blue-400 transition-colors"
                    >
                        <Send className="w-4 h-4" />
                    </button>
                </div>
            </div>
        </div>
    );
}
