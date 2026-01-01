import Link from 'next/link';
import { ArrowRight, Sparkles, FileText, Brain } from 'lucide-react';

export default function Hero() {
    return (
        <section className="relative min-h-screen flex items-center justify-center overflow-hidden pt-20 pb-32">
            {/* Background Effects */}
            <div className="absolute top-0 left-0 w-full h-full overflow-hidden -z-10">
                <div className="absolute top-[-10%] left-[20%] w-72 h-72 bg-blue-500/20 rounded-full blur-[100px] animate-drift-slow" />
                <div className="absolute top-[40%] right-[20%] w-96 h-96 bg-purple-500/20 rounded-full blur-[100px] animate-drift-slow" style={{ animationDelay: '-5s' }} />
                <div className="absolute bottom-[-10%] left-[30%] w-80 h-80 bg-pink-500/10 rounded-full blur-[100px] animate-drift-slow" style={{ animationDelay: '-10s' }} />
            </div>

            <div className="container mx-auto px-4 text-center z-10 flex flex-col items-center">
                <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full glass-card mb-8 animate-float">
                    <span className="text-sm font-medium text-zinc-300">AI-Powered Research Companion</span>
                </div>

                <h1 className="text-5xl md:text-7xl font-bold tracking-tight mb-6 max-w-4xl font-serif">
                    Unlock Research with <br />
                    <span className="text-gradient">Artificial Intelligence</span>
                </h1>

                <p className="text-lg md:text-xl text-zinc-400 mb-10 max-w-2xl leading-relaxed">
                    Upload any PDF and instantly get explanations, summaries, and translations.
                    Stop struggling with complex academic language.
                </p>

                <div className="flex flex-col sm:flex-row gap-4 items-center justify-center mb-16">
                    <button className="px-8 py-4 rounded-full bg-white text-black font-semibold text-lg hover:bg-zinc-200 transition-all flex items-center gap-2 group">
                        Get Started Free
                        <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
                    </button>

                    <button className="px-8 py-4 rounded-full glass-card text-white font-medium text-lg hover:bg-white/10 transition-all">
                        View Demo
                    </button>
                </div>

                {/* Floating Cards (Decorative) */}
                <div className="relative w-full max-w-5xl h-64 md:h-96 hidden md:block">
                    <div className="absolute left-[10%] top-10 w-64 p-4 glass-card rounded-xl animate-float" style={{ animationDelay: '0s' }}>
                        <div className="flex items-center gap-3 mb-3">
                            <div className="w-10 h-10 rounded-lg bg-blue-500/20 flex items-center justify-center">
                                <FileText className="w-5 h-5 text-blue-400" />
                            </div>
                            <div>
                                <div className="h-2 w-20 bg-zinc-700 rounded mb-1"></div>
                                <div className="h-2 w-12 bg-zinc-800 rounded"></div>
                            </div>
                        </div>
                        <div className="space-y-2">
                            <div className="h-2 w-full bg-zinc-800 rounded"></div>
                            <div className="h-2 w-full bg-zinc-800 rounded"></div>
                            <div className="h-2 w-4/5 bg-zinc-800 rounded"></div>
                        </div>
                    </div>

                    <div className="absolute right-[10%] bottom-10 w-72 p-5 glass-card rounded-xl animate-float" style={{ animationDelay: '-3s' }}>
                        <div className="flex gap-3 mb-3">
                            <div className="w-8 h-8 rounded-full bg-purple-500/20 flex items-center justify-center shrink-0">
                                <Brain className="w-4 h-4 text-purple-400" />
                            </div>
                            <p className="text-xs text-zinc-300 leading-relaxed">
                                "The concept of 'Transformer' attention mechanisms allows models to weigh the importance of different words..."
                            </p>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    );
}
