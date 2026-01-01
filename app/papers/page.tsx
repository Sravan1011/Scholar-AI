import { searchArxiv } from '@/lib/arxiv';
import PaperCard from '@/components/PaperCard';
import SearchBar from '@/components/SearchBar';
import Link from 'next/link';

export default async function PapersPage(props: {
    searchParams: Promise<{ q?: string }>;
}) {
    const searchParams = await props.searchParams;
    const query = searchParams.q || "cat:cs.AI";
    const papers = await searchArxiv(query);
    const categories = ["All", "Computer Science", "Physics", "Biology", "Mathematics", "Medicine", "Economics"];

    return (
        <main className="min-h-screen bg-black bg-grid-paper selection:bg-blue-500/30 pb-24">

            {/* Search Header */}
            <section className="pt-32 pb-12 px-4 border-b border-white/10 bg-black/50 backdrop-blur-md sticky top-0 z-40">
                <div className="container mx-auto max-w-5xl">
                    <div className="mb-4 text-center">
                        <Link href="/" className="text-zinc-500 hover:text-white transition-colors text-sm font-medium mb-4 inline-block">
                            &larr; Back to Home
                        </Link>
                    </div>
                    <h1 className="text-4xl rounded-2xl md:text-5xl font-bold font-serif mb-8 text-center">
                        Explore <span className="text-gradient">Knowledge</span>
                    </h1>

                    <SearchBar />

                    <div className="flex flex-wrap gap-2 justify-center">
                        {categories.map((cat, i) => (
                            <button
                                key={i}
                                className={`px-4 py-2 rounded-full text-sm font-medium transition-all ${i === 0
                                        ? 'bg-white text-black'
                                        : 'bg-zinc-900/50 text-zinc-400 hover:text-white hover:bg-zinc-800 border border-white/10'
                                    }`}
                            >
                                {cat}
                            </button>
                        ))}
                    </div>
                </div>
            </section>

            {/* Results Grid */}
            <section className="container mx-auto px-4 py-12 max-w-7xl">
                <div className="flex justify-between items-center mb-6">
                    <h2 className="text-xl font-medium text-zinc-400">
                        Showing results for <span className="text-white font-bold">"{query}"</span>
                    </h2>
                    <div className="text-sm text-zinc-500">
                        Sorted by: <span className="text-zinc-300 cursor-pointer hover:underline">Recent</span>
                    </div>
                </div>

                {papers.length > 0 ? (
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                        {papers.map((paper) => (
                            <PaperCard key={paper.id} paper={paper} />
                        ))}
                    </div>
                ) : (
                    <div className="text-center py-20 text-zinc-500">
                        <p className="text-xl">No papers found.</p>
                        <p className="text-sm">Try searching for a different topic.</p>
                    </div>
                )}
            </section>

        </main>
    );
}
