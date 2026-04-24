import { Button } from '@/components/ui/button';
import { GetPlaceDetails } from '@/service/GlobalAPI';
import React, { useEffect, useState } from 'react'
import { IoIosSend } from "react-icons/io";
import { PHOTO_REF_URL } from '@/service/GlobalAPI';


function InfoSection({ trip }) {

  const [photoUrl, setPhotoUrl] = useState();

  useEffect(() => {
    trip && GetPlacePhoto();
  }, [trip])
  console.log("Trip received in InfoSection:", trip);
if (!trip) {
  return <p>Loading trip details...</p>;
}
  const GetPlacePhoto = async () => {
    const data = {
      textQuery: trip?.userSelection?.location
    }

    const result = await GetPlaceDetails( data ).then(response => {
      console.log(response.data.places[0].photos[4].name);

      const PhotoUrl = PHOTO_REF_URL.replace('{NAME}', response.data.places[0].photos[4].name);
      setPhotoUrl(PhotoUrl);
    })
  }
  return (
    <div className="bg-card text-card-foreground rounded-xl overflow-hidden shadow-sm border border-border">
      <div className="w-full">
        {/* Photo - fallback to placeholder if not available */}
        <img
          src={photoUrl || '/placeholder.jpg'}
          alt={trip?.userSelection?.location || 'Trip image'}
          className="h-[340px] w-full object-cover"
        />
      </div>

      <div className="p-6">
        <div className="mt-1 mb-4 flex flex-col md:flex-row md:justify-between md:items-center gap-4">
          <div className="flex-1">
            <h2 className="text-4xl md:text-5xl font-extrabold text-foreground">
              {trip?.userSelection?.location || 'Location not found'}
            </h2>
            <div className="mt-4 flex flex-wrap gap-3 items-center">
              <span className="px-3 py-1 rounded-full bg-muted text-muted-foreground text-sm">💰 {trip?.userSelection?.budget} Budget</span>
              <span className="px-3 py-1 rounded-full bg-muted text-muted-foreground text-sm">🧳 {trip?.userSelection?.travelers}</span>
              <span className="px-3 py-1 rounded-full bg-muted text-muted-foreground text-sm">📅 {trip?.userSelection?.days} day(s)</span>
            </div>
          </div>

          <div className="flex-shrink-0">
            {/* Use primary button styling for clear CTA */}
            <Button className="bg-primary text-primary-foreground hover:bg-primary/90"> 
              <span className="flex items-center gap-2 px-4 py-2">
                <IoIosSend className="w-5 h-5" />
                Share Plan
              </span>
            </Button>
          </div>
        </div>

        {/* Optional description or metadata can go here */}
        <div className="text-sm text-muted-foreground">Generated itinerary and trip details are stored with your account. Use the buttons above to share or export.</div>
      </div>
    </div>
  )
}

export default InfoSection