import { db } from "@/lib/prisma";
import { notFound } from "next/navigation";
import ProductHeader from "./components/product-header";
import ProductDetails from "./components/product-details";

interface ProductPageProps {
  params: Promise<{ slug: string; productId: string }>;
}

const ProductPage = async ({ params }: ProductPageProps) => {
  const { slug, productId } = await params;
  const product = await db.product.findUnique({
    where: { id: productId },
    include: {
      restaurant: {
        select: {
          name: true,
          avatarImageUrl: true,
        },
      },
    },
  });
  if (!product) {
    console.log();
    return notFound();
  }
  return (
    <>
      <ProductHeader product={product} />
      <ProductDetails product={product} />
      <h2></h2>
    </>
  );
};

export default ProductPage;
