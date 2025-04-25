'use client'

import z from "zod";
import { isValidCpf, removeCpfPunctuation } from "../../menu/helpers/cpf";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { Drawer, DrawerClose, DrawerContent, DrawerDescription, DrawerFooter, DrawerHeader, DrawerTitle } from "@/components/ui/drawer";
import { Button } from "@/components/ui/button";
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { useRouter, usePathname } from "next/navigation";
import { PatternFormat } from "react-number-format";

const formSchema = z.object({
  cpf: z
    .string()
    .trim()
    .min(1, { message: "o cpf é obrigatório" })
    .refine((value) => isValidCpf(value), {
      message: "CPF Invalido",
    }),
});

type formSchema = z.infer<typeof formSchema>;

const CpfForm = () => {
  const form = useForm<formSchema>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      cpf: "", // Valor inicial para o campo CPF
    },
  });

  const router = useRouter();
  const pathname = usePathname();

  const onSubmit = async (data: formSchema) => {
    router.push(`${pathname}?cpf=${removeCpfPunctuation(data.cpf)}`);
  };

  const handleCancel = () => {
    router.back();
  };

  return (
    <Drawer open>
      <DrawerContent>
        <DrawerHeader>
          <DrawerTitle>Visualizar Pedidos</DrawerTitle>
          <DrawerDescription>Insira seu Cpf Abaixo para visualizar seus pedidos.</DrawerDescription>
        </DrawerHeader>
        <div className="p-5">
          <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
              <FormField
                control={form.control}
                name="cpf"
                render={({ field }) => (
                  <FormItem className="px-4">
                    <FormLabel>Seu Cpf</FormLabel>
                    <FormControl>
                     <PatternFormat
                        placeholder="Digite seu CPF..."
                        format="###.###.###-##"
                        customInput={Input}
                        {...field}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <DrawerFooter>
                <Button type="submit" variant="destructive" className="w-full rounded-full">
                  Confirmar
                </Button>
                <DrawerClose asChild>
                  <Button variant="outline" className="w-full rounded-full" onClick={handleCancel}>
                    Cancelar
                  </Button>
                </DrawerClose>
              </DrawerFooter>
            </form>
          </Form>
        </div>
      </DrawerContent>
    </Drawer>
  );
};

export default CpfForm;