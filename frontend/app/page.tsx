"use client"
import { useEffect, useState } from "react";
const BACKEND_URL = "http://localhost:4000";

export default function Home() {
  const [data, setData] = useState("");
  const [dice, setDice] = useState<number>(3);
  const [sides, setSides] = useState<number>(6);
  const [refresh, setRefresh] = useState(false);

  // const dice = 3;
  // const sides = 6;
  const query = /* GraphQL */ `
    query RollDice($dice: Int!, $sides: Int!) {
      rollDice(numDice: $dice, numSides: $sides)
    }
  `;
  
  useEffect(() => {
    fetch(`${BACKEND_URL}/graphql`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        Accept: 'application/json',
      },
      body: JSON.stringify({
        query,
        variables: { dice, sides },
      }),
    })
    .then((r) => r.json())
    .then((data) => {
      console.log(data);
      setData(JSON.stringify(data.data.rollDice));
      setRefresh(false);
    });
  }, [dice, sides, refresh]);
  

  return (
    <div className="font-sans grid grid-rows-[20px_1fr_20px] items-center justify-items-center min-h-screen p-8 pb-20 gap-16 sm:p-20">
          Welcome to DICE Game
          <div className="mb-2 tracking-[-.01em]">
            <input className="p-2 border border-white rounded mr-2" placeholder="Dice" onChange={(e) => e.target.value && setDice(parseInt(e.target.value))}/>
            <input className="p-2 border border-white rounded mr-2" placeholder="Sides" onChange={(e) => e.target.value && setSides(parseInt(e.target.value))}/>
            <button className="p-2 border border-white rounded" onClick={() => setRefresh(true)}>Refresh</button>
          </div>
          <div className="text-white">
            Roll Dice -  "{data}"
          </div>
    </div>
  );
}
