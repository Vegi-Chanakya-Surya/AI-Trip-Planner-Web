
// import { GoogleGenerativeAI } from '@google/generative-ai';

// // --- GEMINI API INITIALIZATION ---
// const apiKey = import.meta.env.VITE_GOOGLE_GEMINI_AI_API_KEY;

// if (!apiKey) {
//   console.error('Missing VITE_GOOGLE_GEMINI_AI_API_KEY. Please check your .env file.');
// }

// // 1. Define the generationConfig for the model
// const generationConfig = {
//     temperature: 1,
//     topP: 0.95,
//     maxOutputTokens: 8192,
//     responseMimeType: 'application/json',
// };

// // 2. Define the pre-populated history parts
// const userPrompt = "Generate a detailed and personalized travel itinerary for {location} for {days} days, tailored for a group of {travelers} with a {budget} budget. Include a day-by-day plan with morning, afternoon, and evening activities; recommended local restaurants and cuisine; estimated daily and total budget in USD; accommodation suggestions , including hotel name, address, price per night, and image URL; transportation tips within the city; must-see landmarks and hidden gems with place name, description, image URL, geo coordinates, ticket pricing, rating, and best time to visit; cultural or practical travel tips; and weather-appropriate packing advice. Present the entire response in valid JSON format.";
// const modelResponseText = `{
//   "itinerary_for": {
//     "location": "Tokyo, Japan",
//     "days": 7,
//     "travelers": 4,
//     "budget_type": "Mid-Range"
//   },
//   "budget_summary": {
//     "currency": "USD",
//     "daily_estimated_budget": "707.71",
//     "total_estimated_budget": "4954.00",
//     "breakdown": {
//       "accommodation_6_nights": "2100.00",
//       "food_and_drink": "1400.00",
//       "local_transport_pass": "420.00",
//       "activities_and_tickets": "334.00",
//       "miscellaneous_and_buffer": "700.00"
//     }
//   },
//   "accommodation": 
//   {
//     "hotel_name": "Hotel Gracery Shinjuku (Godzilla Hotel)",
//     "address": "1-19-1 Kabuki-cho, Shinjuku-ku, Tokyo, Japan, 160-8466",
//     "description": "A popular mid-range hotel in the heart of Shinjuku's entertainment district, known for the iconic life-sized Godzilla Head on its terrace.",
//     "price_per_night_usd": "350.00",
//     "total_price_usd": "2100.00",
//     "image_url": "https://i.imgur.com/placeholder-hotelgracery.jpg",
//     "note": "Price is an estimate for 6 nights for 4 adults."
//   },

//   "transportation_tips": {
//     "main_method": "Train & Subway (JR and Tokyo Metro)",
//     "tips": [
//       "Purchase a reloadable **Suica or Pasmo IC card** immediately upon arrival for seamless travel on all trains, subways, and buses. It can also be used at many vending machines and convenience stores.",
//       "The **JR Yamanote Line** is a loop connecting major hubs like Shinjuku, Shibuya, Tokyo, and Ueno. Use it as your primary route.",
//       "Avoid travel during **rush hour** (approx. 7:30-9:30 AM and 5:00-7:30 PM) to bypass extremely crowded trains.",
//       "Consider a **Tokyo Subway Ticket (24/48/72-hour pass)** for heavy sightseeing days, as it offers unlimited rides on the Tokyo Metro and Toei subway lines for tourists."
//     ]
//   },
//   "cultural_and_practical_tips": [
//     "**Etiquette on Public Transport:** Be quiet. Set your phone to silent mode and refrain from taking phone calls on the train.",
//     "**Eating in Public:** Generally, avoid eating or drinking while walking on the street. Use designated seating areas or consume items in the store where they were purchased.",
//     "**Tipping:** Tipping is not customary in Japan and can be considered rude or confusing.",
//     "**Shoes:** Remove your shoes when entering homes, many traditional restaurants (*izakaya*), temples/shrines, and certain fitting rooms."
//   ],
//   "packing_advice": {
//     "season_assumption": "Spring (March - May) or Autumn (September - November)",
//     "weather": "Mild days (15°C - 25°C) and cooler mornings/evenings. Occasional rain showers.",
//     "essentials": [
//       "Light layers (long-sleeve shirts, cardigans, light sweaters)",
//       "A light, waterproof/windproof jacket or trench coat",
//       "Comfortable, high-quality walking shoes (you will walk a lot)",
//       "A compact, foldable umbrella or rain gear",
//       "Stylish yet modest clothing (Japanese culture is generally well-dressed)",
//       "Universal power adapter and a portable battery pack (for all-day use of navigation apps)"
//     ]
//   },
//   "day_by_day_itinerary": [
//     {
//       "day": 1,
//       "theme": "Arrival and Shinjuku Neon",
//       "morning": {
//         "activity": "Check-in & Shinjuku Gyoen National Garden",
//         "description": "Settle into the hotel. Head to the garden for a serene mix of traditional Japanese, French, and English landscaping—a peaceful escape from the city bustle.",
//         "restaurant_suggestion": "Grab quick, high-quality onigiri and coffee from a local **convenience store (konbini)** near Shinjuku Station for a budget-friendly and authentic breakfast."
//       },
//       "afternoon": {
//         "activity": "Tokyo Metropolitan Government Building",
//         "description": "Visit the South or North Observatory for a **free** 360-degree panoramic view of Tokyo. Look for Mt. Fuji on a clear day.",
//         "place_name": "Tokyo Metropolitan Government Building",
//         "ticket_pricing": "Free",
//         "best_time_to_visit": "Late afternoon (before sunset)",
//         "rating": "4.5/5",
//         "geo_coordinates": "35.6895° N, 139.6917° E",
//         "image_url": "https://i.imgur.com/placeholder-tmgb.jpg  "
//       },
//       "evening": {
//         "activity": "Golden Gai & Omoide Yokocho (Memory Lane)",
//         "description": "Explore the nostalgic, narrow alleys of Omoide Yokocho for yakitori dinner, and finish with a drink at a tiny, atmospheric bar in Shinjuku Golden Gai.",
//         "restaurant_suggestion": "**Yakitori Alley (Omoide Yokocho)** for affordable grilled skewers (yakitori) and a local atmosphere. Expect to pay $\\sim\$25-\$35$ per person."
//       }
//     },
//     {
//       "day": 2,
//       "theme": "Modern Culture & The Iconic View",
//       "morning": {
//         "activity": "Meiji Jingu Shrine & Forest Stroll",
//         "description": "Visit the peaceful Shinto shrine, entering through the massive Torii gate. Aim for an early start to experience the tranquility before the crowds.",
//         "place_name": "Meiji Jingu Shrine",
//         "ticket_pricing": "Free (Shrine Grounds)",
//         "best_time_to_visit": "Early morning (06:00 AM opening)",
//         "rating": "4.7/5",
//         "geo_coordinates": "35.6766° N, 139.7020° E",
//         "image_url": "https://i.imgur.com/placeholder-meijijingu.jpg  "
//       },
//       "afternoon": {
//         "activity": "Harajuku & Takeshita Street",
//         "description": "Explore the epicenter of Japanese youth culture and street fashion. Wander down Takeshita Street for quirky shops, crepes, and vibrant energy. See the famous Hachiko statue near Shibuya Station.",
//         "restaurant_suggestion": "**Gindaco** for Takoyaki (octopus balls) in Harajuku (Street Food). For lunch, grab a quick and customizable bowl of ramen at **Ichiran Shibuya** (mid-range: $\\sim\$10-\$15$ per person)."
//       },
//       "evening": {
//         "activity": "Shibuya Crossing & SHIBUYA SKY",
//         "description": "Experience the famous Shibuya 'Scramble' Crossing. Head up to SHIBUYA SKY, an open-air observation deck, for a breathtaking sunset/night view of the city.",
//         "place_name": "SHIBUYA SKY",
//         "ticket_pricing": "Approx. $20 - $25 USD (Advance Online, Sunset time is highest price)",
//         "best_time_to_visit": "Sunset (must book time slot in advance)",
//         "rating": "4.7/5",
//         "geo_coordinates": "35.6596° N, 139.7001° E",
//         "image_url": "https://i.imgur.com/placeholder-shibuyasky.jpg  "
//       }
//     },
//     {
//       "day": 3,
//       "theme": "Old Tokyo and Skytree",
//       "morning": {
//         "activity": "Senso-ji Temple & Nakamise-dori",
//         "description": "Visit Tokyo's oldest temple in the Asakusa district. Walk down the lively Nakamise-dori street leading up to the main hall, browsing traditional crafts and snacks.",
//         "place_name": "Senso-ji Temple",
//         "ticket_pricing": "Free (Main Temple)",
//         "best_time_to_visit": "Early morning (6:00 AM opening) to see the temple quiet and illuminated.",
//         "rating": "4.7/5",
//         "geo_coordinates": "35.7148° N, 139.7967° E",
//         "image_url": "https://i.imgur.com/placeholder-sensoji.jpg  "
//       },
//       "afternoon": {
//         "activity": "Tokyo Skytree Town & Sumida River Cruise (Optional)",
//         "description": "Ascend the Tokyo Skytree for a different perspective of the city. Alternatively, enjoy a short Sumida River cruise that offers unique views of the city's landmarks.",
//         "restaurant_suggestion": "**Unatoto Asakusa** for affordable and delicious Unagi (grilled eel over rice) in the Asakusa area (mid-range: $\\sim\$15-\$25$ per person)."
//       },
//       "evening": {
//         "activity": "Ueno Park & Ameya-Yokocho",
//         "description": "Stroll through Ueno Park, home to several museums and a zoo, then explore the bustling Ameya-Yokocho market for a dynamic street-side dining experience and local shopping.",
//         "restaurant_suggestion": "Dinner at a local shop in **Ameya-Yokocho Market** (Ueno) for cheap and cheerful skewers, seafood, and a lively atmosphere."
//       }
//     },
//     {
//       "day": 4,
//       "theme": "Art, Fish Market & Luxury Shopping",
//       "morning": {
//         "activity": "Tsukiji Outer Market Food Tour",
//         "description": "Explore the vibrant outdoor/wholesale market stalls (separate from the new Toyosu Market). Sample fresh sushi, tamagoyaki (rolled omelet), and local delicacies for breakfast and lunch.",
//         "restaurant_suggestion": "Breakfast/Lunch: Fresh sushi and street food at a stall in the **Tsukiji Outer Market**. Try **Sushizanmai** for mid-range, high-quality sushi."
//       },
//       "afternoon": {
//         "activity": "teamLab Planets TOKYO",
//         "description": "An incredibly popular, immersive digital art museum experience where you walk barefoot through changing, sensory-engaging installations.",
//         "place_name": "teamLab Planets TOKYO DMM",
//         "ticket_pricing": "Approx. $30 USD (Advance Online, varies by date/time)",
//         "best_time_to_visit": "Book timed ticket for early afternoon slot",
//         "rating": "4.7/5",
//         "geo_coordinates": "35.6548° N, 139.7997° E",
//         "image_url": "https://i.imgur.com/placeholder-teamlabplanets.jpg  "
//       },
//       "evening": {
//         "activity": "Ginza Shopping & Dinner",
//         "description": "Window shop along the upscale streets of Ginza, famous for luxury boutiques and department stores. Have a delicious dinner exploring the area's diverse food scene.",
//         "restaurant_suggestion": "**Sushi No Midori Ginza** for excellent, mid-range sushi that is popular with locals (prepare for a wait). Or, try a Katsu Curry chain like **CoCo Ichibanya** for a cheap, hearty meal."
//       }
//     },
//     {
//       "day": 5,
//       "theme": "Pop Culture & Hidden Cats",
//       "morning": {
//         "activity": "Akihabara (Electric Town)",
//         "description": "Explore the center of anime, manga, and video game culture. Visit multi-story arcades like Taito Station, browse electronic shops, and check out themed cafes.",
//         "restaurant_suggestion": "Lunch: Try a unique dining experience like a **Maid Cafe** (for fun) or grab a delicious *Gyukatsu* (fried beef cutlet) set meal at **Gyukatsu Motomura**."
//       },
//       "afternoon": {
//         "activity": "Hidden Gem: Gotokuji Temple",
//         "description": "Travel to the Setagaya district to visit Gotokuji Temple, the birthplace of the *Maneki Neko* (beckoning cat), featuring an area filled with thousands of cat statues.",
//         "place_name": "Gotokuji Temple",
//         "ticket_pricing": "Free (Temple Grounds)",
//         "best_time_to_visit": "Afternoon",
//         "rating": "4.5/5",
//         "geo_coordinates": "35.6508° N, 139.6582° E",
//         "image_url": "https://i.imgur.com/placeholder-gotokuji.jpg  "
//       },
//       "evening": {
//         "activity": "Shimokitazawa Bohemian Vibes",
//         "description": "Explore the trendy, relaxed neighborhood of Shimokitazawa, known for vintage clothing, independent theaters, and unique cafes.",
//         "restaurant_suggestion": "Dinner at a local, cozy **Izakaya** in Shimokitazawa for shared plates and local drinks. This is a great area for casual, authentic dining."
//       }
//     },
//     {
//       "day": 6,
//       "theme": "Day Trip: Hakone (Mt. Fuji Area)",
//       "morning": {
//         "activity": "Travel to Hakone & Ropeway",
//         "description": "Take the train to Odawara and use the Hakone Free Pass (optional purchase) to begin the scenic loop. Take the Hakone Ropeway for spectacular views of Mt. Fuji and Lake Ashi (weather permitting).",
//         "restaurant_suggestion": "Quick, casual lunch near the ropeway station. Try the famous **Kuro-tamago** (black eggs cooked in the hot sulfur springs) in Owakudani."
//       },
//       "afternoon": {
//         "activity": "Lake Ashi Cruise & Art",
//         "description": "Take a cruise on Lake Ashi on a pirate ship replica. Visit the Hakone Open-Air Museum, which features a vast collection of sculptures and art with natural mountain backdrops.",
//         "place_name": "Hakone Open-Air Museum",
//         "ticket_pricing": "Approx. $15 - $20 USD",
//         "best_time_to_visit": "Early afternoon",
//         "rating": "4.6/5",
//         "geo_coordinates": "35.2341° N, 139.0435° E (Example: Hakone-Yumoto)",
//         "image_url": "https://i.imgur.com/placeholder-hakone.jpg  "
//       },
//       "evening": {
//         "activity": "Return to Shinjuku & Unwind",
//         "description": "Take the scenic Romancecar train back to Shinjuku. Have a relaxed group dinner near your hotel.",
//         "restaurant_suggestion": "**Torikizoku Shinjuku** (mid-range chain) for delicious, inexpensive yakitori and drinks with set pricing, which is great for a group of 4. Or a celebratory Tonkatsu meal."
//       }
//     },
//     {
//       "day": 7,
//       "theme": "Imperial History & Departure",
//       "morning": {
//         "activity": "Imperial Palace East Garden",
//         "description": "Visit the former site of Edo Castle and the current Imperial Palace grounds. This public park features beautiful stone walls, gates, and the Ninomaru Garden.",
//         "place_name": "Imperial Palace East Garden",
//         "ticket_pricing": "Free",
//         "best_time_to_visit": "Morning",
//         "rating": "4.5/5",
//         "geo_coordinates": "35.6851° N, 139.7547° E",
//         "image_url": "https://i.imgur.com/placeholder-imperial.jpg  "
//       },
//       "afternoon": {
//         "activity": "Tokyo Station Area & Final Shopping",
//         "description": "Explore the restored brick architecture of Tokyo Station's Marunouchi side and the underground shopping complex of Tokyo Station City (for souvenirs and unique snacks).",
//         "restaurant_suggestion": "Quick lunch at **Tokyo Ramen Street** beneath Tokyo Station, which features eight of Japan's most famous ramen shops, perfect for a final, delicious group meal (mid-range)."
//       },
//       "evening": {
//         "activity": "Final Departure",
//         "description": "Transfer to Narita (NRT) or Haneda (HND) airport via Limousine Bus, Narita Express, or Keisei Skyliner. Purchase last-minute snacks and gifts at the airport."
//       }
//     }
//   ]
// }`; 
// // 3. Initialize the Gemini client and chat session
// const genAI = apiKey ? new GoogleGenerativeAI(apiKey) : null;
// const modelInstance = genAI ? genAI.getGenerativeModel({
//   model: 'gemini-2.5-flash-lite',
//   generationConfig: generationConfig,
// }) : null;

// // The chat session, exported for use, initialized with history
// export const chatSession = modelInstance ? modelInstance.startChat({
//     history: [
//         { 
//             role: 'user',
//             parts: [{ text: userPrompt }] 
//         },
//         {
//             role: 'model',
//             parts: [{ text: modelResponseText }] 
//         }
//     ],
// }) : null;

import { GoogleGenerativeAI } from '@google/generative-ai';

// --- GEMINI API INITIALIZATION ---
const apiKey = import.meta.env.VITE_GOOGLE_GEMINI_AI_API_KEY;

if (!apiKey) {
  console.error('Missing VITE_GOOGLE_GEMINI_AI_API_KEY. Please check your .env file.');
}

// 1. Define the generationConfig for the model
const generationConfig = {
    temperature: 1,
    topP: 0.95,
    maxOutputTokens: 8192,
    responseMimeType: 'application/json',
};

// 2. Define the pre-populated history parts
const userPrompt = "Generate a detailed and personalized travel itinerary for {location} for {days} days, tailored for a group of {travelers} with a {budget} budget. Include a day-by-day plan with morning, afternoon, and evening activities; recommended local restaurants and cuisine; estimated daily and total budget in USD; accommodation suggestions, address, price per night, and image URL; transportation tips within the city; must-see landmarks and hidden gems with place name, description, image URL, geo coordinates, ticket pricing, rating, and best time to visit; cultural or practical travel tips; and weather-appropriate packing advice. Present the entire response in valid JSON format and remember I said return in (** valid JSON format **).";
const modelResponseText = `{
  "itinerary_for": {
    "location": "Tokyo, Japan",
    "days": 7,
    "travelers": 4,
    "budget_type": "Mid-Range"
  },
  "budget_summary": {
    "currency": "USD",
    "daily_estimated_budget": "707.71",
    "total_estimated_budget": "4954.00",
    "breakdown": {
      "accommodation_6_nights": "2100.00",
      "food_and_drink": "1400.00",
      "local_transport_pass": "420.00",
      "activities_and_tickets": "334.00",
      "miscellaneous_and_buffer": "700.00"
    }
  },
  "accommodation": {
    "hotel_name": "Hotel Gracery Shinjuku (Godzilla Hotel)",
    "address": "1-19-1 Kabuki-cho, Shinjuku-ku, Tokyo, Japan, 160-8466",
    "description": "A popular mid-range hotel in the heart of Shinjuku's entertainment district, known for the iconic life-sized Godzilla Head on its terrace. It offers clean, modern rooms and excellent transport links.",
    "price_per_night_usd": "350.00",
    "total_price_usd": "2100.00",
    "image_url": "https://i.imgur.com/placeholder-hotelgracery.jpg    ",
    "note": "Price is an estimate for 6 nights for 4 adults (e.g., two twin rooms or a suite), highly recommend booking well in advance."
  },
  "transportation_tips": {
    "main_method": "Train & Subway (JR and Tokyo Metro)",
    "tips": [
      "Purchase a reloadable **Suica or Pasmo IC card** immediately upon arrival for seamless travel on all trains, subways, and buses. It can also be used at many vending machines and convenience stores.",
      "The **JR Yamanote Line** is a loop connecting major hubs like Shinjuku, Shibuya, Tokyo, and Ueno. Use it as your primary route.",
      "Avoid travel during **rush hour** (approx. 7:30-9:30 AM and 5:00-7:30 PM) to bypass extremely crowded trains.",
      "Consider a **Tokyo Subway Ticket (24/48/72-hour pass)** for heavy sightseeing days, as it offers unlimited rides on the Tokyo Metro and Toei subway lines for tourists."
    ]
  },
  "cultural_and_practical_tips": [
    "**Etiquette on Public Transport:** Be quiet. Set your phone to silent mode and refrain from taking phone calls on the train.",
    "**Eating in Public:** Generally, avoid eating or drinking while walking on the street. Use designated seating areas or consume items in the store where they were purchased.",
    "**Tipping:** Tipping is not customary in Japan and can be considered rude or confusing.",
    "**Shoes:** Remove your shoes when entering homes, many traditional restaurants (*izakaya*), temples/shrines, and certain fitting rooms."
  ],
  "packing_advice": {
    "season_assumption": "Spring (March - May) or Autumn (September - November)",
    "weather": "Mild days (15°C - 25°C) and cooler mornings/evenings. Occasional rain showers.",
    "essentials": [
      "Light layers (long-sleeve shirts, cardigans, light sweaters)",
      "A light, waterproof/windproof jacket or trench coat",
      "Comfortable, high-quality walking shoes (you will walk a lot)",
      "A compact, foldable umbrella or rain gear",
      "Stylish yet modest clothing (Japanese culture is generally well-dressed)",
      "Universal power adapter and a portable battery pack (for all-day use of navigation apps)"
    ]
  },
  "day_by_day_itinerary": [
    {
      "day": 1,
      "theme": "Arrival and Shinjuku Neon",
      "morning": {
        "activity": "Check-in & Shinjuku Gyoen National Garden",
        "description": "Settle into the hotel. Head to the garden for a serene mix of traditional Japanese, French, and English landscaping—a peaceful escape from the city bustle.",
        "restaurant_suggestion": "Grab quick, high-quality onigiri and coffee from a local **convenience store (konbini)** near Shinjuku Station for a budget-friendly and authentic breakfast."
      },
      "afternoon": {
        "activity": "Tokyo Metropolitan Government Building",
        "description": "Visit the South or North Observatory for a **free** 360-degree panoramic view of Tokyo. Look for Mt. Fuji on a clear day.",
        "place_name": "Tokyo Metropolitan Government Building",
        "ticket_pricing": "Free",
        "best_time_to_visit": "Late afternoon (before sunset)",
        "rating": "4.5/5",
        "geo_coordinates": "35.6895° N, 139.6917° E",
        "image_url": "https://i.imgur.com/placeholder-tmgb.jpg    "
      },
      "evening": {
        "activity": "Golden Gai & Omoide Yokocho (Memory Lane)",
        "description": "Explore the nostalgic, narrow alleys of Omoide Yokocho for yakitori dinner, and finish with a drink at a tiny, atmospheric bar in Shinjuku Golden Gai.",
        "restaurant_suggestion": "**Yakitori Alley (Omoide Yokocho)** for affordable grilled skewers (yakitori) and a local atmosphere. Expect to pay $\\sim\$25-\$35$ per person."
      }
    },
    {
      "day": 2,
      "theme": "Modern Culture & The Iconic View",
      "morning": {
        "activity": "Meiji Jingu Shrine & Forest Stroll",
        "description": "Visit the peaceful Shinto shrine, entering through the massive Torii gate. Aim for an early start to experience the tranquility before the crowds.",
        "place_name": "Meiji Jingu Shrine",
        "ticket_pricing": "Free (Shrine Grounds)",
        "best_time_to_visit": "Early morning (06:00 AM opening)",
        "rating": "4.7/5",
        "geo_coordinates": "35.6766° N, 139.7020° E",
        "image_url": "https://i.imgur.com/placeholder-meijijingu.jpg    "
      },
      "afternoon": {
        "activity": "Harajuku & Takeshita Street",
        "description": "Explore the epicenter of Japanese youth culture and street fashion. Wander down Takeshita Street for quirky shops, crepes, and vibrant energy. See the famous Hachiko statue near Shibuya Station.",
        "restaurant_suggestion": "**Gindaco** for Takoyaki (octopus balls) in Harajuku (Street Food). For lunch, grab a quick and customizable bowl of ramen at **Ichiran Shibuya** (mid-range: $\\sim\$10-\$15$ per person)."
      },
      "evening": {
        "activity": "Shibuya Crossing & SHIBUYA SKY",
        "description": "Experience the famous Shibuya 'Scramble' Crossing. Head up to SHIBUYA SKY, an open-air observation deck, for a breathtaking sunset/night view of the city.",
        "place_name": "SHIBUYA SKY",
        "ticket_pricing": "Approx. $20 - $25 USD (Advance Online, Sunset time is highest price)",
        "best_time_to_visit": "Sunset (must book time slot in advance)",
        "rating": "4.7/5",
        "geo_coordinates": "35.6596° N, 139.7001° E",
        "image_url": "https://i.imgur.com/placeholder-shibuyasky.jpg    "
      }
    },
    {
      "day": 3,
      "theme": "Old Tokyo and Skytree",
      "morning": {
        "activity": "Senso-ji Temple & Nakamise-dori",
        "description": "Visit Tokyo's oldest temple in the Asakusa district. Walk down the lively Nakamise-dori street leading up to the main hall, browsing traditional crafts and snacks.",
        "place_name": "Senso-ji Temple",
        "ticket_pricing": "Free (Main Temple)",
        "best_time_to_visit": "Early morning (6:00 AM opening) to see the temple quiet and illuminated.",
        "rating": "4.7/5",
        "geo_coordinates": "35.7148° N, 139.7967° E",
        "image_url": "https://i.imgur.com/placeholder-sensoji.jpg    "
      },
      "afternoon": {
        "activity": "Tokyo Skytree Town & Sumida River Cruise (Optional)",
        "description": "Ascend the Tokyo Skytree for a different perspective of the city. Alternatively, enjoy a short Sumida River cruise that offers unique views of the city's landmarks.",
        "restaurant_suggestion": "**Unatoto Asakusa** for affordable and delicious Unagi (grilled eel over rice) in the Asakusa area (mid-range: $\\sim\$15-\$25$ per person)."
      },
      "evening": {
        "activity": "Ueno Park & Ameya-Yokocho",
        "description": "Stroll through Ueno Park, home to several museums and a zoo, then explore the bustling Ameya-Yokocho market for a dynamic street-side dining experience and local shopping.",
        "restaurant_suggestion": "Dinner at a local shop in **Ameya-Yokocho Market** (Ueno) for cheap and cheerful skewers, seafood, and a lively atmosphere."
      }
    },
    {
      "day": 4,
      "theme": "Art, Fish Market & Luxury Shopping",
      "morning": {
        "activity": "Tsukiji Outer Market Food Tour",
        "description": "Explore the vibrant outdoor/wholesale market stalls (separate from the new Toyosu Market). Sample fresh sushi, tamagoyaki (rolled omelet), and local delicacies for breakfast and lunch.",
        "restaurant_suggestion": "Breakfast/Lunch: Fresh sushi and street food at a stall in the **Tsukiji Outer Market**. Try **Sushizanmai** for mid-range, high-quality sushi."
      },
      "afternoon": {
        "activity": "teamLab Planets TOKYO",
        "description": "An incredibly popular, immersive digital art museum experience where you walk barefoot through changing, sensory-engaging installations.",
        "place_name": "teamLab Planets TOKYO DMM",
        "ticket_pricing": "Approx. $30 USD (Advance Online, varies by date/time)",
        "best_time_to_visit": "Book timed ticket for early afternoon slot",
        "rating": "4.7/5",
        "geo_coordinates": "35.6548° N, 139.7997° E",
        "image_url": "https://i.imgur.com/placeholder-teamlabplanets.jpg    "
      },
      "evening": {
        "activity": "Ginza Shopping & Dinner",
        "description": "Window shop along the upscale streets of Ginza, famous for luxury boutiques and department stores. Have a delicious dinner exploring the area's diverse food scene.",
        "restaurant_suggestion": "**Sushi No Midori Ginza** for excellent, mid-range sushi that is popular with locals (prepare for a wait). Or, try a Katsu Curry chain like **CoCo Ichibanya** for a cheap, hearty meal."
      }
    },
    {
      "day": 5,
      "theme": "Pop Culture & Hidden Cats",
      "morning": {
        "activity": "Akihabara (Electric Town)",
        "description": "Explore the center of anime, manga, and video game culture. Visit multi-story arcades like Taito Station, browse electronic shops, and check out themed cafes.",
        "restaurant_suggestion": "Lunch: Try a unique dining experience like a **Maid Cafe** (for fun) or grab a delicious *Gyukatsu* (fried beef cutlet) set meal at **Gyukatsu Motomura**."
      },
      "afternoon": {
        "activity": "Hidden Gem: Gotokuji Temple",
        "description": "Travel to the Setagaya district to visit Gotokuji Temple, the birthplace of the *Maneki Neko* (beckoning cat), featuring an area filled with thousands of cat statues.",
        "place_name": "Gotokuji Temple",
        "ticket_pricing": "Free (Temple Grounds)",
        "best_time_to_visit": "Afternoon",
        "rating": "4.5/5",
        "geo_coordinates": "35.6508° N, 139.6582° E",
        "image_url": "https://i.imgur.com/placeholder-gotokuji.jpg    "
      },
      "evening": {
        "activity": "Shimokitazawa Bohemian Vibes",
        "description": "Explore the trendy, relaxed neighborhood of Shimokitazawa, known for vintage clothing, independent theaters, and unique cafes.",
        "restaurant_suggestion": "Dinner at a local, cozy **Izakaya** in Shimokitazawa for shared plates and local drinks. This is a great area for casual, authentic dining."
      }
    },
    {
      "day": 6,
      "theme": "Day Trip: Hakone (Mt. Fuji Area)",
      "morning": {
        "activity": "Travel to Hakone & Ropeway",
        "description": "Take the train to Odawara and use the Hakone Free Pass (optional purchase) to begin the scenic loop. Take the Hakone Ropeway for spectacular views of Mt. Fuji and Lake Ashi (weather permitting).",
        "restaurant_suggestion": "Quick, casual lunch near the ropeway station. Try the famous **Kuro-tamago** (black eggs cooked in the hot sulfur springs) in Owakudani."
      },
      "afternoon": {
        "activity": "Lake Ashi Cruise & Art",
        "description": "Take a cruise on Lake Ashi on a pirate ship replica. Visit the Hakone Open-Air Museum, which features a vast collection of sculptures and art with natural mountain backdrops.",
        "place_name": "Hakone Open-Air Museum",
        "ticket_pricing": "Approx. $15 - $20 USD",
        "best_time_to_visit": "Early afternoon",
        "rating": "4.6/5",
        "geo_coordinates": "35.2341° N, 139.0435° E (Example: Hakone-Yumoto)",
        "image_url": "https://i.imgur.com/placeholder-hakone.jpg    "
      },
      "evening": {
        "activity": "Return to Shinjuku & Unwind",
        "description": "Take the scenic Romancecar train back to Shinjuku. Have a relaxed group dinner near your hotel.",
        "restaurant_suggestion": "**Torikizoku Shinjuku** (mid-range chain) for delicious, inexpensive yakitori and drinks with set pricing, which is great for a group of 4. Or a celebratory Tonkatsu meal."
      }
    },
    {
      "day": 7,
      "theme": "Imperial History & Departure",
      "morning": {
        "activity": "Imperial Palace East Garden",
        "description": "Visit the former site of Edo Castle and the current Imperial Palace grounds. This public park features beautiful stone walls, gates, and the Ninomaru Garden.",
        "place_name": "Imperial Palace East Garden",
        "ticket_pricing": "Free",
        "best_time_to_visit": "Morning",
        "rating": "4.5/5",
        "geo_coordinates": "35.6851° N, 139.7547° E",
        "image_url": "https://i.imgur.com/placeholder-imperial.jpg    "
      },
      "afternoon": {
        "activity": "Tokyo Station Area & Final Shopping",
        "description": "Explore the restored brick architecture of Tokyo Station's Marunouchi side and the underground shopping complex of Tokyo Station City (for souvenirs and unique snacks).",
        "restaurant_suggestion": "Quick lunch at **Tokyo Ramen Street** beneath Tokyo Station, which features eight of Japan's most famous ramen shops, perfect for a final, delicious group meal (mid-range)."
      },
      "evening": {
        "activity": "Final Departure",
        "description": "Transfer to Narita (NRT) or Haneda (HND) airport via Limousine Bus, Narita Express, or Keisei Skyliner. Purchase last-minute snacks and gifts at the airport."
      }
    }
  ]
}`; 
// 3. Initialize the Gemini client and chat session
const genAI = apiKey ? new GoogleGenerativeAI(apiKey) : null;
const modelInstance = genAI ? genAI.getGenerativeModel({
  model: 'gemini-2.5-flash-lite',
  generationConfig: generationConfig,
}) : null;

// The chat session, exported for use, initialized with history
export const chatSession = modelInstance ? modelInstance.startChat({
    history: [
        { 
            role: 'user',
            parts: [{ text: userPrompt }] 
        },
        {
            role: 'model',
            parts: [{ text: modelResponseText }] 
        }
    ],
}) : null;