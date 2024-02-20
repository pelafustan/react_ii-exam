import { useContext } from "react";
import { CartContext } from "../contexts/CartProvider";

export function useCart() {
  const context = useContext(CartContext);
  if (!context) {
    throw new Error("useCart must be used within a CartContextProvider")
  }
  return context;
}

