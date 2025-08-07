import React, { useEffect, useState } from 'react'
import Logo from "../../assets/images/logo.png"
import { supabase } from '../../lib/supabase'
import { useNavigate } from 'react-router-dom'
import { format } from 'date-fns'

const Match = ({ match }: { match: any }) => {
    return (
        <div className='bg-white size-full flex flex-col justify-center items-center'>
            <div className='font-semibold'>{format(new Date(match.match_date), 'EEE dd MMM yyyy').toUpperCase()}</div>
            <div className='grid grid-cols-3 gap-4 items-center' >
                <div className='flex flex-col size-full gap-2 items-center justify-center' >
                    <img src={Logo} alt="" className='size-[90px]' />
                    <div className='font-bold'>United FC</div>
                </div>
                <div className='border w-full border-black/70 h-[60px] flex items-center justify-center font-bold text-primary text-4xl' >
                    {match.score || 'VS'}
                </div>
                <div className='flex flex-col size-full gap-2 items-center justify-center' >
                    <img src={match.image_url || Logo} alt={match.opponent} className='size-[90px]' />
                    <div className='font-bold'>{match.opponent}</div>
                </div>
            </div>
            <div>{match.venue}</div>
        </div>
    )
}

const Matches = () => {
  const [recentMatches, setRecentMatches] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchMatches = async () => {
      const { data } = await supabase
        .from("matches")
        .select("*")
        .order("match_date", { ascending: false })
        .limit(3);
      setRecentMatches(data || []);
      setLoading(false);
    };
    fetchMatches();
  }, []);

  return (
    <><div id='wins' className='h-[400px]  w-full bg-blue-700 px-[100px] py-12 grid grid-cols-3 gap-12'>
      {loading ? (
        <div className='col-span-3 flex items-center justify-center text-xl text-white'>Loading...</div>
      ) : recentMatches.map((match) => (
        <Match key={match.id} match={match} />
      ))}
      
    </div>
    <button
        onClick={() => navigate('/all-matches')}
        className='col-span-3 mt-8 bg-primary text-white px-8 py-4 font-bold text-2xl w-fit mx-auto'
        style={{ borderRadius: 0 }}
      >
        View All Matches
      </button></>
  )
}

export default Matches