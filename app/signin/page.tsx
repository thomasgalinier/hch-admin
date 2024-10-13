"use client";
import {useState} from "react";
import {Card, CardContent, CardDescription, CardHeader, CardTitle} from "@/components/ui/card";
import {Form, FormControl, FormField, FormItem, FormLabel} from "@/components/ui/form";
import {useForm} from "react-hook-form";
import {zodResolver} from "@hookform/resolvers/zod";
import {ErrorType, SignInSchema} from "@/schema";
import {Input} from "@/components/ui/input";
import {Button} from "@/components/ui/button";
import {undefined, z} from "zod";
import {useMutation} from "@tanstack/react-query";
import {signinAdmin, useMe} from "@/service/auth";
import {useCookies} from "react-cookie";
import {useRouter} from "next/navigation";


const Signin = () => {
    const router = useRouter();
    const [cookies, setCookie, ] = useCookies(['token']);
    // @ts-ignore
    const [error, setError] = useState<ErrorType>({});
    const {data: user} = useMe(cookies.token);
    const form = useForm({
        resolver: zodResolver(SignInSchema),
        defaultValues: {
            email: "",
            password: "",
        },

    });

    const mutation = useMutation({
        mutationFn: signinAdmin,
        mutationKey: ['me'],
        onSuccess: (data) => {
            if (data.error) {
                console.log(data)
                setError(data);
                return;
            }
            const {token} = data;
            setCookie('token', token);
            router.replace('/dashboard',);
        }

    })
    const onSubmit = (data: z.infer<typeof SignInSchema>) => {
        mutation.mutate(data);
    }
    return (
        <div className="flex items-center justify-center h-screen">
            <Card className="w-full max-w-sm ">
                <CardHeader>
                    <CardTitle className="text-2xl">Connexion</CardTitle>
                    <CardDescription>
                        Entrez votre email ci-dessous pour vous connecter à votre compte.
                    </CardDescription>
                </CardHeader>
                <CardContent className="grid gap-2">
                    <Form {...form} >
                        <form onSubmit={form.handleSubmit(onSubmit)}>
                            <div className="space-y-4">
                                <FormField
                                    control={form.control}
                                    name="email"
                                    render={({field}) => (
                                        <FormItem>
                                            <FormLabel>Email</FormLabel>
                                            <FormControl>
                                                <Input {...field} type="email" placeholder="johndoe@gmail.com"/>
                                            </FormControl>
                                        </FormItem>
                                    )}
                                />
                                <FormField
                                    control={form.control}
                                    name="password"
                                    render={({field}) => (
                                        <FormItem>
                                            <FormLabel>Mot de passe</FormLabel>
                                            <FormControl>
                                                <Input {...field} type="password"/>
                                            </FormControl>
                                        </FormItem>
                                    )}
                                />
                                <Button className="w-full" type="submit">
                                    Connexion
                                </Button>
                            </div>
                        </form>
                    </Form>
                    {error && <p className='text-red-500'>{error?.message}</p>}
                </CardContent>
            </Card>
        </div>
    );
}

export default Signin;