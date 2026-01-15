import { Paper } from './arxiv';

const SERPAPI_KEY = process.env.SERPAPI_KEY;

export async function searchGoogleScholar(query: string): Promise<Paper[]> {
    if (!SERPAPI_KEY) {
        console.warn("SERPAPI_KEY is missing. Falling back or returning empty.");
        return [];
    }

    try {
        const url = new URL("https://serpapi.com/search");
        url.searchParams.append("engine", "google_scholar");
        url.searchParams.append("q", query);
        url.searchParams.append("api_key", SERPAPI_KEY);
        url.searchParams.append("hl", "en");

        const response = await fetch(url.toString(), {
            next: { revalidate: 3600 } // Cache for 1 hour
        });

        if (!response.ok) {
            console.error("SerpApi error:", response.statusText);
            return [];
        }

        const data = await response.json();

        if (!data.organic_results) return [];

        return data.organic_results.map((result: any) => {
            // Extract meaningful data from SerpApi result
            const authors = result.publication_info?.summary?.split('-')[0]?.trim().split(',') || ["Unknown Author"];
            const yearStr = result.publication_info?.summary?.match(/\d{4}/);
            const year = yearStr ? parseInt(yearStr[0]) : new Date().getFullYear();

            // SerpApi doesn't always give a clean abstract in the list view, sometimes just a snippet
            const abstractSnippet = result.snippet || "No abstract available.";

            // Try to find a PDF link
            let pdfUrl = undefined;
            if (result.resources) {
                const fileFormat = result.resources.find((r: any) => r.file_format === "PDF");
                if (fileFormat) pdfUrl = fileFormat.link;
            }

            return {
                id: result.result_id,
                title: result.title,
                authors: authors,
                year,
                abstractSnippet: abstractSnippet,
                tags: ["Google Scholar"], // Placeholder tag
                pdfUrl: pdfUrl || result.link // Use direct link if no PDF found
            };
        });

    } catch (error) {
        console.error("Error fetching from SerpApi:", error);
        return [];
    }
}
