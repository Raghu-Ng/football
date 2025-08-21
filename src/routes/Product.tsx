import React, { useEffect, useState } from "react";
import { useParams, useNavigate, useLocation } from "react-router-dom";
import { supabase } from "../lib/supabase";
import { useCart } from "../contexts/CartContext";
import { useAuth } from "../contexts/AuthContext";
import toast from "react-hot-toast";

const Product = () => {
  const { id } = useParams();
  const [jersey, setJersey] = useState<any>(null);
  const [loading, setLoading] = useState(true);
  const [selectedSize, setSelectedSize] = useState("");
  const [selectedImage, setSelectedImage] = useState(0);
  const { dispatch } = useCart();
  const { user, loading: authLoading } = useAuth();
  const navigate = useNavigate();

  const location = useLocation();
  useEffect(() => {
    setLoading(true);

    if (!id) {
      setJersey(null); // Optional: reset data
      setLoading(false); // Fix: ensure loading stops
      return;
    }

    console.log("Fetching jersey with ID:", id);
    supabase
      .from("jerseys")
      .select("*")
      .eq("id", id)
      .single()
      .then(({ data, error }) => {
        if (error || !data) {
          console.error("Error fetching jersey:", error);
          setJersey(null);
        } else {
          console.log("Fetched jersey data:", data);
          setJersey(data);
        }
        setLoading(false);
      });
  }, [id, location.key]);

  if (loading) return <div className="text-center py-20">Loading...</div>;
  if (!jersey)
    return <div className="text-center py-20">Product not found.</div>;

  const images =
    jersey.image_urls && jersey.image_urls.length > 0
      ? jersey.image_urls
      : [jersey.image_url];
  const sizes = jersey.sizes || [];

  const addToCart = () => {
    if (!user && !authLoading) {
      navigate("/signin");
      toast.error("Please sign in to add items to your cart");
      return;
    }
    if (!selectedSize) {
      toast.error("Please select a size");
      return;
    }
    console.log("JERSEY IMAGES", images);
    dispatch({
      type: "ADD_ITEM",
      payload: {
        id: `${jersey.id}-${selectedSize}`,
        name: jersey.name,
        price: jersey.price,
        image_url: images[0],
        size: selectedSize,
        quantity: 1,
      },
    });
    toast.success("Added to cart!");
    navigate("/cart");
  };

  return (
    <div className="flex flex-col md:flex-row p-8 gap-8 max-w-7xl mx-auto">
      {/* Left: Image Thumbnails & Main */}
      <div className="flex gap-4">
        {/* Thumbnails */}
        <div className="flex md:flex-col gap-2">
          {images.map((img: string, index: number) => (
            <img
              key={index}
              src={img}
              alt={`thumb-${index}`}
              onClick={() => setSelectedImage(index)}
              className={`w-16 h-16 object-cover border-2 cursor-pointer ${
                selectedImage === index ? "border-black" : "border-gray-300"
              }`}
              style={{ borderRadius: 0 }}
            />
          ))}
        </div>
        {/* Main Image */}
        <div className="size-[40vw] relative overflow-hidden">
          <img
            src={images[selectedImage]}
            alt="main"
            className="h-full absolute object-cover left-1/2 -translate-x-1/2"
            style={{ borderRadius: 0 }}
          />
        </div>
      </div>
      {/* Right: Info Section */}
      <div className="flex flex-col gap-4 w-full">
        <h2 className="text-primary font-bold text-5xl mb-2">{jersey.name}</h2>
        <p className="text-xl font-semibold text-gray-800 mb-2">
          ${jersey.price}
        </p>
        <p className="text-base text-gray-600 mb-4">{jersey.description}</p>
        {/* Size Options */}
        <div className="flex gap-2 flex-wrap mb-4">
          {sizes.map((size: string) => (
            <button
              key={size}
              onClick={() => setSelectedSize(size)}
              className={`border  border-zinc-600 px-6 py-3 font-semibold text-lg ${
                selectedSize === size
                  ? "bg-primary text-white"
                  : "bg-white text-black hover:bg-primary/20"
              }`}
              style={{ borderRadius: 0 }}
            >
              {size}
            </button>
          ))}
        </div>
        {/* Add to Cart */}
        <button
          onClick={addToCart}
          className="bg-primary text-white px-6 py-3 font-semibold text-lg"
          style={{ borderRadius: 0 }}
        >
          Add to Cart
        </button>
      </div>
    </div>
  );
};

export default Product;
