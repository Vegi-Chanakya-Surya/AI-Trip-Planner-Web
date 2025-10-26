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
    <div>
        <img src = {photoUrl} className='h-[340px] w-full object-cover rounded-xl'/>
        <div className='mt-5 flex justify-between items-center'>
           <div className='my-5 flex flex-col gap-5'>
                  <h2 className='text-5xl font-bold text-violet-700'>
                      {trip?.userSelection?.location || "Location not found"} 
                      {console.log("Trip received in InfoSection:", trip)}
                  </h2>
                  <div className='flex gap-5'>
                    <h2 className='p-1 px-3 bg-gray-200 rounded-full text-black text-sm md:text-md'> 💰{trip?.userSelection?.budget} Budget</h2>
                    <h2 className='p-1 px-3 bg-gray-200 rounded-full text-black text-sm md:text-md'>Number of Travelers: 🧳 {trip?.userSelection?.travelers}</h2>
                    <h2 className='p-1 px-3 bg-gray-200 rounded-full text-black text-sm md:text-md'> 📅 {trip?.userSelection?.days} day(s) Trip </h2>
                  </div>
            </div>
            <Button><IoIosSend /></Button>
        </div>
    </div>
  )
}

export default InfoSection