
import { db } from '@/service/firebaseConfig';
import { doc, getDoc } from 'firebase/firestore';
import React, { useEffect, useRef, useState } from 'react';
import { useParams, useLocation } from 'react-router-dom';
import InfoSection from '../components/InfoSection';
import Hotels from '../components/Hotels';
import PlacesToVisit from '../components/PlacesToVisit';
import TripExtras from '../components/TripExtras';
import Footer from '../components/Footer';

function ViewTrip() {
  const { tripId } = useParams();
  const location = useLocation();
  const [trip, setTrip] = useState(null);
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(true);

  // Guard to avoid duplicate fetch in React.StrictMode (dev)
  const fetchedRef = useRef(false);

  useEffect(() => {
    console.log('Route pathname:', location.pathname);
    console.log('useParams():', { tripId });

    if (!tripId) {
      setError('No tripId in route.');
      setLoading(false);
      return;
    }

    if (fetchedRef.current) return; // prevent double-run in StrictMode
    fetchedRef.current = true;

    (async () => {
      try {
        const docRef = doc(db, 'trips', String(tripId));
        console.log('Fetching doc for tripId:', tripId);
        const snap = await getDoc(docRef);
        if (snap.exists()) {
          console.log('Document data:', snap.data());
          setTrip(snap.data());
        } else {
          console.warn('Trip doc not found:', tripId);
          setError('Trip not found.');
        }
      } catch (e) {
        console.error('Error fetching trip:', e);
        setError('Failed to fetch trip.');
      } finally {
        setLoading(false);
      }
    })();
  }, [tripId, location.pathname]);

  if (loading) return <div>Loading trip...</div>;
  if (error)   return <div>{error}</div>;

  return (
    <div className='p-10 md:px-20 lg:px-44 xl:px-56'>
      {/* {Information Section} */}

      <InfoSection trip={trip} />

      {/* {Recommended Hotels} */}

      <Hotels trip={trip} />

      {/* {Daily Plan} */}

      <PlacesToVisit trip={trip} />

      {/* Trip Extras */}

      <TripExtras trip={trip} />

      {/* Footer */}

      <Footer/>

    </div>
  );
}

export default ViewTrip;