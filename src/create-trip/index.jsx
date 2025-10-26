import React, { useEffect } from 'react'
import GooglePlacesAutocomplete from 'react-google-places-autocomplete'
import { Input } from '@/components/ui/input'
import { AI_PROMPT, SelectBudgetOptions, SelectTravelesList } from '@/constants/options';
import { Button } from '@/components/ui/button';
import { chatSession } from '@/service/AIModel';
import { Dialog, DialogContent, DialogHeader, DialogDescription } from '@/components/ui/dialog';
import { BsGoogle } from "react-icons/bs";
import { useGoogleLogin } from '@react-oauth/google';
import axios from 'axios';
import { doc, setDoc } from "firebase/firestore";
import { AiOutlineLoading3Quarters } from "react-icons/ai";
import { db } from '@/service/firebaseConfig';
import { useNavigate } from 'react-router-dom';


function createTrip() {
  const [place, setPlace] = React.useState(null);

  const [formData, setFormData] = React.useState({});

  const [openDialog, setOpenDialog] = React.useState(false);

  const [loading, setLoading] = React.useState(false);

  const navigate = useNavigate()
  
  const handleInputChange = (name, value) => {

    if (name === 'days' && value > 10) {
      alert("Maximum trip duration is 10 days.");
      return;
    }
    setFormData({
      ...formData,
      [name]: value
    })
  }

  useEffect(() => {
    console.log(formData);
  }, [formData]);

  const login = useGoogleLogin({
    onSuccess: (codeResp) => GetUserProfile(codeResp),
    onError: (error) => console.log('Login Failed:', error)
});


  const onGenerateTrip = async () => {


    const user = localStorage.getItem('user');

    if(!user){
      setOpenDialog(true);
      return;
    }
  // Check each field and alert if missing
  if (!formData.location) {
    alert("Please enter your destination.");
    return;
  }
  if (!formData.days || formData.days <= 0) {
    alert("Please enter a valid number of days.");
    return;
  }
  if (!formData.travelers) {
    alert("Please select the number of travelers.");
    return;
  }
  if (!formData.budget) {
    alert("Please select a budget option.");
    return;
  }
  setLoading(true);
  // All fields are filled — proceed
  const FINAL_PROMPT = AI_PROMPT
    .replace('{location}', formData.location)
    .replace('{days}', formData.days)
    .replace('{travelers}', formData.travelers)
    .replace('{budget}', formData.budget);
    console.log("Final Prompt:", FINAL_PROMPT);

  const result = await chatSession.sendMessage(FINAL_PROMPT);
  console.log("AI Response:", result.response.text());
  setLoading(false);
  SaveAiTrip(result.response.text());
};

  const SaveAiTrip = async (TripData) => {

    setLoading(true);
    const user = JSON.parse(localStorage.getItem('user'));
    const docID = Date.now().toString();
    await setDoc(doc(db, "trips", docID), {
      userSelection: formData,
      tripdata: JSON.parse(TripData),
      userEmail: user.email,
      id: docID
    });
    setLoading(false);
    navigate(`/view-trip/${docID}`);
  }

  const GetUserProfile = (tokenInfo) => {
    axios.get(`https://www.googleapis.com/oauth2/v1/userinfo?access_token=${tokenInfo.access_token}`, {
      headers: {
        Authorization: `Bearer ${tokenInfo.access_token}`,
        Accept: 'application/json'
      }
    }).then((resp) => {
      console.log("User Profile:", resp);
      localStorage.setItem('user', JSON.stringify(resp.data));
      setOpenDialog(false);
      onGenerateTrip();
    });
  }
  return (
    <div className = "sm:px-10 md:px-32 lg:px-56 xl:px-10 px-5 mt-10 ">
      <div className="max-w-3xl mx-auto">
      <h2 className='font-bold text-[40px] mt-16 mb-2'>
        Tell us about your Dream Trip!
      </h2>
      <p className='mt-2 text-stone-600 text-xl'>Just a mere basic will be suffice!</p>

      <div className='mt-16 flex flex-col gap-10'>
        <div> {/*Location input*/}
          <h2 className='text-xl my-3 font-medium'>
            I want to go to...
          </h2>
          <GooglePlacesAutocomplete
  apiKey={import.meta.env.VITE_GOOGLE_PLACE_API_KEY}
  selectProps={{
    place,
    onChange: (value) => {
  setPlace(value);console.log(value);
  handleInputChange('location', value?.label || '');
},
    placeholder: 'Search for a location',
    styles: {
      control: (provided) => ({
        ...provided,
        borderWidth: '2px',
        borderColor: '#5f069f',
        '&:hover': { borderColor: '#7a0ee3' },
        boxShadow: 'none',
      })
    }
  }}
/>
        </div>

        <div> {/*Duration input*/}
          <h2 className='text-xl my-3 font-medium'>
            For these days...
          </h2>
          <Input 
            placeholder="e.g. 3" 
            type="number"
            className="border-2 border-[#5f069f] focus:border-[#7a0ee3] focus:ring-2 focus:ring-[#7a0ee3] rounded-md px-3 py-2" 
            onChange = {(e) => handleInputChange('days', e.target.value)}
          />
        </div>
      

        <div> {/*Budget input*/}
          <h2 className='text-xl my-3 font-medium'>
            For this budget...
          </h2>
          <div className='grid grid-cols-4 gap-4'>
            {SelectBudgetOptions.map((item, index) => (
              <div key = {index}
                onClick={() => handleInputChange('budget', item.title)}
              className={`p-4 border cursor-pointer round-lg hover:shadow-lg ${formData?.budget === item.title && "border-[#5f069f] shadow-lg"}`}>
                <h2 className='text-4xl'>{item.icon}</h2>
                <h2 className='font-bold text-lg'>{item.title}</h2>
                <p className='text-sm text-gray-500'>{item.desc}</p>
              </div>
            ))}
          </div>
        </div>

        <div> {/*Traveling as input*/}
          <h2 className='text-xl my-3 font-medium'>
            Traveling as...
          </h2>
          <div className='grid grid-cols-4 gap-4'>
            {SelectTravelesList.map((item, index) => (
              <div key = {index} 
                onClick={() => handleInputChange('travelers', item.people)}
              className={`p-4 border cursor-pointer round-lg hover:shadow-lg ${formData?.travelers === item.people && "border-[#5f069f] shadow-lg"}`}>
                <h2 className='text-4xl'>{item.icon}</h2>
                <h2 className='font-bold text-lg'>{item.title}</h2>
                <p className='text-sm text-gray-500'>{item.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </div>

      <Button
        disabled = {loading}
       onClick={onGenerateTrip} className='w-full mt-16 mb-32 py-6 bg-[#5f069f] hover:bg-[#7a0ee3] text-white font-bold text-lg'>
            {loading?
              <><AiOutlineLoading3Quarters className='animate-spin mr-3' />Creating...</> : "Create My Trip Plan"}

          
      </Button>

      </div>

      <Dialog open = {openDialog}>
  <DialogContent>
    <DialogHeader>
      <DialogDescription>
        <img src = 'logo.svg'/>
        <h2 className='font-bold text-lg mt-7'>To continue, please sign in</h2>
        <p className='text-sm text-gray-500'>Sign in to the app using Google Authentication.</p>

        <Button 
        onClick = {login}
        disabled = {loading}
        variant='outline' className='w-full mt-4 bg-[#5f069f] hover:bg-[#7a0ee3] text-white font-bold text-lg items-center flex gap-3 justify-center'>
          
          <BsGoogle className='text-xl' />
          Sign in with Google
        </Button>
        
      </DialogDescription>
    </DialogHeader>
  </DialogContent>
</Dialog>
    </div>

  )
}
export default createTrip