'use client';
import React from 'react';
import Image from 'next/image';
import { assets } from '@/assets/assets';

const ChatLabel = ({ openMenu, setOpenMenu }) => {
  return (
    <div className="flex items-center justify-between p-2 text-white/80 hover:bg-white/10 rounded-lg text-sm group cursor-pointer">
      
      {/* Chat Name */}
      <p className="truncate max-w-[80%] group-hover:text-white">Chat name here</p>

      {/* Options (Three dots + dropdown) */}
      <div className="relative group">
        {/* Icon Button */}
        <div className="flex items-center justify-center h-6 w-6 aspect-square hover:bg-black/80 rounded-lg">
          <Image
            className="w-4"
            src={assets.three_dots}
            alt="Options"
            width={16}
            height={16}
          />
        </div>

        {/* Dropdown - now part of the same group */}
        <div className="absolute z-10 right-0 top-8 hidden group-hover:flex flex-col bg-gray-700 rounded-xl w-max p-2 shadow-md">
          <div className="flex items-center gap-3 hover:bg-white/10 px-3 py-2 rounded-lg cursor-pointer">
            <Image src={assets.pencil_icon} alt="Rename" className="w-4" width={16} height={16} />
            <p>Rename</p>
          </div>
          <div className="flex items-center gap-3 hover:bg-white/10 px-3 py-2 rounded-lg cursor-pointer">
            <Image src={assets.delete_icon} alt="Delete" className="w-4" width={16} height={16} />
            <p>Delete</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ChatLabel;
