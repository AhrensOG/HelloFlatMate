import axios from "axios";

const GEOCODING_API_KEY = process.env.GEOCODING_API_KEY;

export async function GET(req) {
  const { searchParams } = new URL(req.url); // Extraer los parámetros de búsqueda de la URL
  const address = searchParams.get("address"); // Obtener el parámetro 'address' de la query

  // Verificar si se recibió una dirección válida
  if (!address) {
    return new Response(
      JSON.stringify({ error: "La dirección es requerida." }),
      {
        status: 400,
        headers: { "Content-Type": "application/json" },
      }
    );
  }

  try {
    // Realizar solicitud a la API de Google Geocoding
    const response = await axios.get(
      `https://maps.googleapis.com/maps/api/geocode/json`,
      {
        params: {
          address,
          key: GEOCODING_API_KEY, // Asegúrate de usar una API Key sin restricciones de referer
        },
      }
    );

    if (response.data.results.length > 0) {
      const { lat, lng } = response.data.results[0].geometry.location;
      return new Response(JSON.stringify({ lat, lng }), {
        status: 200,
        headers: { "Content-Type": "application/json" },
      });
    } else {
      return new Response(
        JSON.stringify({
          error: "No se encontraron resultados para la dirección.",
        }),
        {
          status: 404,
          headers: { "Content-Type": "application/json" },
        }
      );
    }
  } catch (error) {
    return new Response(
      JSON.stringify({ error: "Error al obtener las coordenadas." }),
      {
        status: 500,
        headers: { "Content-Type": "application/json" },
      }
    );
  }
}
