import { Prisma } from "@prisma/client";
import Image from "next/image";

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
  return (
    <div className="relative z-50 mt-[-1.5rem] rounded-t-3xl p-5">
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
      <h2 className="mt-1 text-xl font-semibold">{product.name}</h2>
      <div>
        {" "}
        {new Intl.NumberFormat("pt-BR", {
          style: "currency",
          currency: "BRL",
        }).format(product.price)}{" "}
      </div>
    </div>
  );
};

export default ProductDetails;
