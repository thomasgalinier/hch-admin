"use client";
import { Card, CardContent, CardHeader } from "@/components/ui/card";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
} from "@/components/ui/form";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { ForfaitForm } from "@/schema/forfait";
import { Input } from "@/components/ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Textarea } from "@/components/ui/textarea";
import { TimeSelect } from "@/components/forfait/time-select";
import {EuroIcon, MoreVertical} from "lucide-react";
import { Button } from "@/components/ui/button";
import {useMutation} from "@tanstack/react-query";
import {createForfait} from "@/service/forfait";
import * as z from "zod";
import {useCookies} from "react-cookie";
import {toast} from "@/hooks/use-toast";
import {ToastAction} from "@/components/ui/toast";

const CreateForfait = () => {
    const [cookies] = useCookies(["token"]);
  const form = useForm({
    resolver: zodResolver(ForfaitForm),
    defaultValues: {
        id: "",
      titre: "",
      type: "",
      description: "",
      duree: "",
      categorie_velo: "",
      prix: "",
    },
  });
  const createForfaitMutation = useMutation({
    mutationFn: createForfait,
    mutationKey: ["forfait", "create"],
      onSuccess: (data) => {
            data.error
                ? toast({
                    title: "Erreur lors de la création du forfait",
                    action: <ToastAction altText="Close">OK</ToastAction>,
                    variant: "destructive",
                })
                : toast({
                    title: "Forfait crée avec succés",
                    action: <ToastAction altText="Close">OK</ToastAction>,
                });
      },
  });
  const onSubmit = (data: z.infer<typeof ForfaitForm>) => {
      const allData = { data, token: cookies.token };
    // @ts-ignore
      createForfaitMutation.mutate(allData);
  };
  return (
    <div className="mx-auto flex justify-center">
      <Card className="w-1/2 p-4">
        <CardHeader>
          <h1>Créer un forfait</h1>
        </CardHeader>
        <CardContent>
          <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="flex gap-2 flex-col">
              <FormField
                control={form.control}
                name="titre"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Titre</FormLabel>
                    <FormControl>
                      <Input {...field} type="text" placeholder="Titre" />
                    </FormControl>
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="type"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Type</FormLabel>
                    <Select onValueChange={field.onChange}>
                      <FormControl>
                        <SelectTrigger>
                          <SelectValue placeholder="Sélectionner un type d'intervention" />
                        </SelectTrigger>
                      </FormControl>
                      <SelectContent>
                        <SelectItem value="Reparation">Réparation</SelectItem>
                        <SelectItem value="Maintenance">Maintenance</SelectItem>
                      </SelectContent>
                    </Select>
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="description"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Déscription</FormLabel>
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
              <div className="flex gap-2">
                <TimeSelect control={form.control} name="duree" />
                <FormField
                  control={form.control}
                  name="prix"
                  render={({ field }) => (
                    <FormItem className="w-full">
                      <FormLabel>Prix</FormLabel>
                      <div className="flex items-center gap-2">
                        <FormControl>
                          <Input {...field} type="number" placeholder="Prix" />
                        </FormControl>
                        <EuroIcon />
                      </div>
                    </FormItem>
                  )}
                />
              </div>
              <FormField
                control={form.control}
                name="categorie_velo"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Catégorie vélo</FormLabel>
                    <Select onValueChange={field.onChange}>
                      <FormControl>
                        <SelectTrigger>
                          <SelectValue placeholder="Sélectionner une catégorie de vélo" />
                        </SelectTrigger>
                      </FormControl>
                      <SelectContent>
                        <SelectItem value="Ville">Ville</SelectItem>
                        <SelectItem value="VTT">VTT</SelectItem>
                        <SelectItem value="Route">Route</SelectItem>
                        <SelectItem value="Electrique">Electrique</SelectItem>
                      </SelectContent>
                    </Select>
                  </FormItem>
                )}
              />
              <Button>Créer le forfait</Button>
            </form>
          </Form>
        </CardContent>
      </Card>
    </div>
  );
};
export default CreateForfait;
