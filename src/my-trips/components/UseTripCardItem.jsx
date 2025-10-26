import { GetPlaceDetails, PHOTO_REF_URL } from '@/service/GlobalAPI';
import React, { useEffect, useState } from 'react'
import { Link } from 'react-router-dom';

function UseTripCardItem( {trip}) {

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
    <Link to = {
        '/view-trip/' + trip.id
    }>
    <div className='hover:scale-105 transition-all rounded-xl'> 
        <img src={photoUrl?photoUrl:"/placeholder.jpg"} alt="Trip Image" className="w-full h-48 object-cover rounded-xl" />
        <div>
            <h2 className='font-bold text-lg text-slate-800'>
                {trip.userSelection.location}
            </h2>
            <h2 className='text-sm text-gray-500'>
                {trip.userSelection.days} days with {trip.userSelection.budget} budget for {trip.userSelection.travelers}
            </h2>
        </div>
    </div>
    </Link>
  )
}

export default UseTripCardItem