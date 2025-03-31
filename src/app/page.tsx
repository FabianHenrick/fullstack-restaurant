import { Button } from "@/components/ui/button";
import Link from "next/link";
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import { ChevronRight } from "lucide-react";
import Image from "next/image";


export default function Home() {

  return (
 <div className="p-8 w-screen items-center justify-center pt-24">
     <div className="mx-auto p-4 bg-white min-h-screen  ">
     {/* Payment/Delivery Info */}
     <div className="relative h-[300px] min-h-[300px] w-full">
       <h2 className="font-bold text-lg mb-1">RESTAURANTES</h2>
       <p className="text-sm text-gray-600">Os melhores da sua região</p>
     </div>

     {/* Last Stores Section */}
     <div className="flex justify-between items-center mb-4">
       <h3 className="font-semibold">Últimas lojas</h3>
       <Button variant="link" className="p-0 text-primary">
         Ver mais <ChevronRight className="ml-1 h-4 w-4" />
       </Button>
     </div> 
     
     <Link href={`http://localhost:3000/fsw-donalds`}>
     
     <Card className="flex items-center">
        <Image
                  src="https://u9a6wmr3as.ufs.sh/f/jppBrbk0cChQvcNP9rHlEJu1vCY5kLqzjf29HKaeN78Z6pRy"
                  alt="FSW Donalds"
                  width={62}
                  height={62}
                  priority
                 className="rounded-full "
                />
          <div> 
            <CardHeader>
              <CardTitle >
                Fsw Donalds
              </CardTitle>
            </CardHeader>
          <CardContent>
            <p>Lanches</p>
            <p>Hamburguer de cirí da melhor qualidade</p>
          </CardContent>
         </div>
        
       </Card>
      </Link>
    </div>
   </div>
  );
}
