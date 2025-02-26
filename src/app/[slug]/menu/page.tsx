import { db } from "@/lib/prisma";
import { notFound } from "next/navigation";
import RestaurantHeader from "./components/header";

interface RestaurantPageProps {
    params: { slug?: string }; // ❗ Garantir que `slug` pode ser opcional
    searchParams?: { consumptionMethod?: string };
}

const isConsumptionMethodValid = (consumptionMethod?: string) => {
    return consumptionMethod ? ["DINE_IN", "TAKEAWAY"].includes(consumptionMethod.toUpperCase()) : false;
};

const RestaurantMenuPage = async (props: RestaurantPageProps) => {

    const slug = props.params?.slug;
    const consumptionMethod = props.searchParams?.consumptionMethod || "";

    if (!slug || !isConsumptionMethodValid(consumptionMethod)) {
        return notFound();
    }

    const restaurant = await db.restaurant.findUnique({
        where: { slug },
        select: { name: true, coverImageUrl: true }
    });

    if (!restaurant) {
        return notFound();
    }

    return (
        <div>
            <RestaurantHeader restaurant={restaurant} />
        </div>
    );
};

export default RestaurantMenuPage;
