import Link from 'next/link';
import { ArrowLeft, ExternalLink } from 'lucide-react';
import PaperChat from '@/components/PaperChat';

export default async function PaperViewPage(props: {
    params: Promise<{ id: string }>;
    searchParams: Promise<{ pdf?: string }>;
}) {
    const params = await props.params;
    const searchParams = await props.searchParams;

    const id = params.id;
    let pdfUrl = searchParams.pdf;

    // If no PDF URL provided, try to construct it for arXiv
    if (!pdfUrl) {
        // Simple heuristic: arXiv IDs usually have dots and numbers, e.g., 2101.0000 or old style physics/0000
        // We can just try to construct the standard arXiv PDF link
        // Note: This might fail if the ID is totally different
        pdfUrl = `https://arxiv.org/pdf/${id}.pdf`;
    }

    return (
        <main className="h-screen bg-black flex overflow-hidden">
            {/* Main Content (PDF) */}
            <div className="flex-1 flex flex-col min-w-0">
                {/* Header */}
                <header className="h-16 border-b border-white/10 bg-zinc-900/50 flex items-center px-6 justify-between shrink-0">
                    <Link
                        href="/papers"
                        className="flex items-center gap-2 text-zinc-400 hover:text-white transition-colors text-sm font-medium"
                    >
                        <ArrowLeft className="w-4 h-4" />
                        Back to Search
                    </Link>

                    <h1 className="text-zinc-200 font-medium truncate max-w-xl mx-4">
                        Paper View: <span className="text-zinc-500">{id}</span>
                    </h1>

                    {pdfUrl && (
                        <a
                            href={pdfUrl}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="flex items-center gap-2 text-blue-400 hover:text-blue-300 transition-colors text-sm font-medium"
                        >
                            Open Original
                            <ExternalLink className="w-4 h-4" />
                        </a>
                    )}
                </header>

                {/* Creating the iframe to view the PDF */}
                <div className="flex-1 w-full bg-zinc-900 relative">
                    {pdfUrl ? (
                        <iframe
                            src={pdfUrl}
                            className="w-full h-full border-none"
                            title="Paper PDF"
                        />
                    ) : (
                        <div className="flex items-center justify-center h-full text-zinc-500">
                            <p>No PDF URL available for this paper.</p>
                        </div>
                    )}
                </div>
            </div>

            {/* Chat Sidebar */}
            <PaperChat paperId={id} />
        </main>
    );
}
