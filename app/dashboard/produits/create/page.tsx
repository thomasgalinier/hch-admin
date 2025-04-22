"use client";

import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
} from "@/components/ui/form";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { ProduitSchema } from "@/schema/produits";
import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Button } from "@/components/ui/button";
import { useMutation } from "@tanstack/react-query";
import { createProduit } from "@/service/produit";
import { ToastAction } from "@/components/ui/toast";
import { toast } from "@/hooks/use-toast";
import { z } from "zod";
import { useCookies } from "react-cookie";

const CreateProduit = () => {
  const [cookies] = useCookies(["token"]);
  const form = useForm({
    resolver: zodResolver(ProduitSchema),
    defaultValues: {
      id: "",
      nom: "",
      quantite: "0",
      description: "",
      prix: "0",
      image: "",
      categorie: "",
    },
  });
  const createProduitMutation = useMutation({
    mutationFn: createProduit,
    mutationKey: ["produit", "create"],
    onSuccess: (data) => {
      data.error
        ? toast({
            title: "Erreur lors de la création du produit",
            action: <ToastAction altText="Close">OK</ToastAction>,
            variant: "destructive",
          })
        : toast({
            title: "Produit crée avec succés",
            action: <ToastAction altText="Close">OK</ToastAction>,
          });
    },
  });
  const onSubmit = (data: z.infer<typeof ProduitSchema>) => {
    const allData = {
      data: {
        ...data,
        prix: Number(data.prix),
        quantite: Number(data.quantite),
      },
      token: cookies.token,
    };
    createProduitMutation.mutate(allData);
  };
  return (
    <div className="mx-auto flex justify-center">
      <Card className="w-1/2 p-4">
        <CardHeader>Créer un produit additionnel</CardHeader>
        <CardContent>
          <Form {...form}>
            <form
              onSubmit={form.handleSubmit(onSubmit)}
              className="flex gap-3 flex-col"
            >
              <FormField
                control={form.control}
                name="nom"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Nom</FormLabel>
                    <FormControl>
                      <Input {...field} type="text" placeholder="Nom" />
                    </FormControl>
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="description"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Description</FormLabel>
                    <FormControl>
                      <Textarea
                        placeholder="Entrez une description"
                        {...field}
                        className="resize-none"
                      />
                    </FormControl>
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="categorie"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Catégorie</FormLabel>
                    <Select onValueChange={field.onChange}>
                      <FormControl>
                        <SelectTrigger>
                          <SelectValue placeholder="Sélectionner une catégorie" />
                        </SelectTrigger>
                      </FormControl>
                      <SelectContent>
                        <SelectItem value="TOTO">entretien</SelectItem>
                        <SelectItem value="TATA">tata</SelectItem>
                      </SelectContent>
                    </Select>
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="prix"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Prix</FormLabel>
                    <FormControl>
                      <Input {...field} type="number" placeholder="Prix" />
                    </FormControl>
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="quantite"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Quantité</FormLabel>
                    <FormControl>
                      <Input {...field} type="number" placeholder="Quantité" />
                    </FormControl>
                  </FormItem>
                )}
              />
              <Button>Créer le produit aditionel</Button>
            </form>
          </Form>
        </CardContent>
      </Card>
    </div>
  );
};

export default CreateProduit;
