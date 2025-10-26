
export const SelectTravelesList = [
  {
    id: 1,
    title: 'Just Me',
    desc: 'A sole traveler in exploration',
    icon: '👤',
    people: '1'
  },
  {
    id: 2,
    title: 'A Couple',
    desc: 'Two travelers in tandem',
    icon: '👫',
    people: '2 People'
  },
  {
    id: 3,
    title: 'Family',
    desc: 'A group of fun-loving adventurers',
    icon: '👨‍👩‍👧‍👦',
    people: '3 to 5 People'
  },
  {
    id: 4,
    title: 'Squad',
    desc: 'A lively group of friends on a mission',
    icon: '🎉',
    people: '6+ People'
  }
];

export const SelectBudgetOptions = [
  {
    id: 1,
    title: 'Cheap',
    desc: 'Stay conscious of costs',
    icon: '💰',
  },
  {
    id: 2,
    title: 'Moderate',
    desc: 'Keep cost on the average side',
    icon: '💵',
  },
  {
    id: 3,
    title: 'Comfortable',
    desc: 'Enjoy quality without breaking the bank',
    icon: '✨',
  },
  {
    id: 4,
    title: 'Luxury',
    desc: 'Indulge in the finest experiences',
    icon: '💎',
  }
];

export const AI_PROMPT = `
Generate a detailed and personalized travel itinerary for {location} for {days} days, tailored for a group of {travelers} with a {budget} budget. Include a day-by-day plan with morning, afternoon, and evening activities; recommended local restaurants and cuisine; estimated daily and total budget in USD; accommodation suggestions with hotel name, address, price per night, and image URL; transportation tips within the city; must-see landmarks and hidden gems with place name, description, image URL, geo coordinates, ticket pricing, rating, and best time to visit; cultural or practical travel tips; and weather-appropriate packing advice. Present the entire response in valid JSON format.
`;