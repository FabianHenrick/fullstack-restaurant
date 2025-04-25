"use client";
import { Button } from "@/components/ui/button";
import { Restaurant } from "@prisma/client";
import { ChevronLeftIcon, ScrollTextIcon } from "lucide-react";
import Image from "next/image";
import { useRouter } from "next/navigation";
import CartSheet from "../[productId]/components/cart-sheet";
import { useContext } from "react";
import { CartContext } from "../context/cart";

interface RestaurantHeaderProps {
  restaurant: Pick<Restaurant, "coverImageUrl" | "name">;
}

const RestaurantHeader = ({ restaurant }: RestaurantHeaderProps) => {
const {toggleCart} = useContext(CartContext);

  const router = useRouter();
  return (
    <div>
    <div className="relative h-[250px] w-full">
      <Button
        variant="secondary"
        size="icon"
        className="absolute left-4 top-5 z-50 rounded-full"
        onClick={() => router.back()}
      >
        <ChevronLeftIcon />
      </Button>
      <Button
        variant="secondary"
        size="icon"
        className="absolute right-4 top-5 z-50 rounded-full" 
        onClick={toggleCart}>
        <ScrollTextIcon/>
      </Button>
      <Image src={restaurant.coverImageUrl} alt={restaurant.name} fill />
    </div>
    <CartSheet/>
    </div>
  );
};

export default RestaurantHeader;
