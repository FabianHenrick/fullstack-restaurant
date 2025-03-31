
import { getRestaurantBySlug } from "../data/get-restaurant-by-slug";
import Image from "next/image";
import { notFound } from "next/navigation";

import ConsumptionMethodOption from "./components/consumption-method-option";

interface RestaurantPageProps {
  params: Promise<{ slug: string }>;
}

const RestaurantPage = async ({ params }: RestaurantPageProps) => {
  const { slug } = await params;
  const restaurant = await getRestaurantBySlug(slug);
  if (!restaurant) {
    notFound();
  }
  return (
    <div className="flex h-screen flex-col items-center justify-center px-6 pt-24">
      {/* Logo e Título */}
      <div className="gap-2 flex flex-col items-center">
        <Image
          src={restaurant.avatarImageUrl}
          alt={restaurant.name}
          width={82}
          height={82}
          priority
        />
        <h2 className="font-semibold">{restaurant.name}</h2>
      </div>
      {/* Bem Vindo */}
      <div className="space-y-2 pt-24 text-center">
        <h3 className="text-2xl font-semibold">Sejam Bem Vindos</h3>
        <p className="opacity-55">
          {" "}
          Escolha como prefere aproveitar sua refeição. Estamos oferecendo
          praticidade e sabor em cada detalhe!
        </p>
      </div>
      <div className="grid grid-cols-2 justify-content gap-4 pt-14 flex">
        <ConsumptionMethodOption
          slug={slug}
          buttonText="Para comer aqui"
          imageUrl="/dine_in.png"
          imageAlt="Para comer aqui"
          option="DINE_IN"
        />
        <ConsumptionMethodOption
          slug={slug}
          buttonText="Para Levar"
          imageUrl="/take_away.png"
          imageAlt="Para Levar"
          option="TAKEAWAY"
        />
      </div>
    </div>
  );
};

export default RestaurantPage;
