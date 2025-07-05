import React, { useState, useEffect } from "react";
import { ShoppingCart, Zap, Star } from "lucide-react";
import { useCart } from "../contexts/CartContext";
import { useNavigate, useParams } from "react-router-dom";
import toast from "react-hot-toast";
import { supabase } from "../lib/supabase";
import { useAuth } from "../contexts/AuthContext";
import ProductConfigurator from "./ProductConfigurator";

interface Jersey {
  id: string;
  name: string;
  price: number;
  image_url: string;
  description: string;
  category: string;
  sizes: string[];
  stock: number;
}

const ProductPage: React.FC = () => {
  const { id } = useParams();
  const { dispatch } = useCart();
  const navigate = useNavigate();
  const [jersey, setJersey] = useState<Jersey | null>(null);
  const [loading, setLoading] = useState(true);
  const { user, loading: isLoading } = useAuth();
  const [mainImageIdx, setMainImageIdx] = useState(0);

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  useEffect(() => {
    setLoading(true);
    supabase
      .from("jerseys")
      .select("*")
      .eq("id", id)
      .single()
      .then(({ data, error }) => {
        if (error || !data) {
          setJersey(null);
        } else {
          setJersey(data);
        }
        setLoading(false);
      });
  }, [id]);

  if (loading) return <div className="text-center py-20">Loading...</div>;
  if (!jersey)
    return <div className="text-center py-20">Product not found.</div>;

  // Prepare up to 4 images (repeat the same if only one exists)
  const images = Array(4).fill(jersey.image_url).slice(0, 4);

  const addToCart = (size: string, color: string) => {
    if (!user) {
      navigate("/signin");
      toast.error("Please sign in to add items to your cart");
      return;
    }
    if (!size) {
      toast.error("Please select a size");
      return;
    }
    if (!color) {
      toast.error("Please select a color");
      return;
    }
    dispatch({
      type: "ADD_ITEM",
      payload: {
        id: `${jersey.id}-${size}-${color}`,
        name: jersey.name,
        price: jersey.price,
        image_url: jersey.image_url,
        size,
        color,
        quantity: 1,
      },
    });
    toast.success("Added to cart!");
    navigate("/cart");
    window.scrollTo(0, 0);
  };

  return (
    <div className="min-h-screen bg-transparent pt-24 pb-12 flex justify-center">
      <div className="bg-transparent dark:bg-transparent rounded-2xl max-w-7xl w-full flex flex-col md:flex-row mx-auto">
        {/* Left: Sticky Image Gallery */}
        <div
          className="md:w-1/2 flex flex-col items-center bg-gray-100 dark:bg-gray-900 p-8 h-full  md:top-28"
          style={{ zIndex: 1 }}
        >
          <div className="sticky top-28">
            <img
              src={images[mainImageIdx]}
              alt={jersey.name}
              className="w-full h-auto max-h-[32rem] object-contain rounded-2xl mb-6 shadow-lg transition-all duration-300"
              style={{ minHeight: "22rem" }}
            />
            <div className="flex gap-4 mt-2 justify-center">
              {images.map((img, idx) => (
                <button
                  key={idx}
                  onClick={() => setMainImageIdx(idx)}
                  className={`w-24 h-24 rounded-xl border-2 transition-all duration-200 ${
                    mainImageIdx === idx
                      ? "border-orange-500 dark:border-cyan-400"
                      : "border-gray-300 dark:border-gray-700"
                  }`}
                  style={{ minWidth: "5.5rem", minHeight: "5.5rem" }}
                >
                  <img
                    src={img}
                    alt={`Thumbnail ${idx + 1}`}
                    className="w-full h-full object-cover rounded-xl"
                  />
                </button>
              ))}
            </div>
          </div>
        </div>
        {/* Right: Product Details & Configurator (normal flow) */}
        <div className="md:w-1/2 p-8 flex flex-col justify-center">
          <h1 className="text-3xl font-bold text-gray-900 dark:text-white mb-2">
            {jersey.name}
          </h1>
          <p className="text-gray-600 dark:text-gray-400 mb-4 text-base">
            {jersey.description}
          </p>
          <div className="flex items-center gap-2 mb-4">
            {[...Array(5)].map((_, i) => (
              <Star
                key={i}
                size={18}
                className="text-yellow-400 fill-current"
              />
            ))}
            <span className="text-sm text-gray-500 dark:text-gray-400">
              (4.9)
            </span>
          </div>
          <div className="text-2xl font-bold bg-gradient-to-r from-orange-400 to-red-400 dark:from-cyan-400 dark:to-blue-400 bg-clip-text text-transparent mb-6">
            ${jersey.price}
          </div>
          <ProductConfigurator
            sizes={jersey.sizes}
            price={jersey.price}
            onComplete={addToCart}
          />
        </div>
      </div>
    </div>
  );
};

export default ProductPage;
