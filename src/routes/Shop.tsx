
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
      <div className="w-full flex justify-between mb-8">
        <div className="text-primary font-bold text-4xl flex items-center gap-4 text-center">
          Official Store
        </div>
      </div>
      <div className="min-h-[400px] w-full grid grid-cols-1 md:grid-cols-3 gap-12">
        {loading ? (
          <div className="col-span-3 flex items-center justify-center text-xl text-gray-500">
            Loading...
          </div>
        ) : (
          jerseys.map((jersey) => (
            <div
              key={jersey.id}
              onClick={() => navigate(`/product/${jersey.id}`)}
              className="size-full flex flex-col gap-8 group cursor-pointer bg-white border border-gray-300 p-6 hover:bg-gray-50 transition-colors"
              style={{ textDecoration: "none" }}
            >
              <div className="h-full w-full relative overflow-hidden flex-1 mb-4">
                <img
                  src={
                    jersey.image_urls && jersey.image_urls.length > 0
                      ? jersey.image_urls[0]
                      : jersey.image_url
                  }
                  className="absolute size-full group-hover:scale-110 transition-all duration-700 ease-in-out object-cover"
                  alt={jersey.name}
                  style={{ borderRadius: 0 }}
                />
              </div>
              <div className="shrink-0 h-12 w-full text-xl text-primary font-medium">
                {jersey.name}
              </div>
              <div className="text-lg text-gray-700">{jersey.category}</div>
              <div className="text-xl font-bold text-blue-700">
                ${jersey.price}
              </div>
            </div>
          ))
        )}
      </div>
    </div>
  );
};

export default Shop;
