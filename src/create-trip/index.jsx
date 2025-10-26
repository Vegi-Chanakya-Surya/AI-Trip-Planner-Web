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

  function extractJsonObject(aiText) {
  if (!aiText || typeof aiText !== "string") {
    throw new Error("Empty AI response");
  }

  // If Gemini ever wraps output in ```json ... ``` or ```...```, grab inside
  const fencedMatch = aiText.match(/```(?:json)?\s*([\s\S]*?)\s*```/i);
  let raw = fencedMatch ? fencedMatch[1] : aiText;

  // Start from first "{" or "["
  const firstBrace = raw.indexOf("{");
  const firstBracket = raw.indexOf("[");
  const startIdxCandidates = [firstBrace, firstBracket].filter(i => i >= 0);
  const startIdx =
    startIdxCandidates.length === 0
      ? -1
      : Math.min(...startIdxCandidates);

  if (startIdx === -1) {
    throw new Error("No JSON start found in AI response");
  }

  raw = raw.slice(startIdx);

  // Normalize curly quotes and invisible chars
  raw = raw
    .replace(/[\u201C\u201D]/g, '"')
    .replace(/[\u2018\u2019]/g, "'")
    .replace(/[\u200B-\u200D\uFEFF]/g, "");

  // Remove trailing commas before } or ]
  raw = raw.replace(/\,(?=\s*[\}\]])/g, "");

  // Fix illegal backslash escapes like "\°" or "\$"
  raw = raw.replace(/\\(?!["\\/bfnrtu])/g, "");

  // Try 3 increasingly-forgiving parses:

  // Attempt A: try to parse a balanced slice
  const openChar = raw[0]; // "{" or "["
  const closeChar = openChar === "{" ? "}" : "]";
  let depth = 0;
  let end = -1;
  let inStr = false;
  let esc = false;

  for (let i = 0; i < raw.length; i++) {
    const ch = raw[i];

    if (inStr) {
      if (esc) {
        esc = false;
      } else if (ch === "\\") {
        esc = true;
      } else if (ch === '"') {
        inStr = false;
      }
    } else {
      if (ch === '"') {
        inStr = true;
      } else if (ch === openChar) {
        depth++;
      } else if (ch === closeChar) {
        depth--;
        if (depth === 0) {
          end = i + 1;
          break;
        }
      }
    }
  }

  const tryParse = (str) => JSON.parse(str);

  if (end !== -1) {
    const candidate = raw.slice(0, end);
    try {
      return tryParse(candidate);
    } catch (_) {
      // fall through to next attempts
    }
  }

  // Attempt B: parse whole cleaned raw
  try {
    return tryParse(raw);
  } catch (_) {
    // fall through
  }

  // Attempt C: auto-close any missing braces/brackets at the end
  const autoCloseFixed = (() => {
    let txt = raw;
    const opensObj = (txt.match(/\{/g) || []).length;
    const closesObj = (txt.match(/\}/g) || []).length;
    const opensArr = (txt.match(/\[/g) || []).length;
    const closesArr = (txt.match(/\]/g) || []).length;

    if (opensObj > closesObj) {
      txt += "}".repeat(opensObj - closesObj);
    }
    if (opensArr > closesArr) {
      txt += "]".repeat(opensArr - closesArr);
    }
    return txt;
  })();

  return tryParse(autoCloseFixed);
}



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

  // const SaveAiTrip = async (TripData) => {

  //   setLoading(true);
  //   const user = JSON.parse(localStorage.getItem('user'));
  //   const docID = Date.now().toString();
  //   await setDoc(doc(db, "trips", docID), {
  //     userSelection: formData,
  //     tripdata: JSON.parse(TripData),
  //     userEmail: user.email,
  //     id: docID
  //   });
  //   setLoading(false);
  //   navigate(`/view-trip/${docID}`);
  // }

  const SaveAiTrip = async (TripData) => {
  setLoading(true);
  try {
    const user = JSON.parse(localStorage.getItem('user'));
    const docID = Date.now().toString();

    // 🔥 this is the only functional change:
    const tripJson = extractJsonObject(TripData);

    await setDoc(doc(db, "trips", docID), {
      userSelection: formData,
      tripdata: tripJson,
      userEmail: user.email,
      id: docID
    });

    navigate(`/view-trip/${docID}`);
  } catch (err) {
    console.error("Failed to save trip JSON:", err);
    alert("Sorry, I couldn't generate a valid trip. Please try again.");
  } finally {
    setLoading(false);
  }
};


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