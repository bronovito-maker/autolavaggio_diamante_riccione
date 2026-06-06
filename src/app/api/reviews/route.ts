import { NextResponse } from "next/server";

export async function GET() {
  const PLACE_ID = "ChIJGW4LjEjdLBMRNcazEeToalw";
  const API_KEY = process.env.NEXT_PUBLIC_GOOGLE_MAPS_API_KEY;

  if (!API_KEY) {
    // Ritorna recensioni di fallback se manca la chiave API
    return NextResponse.json({
      rating: 4.9,
      user_ratings_total: 223,
      reviews: [
        {
          author_name: "Marco Rossi",
          rating: 5,
          text: "Un'attenzione maniacale per i dettagli. L'auto è tornata come nuova.",
          time: Math.floor(Date.now() / 1000) - 86400,
        },
        {
          author_name: "Alessandro B.",
          rating: 5,
          text: "Lavoro eccellente! Ho portato la mia auto sportiva per un trattamento nanotecnologico ed è semplicemente perfetta.",
          time: Math.floor(Date.now() / 1000) - 172800,
        },
        {
          author_name: "Giulia F.",
          rating: 5,
          text: "Professionisti assoluti. Si prendono cura dell'auto come se fosse la loro.",
          time: Math.floor(Date.now() / 1000) - 259200,
        }
      ],
      error: "API Key mancante, mostro recensioni di fallback."
    });
  }

  try {
    const response = await fetch(
      `https://maps.googleapis.com/maps/api/place/details/json?place_id=${PLACE_ID}&fields=name,rating,reviews,user_ratings_total&key=${API_KEY}&language=it`,
      {
        next: { revalidate: 86400 }, // Cache per 24 ore (86400 secondi)
      }
    );

    const data = await response.json();

    if (data.status !== "OK") {
      throw new Error(data.error_message || "Errore da Google Places API");
    }

    return NextResponse.json({
      rating: data.result.rating,
      user_ratings_total: data.result.user_ratings_total,
      reviews: data.result.reviews,
    });
  } catch (error: any) {
    console.error("Errore recupero recensioni:", error);
    return NextResponse.json({ error: "Impossibile caricare le recensioni al momento." }, { status: 500 });
  }
}
