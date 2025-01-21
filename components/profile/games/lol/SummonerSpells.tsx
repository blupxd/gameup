import { getSummonerSpellDetails } from '@/data/fetchLeagueData';
import Image from 'next/image';
import React from 'react'

const SummonerSpells = ({ spells }: any) => (
    <div className="grid grid-cols-2 gap-1 max-w-max">
      {spells.map((spell: any, index: number) => (
        <div key={index} className="relative w-6 h-6 md:w-4 md:h-4 rounded overflow-hidden">
          <Image
            src={`https://ddragon.leagueoflegends.com/cdn/15.1.1/img/spell/${getSummonerSpellDetails(spell).id}.png`}
            alt="spell"
            fill
            className="object-cover"
          />
        </div>
      ))}
    </div>
  );

export default SummonerSpells