"use client";
import { Button } from "@/components/ui/button";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import {
  Drawer,
  DrawerClose,
  DrawerContent,
  DrawerDescription,
  DrawerFooter,
  DrawerHeader,
  DrawerTitle,
  DrawerTrigger,
} from "@/components/ui/drawer";
import { isValidCpf } from "../../helpers/cpf";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";

const formSchema = z.object({
  name: z.string().trim().min(1, { message: "o nome é obrigatório" }),
  cpf: z.string().refine((value) => isValidCpf(value), {
    message: "CPF Invalido",
  }),
});
type formSchema = z.infer<typeof formSchema>;

const FinishOrderButton = () => {
  const form = useForm<formSchema>({
    resolver: zodResolver(formSchema),
  });
  const onSubmit = (data: formSchema) => {
    console.log(data);
  };

  return (
    <Drawer>
      <DrawerTrigger asChild>
        <Button className="rounded-full">Finalizar Pedido</Button>
      </DrawerTrigger>
      <DrawerContent>
        <DrawerHeader>
          <DrawerTitle>Finalizar Pedido</DrawerTitle>
          <DrawerDescription>
            Insira suas informações abaixo para finalizar o seu pedido.
          </DrawerDescription>
        </DrawerHeader>
        <Form {...form}>
          <FormField
            control={form.control}
            name="name"
            render={(field) => (
              <FormItem>
                <FormLabel>Seu Nome</FormLabel>
                <FormControl>
                  <Input placeholder="Digite seu nome" {...field}></Input>
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
        </Form>
        <DrawerFooter>
          <Button>Submit</Button>
          <DrawerClose>
            <Button variant="outline">Cancel</Button>
          </DrawerClose>
        </DrawerFooter>
      </DrawerContent>
    </Drawer>
  );
};

export default FinishOrderButton;
