import axios from 'axios'

const CLIENT_ID = 'lro9ae2VGvUq4WFZoSKrMLmOCa6n7llG';
const CLIENT_SECRET = 'T4qjgY8igvz8yvHp'


async function getToken() {
  const response = await axios.post("https://test.api.amadeus.com/v1/security/oauth2/token", 
    new URLSearchParams({
    grant_type: "client_credentials",
    client_id: CLIENT_ID,
    client_secret: CLIENT_SECRET,
  })
  );
  return response.data.access_token;
}

export async function get_hotels(cityCode = "TAS") {
  try {
    const token = await getToken();
    const res = await axios.get("https://test.api.amadeus.com/v1/reference-data/locations/hotels/by-city", {
        headers: { Authorization: `Bearer ${token}` },
        params: { cityCode },
      }
    );

    const hotels = res.data.data.map((h, i) => {
      const saved = JSON.parse(localStorage.getItem(`hotel-data-${h.hotelId}`))

      if (saved) {
        return saved
      }
      const newD = {
      hotelId: h.hotelId,
      name: h.name,
      address: h.address,
      rating: saved?.rating ?? Math.floor(Math.random() * 4) + 3,
      price: saved?.price ?? (Math.random() * 250 + 50).toFixed(0),
      rooms: saved?.rooms ?? Math.floor(Math.random() * 3) + 1,
      addressText: `${h.address?.lines?.join(", ")}, ${h.address?.cityName}`,
      chainCode: h.chainCode,
      cityCode: h.cityCode,
      }

      localStorage.setItem(`hotel-data-${h.hotelId}`, JSON.stringify(newD))
      return newD
    });

    return hotels;
  } catch (error) {
    console.error("Ошибка при получении отелей:", error);
    return [];
  }
}

export async function get_hotel_offers(hotelId) {
  const saved = JSON.parse(localStorage.getItem(`hotel-data-${hotelId}`))
  return {
    hotel: { rating: saved?.rating || 4 },
    offers: [
      {
        room: { type: "DELUXE", typeEstimated: { beds: 2} },
        price: { total: saved?.price || '100', 
        currency: "USD" },
      },
    ],
  };
}