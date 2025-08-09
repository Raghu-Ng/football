import React from 'react'
import Logo from "../../assets/images/logo.png"

const Footer = () => {
  return (
    <div className='mt-28 bg-primary w-full'>
      <div className="w-full mx-auto px-[5vw] text-white py-12 flex flex-col md:flex-row justify-between gap-12">
        {/* Left: Logo, Address, Socials */}
        <div className="flex-1 flex flex-col gap-4">
          <img src={Logo} alt="United FC Kodagu" className="w-32 mb-2" />
          <div className="font-semibold">United FC Kodagu</div>
          <div className="text-sm leading-6">
            Madikeri Stadium<br />
            College Road<br />
            Madikeri, Kodagu<br />
            Karnataka 571201
          </div>
          <div className="flex gap-4 mt-4">
            {/* Social icons placeholder */}
            <button className="font-bold border border-white px-4 py-2 hover:bg-white hover:text-primary transition duration-100">Facebook</button>
            <button className="font-bold border border-white px-4 py-2 hover:bg-white hover:text-primary transition duration-100">Instagram</button>
            <button className="font-bold border border-white px-4 py-2 hover:bg-white hover:text-primary transition duration-100">YouTube</button>
            <button className="font-bold border border-white px-4 py-2 hover:bg-white hover:text-primary transition duration-100">Twitter</button>
            {/* <button className="font-bold border border-white px-4 py-2 hover:bg-white hover:text-primary transition duration-100">TikTok</button> */}
          </div>
        </div>
        {/* Center: Links */}
        <div className="flex-1 flex flex-col justify-center items-start border-l  border-white/20 px-8 gap-4">
          <a href="#" className="text-white hover:underline">About The Club</a>
          <a href="#" className="text-white hover:underline">Contact Us & FAQs</a>
          <a href="#" className="text-white hover:underline">Frequently Asked Questions</a>
          {/* <a href="#" className="text-white hover:underline">The Shed – Chat, Rumours & More</a> */}
        </div>
        {/* Right: App promo */}
        
      </div>
      {/* Bottom bar */}
      <div className="bg-[#18124b] py-6 mt-4">
        <div className="w-full mx-auto px-[5vw] flex flex-wrap gap-6 text-sm">
          <a href="#" className="text-white hover:underline">Careers</a>
          <a href="#" className="text-white hover:underline">Modern Slavery Act</a>
          <a href="#" className="text-white hover:underline">Privacy Policy</a>
          <a href="#" className="text-white hover:underline">Cookies Policy</a>
          <a href="#" className="text-white hover:underline">Terms & Conditions</a>
          <a href="#" className="text-white hover:underline">Sustainability Policy</a>
        </div>
        <div className="w-full mx-auto px-[5vw] mt-4 text-white text-xs">
          © 2025 United FC Kodagu. All rights reserved. No part of this site may be reproduced without our written permission.
        </div>
      </div>
    </div>
  )
}

export default Footer