'use client';
import { useEffect, useState } from "react";
import CheckoutButton from "./components/CheckoutButton";
import SongPlayer from "./components/SongPlayer";

export default function Home() {

  const [count, setCount] = useState<number>(0);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchCount = async () => {
      try {
        const res = await fetch('/api/counter');
        const data = await res.json();
        if (data.error) throw new
        Error(data.error);
        setCount(data.count);
      } catch (err) {
        setError('Failed to load count');
        console.error(err);
      }
    };

    const incrementCount = async () => {
      try {
        const res = await fetch('/api/counter', { method: 'POST'});
        const data = await res.json();
        if (data.error) throw new
        Error(data.error)
      } catch (err) {
        setError('Failed to increment count');
        console.error(err);
      }
    };

    fetchCount();
    incrementCount();

    const interval = setInterval(fetchCount, 5000);
    return () => clearInterval(interval);
  }, []);

  if(error) {
    return (
      <div>{error}</div>
    )
  }

  return (

    <div className="flex flex-col items-center justify-center h-screen w-screen content-center gap-6">
      <div className="flex flex-col items-center justify-center gap-6 border-2 rounded-lg p-10 border-solid">
        <h1>Hello World</h1>
        <h1>YA MAMA BITCH</h1>
        <h1>WE IN HERE FOREVER NIGGA</h1>
        <h1>ITS OVER FOR THESE BITCH ASS NIGGAS</h1> 
        <h1 className="text-[50px]">⚔️⚔️⚔️</h1>
        <h1>Total Page Views: {count} </h1>
        <CheckoutButton></CheckoutButton>
      </div>
      <SongPlayer></SongPlayer>
    </div>
  );
}
