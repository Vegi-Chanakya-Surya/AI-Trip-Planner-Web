
//new trial 1

import React, { useEffect, useState } from 'react'
import { Button } from '@/components/ui/button'
import { Popover, PopoverTrigger, PopoverContent } from '@/components/ui/popover'
import { googleLogout, useGoogleLogin } from '@react-oauth/google'
import { Dialog, DialogContent, DialogHeader, DialogDescription } from '@/components/ui/dialog'
import { BsGoogle } from "react-icons/bs"
import axios from 'axios'

function Header() {

  const [user, setUser] = useState(null)
  const [openDialog, setOpenDialog] = useState(false)
  const [loading, setLoading] = useState(false)
  const location = { pathname: window.location.pathname };

  useEffect(() => {
    const storedUser = localStorage.getItem('user')
    if (storedUser) {
      try {
        setUser(JSON.parse(storedUser))
      } catch (e) {
        console.error('Failed to parse user from localStorage')
        localStorage.removeItem('user')
      }
    }
  }, [])

  const login = useGoogleLogin({
    onSuccess: (codeResp) => GetUserProfile(codeResp),
    onError: (error) => console.log('Login Failed:', error)
  })

  const GetUserProfile = (tokenInfo) => {
    axios.get(`https://www.googleapis.com/oauth2/v1/userinfo?access_token=${tokenInfo.access_token}`, {
      headers: {
        Authorization: `Bearer ${tokenInfo.access_token}`,
        Accept: 'application/json'
      }
    }).then((resp) => {
      localStorage.setItem('user', JSON.stringify(resp.data))
      setOpenDialog(false)
      window.location.reload()
    })
  }

  return (
    <div className='p-3 shadow-sm flex justify-between items-center px-5'>
      <div className='flex items-center gap-2'>
        <img src='/logo.svg' alt="Logo" className='h-8 w-8' />
        <h2 className='font-bold text-2xl'>AI Trip Planner</h2>
      </div>

      <div>
        {user ? (
          <div className='flex items-center gap-5'>
            
            {location.pathname === '/my-trips' && (
              <a href="/create-trip">
                <Button variant='outline' className='rounded-full text-violet-700'>
                  + Create Trip
                </Button>
              </a>
            )}

            <a href="/my-trips">
              <Button variant='outline' className='rounded-full text-violet-700'>
                My Trips
              </Button>
            </a>

            <Popover>
              <PopoverTrigger asChild>
                <img 
                  src={user?.picture}
                  referrerPolicy="no-referrer"
                  alt="User Profile"
                  className="h-10 w-10 rounded-full object-cover cursor-pointer"
                />
              </PopoverTrigger>
              <PopoverContent className='p-4'>
                <h2>{user?.name}</h2>
                <p className='text-sm text-gray-500'>{user?.email}</p>
                <Button className='w-full mt-3 cursor-pointer' onClick={() => {
                  googleLogout()
                  localStorage.clear()
                  window.location.reload()
                }}>Sign Out</Button>
              </PopoverContent>
            </Popover>
          </div>
        ) : (
          <Button onClick={() => setOpenDialog(true)}>Sign In</Button>
        )}
      </div>

      <Dialog open={openDialog}>
        <DialogContent>
          <DialogHeader>
            <DialogDescription>
              <img src='logo.svg' alt='logo'/>
              <h2 className='font-bold text-lg mt-7'>To continue, please sign in</h2>
              <p className='text-sm text-gray-500'>Sign in to the app using Google Authentication.</p>

              <Button 
                onClick={login}
                disabled={loading}
                variant='outline' 
                className='w-full mt-4 bg-[#5f069f] hover:bg-[#7a0ee3] text-white font-bold text-lg items-center flex gap-3 justify-center'>
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

export default Header
