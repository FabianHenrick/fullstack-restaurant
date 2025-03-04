import { db } from "@/lib/prisma";
import { Prisma } from "@prisma/client";

interface RestaurantPageProps {
  params: Promise<{ slug: string }>;
}

export const getRestaurantBySlug = async (slug: string) => {
  const restaurant = await db.restaurant.findUnique({
    where: { slug } as Prisma.RestaurantWhereUniqueInput, // Passando explicitamente a chave
  });

  return restaurant;
};
