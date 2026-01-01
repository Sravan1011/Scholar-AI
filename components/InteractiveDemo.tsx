'use client';

import { useState } from 'react';
import { Sparkles, X, Brain, Globe, MessageSquare } from 'lucide-react';

export default function InteractiveDemo() {
    const [activeTerm, setActiveTerm] = useState<string | null>(null);

    const demoContent = [
        { text: "The ", type: "text" },
        {
            text: "Transformer",
            type: "highlight",
            color: "bg-blue-500/30",
            explanation: "A deep learning model architecture relying on self-attention mechanisms, first introduced in 'Attention Is All You Need' (2017).",
            icon: Brain
        },
        { text: " architecture allows for significantly greater ", type: "text" },
        {
            text: "parallelization",
            type: "highlight",
            color: "bg-purple-500/30",
            explanation: "The ability to process multiple parts of the input sequence simultaneously, rather than sequentially like RNNs.",
            icon: Sparkles
        },
        { text: " than previous models. This capability is crucial for training on ", type: "text" },
        {
            text: "large datasets",
            type: "highlight",
            color: "bg-pink-500/30",
            explanation: "Collecting massive amounts of text data (e.g., Common Crawl) to teach the model general language patterns.",
            icon: Globe
        },
        { text: " efficiently.", type: "text" }
    ];

    return (
        <section className="py-24 relative overflow-hidden">
            <div className="container mx-auto px-4">
                <div className="mb-12 text-center">
                    <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-blue-500/10 text-blue-400 text-xs font-bold uppercase tracking-wider mb-4 border border-blue-500/20">
                        Interactive Demo
                    </div>
                    <h2 className="text-3xl md:text-5xl font-bold mb-4 font-serif">
                        See How It <span className="text-gradient">Works</span>
                    </h2>
                    <p className="text-zinc-400 max-w-xl mx-auto">
                        Hover over the highlighted terms below to see how our AI explains complex concepts instantly.
                    </p>
                </div>

                <div className="max-w-4xl mx-auto glass-card rounded-xl p-8 md:p-12 relative min-h-[400px]">
                    {/* Mock PDF Header */}
                    <div className="border-b border-white/10 pb-6 mb-8 flex justify-between items-start">
                        <div>
                            <h3 className="text-2xl font-serif font-bold text-zinc-100 mb-2">Attention Is All You Need</h3>
                            <div className="flex gap-4 text-zinc-500 text-sm">
                                <span>Vaswani et al.</span>
                                <span>•</span>
                                <span>NeurIPS 2017</span>
                            </div>
                        </div>
                        <div className="flex gap-2">
                            <div className="w-3 h-3 rounded-full bg-red-500/20 border border-red-500/50"></div>
                            <div className="w-3 h-3 rounded-full bg-yellow-500/20 border border-yellow-500/50"></div>
                            <div className="w-3 h-3 rounded-full bg-green-500/20 border border-green-500/50"></div>
                        </div>
                    </div>

                    {/* Content Body */}
                    <div className="leading-loose text-lg md:text-xl text-zinc-300 font-serif">
                        <div>
                            {demoContent.map((item, index) => (
                                item.type === 'highlight' ? (
                                    <span
                                        key={index}
                                        className={`relative cursor-help px-1 rounded transition-colors duration-300 ${item.color} ${activeTerm === item.text ? 'bg-opacity-50 ring-2 ring-blue-500/50' : 'bg-opacity-20'}`}
                                        onMouseEnter={() => setActiveTerm(item.text)}
                                        style={{
                                            borderBottom: '2px solid rgba(255,255,255,0.1)'
                                        }}
                                    >
                                        {item.text}

                                        {/* Tooltip */}
                                        {activeTerm === item.text && (
                                            <div className="absolute z-50 left-1/2 -translate-x-1/2 bottom-full mb-4 w-72 md:w-80 p-4 glass-card rounded-xl shadow-2xl animate-pulse-glow backdrop-blur-xl border border-white/20">
                                                <div className="flex items-start gap-3">
                                                    <div className="mt-1 p-2 rounded-lg bg-white/10">
                                                        {item.icon && <item.icon className="w-4 h-4 text-blue-400" />}
                                                    </div>
                                                    <div>
                                                        <p className="text-xs font-bold text-blue-300 uppercase mb-1">AI Explanation</p>
                                                        <p className="text-sm text-zinc-200 leading-relaxed">
                                                            {item.explanation}
                                                        </p>
                                                    </div>
                                                </div>
                                                {/* Arrow */}
                                                <div className="absolute left-1/2 -translate-x-1/2 top-full w-0 h-0 border-l-[8px] border-l-transparent border-r-[8px] border-r-transparent border-t-[8px] border-t-white/10"></div>
                                            </div>
                                        )}
                                    </span>
                                ) : (
                                    <span key={index}>{item.text}</span>
                                )
                            ))}
                        </div>
                        <p className="mt-6 text-zinc-500">
                            ...traditional recurrent neural networks. This inherent parallelism allows for faster training times and better scaling to larger models.
                        </p>
                    </div>

                    {/* AI Assistant Floating Button (Simulated) */}
                    <div className="absolute bottom-6 right-6">
                        <button className="flex items-center gap-2 px-4 py-2 rounded-full glass-card hover:bg-blue-500/20 transition-colors text-zinc-300 text-sm">
                            <MessageSquare className="w-4 h-4" />
                            Ask a question...
                        </button>
                    </div>
                </div>
            </div>
        </section>
    );
}
