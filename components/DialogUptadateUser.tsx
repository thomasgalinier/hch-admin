"use client";
import {
  DialogClose,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Card } from "@/components/ui/card";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
} from "@/components/ui/form";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { SignUpSchema, UpdateUserSchema, UserType } from "@/schema";
import { Input } from "@/components/ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Button } from "@/components/ui/button";
import { useMutation } from "@tanstack/react-query";
import { updateUser } from "@/service/auth";
import { useCookies } from "react-cookie";
import { ToastAction } from "@/components/ui/toast";
import { useToast } from "@/hooks/use-toast";
import { z } from "zod";

const DialogUptadateUser = ({ user, refetch }: { user: UserType, refetch: any}) => {
  const [cookies] = useCookies(["token"]);
  const { toast } = useToast();
  const form = useForm({
    resolver: zodResolver(UpdateUserSchema),
    defaultValues: {
      nom: user.nom,
      prenom: user.prenom,
      email: user.email,
      role: user.role,
      telephone: user.telephone,
    },
  });
  const mutation = useMutation({
    mutationFn: (data: UserType) => updateUser(cookies, user?.id, data),
    mutationKey: ["user", "update"],
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
  const onsubmit = (data: z.infer<typeof UpdateUserSchema>) => {
    console.log(data);
    mutation.mutate(data);
  };

  return (
    <DialogContent>
      <DialogHeader>
        <DialogTitle>Modifier un utilisateur</DialogTitle>
      </DialogHeader>
      <Card className="p-4">
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onsubmit)}>
            <div className="grid gap-2">
              <FormField
                control={form.control}
                name="prenom"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Prènom</FormLabel>
                    <FormControl>
                      <Input {...field} type="text" />
                    </FormControl>
                  </FormItem>
                )}
              />
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
                name="email"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Email</FormLabel>
                    <FormControl>
                      <Input {...field} type="email" />
                    </FormControl>
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="telephone"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Téléphone</FormLabel>
                    <FormControl>
                      <Input {...field} type="tel" />
                    </FormControl>
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="role"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Rôle</FormLabel>
                    <Select
                      onValueChange={field.onChange}
                      defaultValue={field.value}
                    >
                      <FormControl>
                        <SelectTrigger>
                          <SelectValue placeholder="Rôle" />
                        </SelectTrigger>
                      </FormControl>
                      <SelectContent>
                        <SelectItem value="SUPER_ADMIN">Super Admin</SelectItem>
                        <SelectItem value="ADMIN">Admin</SelectItem>
                        <SelectItem value="TECHNICIEN">Technicien</SelectItem>
                        <SelectItem value="CLIENT">Client</SelectItem>
                      </SelectContent>
                    </Select>
                  </FormItem>
                )}
              />
            </div>
            <DialogClose asChild>
              <Button className="w-full mt-4" type="submit">
                Modifier
              </Button>
            </DialogClose>
          </form>
        </Form>
      </Card>
    </DialogContent>
  );
};

export default DialogUptadateUser;
