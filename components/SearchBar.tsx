'use client';

import { useRouter, useSearchParams } from 'next/navigation';
import { Search, SlidersHorizontal, Loader2 } from 'lucide-react';
import { useState, useTransition } from 'react';

export default function SearchBar() {
    const router = useRouter();
    const searchParams = useSearchParams();
    const [query, setQuery] = useState(searchParams.get('q') || '');
    const [isPending, startTransition] = useTransition();

    const handleSearch = (e: React.FormEvent) => {
        e.preventDefault();
        if (!query.trim()) return;

        startTransition(() => {
            router.push(`/papers?q=${encodeURIComponent(query)}`);
        });
    };

    return (
        <form onSubmit={handleSearch} className="relative max-w-2xl mx-auto mb-8">
            <div className="absolute inset-y-0 left-4 flex items-center pointer-events-none">
                {isPending ? (
                    <Loader2 className="h-5 w-5 text-zinc-400 animate-spin" />
                ) : (
                    <Search className="h-5 w-5 text-zinc-400" />
                )}
            </div>
            <input
                type="text"
                value={query}
                onChange={(e) => setQuery(e.target.value)}
                placeholder="Search papers, authors, or topics (e.g., 'cat:cs.AI')..."
                className="w-full pl-12 pr-4 py-4 bg-zinc-900/50 border border-white/10 rounded-2xl text-lg focus:outline-none focus:ring-2 focus:ring-blue-500/50 text-white placeholder:text-zinc-500 transition-all font-sans"
            />
            <div className="absolute inset-y-0 right-4 flex items-center">
                <button type="button" className="p-2 hover:bg-white/10 rounded-lg transition-colors">
                    <SlidersHorizontal className="h-5 w-5 text-zinc-400" />
                </button>
            </div>
        </form>
    );
}
