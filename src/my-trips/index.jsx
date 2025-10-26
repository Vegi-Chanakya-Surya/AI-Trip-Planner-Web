import { db } from '@/service/firebaseConfig';
import { collection, query, where, getDocs } from "firebase/firestore";
import React, { useEffect, useState } from 'react'
import { useNavigation } from 'react-router-dom';
import UseTripCardItem from './components/UseTripCardItem';

function MyTrips() {

    const navigation = useNavigation();

    const [userTrips, setUserTrips] = useState([]);

    useEffect(() => {
        GetUserTrips();

    }, []);
    const GetUserTrips = async () => {
        const user = JSON.parse(localStorage.getItem('user'));
        
        if(!user)
        {
            navigation.navigate('/'); // Redirect to home if not logged in
        }

        
        const q = query(collection(db, "trips"), where("userEmail", "==", user.email));

        const querySnapshot = await getDocs(q);
        setUserTrips([]);
            querySnapshot.forEach((doc) => {
            // doc.data() is never undefined for query doc snapshots
            console.log(doc.id, " => ", doc.data());
            setUserTrips(prevVal => [...prevVal, doc.data()])
});
    }
  return (
    <div className='sm:p-10 md:px-32 lg:px-56 xl:px-72 px-5 mt-10'>
        <h2 className='font-bold text-4xl text-violet-700'>
            My Trips
        </h2>
        <div className='grid grid-cols-2 mt-10 md:grid-cols-3 gap-5'>
            {/* {userTrips.map((trip, index) => (
                <UseTripCardItem trip = {trip} />
            ))} */}
            {userTrips?.length > 0 ? userTrips.map((trip, index) => (
                <UseTripCardItem key={index} trip={trip} />
                ))

                :[1,2,3,4,5,6].map((item, index) => (
                    <div key = {index} className='h-[250px] w-full bg-slate-200 animate-pulse rounded-xl'>

                    </div>
                ))

            }

        </div>
    </div>
  )
}

export default MyTrips