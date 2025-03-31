import Image from "next/image";
import { CartProduct } from "../context/cart";
import { Button } from "@/components/ui/button";
import {  ChevronLeftIcon, ChevronRightIcon } from "lucide-react";

interface CartItemProsps{
  product:CartProduct
}

const CartProductItem = ({product}: CartItemProsps) => {
  return ( 
  <div className="flex items-center justify-between">
    {/* ESQUERDA */}
    <div className="relative h-20 w-20 bg-gray-100 rounded-xl">
      <Image src={product.imageUrl} alt={product.name} fill/>
      </div>
      <div className="space-y-1">
        <p className="text-xs">{product.name}</p>
        <p className="text-sm font-semibold">{new Intl.NumberFormat("pt-BR", {
                style: "currency",
                currency: "BRL",
              }).format(product.price)}{" "}</p>
        <div className="flex items-center gap-1">
          {/* QUANTIDADE */}
              <div className="flex items-center gap-1 text-center">
                <Button variant={"destructive"} className="h-7 w-7 rounded-lg"><ChevronLeftIcon size={14}/></Button>
                <p className="text-xs w-7">{product.quantity}</p>
                <Button variant={"destructive"} className="w-7 rounded-lg h-7"><ChevronRightIcon size={14}  /></Button>
              </div>
        </div>
    </div>
  </div> );
}
 
export default CartProductItem;