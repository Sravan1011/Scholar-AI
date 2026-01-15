import { XMLParser } from 'fast-xml-parser';

export interface ArxivPaper {
    id: string;
    title: string;
    summary: string;
    author: { name: string } | { name: string }[];
    published: string;
    link: { href: string }[];
    category: { term: string } | { term: string }[];
}

export interface Paper {
    id: string;
    title: string;
    authors: string[];
    year: number;
    abstractSnippet: string;
    tags: string[];
    pdfUrl?: string;
}

const parser = new XMLParser({
    ignoreAttributes: false,
    attributeNamePrefix: "@_"
});

export async function searchArxiv(
    query: string = "",
    start: number = 0,
    maxResults: number = 10,
    sortBy: string = "submittedDate",
    sortOrder: string = "descending"
): Promise<Paper[]> {
    // Construct a smarter query if no prefixes are present
    let finalQuery = query;
    // Check if query looks like a raw search (no prefixes like "ti:", "au:", etc.)
    // We also avoid messing with queries that might already be complex boolean logic if they have known prefixes
    if (!query.includes(':') && query.trim().length > 0) {
        // Clean quotes to avoid syntax errors in our constructed query
        const cleanQuery = query.replace(/"/g, '').trim();
        if (cleanQuery) {
            // Search for exact phrase in Title OR Abstract
            // Use AND logic for words if users prefer? No, User wanted specific title search.
            // "Deep Residual Learning" -> ti:"Deep Residual Learning" OR abs:"Deep Residual Learning"
            finalQuery = `ti:"${cleanQuery}" OR abs:"${cleanQuery}"`;
        }
    }

    try {
        const response = await fetch(
            `https://export.arxiv.org/api/query?search_query=${encodeURIComponent(finalQuery)}&start=${start}&max_results=${maxResults}&sortBy=${sortBy}&sortOrder=${sortOrder}`,
            { next: { revalidate: 3600 } } // Cache for 1 hour
        );

        const xmlData = await response.text();
        const result = parser.parse(xmlData);

        const entries = result.feed.entry;

        if (!entries) return [];

        // Handle single entry vs array of entries
        const papersList = Array.isArray(entries) ? entries : [entries];

        return papersList.map((entry: any) => {
            // Extract authors
            let authors: string[] = [];
            if (Array.isArray(entry.author)) {
                authors = entry.author.map((a: any) => a.name);
            } else {
                authors = [entry.author.name];
            }

            // Extract PDF link
            let pdfUrl = "";
            if (Array.isArray(entry.link)) {
                const pdfLink = entry.link.find((l: any) => l["@_title"] === "pdf");
                if (pdfLink) pdfUrl = pdfLink["@_href"];
            } else if (entry.link["@_title"] === "pdf") {
                pdfUrl = entry.link["@_href"];
            }

            // Extract Year
            const year = new Date(entry.published).getFullYear();

            // Extract Categories/Tags
            let tags: string[] = [];
            if (Array.isArray(entry.category)) {
                tags = entry.category.map((c: any) => c["@_term"]);
            } else if (entry.category) {
                tags = [entry.category["@_term"]];
            }

            return {
                id: entry.id.split('/abs/')[1], // Extract ID from URL
                title: entry.title.replace(/\n/g, " ").trim(),
                authors,
                year,
                abstractSnippet: entry.summary.replace(/\n/g, " ").trim().substring(0, 200) + "...",
                tags: tags.slice(0, 3), // Limit to 3 tags
                pdfUrl
            };
        });

    } catch (error) {
        console.error("Error fetching from arXiv:", error);
        return [];
    }
}
