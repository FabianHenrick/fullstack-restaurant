"use client";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";
import { OrderStatus, Prisma } from "@prisma/client";
import { ChevronLeftIcon, ScrollTextIcon, } from "lucide-react";
import Image from "next/image";
import { useRouter } from "next/navigation";

interface OrderListProps {
  orders: Array<
    Prisma.OrderGetPayload<{
      include: {
        restaurant: {
          select: {
            name: true; avatarImageUrl: true

          }
        },
        OrderProducts: {
          include: { product: true };
        }
      };
    }>
  >;
}

const getStatusLabel =  (status: OrderStatus) => {

  if (status === OrderStatus.FINISHED)   return "Finalizado";
  if (status === OrderStatus.IN_PREPARATION)   return "Em Preparo";
  if (status === OrderStatus.PENDING)   return "Finalizado";
}

const OrderList = ({ orders }: OrderListProps) => {
  const router = useRouter();

  return (
    <div className="space-y-6 p-6">
      <Button 
        size='icon' 
        className="rounded-full" 
        variant={"secondary"} 
        onClick={() => router.back()}
      >
        <ChevronLeftIcon />
      </Button>
      <div className="flex items-center gap-3">
        <ScrollTextIcon />
        <h2 className="text-lg font-semibold">Meus Pedidos</h2>
      </div>
      {orders.map(order => (
        <Card key={order.id}>
          <CardContent className="space-y-4 p-5">
            <div className={`w-fit rounded-full px-2 py-1 text-xs font-semibold text-white ${
              order.status === OrderStatus.FINISHED 
              ? "bg-green-400 text-white" 
              : order.status === OrderStatus.IN_PREPARATION 
              ? "bg-yellow-400 text-white" 
              : "bg-gray-200 text-gray-500"
            }`}>
              {order.status === OrderStatus.FINISHED 
              ? "Finalizado" 
              : order.status === OrderStatus.IN_PREPARATION 
              ? "Em Preparo" 
              : "Pendente"}
            </div>
            <div className="flex items-center gap-2">
              <div className="h-5 w-5 relative">
                <Image
                  src={order.restaurant.avatarImageUrl}
                  alt={order.restaurant.name}
                  width={40}
                  height={40}
                  className="rounded-sm"
                />
              </div>
              <p className="text-sm font-semibold">{order.restaurant.name}</p>
            </div>
            <Separator />
            {order.OrderProducts.map((orderProduct) => (
              <div key={orderProduct.id} className=" flex items-center gap-2">
                <div className="h-4 w-4 flex items-center rounded-full justify-center text-xs font-semibold bg-gray-300
              text-white">
                  {orderProduct.quantity}

                </div>
                <p className="text-sm">{orderProduct.product.name}</p>
              </div>
            ))}
            <Separator />
            <p className="text-sm font-medium">{new Intl.NumberFormat("pt-BR", {
                style: "currency",
                currency: "BRL",
              }).format(order.total)}</p>

          </CardContent>
        </Card>

      ))}
    </div>
  );
}

export default OrderList;