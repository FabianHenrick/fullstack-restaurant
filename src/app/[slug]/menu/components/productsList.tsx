"use client"
import { Product } from "@prisma/client";
import Image from "next/image";
import Link from "next/link";

interface ProductProps {
  products: Product[]
}

const Products = ({products}: ProductProps) => {
  return ( 
    <div className="space-y-3">
      {products.map( product =>(
        <Link key={product.id} href={""} className=" flex items-center justify-between gap-10">
        <div>
          <h3>
            {product.name}
          </h3>
        </div>
        <Image src={product.imageUrl} alt={product.name}  width={100}  height={100}/>
        </Link>
      ))}
       </div>
   );
}
 
export default Products;