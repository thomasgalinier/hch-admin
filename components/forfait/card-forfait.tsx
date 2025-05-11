import {Card, CardContent, CardHeader} from "@/components/ui/card";
import {DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger} from "@/components/ui/dropdown-menu";
import {Bike, Clock, EuroIcon, MoreVertical, Pen, Trash} from "lucide-react";
import {
    AlertDialog, AlertDialogAction, AlertDialogCancel,
    AlertDialogContent, AlertDialogDescription, AlertDialogFooter,
    AlertDialogHeader,
    AlertDialogTitle,
    AlertDialogTrigger
} from "@/components/ui/alert-dialog";
import {Badge} from "@/components/ui/badge";
import {ForfaitType} from "@/schema/forfait";
import {useMutation} from "@tanstack/react-query";
import {deleteForfait} from "@/service/forfait";
import {toast} from "@/hooks/use-toast";
import {ToastAction} from "@/components/ui/toast";
import {useCookies} from "react-cookie";
import {Dialog, DialogContent, DialogTrigger} from "@/components/ui/dialog";
import DialogModificationForfait from "@/components/forfait/dialog-modification-forfait";
import {useState} from "react";




const CardForfait = ({ forfait, refetch }: {forfait: ForfaitType, refetch: () => void}) => {
    const [dialogUpdate, setDialogUpdate] = useState<boolean>(false);
    const [cookies] = useCookies(["token"]);
    const mutationDeleteForfait = useMutation({
        mutationFn: deleteForfait,
        mutationKey: ["forfait", "delete"],
        onSuccess:(data) => {
            data.error
                ? toast({
                    title: "Erreur lors de la suppression du forfait",
                    action: <ToastAction altText="Close">OK</ToastAction>,
                    variant: "destructive",
                })
                : toast({
                    title: "Forfait supprimé avec succés",
                    action: <ToastAction altText="Close">OK</ToastAction>,
                })
            refetch();
        }
    });
    const handleDelete = (id: string) => {
        mutationDeleteForfait.mutate({ token: cookies.token, id });
    };
    return (
        <Card key={forfait.id} className="w-1/4">
            <CardHeader className="flex flex-row justify-between items-center">
                <p className="text-lg font-medium">
                    {forfait.titre.charAt(0).toUpperCase() +
                        forfait.titre.slice(1)}
                </p>{" "}
                <DropdownMenu>
                    <DropdownMenuTrigger>
                        <MoreVertical />
                    </DropdownMenuTrigger>
                    <DropdownMenuContent>
                        <Dialog open={dialogUpdate} onOpenChange={setDialogUpdate}>
                            <DialogTrigger asChild onClick={() => setDialogUpdate(true)}>
                                <DropdownMenuItem onSelect={(e)=> e.preventDefault()}>
                                    <Pen />
                                    <p>Modifier</p>
                                </DropdownMenuItem>
                            </DialogTrigger>
                            <DialogModificationForfait forfait={forfait} refetch={refetch} setDialogUpdate={setDialogUpdate} />
                        </Dialog>
                        <AlertDialog>
                            <AlertDialogTrigger asChild>
                                <DropdownMenuItem
                                    className="flex gap-2"
                                    onSelect={(e) => e.preventDefault()}
                                >
                                    <Trash />
                                    Supprimer
                                </DropdownMenuItem>
                            </AlertDialogTrigger>
                            <AlertDialogContent>
                                <AlertDialogHeader>
                                    <AlertDialogTitle>
                                        Supprimer le forfait
                                    </AlertDialogTitle>
                                    <AlertDialogDescription>
                                        Êtes-vous sûr de vouloir supprimer le forfait{" "}
                                        {forfait.titre} ?
                                    </AlertDialogDescription>
                                </AlertDialogHeader>
                                <AlertDialogFooter>
                                    <AlertDialogCancel>Annuler</AlertDialogCancel>
                                    <AlertDialogAction variant='destructive' onClick={() => handleDelete(forfait.id)}>Supprimer</AlertDialogAction>
                                </AlertDialogFooter>
                            </AlertDialogContent>
                        </AlertDialog>
                    </DropdownMenuContent>
                </DropdownMenu>
            </CardHeader>
            <CardContent className="flex gap-4 flex-col">
                <div className="flex flex-row justify-between">
                    <Badge className="bg-slate-800">{forfait.type}</Badge>
                    <div className="flex gap-1 items-center">
                        <p>{forfait.prix}</p>
                        <EuroIcon className="size-5" />
                    </div>
                </div>
                <p className="text-slate-600">{forfait.description}</p>
            </CardContent>
            <CardHeader className="flex flex-row justify-between">
                <div className="flex gap-2">
                    <Clock />
                    <p>{forfait.duree}</p>
                </div>
                <div className="flex gap-2">
                    <Bike />
                    <p>{forfait.categorie_velo}</p>
                </div>
            </CardHeader>
        </Card>
    )
};

export default CardForfait;