"use client";

import { Product } from "@prisma/client";
import { createContext, ReactNode, useState } from "react";

export interface CartProduct extends Pick<Product, "id" | "name" | "price" | "imageUrl"> {
  quantity: number;
}

export interface ICartContext {
  isOpen: boolean;
  products: CartProduct[];
  toggleCart: () => void;
  addProduct: (product: CartProduct) => void;
  decreaseProductQuantity: (producId:string) => void;
}

export const CartContext = createContext<ICartContext>({
  isOpen: false,
  products: [],
  toggleCart: () => {},
  addProduct: () => {},
  decreaseProductQuantity: ()=> {}
});

export const CartProvider = ({ children }: { children: ReactNode }) => {
  const [products, setProducts] = useState<CartProduct[]>([]);
  const [isOpen, setIsOpen] = useState<boolean>(false);

  const toggleCart = () => {
    setIsOpen((prev) => !prev);
  };

  const addProduct = (product: CartProduct) => {
   {/* Verifica se o produto já está no carrinho */}
    const productIsAlreadyOnTheCart = products.some((item) => item.id === product.id);

    if (!productIsAlreadyOnTheCart) {
      setProducts((prev) => [...prev, product]);
      return;
    }
    {/* Atualiza a quantidade do produto caso já esteja no carrinho */}
    setProducts((prevProducts) =>
      prevProducts.map((item) =>
        item.id === product.id ? { ...item, quantity: item.quantity + product.quantity } : item
      )
    );
  };


const decreaseProductQuantity =(productId:string) =>{
{/* Diminui a quantidade do produto caso ele exista e seja maior que 1 */}
  setProducts(prevProducts =>{
    return (prevProducts.map(prevProduct =>{
      if(prevProduct.id == productId && prevProduct.quantity > 1){
        return{...prevProduct, quantity:prevProduct.quantity - 1}
      }
      return prevProduct
    }))

  })

}
  return (
    <CartContext.Provider value={{ isOpen, products, toggleCart, addProduct, decreaseProductQuantity }}>
      {children}
    </CartContext.Provider>
  );
};