import { ReactNode, createContext,  useState } from "react";

type ProviderProps = {
  children: ReactNode;
}

type CartItem = {
  id: string;
  quantity: number;
}

type CartContext = {
  getItemQuantity: (id: string) => number;
  increaseItemQuantity: (id: string) => void;
  decreaseItemQuantity: (id: string) => void;
  removeFromCart: (id: string) => void;
}

export const CartContext = createContext({} as CartContext);

export function CartProvider({ children }: ProviderProps) {
  const [cartItems, setCartItems] = useState<CartItem[]>([])

  const getItemQuantity = (id: string) => {
    return cartItems.find(item => item.id === id)?.quantity || 0
  }

  const increaseItemQuantity = (id: string) => {
    setCartItems(currItems => {
      if (currItems.find(item => item.id === id) == null) {
        return [...currItems, { id, quantity: 1 }];
      } else {
        return currItems.map(item => {
          if (item.id === id) {
            return { ...item, quantity: item.quantity + 1 };
          } else {
            return item;
          }
        });
      }
    });
  };

  const decreaseItemQuantity = (id: string) => {
    setCartItems(currItems => {
      if (currItems.find(item => item.id === id)?.quantity === 1) {
        return currItems.filter(item => item.id !== id);
      } else {
        return currItems.map(item => {
          if (item.id === id) {
            return { ...item, quantity: item.quantity - 1 };
          } else {
            return item;
          }
        });
      }
    });
  };

  const removeFromCart = (id: string) => {
    setCartItems(currItems => {
      return currItems.filter(item => item.id !== id);
    });
  }


  return (
    <CartContext.Provider
      value={{
        getItemQuantity,
        increaseItemQuantity,
        decreaseItemQuantity,
        removeFromCart,
      }}
    >
      {children}
    </CartContext.Provider>
  )
}
