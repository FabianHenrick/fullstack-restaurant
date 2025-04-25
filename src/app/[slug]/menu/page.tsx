import { db } from "@/lib/prisma";
import { notFound } from "next/navigation";
import RestaurantHeader from "./components/restaurant-header";
import ResaurantCategories from "./components/categories";

interface RestaurantPageProps {
  params: Promise<{ slug?: string }>;
  searchParams: Promise<{ consumptionMethod?: string }>;
}

const isConsumptionMethodValid = (consumptionMethod?: string) => {
  return consumptionMethod
    ? ["DINE_IN", "TAKEAWAY"].includes(consumptionMethod.toUpperCase())
    : false;
};

const RestaurantMenuPage = async ({
  params,
  searchParams,
}: RestaurantPageProps) => {
  const { slug } = await params;
  const { consumptionMethod } = await searchParams;

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
