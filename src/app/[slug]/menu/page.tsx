import { db } from "@/lib/prisma";
import { notFound } from "next/navigation";
import RestaurantHeader from "./components/header";
import ResaurantCategories from "./components/categories";

interface RestaurantPageProps {
  params: { slug?: string }; // ❗ Garantir que `slug` pode ser opcional
  searchParams?: { consumptionMethod?: string };
}

const isConsumptionMethodValid = (consumptionMethod?: string) => {
  return consumptionMethod
    ? ["DINE_IN", "TAKEAWAY"].includes(consumptionMethod.toUpperCase())
    : false;
};

const RestaurantMenuPage = async (props: RestaurantPageProps) => {
  const slug = await props.params?.slug;
  const consumptionMethod = props.searchParams?.consumptionMethod || "";

  if (!slug || !isConsumptionMethodValid(consumptionMethod)) {
    return notFound();
  }

  const restaurant = await db.restaurant.findUnique({
    where: { slug },
    include: { menuCategories: { include: { products: true } } },
  });

  if (!restaurant) {
    return notFound();
  }

  return (
    <div>
      <RestaurantHeader restaurant={restaurant} />
      <ResaurantCategories restaurant={restaurant} />
    </div>
  );
};

export default RestaurantMenuPage;
