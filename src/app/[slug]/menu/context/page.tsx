import { Product } from "@prisma/client";
import { Children, createContext, ReactNode, useState } from "react";

interface CartProduct extends Product {
  quantity: number;
}

export interface ICartContext {
  isOpen: boolean;
  products: [];
  toggleCart: () => void;
}

export const CartContext = createContext<ICartContext>({
  isOpen: false,
  products: [],
  toggleCart: () => {},
});

export const CartProvider = ({ children }: { children: ReactNode }) => {
  const [products, setProducts] = useState<CartProduct[]>([]);
  const [isOpen, setIsOpen] = useState<boolean>(false);
  return (
    <CartContext.Provider
      value={{ isOpen: false, products: [], toggleCart: () => {} }}
    >
      {children}
    </CartContext.Provider>
  );
};
