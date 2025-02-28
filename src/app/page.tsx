import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import Image from "next/image";
import Link from "next/link";


export default function Home() {
  return (
    <div>
      <h1> Hello World</h1>
      <Link href={`http://localhost:3000/fsw-donalds`} >
      <Button>Shadcd é incrivel</Button>
      </Link>
      

    </div>
  );
}
