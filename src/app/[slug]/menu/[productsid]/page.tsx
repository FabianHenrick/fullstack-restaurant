interface ProductPageProps {
  params: Promise<{ slug: string; productId: string }>;
}

const ProductPage = async ({ params }: ProductPageProps) => {
  const { slug, productId } = await params;
  return (
    <div>
      <h1>Product Page</h1>
      {slug}
      {productId}
    </div>
  );
};

export default ProductPage;
