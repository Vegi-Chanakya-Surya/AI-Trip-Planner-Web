

import React, { useEffect, useState } from 'react';
import { GetPlaceDetails } from '@/service/GlobalAPI';
import { PHOTO_REF_URL } from '@/service/GlobalAPI';

function Hotels({ trip }) {
  // Safely read data
  const acc = trip?.tripdata?.accommodation;
  const accOptions = trip?.tripdata?.accommodation_options;

  // Normalize to an array
  const hotels = Array.isArray(accOptions)
    ? accOptions
    : Array.isArray(acc)
    ? acc
    : acc
    ? [acc]
    : [];

  // if no hotels, don't render anything
  if (!hotels.length) return null;

  // map of photo URLs keyed by hotel index
  const [hotelPhotos, setHotelPhotos] = useState({});

  // fetch a photo for a single hotel by index
  const fetchHotelPhoto = async (hotel, idx) => {
    try {
      // Build a good text query for the Places API
      // ex: "Steigenberger Pyramids Cairo  Alexandria Rd Giza Egypt"
      const textQuery = [hotel?.hotel_name, hotel?.address]
        .filter(Boolean)
        .join(' ');

      if (!textQuery) return;

      const resp = await GetPlaceDetails({ textQuery });

      // You were doing response.data.places[0].photos[4].name
      // We'll try to be a little safer:
      const place = resp?.data?.places?.[0];
      const photoName =
        place?.photos?.[0]?.name ||
        place?.photos?.[1]?.name ||
        place?.photos?.[2]?.name;

      if (!photoName) return;

      const url = PHOTO_REF_URL.replace('{NAME}', photoName);

      // Update just this hotel's photo URL
      setHotelPhotos((prev) => ({
        ...prev,
        [idx]: url,
      }));
    } catch (err) {
      console.error('Failed to fetch photo for hotel', hotel?.hotel_name, err);
    }
  };

  // fetch photos for all hotels once we have trip/hotels
  useEffect(() => {
    if (!trip || !hotels.length) return;

    hotels.forEach((hotel, idx) => {
      // only fetch if we don't already have it
      if (!hotelPhotos[idx]) {
        fetchHotelPhoto(hotel, idx);
      }
    });
    // We intentionally DO include hotels and hotelPhotos in deps
    // but not fetchHotelPhoto (to avoid re-creating function churn).
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [trip, hotels]);

  // Build the list of cards first
  const hotelCards = hotels.map((h, idx) => {
    //Build "HotelName — Address"
    const nameAndAddress = [
      h?.hotel_name?.trim?.(),
      h?.address?.trim?.(),
    ]
      .filter(Boolean)
      .join(' — ');

    // Build maps URL
    const mapsUrl = nameAndAddress
      ? `https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(
          nameAndAddress
        )}`
      : null;

    // Choose photo: fetched photo first, fallback to AI image_url, fallback to logo
    const bannerImg =
      hotelPhotos[idx] ||
      h?.image_url ||
      '/logo.svg';

    return (
      <a
        key={idx}
        href={mapsUrl || undefined}
        target={mapsUrl ? '_blank' : undefined}
        rel={mapsUrl ? 'noopener noreferrer' : undefined}
        className="rounded-2xl border shadow-sm overflow-hidden bg-white hover:shadow-lg transition-shadow cursor-pointer block"
      >
        {/* Banner image */}
        <div className="w-full aspect-[3/1] bg-gray-100">
          <img
            src={bannerImg}
            alt={h?.hotel_name || 'Hotel'}
            className="w-full h-full object-cover"
            loading="lazy"
          />
        </div>

        <div className="p-5">
          {/* Hotel name as title */}
          <h3 className="text-xl font-semibold">
            {h?.hotel_name || 'Hotel'}
          </h3>

          {/* Name + address line with 📍 */}
          {nameAndAddress && (
            <p className="text-sm text-gray-600 mt-1">
              📍 {nameAndAddress}
            </p>
          )}

          {(h?.price_per_night_usd || h?.total_price_usd) && (
            <div className="mt-3 text-sm">
              {h?.price_per_night_usd && (
                <p>
                  Price per night:{' '}
                  <span className="font-semibold">
                    {h.price_per_night_usd}
                  </span>
                </p>
              )}
              {h?.total_price_usd && (
                <p>
                  Total for stay:{' '}
                  <span className="font-semibold">
                    {h.total_price_usd}
                  </span>
                </p>
              )}
            </div>
          )}

          {h?.description && (
            <p className="mt-3 text-sm text-gray-700">
              {h.description}
            </p>
          )}

          {h?.note && (
            <p className="mt-2 text-xs text-gray-500 italic">
              {h.note}
            </p>
          )}
        </div>
      </a>
    );
  });

  return (
    <section className="mt-6">
      <h2 className="text-2xl font-bold mb-4 flex items-center gap-2">
        <span role="img" aria-label="hotel">
          🏨
        </span>
        Hotel Recommendations
      </h2>

      {/* Vertical stacked list */}
      <div className="flex flex-col gap-6">
        {hotelCards}
      </div>
    </section>
  );
}

export default Hotels;

