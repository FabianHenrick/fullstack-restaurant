"use client";

import { Button } from "@/components/ui/button";
import { ChevronLeftIcon } from "lucide-react";
import Image from "next/image";
import { Product } from "@prisma/client";
import { useRouter } from "next/navigation";

import { ICartContext } from "../../context/cart";


interface ProductHeaderProps {
  product: Pick<Product, "name" | "imageUrl">;
}

const ProductHeader = ({ product }: ProductHeaderProps ) => {
  const router = useRouter();

  return (
    <div className="relative h-[300px] min-h-[300px] w-full">
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
      
      ></Button>
      <Image
        src={product.imageUrl}
        alt={product.name}
        fill
        className="object-contain"
      />
    </div>
  );
};

export default ProductHeader;
