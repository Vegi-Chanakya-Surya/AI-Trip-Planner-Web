
import React from 'react'
import { Button } from '../ui/button'
import { Link } from 'react-router-dom'

function Hero() {
  return (
    <div
      className="w-full min-h-screen bg-cover bg-no-repeat"
      style={{ backgroundImage: "url('/landingimage.png')" }}
    >
      {/* full-screen translucent overlay with blur */}
      <div className="w-full min-h-screen h-full bg-white/40 backdrop-blur-md flex items-center">
        <div className="mx-auto max-w-4xl text-center py-20 px-4">
          <h1 className="font-extrabold text-[60px] text-black drop-shadow-lg">
            Plan Your Perfect Trip with AI
          </h1>
          <p className="text-xl mt-3 mb-6 text-black/80 font-medium">
            Let our AI guide you in creating a personalized itinerary that suits your preferences.
          </p>
          <Link to="/create-trip">
            <Button className="px-8 py-4 text-lg bg-[#5f069f] hover:bg-[#7a0ee3] text-white rounded-lg shadow-lg">
              Get Started
            </Button>
          </Link>
        </div>
      </div>
    </div>
  )
}

export default Hero