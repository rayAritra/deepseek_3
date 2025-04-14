'use client';
import { assets } from '@/assets/assets';
import React, { useState } from 'react';

import Image from 'next/image';
import { useClerk, UserButton } from '@clerk/nextjs';
import { useAppContext } from '@/context/AppContext';
import ChatLabel from './ChatLabel';
const Sidebar = ({ expand, setExpand }) => {

  const {openSignIn} = useClerk();
  const {user} = useAppContext();
  const [isOpen, setIsOpen] = useState({ id: 0, open: false });
  return (
    <div
      className={`flex flex-col justify-between bg-[#212327] pt-7 transition-all z-50 max-md:absolute max-md:h-screen ${
        expand ? 'p-4 w-64' : 'md:w-20 w-20 max-md:overflow-hidden'
      }`}
    >
      <div>
        <div
          className={`${
            expand ? 'flex flex-row gap-10' : 'flex flex-col items-center gap-8'
          }`}
        >
          {expand ? (
            <Image className="w-36" src={assets.logo_text} alt="Logo Text" />
          ) : (
            <Image className="w-10" src={assets.logo_icon} alt="Logo Icon" />
          )}

          <div
            onClick={() => setExpand(!expand)}
            className="group relative flex items-center justify-center hover:bg-gray-500 transition-all duration-300 h-9 w-9 aspect-square rounded-lg cursor-pointer"
          >
            <Image className="md:hidden" src={assets.menu_icon} alt="Menu Icon" />
            <Image
              className="hidden md:block w-7"
              src={expand ? assets.sidebar_close_icon : assets.sidebar_icon}
              alt="Sidebar Toggle Icon"
            />
            <div
              className={`absolute w-max ${
                expand
                  ? 'left-1/2 -translate-x-1/2 top-12'
                  : '-top-12 left-0'
              } opacity-0 group-hover:opacity-100 transition bg-black text-white text-sm px-3 py-2 rounded-lg shadow-lg pointer-events-none`}
            >
              {expand ? 'Close sidebar' : 'Open sidebar'}
              <div
                className={`w-3 h-3 absolute bg-black rotate-45 ${
                  expand
                    ? 'left-1/2 -top-1.5 -translate-x-1/2'
                    : 'left-4 -bottom-1.5'
                }`}
              ></div>
            </div>
          </div>
        </div>

        <button
          className={`mt-8 flex items-center justify-center cursor-pointer ${
            expand
              ? 'bg-primary hover:opacity-90 rounded-2xl gap-2 p-2.5 w-max'
              : 'group relative h-9 w-9 mx-auto hover:bg-gray-500/30 rounded-lg'
          }`}
        >
          <Image
            className={expand ? 'w-6' : 'w-7'}
            src={expand ? assets.chat_icon : assets.chat_icon_dull}
            alt="New Chat Icon"
          />
          <div className="absolute w-max -top-12 -right-12 opacity-0 group-hover:opacity-100 transition bg-black text-white text-sm px-3 py-2 rounded-lg shadow-lg pointer-events-none">
            New Chat
            <div className="w-3 h-3 absolute bg-black rotate-45 left-4 -bottom-1.5"></div>
          </div>
          {expand && <p className="text-white font-medium">New Chat</p>}
        </button>

        <div className={`mt-8 text-white text-sm ${expand ? 'block' : 'hidden'}`}>
          <p className="my-1">Recents</p>
          {/* chat label items here */}
          <ChatLabel openMenu={isOpen} setOpenMenu={setIsOpen} />

        </div>
      </div>

      <div>
        <div
          className={`flex items-center cursor-pointer group relative ${
            expand
              ? 'gap-1 text-white/80 text-sm p-2.5 border border-primary rounded-lg hover:bg-white/10'
              : 'h-10 w-10 mx-auto hover:bg-gray-500/30 rounded-lg justify-center'
          }`}
        >
          <Image
            className={expand ? 'w-5' : 'w-6.5 mx-auto'}
            src={expand ? assets.phone_icon : assets.phone_icon_dull}
            alt="Phone Icon"
          />
          <div
            className={`absolute -top-60 pb-8 ${
              !expand ? '-right-40' : ''
            } opacity-0 group-hover:opacity-100 hidden group-hover:block transition`}
          >
            <div className="relative w-max bg-black text-white text-sm p-3 rounded-lg shadow-lg">
              <Image className="w-44" src={assets.qrcode} alt="QR Code" />
              <p>Scan to get DeepSeek App</p>
              <div
                className={`w-3 h-3 absolute bg-black rotate-45 ${
                  expand ? 'right-1/2' : 'left-4'
                } -bottom-1.5`}
              ></div>
            </div>
          </div>
          {expand && (
            <>
              <span>Get App</span>
              <Image alt="New Icon" src={assets.new_icon} />
            </>
          )}
        </div>

        <div 
        onClick={ user ? null :  openSignIn}
          className={`flex items-center gap-3 text-white/60 text-sm p-2 mt-2 cursor-pointer ${
            expand ? 'hover:bg-white/10 rounded-lg' : 'justify-center w-full'
          }`}
        >  
        {
          user ? <UserButton/> 
          :   <Image className="w-7" src={assets.profile_icon} alt="Profile Icon" />

        }
          {expand && <span>My profile</span>}
        </div>
      </div>
    </div>
  );
};

export default Sidebar;
