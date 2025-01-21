import { getRuneDetails } from '@/data/fetchLeagueData';
import Image from 'next/image';
import React from 'react'

const Runes = ({ runes }: any) => (
    <div className="grid grid-cols-2 gap-1 max-w-max">
      {runes.map((rune: any, index: number) => (
        <div key={index} className="relative w-6 h-6 md:w-4 md:h-4 rounded overflow-hidden">
          <Image
            src={`https://ddragon.leagueoflegends.com/cdn/img/${getRuneDetails(rune).icon}`}
            alt="rune"
            fill
            className="object-cover"
          />
        </div>
      ))}
    </div>
  );

export default Runes