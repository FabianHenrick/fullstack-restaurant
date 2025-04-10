import {
  Sheet,
  SheetContent,
  SheetDescription,
  SheetHeader,
  SheetTitle,
} from "@/components/ui/sheet";
import { useContext, useState } from "react";
import { CartContext } from "../../context/cart";
import CartProductItem from "../../components/cart-product-item";
import { Card, CardContent } from "@/components/ui/card";
import FinishOrderDialog from "./finish-order-dialog";
import { Button } from "@/components/ui/button";

const CartSheet = () => {
  const [finishOrderDialogIsOpen, setFinishOrderDialogIsOpen] = useState(false);
  const { isOpen, toggleCart, products, total } = useContext(CartContext);

  return (
    <Sheet open={isOpen} onOpenChange={toggleCart}>
      <SheetContent className="w-[80%]">
        <SheetHeader>
          <SheetTitle className="text-left">Sacola</SheetTitle>
          <SheetDescription></SheetDescription>
        </SheetHeader>
        <div className="p-y-5 flex h-[93%] flex-col">
          <div className="flex-auto">
            {products.map((product) => (
              <CartProductItem key={product.id} product={product} />
            ))}
          </div>
          <Card className="mb-6">
            <CardContent className="p-5">
              <div className="flex justify-between">
                <p className="text-sm text-muted-foreground">Total</p>
                <p className="text-sm font-semibold">
                  {new Intl.NumberFormat("pt-BR", {
                    style: "currency",
                    currency: "BRL",
                  }).format(total)}{" "}
                </p>
              </div>
            </CardContent>
          </Card>
        </div>
        <Button
          className="rounded-full"
          onClick={() => setFinishOrderDialogIsOpen(true)}
        >
          Finalizar Pedido
        </Button>
        <FinishOrderDialog
          open={finishOrderDialogIsOpen}
          onOpenChange={setFinishOrderDialogIsOpen}
        />
      </SheetContent>
    </Sheet>
  );
};

export default CartSheet;
