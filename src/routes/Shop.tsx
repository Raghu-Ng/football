
import React, { useEffect, useState } from "react";
import { supabase } from "../lib/supabase";
import { useNavigate } from "react-router-dom";

const Shop = () => {
  const [jerseys, setJerseys] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchJerseys = async () => {
      const { data } = await supabase.from("jerseys").select("*");
      setJerseys(data || []);
      setLoading(false);
    };
    fetchJerseys();
  }, []);

  return (
    <div className="h-fit px-[5vw] py-12 flex flex-col">
      <div className="w-full flex items-center justify-between mb-8">
        <div className="text-primary font-bold text-2xl sm:text-3xl md:text-4xl flex items-center gap-4 text-center">
          Shop
        </div>
      </div>
      <div className="h-fit min-h-[400px] w-full grid grid-cols-1 md:grid-cols-3 gap-6 place-items-stretch items-stretch md:gap-12">
        {loading ? (
          <div className="col-span-3 flex items-center justify-center text-xl text-gray-500">
            Loading...
          </div>
        ) : (
          jerseys.map((jersey) => (
            <div
              key={jersey.id}
              onClick={() => navigate(`/product/${jersey.id}`)}
              className="size-full flex flex-col gap-0 group cursor-pointer"
              style={{ textDecoration: "none" }}
            >
              <div className="h-[240px] w-full relative overflow-hidden shrink-0">
                <img
                  src={
                    jersey.image_urls && jersey.image_urls.length > 0
                      ? jersey.image_urls[0]
                      : jersey.image_url
                  }
                  alt={jersey.name}
                  className="absolute size-full object-cover group-hover:scale-110 transition-all duration-700 ease-in-out"
                />
              </div>
              <div className="shrink-0 mt-4 w-full text-xl text-primary font-medium">
                {jersey.name}
              </div>
              <div className="mt-2 text-sm mb-4">₹{jersey.price}</div>
              <button className="bg-primary text-white flex items-center justify-center font-bold p-4 text-sm hover:bg-blue-800 mb-4" >BUY NOW </button>
              <div className="text-sm font-medium text-primary flex justify-between w-full">
                <div>PRODUCT</div>
                <div className="text-zinc-600 font-bold">
                  {jersey.created_at ? new Date(jersey.created_at).toLocaleDateString() : ""}
                </div>
              </div>
            </div>
          ))
        )}
      </div>
    </div>
  );
};

export default Shop;
