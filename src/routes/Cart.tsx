// Cart.tsx
import React from "react";
// import { useCart } from "./CartContext"; // adjust the path if needed
import { useCart } from "../contexts/CartContext";

const Cart: React.FC = () => {
  const { state, dispatch } = useCart();

  const handleRemove = (id: string) => {
    dispatch({ type: "REMOVE_ITEM", payload: id });
  };

  const handleQuantityChange = (id: string, quantity: number) => {
    if (quantity > 0) {
      dispatch({ type: "UPDATE_QUANTITY", payload: { id, quantity } });
    }
  };

  console.log(state.items);

  return (
    <div className="min-h-screen p-6 px-[5vw] bg-gray-50">
      <h2 className="text-5xl mt-12 font-bold mb-6 text-primary">
        Shopping Cart
      </h2>

      {state.items.length === 0 ? (
        <p className="text-gray-500">Your cart is empty.</p>
      ) : (
        <div className="space-y-4">
          {state.items.map((item) => (
            <div
              key={`${item.id}-${item.size}`}
              className="flex items-center justify-between bg-white shadow p-4 border border-gray-200"
            >
              <div className="flex items-center gap-4">
                <img
                  src={item.image_url}
                  alt={item.name}
                  className="w-20 h-20 object-cover"
                />
                <div>
                  <h3 className="font-semibold text-primary">{item.name}</h3>
                  <p className="text-sm text-gray-600">Size: {item.size}</p>
                  <p className="text-sm font-bold text-primary">
                    ₹{item.price.toFixed(2)}
                  </p>
                </div>
              </div>

              <div className="flex items-center gap-3">
                <input
                  type="number"
                  min={1}
                  value={item.quantity}
                  onChange={(e) =>
                    handleQuantityChange(item.id, Number(e.target.value))
                  }
                  className="w-16 border px-2 py-1 text-center"
                />
                <button
                  onClick={() => handleRemove(item.id)}
                  className="bg-primary text-white font-bold px-4 py-2"
                >
                  Remove
                </button>
              </div>
            </div>
          ))}

          <div className="text-right mt-6">
            <h3 className="text-lg font-bold text-primary">
              Total: ₹{state.total.toFixed(2)}
            </h3>
            <div className="flex gap-2 justify-end">
              <button
                onClick={() => dispatch({ type: "CLEAR_CART" })}
                className="mt-3 bg-red-500 text-white font-bold px-6 py-4"
              >
                Clear
              </button>
              <button
                // onClick={() => dispatch({ type: "CLEAR_CART" })}
                className="mt-3 bg-primary text-white font-bold px-6 py-4"
              >
                BUY NOW
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default Cart;
