"use client"
import Image from "next/image";
import { CartContext, CartProduct } from "../context/cart";
import { Button } from "@/components/ui/button";
import {  ChevronLeftIcon, ChevronRightIcon, TrashIcon } from "lucide-react";
import { useContext } from "react";

interface CartItemProsps{
  product:CartProduct
}

const CartProductItem = ({product}: CartItemProsps) => {
  const{decreaseProductQuantity, increaseProductQuantity}= useContext(CartContext)
  return ( 
  <div className="flex items-center justify-between ">
    <div className="flex items-center gap-3 mb-5">
    {/* ESQUERDA */}
      <div className="relative h-20 w-20 bg-gray-100 rounded-xl">
        <Image src={product.imageUrl} alt={product.name} fill/>
      </div>
      <div className="space-y-1 ">
          <p className="max-w-[95%] truncate text-xs text-ellipsis">{product.name}</p>
          <p className="text-sm font-semibold">{new Intl.NumberFormat("pt-BR", {
                style: "currency",
                currency: "BRL",
              }).format(product.price)}{" "}</p>
          <div className="flex items-center gap-1">
    </div>
          {/* QUANTIDADE */}
              <div className="flex items-center gap-1 text-center">
                <Button variant={"destructive"} className="h-7 w-7 rounded-lg" onClick={()=>decreaseProductQuantity(product.id)}><ChevronLeftIcon size={14}/></Button>
                <p className="text-xs w-7">{product.quantity}</p>
                <Button variant={"destructive"} className="w-7 rounded-lg h-7" onClick={()=>increaseProductQuantity(product.id)}><ChevronRightIcon size={14}/></Button>
              </div>
        </div> {/* BOTÃO DE DELETAR */}
      </div>
          <Button className="h-7 w-7 rounded-lg" variant={"outline"}>
            <TrashIcon></TrashIcon>
          </Button>
  </div> 
  );
}
 
export default CartProductItem;