import Link from 'next/link';
import { ArrowRight, Bookmark, Calendar, Users } from 'lucide-react';

interface PaperProps {
    id: string;
    title: string;
    authors: string[];
    year: number;
    conference?: string;
    abstractSnippet: string;
    tags: string[];
}

export default function PaperCard({ paper }: { paper: PaperProps }) {
    return (
        <div className="glass-card group relative p-6 rounded-xl hover:bg-white/5 transition-all duration-300 hover:-translate-y-1 hover:shadow-lg border border-white/10">

            <div className="flex justify-between items-start mb-4">
                <div className="flex flex-wrap gap-2">
                    {paper.tags.map((tag, i) => (
                        <span key={i} className="text-xs font-medium px-2 py-1 rounded-full bg-blue-500/10 text-blue-300 border border-blue-500/20">
                            {tag}
                        </span>
                    ))}
                </div>
                <button className="text-zinc-500 hover:text-white transition-colors">
                    <Bookmark className="w-5 h-5" />
                </button>
            </div>

            <h3 className="text-xl font-serif font-bold text-zinc-100 mb-2 group-hover:text-blue-300 transition-colors leading-tight">
                {paper.title}
            </h3>

            <div className="flex items-center gap-4 text-sm text-zinc-500 mb-4">
                <div className="flex items-center gap-1">
                    <Users className="w-3.5 h-3.5" />
                    <span>{paper.authors[0]} et al.</span>
                </div>
                <div className="flex items-center gap-1">
                    <Calendar className="w-3.5 h-3.5" />
                    <span>{paper.year}</span>
                </div>
                {paper.conference && (
                    <span className="px-1.5 py-0.5 rounded bg-zinc-800 text-zinc-400 text-xs">
                        {paper.conference}
                    </span>
                )}
            </div>

            <p className="text-zinc-400 text-sm leading-relaxed mb-6 line-clamp-3">
                {paper.abstractSnippet}
            </p>

            <div className="flex items-center justify-between mt-auto">
                <Link
                    href={`/papers/${paper.id}`}
                    className="inline-flex items-center gap-2 text-sm font-semibold text-white hover:text-blue-400 transition-colors group-hover:pl-1"
                >
                    Read Paper
                    <ArrowRight className="w-4 h-4 transition-transform group-hover:translate-x-1" />
                </Link>
            </div>
        </div>
    );
}
