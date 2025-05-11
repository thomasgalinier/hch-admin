'use client'
import { useCookies } from "react-cookie";
import { useToast } from "@/hooks/use-toast";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { ProduitSchema, ProduitType } from "@/schema/produits";
import { useMutation, UseQueryResult } from "@tanstack/react-query";
import { updateProduit } from "@/service/produit";
import { ToastAction } from "@/components/ui/toast";
import { z } from "zod";

const useUpdateProductForm = (
  produit: ProduitType,
  refetch: (options?: {
    throwOnError: boolean;
    cancelRefetch: boolean;
  }) => Promise<UseQueryResult>,
) => {
  const [cookies] = useCookies(["token"]);
  const { toast } = useToast();
  const form = useForm({
    resolver: zodResolver(ProduitSchema),
    defaultValues: {
      id: produit.id,
      nom: produit.nom,
      quantite: produit.quantite.toString(),
      description: produit.description,
      prix: produit.prix.toString(),
      categorie: produit.categorie,
    },
  });
  console.log(produit)
  const mutation = useMutation({
    mutationFn: updateProduit,
    mutationKey: ["produit", "update"],
    onSuccess: (data) => {
      refetch();
      data.error
        ? toast({
            title: "Erreur lors de la modification du user",
            action: <ToastAction altText="Close">OK</ToastAction>,
            variant: "destructive",
          })
        : toast({
            title: "User modifié avec succès",
            action: <ToastAction altText="Close">OK</ToastAction>,
          });
    },
    onError: (error) => {
      toast({
        title: "Erreur lors de la modification du user",
        description: `An error occurred: ${error.message}`,
        variant: "destructive",
        action: <ToastAction altText="Close">Dismiss</ToastAction>,
      });
    },
  });
  const onSubmit = (data: z.infer<typeof ProduitSchema>) => {
    const allData = {
      token: cookies.token,
      id: produit?.id,
      data:{
      ...data,
      prix: Number(data.prix),
      quantite: Number(data.quantite)}
    };
    console.log(allData);
    mutation.mutate(allData);
  };
  return { form, onSubmit };
};

export default useUpdateProductForm;
