"use client";
import { Button } from "@/components/ui/button";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Prisma } from "@prisma/client";
import {
  ChefHat,
  ChefHatIcon,
  ChevronLeftIcon,
  ChevronRightIcon,
} from "lucide-react";
import Image from "next/image";
import { useContext, useState } from "react";
import { CartContext } from "../../context/cart";
import {
  Sheet,
  SheetContent,
  SheetDescription,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";
import CartSheet from "./cart-sheet";

interface ProductDetailsProps {
  product: Prisma.ProductGetPayload<{
    include: {
      restaurant: {
        select: {
          name: true;
          avatarImageUrl: true;
        };
      };
    };
  }>;
}

const ProductDetails = ({ product }: ProductDetailsProps) => {
  const { toggleCart , addProduct } = useContext(CartContext);

  const [quantity, setQuantity] = useState<number>(1);

  const handleAddToCart = () => {
    addProduct({...product,quantity,})
    toggleCart();
  };
  
  const handleDecreaseQuantity = () => {
    setQuantity((prev) => {
      if (prev === 1) {
        return 1;
      }
      return prev - 1;
    });
  };
  const handleincreaseQuantity = () => {
    setQuantity((prev) => prev + 1);
  };
  return (
    <>
      <div className="relative z-50 mt-[-1.5rem] flex flex-auto flex-col overflow-hidden rounded-t-3xl p-5">
        <div className="flex-auto overflow-hidden">
          {/* RESTAURANTE */}
          <div className="flex items-center gap-1">
            {" "}
            <Image
              src={product.restaurant.avatarImageUrl}
              alt={product.restaurant.name}
              width={16}
              height={16}
              className="rounded-full"
            />
            <p className="text-xs text-muted-foreground">
              {product.restaurant.name}
            </p>{" "}
          </div>{" "}
          {/* NOME DO PRODUTO */}
          <h2 className="mt-1 text-xl font-semibold">{product.name}</h2>
          {/* PREÇO E QUANTIDADE */}
          <div className="mt-3 flex items-center justify-between">
            <h3 className="text-xl font-semibold">
              {new Intl.NumberFormat("pt-BR", {
                style: "currency",
                currency: "BRL",
              }).format(product.price)}{" "}
            </h3>
            <div className="flex items-center gap-3 text-center">
              <Button
                variant="outline"
                className="h-8 w-8 rounded-xl"
                onClick={handleDecreaseQuantity}
              >
                <ChevronLeftIcon />
              </Button>
              <p className="w-4">{quantity}</p>
              <Button
                variant="destructive"
                className="h-8 w-8 rounded-xl"
                onClick={handleincreaseQuantity}
              >
                <ChevronRightIcon />
              </Button>
            </div>
          </div>
          <ScrollArea className="h-full">
            {/* SOBRE */}
            <div className="mt-6 space-y-3">
              <h4 className="font-semibold"></h4>
              <p className="text-sm text-muted-foreground">
                {product.description}
              </p>
            </div>
            {/* INGREDIENTES */}
            <div className="mt-6 space-y-3">
              <div>
                <h4 className="font-semibold"></h4>
                <ChefHatIcon size={18} />
              </div>

              <ul className="list-disc px-5 text-sm text-muted-foreground">
                {product.ingredients.map((ingredient) => (
                  <li key={ingredient}>{ingredient}</li>
                ))}
              </ul>
            </div>
          </ScrollArea>
        </div>
        <Button className="mt-6 w-full rounded-full" onClick={handleAddToCart}>
          {" "}
          Adcionar à sacola{" "}
        </Button>
      </div>
      <CartSheet/>
    </>
  );
};

export default ProductDetails;
