import React from 'react'
import match from '@/data/valResponse.json'
import ValMatch from './ValMatch';

const ValorantMatches = () => {
  const valMatches = [match, match, match];
  return (
    <div className="flex flex-col w-full lg:w-[60%]">
      <h1 className="font-bold text-xl">Match History</h1>
      <div className="mt-4 flex flex-col space-y-4 rounded border border-[#303030] p-2 bg-[#1e1e1e]">
        {valMatches && valMatches.length > 0 ? (
          valMatches.map((match: any, idx: number) => (
            <ValMatch key={idx} match={match} />
          ))
        ) : (
          <p>No recent matches</p>
        )}
      </div>
    </div>
  )
}

export default ValorantMatches