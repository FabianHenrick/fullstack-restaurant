import { Sheet, SheetContent, SheetDescription, SheetHeader, SheetTitle } from "@/components/ui/sheet";
import { useContext } from "react";
import { CartContext } from "../../context/cart";
import CartProductItem from "../../components/cart-product-item";
import { CartProduct } from "../../context/cart";



const CartSheet = () => {
  const {isOpen, toggleCart, products} = useContext(CartContext)
  return (  
  <Sheet open={isOpen} onOpenChange={toggleCart} >
    <SheetContent className="w-[80%]">
      <SheetHeader>
        <SheetTitle className="text-left">Sacola</SheetTitle>
        <SheetDescription>
        </SheetDescription>
      </SheetHeader>
      <div className="p-y-5">{products.map(product =>(
        <CartProductItem key={product.id} product={product} />
      ))}
      </div>
      
    </SheetContent>
  </Sheet> );
}
 
export default CartSheet;