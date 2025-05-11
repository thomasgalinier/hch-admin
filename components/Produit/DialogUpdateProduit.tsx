"use client";

import {
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Card } from "@/components/ui/card";
import { Form } from "@/components/ui/form";
import useUpdateProductForm from "@/hooks/Produit/useUpdateProductForm";
import { ProduitType } from "@/schema/produits";
import { UseQueryResult } from "@tanstack/react-query";
import {
  FormControl,
  FormField,
  FormItem,
  FormLabel,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {Button} from "@/components/ui/button";
type Props = {
  produit: ProduitType;
  refetch: (options?: {
    throwOnError: boolean;
    cancelRefetch: boolean;
  }) => Promise<UseQueryResult>;
};
const DialogUpdateProduit = ({ produit, refetch }: Props) => {
  const { form, onSubmit } = useUpdateProductForm(produit, refetch);
  return (
    <DialogContent>
      <DialogHeader>
        <DialogTitle>Modifier un produit</DialogTitle>
      </DialogHeader>
      <Card className="p-4">
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)}>
            <div className="grid gap-2">
              <FormField
                control={form.control}
                name="nom"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Nom</FormLabel>
                    <FormControl>
                      <Input {...field} type="text" />
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
                        className="resize-none"
                        {...field}
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
                    <Select onValueChange={field.onChange} value={field.value}>
                      <FormControl>
                        <SelectTrigger>
                          <SelectValue placeholder="Sélectionner une catégorie"   />
                        </SelectTrigger>
                      </FormControl>
                      <SelectContent>
                        <SelectItem value="entretien">entretien</SelectItem>
                        <SelectItem value="TATA">tata</SelectItem>
                      </SelectContent>
                    </Select>
                  </FormItem>
                )}
              />
                <FormField control={form.control} name="prix" render={({ field }) => (
                    <FormItem>
                        <FormLabel>Prix</FormLabel>
                        <FormControl>
                            <Input {...field} type="number" placeholder="Prix" />
                        </FormControl>
                    </FormItem>
                )}/>
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
                <Button>Modifier le produit additionnel</Button>
            </div>
          </form>
        </Form>
      </Card>
    </DialogContent>
  );
};

export default DialogUpdateProduit;
