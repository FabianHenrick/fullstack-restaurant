"use client";
import { Button } from "@/components/ui/button";
import { Restaurant } from "@prisma/client";
import { ChevronLeftIcon, ScrollTextIcon } from "lucide-react";
import Image from "next/image";
import { useRouter } from "next/navigation";

interface RestaurantHeaderProps {
restaurant: Pick< Restaurant, "coverImageUrl" | "name">;

}


const RestaurantHeader = ({restaurant}: RestaurantHeaderProps) => {
    const router = useRouter()
    return (
    
    <div className="relative h-[250px] w-full">
        <Button variant="secondary" size="icon" className="absolute top-5 left-4 rounded-full z-50"
        onClick={() => router.back()}
        >
            <ChevronLeftIcon />
        </Button>
        <Button variant="secondary" size="icon" className="absolute top-5 right-4 rounded-full z-50">
            <ScrollTextIcon></ScrollTextIcon>
        </Button>
            <Image src={restaurant.coverImageUrl} alt={restaurant.name} fill />
    </div>  
    );
}
 
export default RestaurantHeader;