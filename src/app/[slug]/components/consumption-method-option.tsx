import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { ConsumptionMethod } from "@prisma/client";
import Image from "next/image";
import Link from "next/link";

interface ConsumptionMethodOptionProps {
  imageUrl: string;
  imageAlt: string;
  buttonText: string;
  option: ConsumptionMethod;
  slug: string;
}

const ConsumptionMethodOption = ({
  imageUrl,
  imageAlt,
  buttonText,
  option,
  slug,
}: ConsumptionMethodOptionProps) => {
  return (
    <Card>
      <CardContent className=" flex flex-col items-center gap-8 py-8">
        <div className="relative h-[80px] w-[80px]">
          <Image
            src={imageUrl}
            alt={imageAlt}
            fill
            className="object-contain"
          />
        </div>
        <Link href={`/${slug}/menu?consumptionMethod=${option}`}>
          <Button variant="secondary" className="rounded-full">
            {buttonText}
          </Button>
        </Link>
      </CardContent>
    </Card>
  );
};

export default ConsumptionMethodOption;
