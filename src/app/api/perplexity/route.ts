import { NextResponse } from "next/server";

export const maxDuration = 60;

/**
 * POST handler for processing the query.
 * @param {Request} request - The incoming request containing the query.
 * @returns {Promise<Response>} - The response from the perplexity API.
 */
export async function POST(request: Request) {
  try {
    // Empfange den ursprünglichen Query aus der Request-JSON
    const { query } = await request.json();
    
    // Füge der Query statisch "site: otto.de" hinzu
    const modifiedQuery = `${query}  - (TOP BESTE 10 - 15)`;

    // Sende den Request an die Perplexity API
    const response = await fetch("https://api.perplexity.ai/chat/completions", {
      method: "POST",
      headers: {
        "Authorization": `Bearer ${process.env.PERPLEXITY_API_KEY}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        model: "sonar", // "sonar-reasoning-pro",
        
        messages: [ {"role": "system", "content": "Be precise and concise."},
          { role: "user", content: modifiedQuery }],
        return_related_questions: false,
        stream: false,
      }),
    });

    if (!response.ok) {
      return NextResponse.error();
    }
    
    const data = await response.json();
    return NextResponse.json(data);
  } catch {
    return NextResponse.error();
  }
}
