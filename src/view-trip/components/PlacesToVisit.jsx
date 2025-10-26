
// new trial 3.1 --------

import React, { useEffect, useState } from 'react';
import { GetPlaceDetails } from '@/service/GlobalAPI';
import { PHOTO_REF_URL } from '@/service/GlobalAPI';

function PlacesToVisit({ trip }) {
  // pull the array safely
  const itineraryArr = Array.isArray(trip?.tripdata?.day_by_day_itinerary)
    ? trip.tripdata.day_by_day_itinerary
    : [];

  // map of fetched photos:
  // key will be like "0-morning", "0-afternoon", "0-evening"
  // value will be the resolved photo URL
  const [imageMap, setImageMap] = useState({});

  // helper: google maps link for a place
  const buildMapsUrl = (placeName) => {
    if (!placeName) return null;
    return `https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(
      placeName
    )}`;
  };

  /**
   * Build the best possible search text for the Places API.
   * Priority:
   * 1. place_name (e.g. "Giza Pyramids")
   * 2. activity   (e.g. "Citadel of Saladin & Mosque of Muhammad Ali")
   * 3. fallbackContext like "Cairo Egypt" / trip?.userSelection?.location
   */
  const buildTextQuery = (blockData, fallbackContext) => {
    const parts = [
      blockData?.place_name,
      blockData?.activity,
      fallbackContext,
      trip?.userSelection?.location
    ]
      .filter(Boolean)
      .map(str => String(str).trim());

    // Join with comma to improve locality for Google Places
    return parts.join(', ');
  };

  /**
   * Extract the best photoName from the Places API response.
   * We’ll look through up to first ~5 photos instead of only first 3.
   */
  const extractPhotoName = (resp) => {
    const photos = resp?.data?.places?.[0]?.photos;
    if (!Array.isArray(photos) || !photos.length) return null;

    // Try each photo in order until we find a .name
    for (let i = 0; i < photos.length; i++) {
      if (photos[i]?.name) {
        return photos[i].name;
      }
    }
    return null;
  };

  /**
   * Fetch a photo URL for a given block (morning/afternoon/evening of a given day).
   * We now pass a "context" so Places API has more clue (like "Cairo, Egypt").
   */
  const fetchBlockPhoto = async (blockData, dayIdx, slot, fallbackContext) => {
    if (!blockData) return;

    const key = `${dayIdx}-${slot}`;

    // avoid refetching if we've got it
    if (imageMap[key]) return;

    // build a strong query for this block
    const textQuery = buildTextQuery(blockData, fallbackContext);
    if (!textQuery) return;

    try {
      const resp = await GetPlaceDetails({ textQuery });

      // pull best available photo reference
      const photoName = extractPhotoName(resp);
      if (!photoName) return;

      const url = PHOTO_REF_URL.replace('{NAME}', photoName);

      setImageMap((prev) => ({
        ...prev,
        [key]: url,
      }));
    } catch (err) {
      console.error('Failed to fetch photo for', textQuery, err);
    }
  };

  /**
   * Fire off fetches after trip/itinerary load.
   * We'll also pass fallbackContext for better disambiguation.
   * Example fallbackContext:
   *   dayBlock.theme ("Pyramids & Ancient Wonders")
   *   OR maybe the city like "Cairo, Egypt"
   */
  useEffect(() => {
    if (!trip || !itineraryArr.length) return;

    itineraryArr.forEach((dayBlock, dayIdx) => {
      const fallbackContext =
        dayBlock?.theme ||
        trip?.userSelection?.location ||
        '';

      if (dayBlock?.morning) {
        fetchBlockPhoto(dayBlock.morning, dayIdx, 'morning', fallbackContext);
      }
      if (dayBlock?.afternoon) {
        fetchBlockPhoto(dayBlock.afternoon, dayIdx, 'afternoon', fallbackContext);
      }
      if (dayBlock?.evening) {
        fetchBlockPhoto(dayBlock.evening, dayIdx, 'evening', fallbackContext);
      }
    });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [trip, itineraryArr]);

  if (!trip) {
    return null;
  }

  if (!itineraryArr.length) {
    return null; // nothing to show
  }

  // helper: reusable block for morning / afternoon / evening
  const TimeBlock = ({ label, data, dayIdx, slot }) => {
    if (!data) return null;

    const mapsUrl = buildMapsUrl(data.place_name);

    // which key in imageMap are we using
    const imgKey = `${dayIdx}-${slot}`;

    /**
     * finalImage priority:
     * 1. fetched Google Places imageMap[key]
     * 2. data.image_url from AI
     * 3. NO IMAGE fallback: we'll STILL render the <div> but with a subtle gradient bg
     *    instead of /logo.svg. This avoids that cheap-looking logo spam.
     */
    const finalImage = imageMap[imgKey] || data.image_url || null;

    return (
      <div className="flex flex-col gap-3">
        {/* Top row with label + activity + price */}
        <div className="flex items-start justify-between flex-wrap gap-2">
          <div className="text-lg font-semibold flex-1">
            {label}
            <span className="font-normal">
              {data.activity ? ` — ${data.activity}` : ''}
            </span>
          </div>

          {data.ticket_pricing && (
            <div className="text-xs text-gray-500 text-right">
              {data.ticket_pricing}
            </div>
          )}
        </div>

        {/* Image banner */}
        <div className="w-full aspect-[3/1] rounded-lg overflow-hidden bg-gray-100">
          {finalImage ? (
            <img
              src={finalImage}
              alt={data.place_name || data.activity || 'Location'}
              className="w-full h-full object-cover"
              loading="lazy"
            />
          ) : (
            <div className="w-full h-full bg-gradient-to-br from-gray-200 to-gray-300 flex items-center justify-center text-gray-500 text-xs">
              No image available
            </div>
          )}
        </div>

        {/* Place, rating, best time */}
        <div className="text-sm flex flex-col gap-1">
          {data.place_name && (
            <p className="text-gray-700">
              📍{' '}
              <a
                href={mapsUrl || undefined}
                target={mapsUrl ? '_blank' : undefined}
                rel={mapsUrl ? 'noopener noreferrer' : undefined}
                className="text-blue-600 underline"
              >
                {data.place_name}
              </a>
            </p>
          )}

          {data.rating && (
            <p className="text-gray-700">
              ⭐ {data.rating}
            </p>
          )}

          {data.best_time_to_visit && (
            <p className="text-gray-500 text-xs">
              ⏰ {data.best_time_to_visit}
            </p>
          )}
        </div>

        {/* Description */}
        {data.description && (
          <p className="text-sm text-gray-700">
            {data.description}
          </p>
        )}

        {/* Food suggestion */}
        {data.restaurant_suggestion && (
          <p className="text-sm text-gray-700">
            🍽 {data.restaurant_suggestion}
          </p>
        )}
      </div>
    );
  };

  return (
    <section className="mt-10">
      <h2 className="text-2xl font-bold mb-4 flex items-center gap-2">
        <span role="img" aria-label="pin">📍</span>
        Day-by-day Itinerary
      </h2>

      <div className="flex flex-col gap-8">
        {itineraryArr.map((dayBlock, dayIndex) => (
          <div
            key={dayIndex}
            className="rounded-2xl border shadow-sm bg-white overflow-hidden"
          >
            {/* Day header */}
            <div className="p-5 border-b bg-gray-50">
              <h3 className="text-xl font-semibold">
                Day {dayBlock?.day ?? dayIndex + 1}
                {dayBlock?.theme ? (
                  <span className="font-normal">: {dayBlock.theme}</span>
                ) : null}
              </h3>
            </div>

            {/* Blocks */}
            <div className="p-5 flex flex-col gap-8">
              <TimeBlock
                label="🌅 Morning"
                data={dayBlock?.morning}
                dayIdx={dayIndex}
                slot="morning"
              />
              <TimeBlock
                label="🌤 Afternoon"
                data={dayBlock?.afternoon}
                dayIdx={dayIndex}
                slot="afternoon"
              />
              <TimeBlock
                label="🌙 Evening"
                data={dayBlock?.evening}
                dayIdx={dayIndex}
                slot="evening"
              />
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}

export default PlacesToVisit;


