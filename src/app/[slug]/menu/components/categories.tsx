"use client"

import { Button } from "@/components/ui/button";
import { ScrollArea, ScrollBar } from "@/components/ui/scroll-area";
import { MenuCategory, Prisma, Restaurant } from "@prisma/client";
import { ClockIcon } from "lucide-react";
import Image from "next/image";
import { useState } from "react";
import Products from "./productsList";

interface ResaurantCategoriesProps {
    restaurant: Prisma.RestaurantGetPayload<{include:{menuCategories:{include:{products:true}}}}>;

}

type MenuCategoryWithProducts =  Prisma.MenuCategoryGetPayload<{
 include: {products: true}
}>

const ResaurantCategories = ({restaurant}: ResaurantCategoriesProps) => {

const [selectedCategory, setSelectedCategory] = useState<MenuCategory>(restaurant.menuCategories[0])
const handleCategoryClick = (category: MenuCategory) =>{
    setSelectedCategory(category)

}

    return ( 
    <div className="relative z-50 mt-[-1.5rem] rounded-t-3xl border bg-white ">
        <div className="p-5">
            <div className="flex items-center gap-3  ">
                <Image src={restaurant.avatarImageUrl} alt={restaurant.name} width={45} height={45}   />
                <div >   
                    <h2 className="text-lg font-semibold">{restaurant.name}</h2>
                     <p className="text-xs opacity-55">{restaurant.description}</p>
                </div>  
               
        </div>
             <div className="mt-3 flex items-center gap-1 text-xs text-green-500">
                    <ClockIcon size={12}/>
                    <p>Aberto</p>
            </div>
        </div>
        <ScrollArea className="w-full ">
            <div className="flex w-max space-x-4 p-4 pt-0">
                {restaurant.menuCategories.map(category => 
                <Button key={category.id} onClick={() =>handleCategoryClick(category)} variant={
                    selectedCategory.id === category.id ? "default" : "secondary"
                } size="sm" className="rounded-full">
                    {category.name}
                </Button>)}
            </div>
            <ScrollBar orientation="horizontal"/>
        </ScrollArea>
        <Products products={selectedCategory.products}/>
    </div> 
    );
}
 
export default ResaurantCategories;