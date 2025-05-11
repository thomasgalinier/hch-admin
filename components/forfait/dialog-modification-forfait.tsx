import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { ForfaitForm, ForfaitType } from "@/schema/forfait";
import {DialogClose, DialogContent, DialogFooter, DialogHeader} from "@/components/ui/dialog";
import {Form, FormControl, FormField, FormItem, FormLabel} from "@/components/ui/form";
import {Input} from "@/components/ui/input";
import {Select, SelectContent, SelectItem, SelectTrigger, SelectValue} from "@/components/ui/select";
import {Textarea} from "@/components/ui/textarea";
import {TimeSelect} from "@/components/forfait/time-select";
import {EuroIcon} from "lucide-react";
import {Button} from "@/components/ui/button";
import {useMutation} from "@tanstack/react-query";
import {updateForfait} from "@/service/forfait";
import {toast} from "@/hooks/use-toast";
import {ToastAction} from "@/components/ui/toast";
import * as z from "zod";
import {useCookies} from "react-cookie";
const DialogModificationForfait = ({ forfait, refetch, setDialogUpdate }: { forfait: ForfaitType, refetch: () => void, setDialogUpdate:(value: boolean) => void}) => {
    const [cookies] = useCookies(["token"]);
  const form = useForm({
    resolver: zodResolver(ForfaitForm),
    defaultValues: {
        id: forfait.id,
      titre: forfait.titre,
      type: forfait.type,
      description: forfait.description,
      duree: forfait.duree,
      categorie_velo: forfait.categorie_velo,
      prix: forfait.prix.toString(),
    },
  });
  const mutation = useMutation({
    mutationFn: updateForfait,
    mutationKey: ["forfait", "create"],
    onSuccess: (data) => {
      data.error
        ? toast({
            title: "Erreur lors de la modification du forfait",
            action: <ToastAction altText="Close">OK</ToastAction>,
            variant: "destructive",
          })
        : setDialogUpdate(false),
          toast({
            title: "Forfait modifier avec succés",
            action: <ToastAction altText="Close">OK</ToastAction>,
          });
      refetch();
    },
  });
  const onSubmit = (data: z.infer<typeof ForfaitForm>) => {
      console.log(data)
    const allData = { data,id: data.id,  token: cookies.token };
    // @ts-ignore
      mutation.mutate(allData);
  }
    return (
      <DialogContent>
        <DialogHeader>Modifier le forfait</DialogHeader>
          <Form {...form}>
              <form onSubmit={form.handleSubmit(onSubmit)} className="flex gap-2 flex-col">
                  <FormField
                      control={form.control}
                      name="titre"
                      render={({field}) => (
                          <FormItem>
                              <FormLabel>Titre</FormLabel>
                              <FormControl>
                                  <Input {...field} type="text" placeholder="Titre"/>
                              </FormControl>
                          </FormItem>
                      )}
                  />
                  <FormField
                      control={form.control}
                      name="type"
                      render={({field}) => (
                          <FormItem>
                              <FormLabel>Type</FormLabel>
                              <Select onValueChange={field.onChange} value={field.value}>
                                  <FormControl>
                                      <SelectTrigger>
                                          <SelectValue placeholder="Sélectionner un type d'intervention"/>
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
                      render={({field}) => (
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
                      <TimeSelect control={form.control} name="duree"/>
                      <FormField
                          control={form.control}
                          name="prix"
                          render={({field}) => (
                              <FormItem className="w-full">
                                  <FormLabel>Prix</FormLabel>
                                  <div className="flex items-center gap-2">
                                      <FormControl>
                                          <Input {...field} type="number" placeholder="Prix"/>
                                      </FormControl>
                                      <EuroIcon/>
                                  </div>
                              </FormItem>
                          )}
                      />
                  </div>
                  <FormField
                      control={form.control}
                      name="categorie_velo"
                      render={({field}) => (
                          <FormItem>
                              <FormLabel>Catégorie vélo</FormLabel>
                              <Select onValueChange={field.onChange}>
                                  <FormControl>
                                      <SelectTrigger>
                                          <SelectValue placeholder="Sélectionner une catégorie de vélo"/>
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
      </DialogContent>

  );
};

export default DialogModificationForfait;
