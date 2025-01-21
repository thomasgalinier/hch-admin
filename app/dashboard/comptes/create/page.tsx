"use client";
import { Card, CardTitle } from "@/components/ui/card";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
} from "@/components/ui/form";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { SignUpSchema } from "@/schema";
import { z } from "zod";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { useMutation } from "@tanstack/react-query";
import { signupAdmin } from "@/service/auth";
import { ToastAction } from "@/components/ui/toast";
import { useToast } from "@/hooks/use-toast"; // Import the toast hook
import { useCookies } from "react-cookie";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

const CreateUser = () => {
  const [cookies] = useCookies(["token"]);
  const { toast } = useToast(); // Initialize the toast hook
  const form = useForm({
    resolver: zodResolver(SignUpSchema),
    defaultValues: {
      nom: "",
      prenom: "",
      email: "",
      password: "",
      role: "",
      telephone: "",
    },
  });

  // Define the mutation with onSuccess and onError
  const mutation = useMutation({
    mutationFn: signupAdmin,
    mutationKey: ["dashboard", "sign"],
    onSuccess: (data) => {
      data.error
        ? toast({
            title: "Erreur lors de la création du user",
            action: <ToastAction altText="Close">OK</ToastAction>,
            variant: "destructive",
          })
        : toast({
            title: "User crée avec succés",
            action: <ToastAction altText="Close">OK</ToastAction>,
          });
    },
    onError: (error) => {
      toast({
        title: "Error creating dashboard",
        description: `An error occurred: ${error.message}`,
        variant: "destructive",
        action: <ToastAction altText="Close">Dismiss</ToastAction>,
      });
    },
  });

  const onsubmit = (data: z.infer<typeof SignUpSchema>) => {
    const allData = { ...data, token: cookies.token };
    mutation.mutate(allData);
  };

  return (
    <div className="mx-auto">
      <h1>Création d&apos;un compte admin</h1>
      <div className="flex justify-center items-center h-full">
        <Card className="w-1/2 p-4">
          <Form {...form}>
            <form onSubmit={form.handleSubmit(onsubmit)}>
              <div className="grid gap-2">
                <FormField
                  control={form.control}
                  name="prenom"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Prénom</FormLabel>
                      <FormControl>
                        <Input {...field} type="text" placeholder="John" />
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
                        <Input {...field} type="text" placeholder="Doe" />
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
                        <Input
                          {...field}
                          type="email"
                          placeholder="johndoe@gmail.com"
                        />
                      </FormControl>
                    </FormItem>
                  )}
                />
                <FormField
                  control={form.control}
                  name="telephone"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Telephone</FormLabel>
                      <FormControl>
                        <Input {...field} type="tel" placeholder="06 ..." />
                      </FormControl>
                    </FormItem>
                  )}
                />
                <FormField
                  control={form.control}
                  name="password"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Mot de passe</FormLabel>
                      <FormControl>
                        <Input {...field} type="password" />
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
                      <Select onValueChange={field.onChange}>
                        <FormControl>
                          <SelectTrigger>
                            <SelectValue placeholder="Rôle" />
                          </SelectTrigger>
                        </FormControl>
                        <SelectContent>
                          <SelectItem value="ADMIN">Admin</SelectItem>
                          <SelectItem value="TECHNICIEN">Technicien</SelectItem>
                          <SelectItem value="CLIENT">Client</SelectItem>
                        </SelectContent>
                      </Select>
                    </FormItem>
                  )}
                />
                <Button className="w-full mt-4" type="submit">
                  Créer
                </Button>
              </div>
            </form>
          </Form>
        </Card>
      </div>
    </div>
  );
};

export default CreateUser;
