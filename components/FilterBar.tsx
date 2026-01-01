'use client';

import { useRouter, useSearchParams } from 'next/navigation';

export default function FilterBar() {
    const router = useRouter();
    const searchParams = useSearchParams();
    const currentQuery = searchParams.get('q') || '';

    const categories = [
        { name: "All", query: "all" },
        { name: "Computer Science", query: "cat:cs.AI" },
        { name: "CV", query: "cat:cs.CV" },
        { name: "NLP", query: "cat:cs.CL" },
        { name: "Physics", query: "cat:physics" },
        { name: "Biology", query: "cat:q-bio" },
        { name: "Math", query: "cat:math" },
        { name: "Econ", query: "cat:econ" },
    ];

    const handleFilter = (query: string) => {
        if (query === 'all') {
            router.push('/papers');
        } else {
            router.push(`/papers?q=${encodeURIComponent(query)}`);
        }
    };

    return (
        <div className="flex flex-wrap gap-2 justify-center">
            {categories.map((cat, i) => {
                const isActive = currentQuery === cat.query || (cat.query === 'all' && !currentQuery);

                return (
                    <button
                        key={i}
                        onClick={() => handleFilter(cat.query)}
                        className={`px-4 py-2 rounded-full text-sm font-medium transition-all ${isActive
                                ? 'bg-white text-black scale-105'
                                : 'bg-zinc-900/50 text-zinc-400 hover:text-white hover:bg-zinc-800 border border-white/10'
                            }`}
                    >
                        {cat.name}
                    </button>
                );
            })}
        </div>
    );
}
