"use client";
import { useMutation, useQuery } from "@tanstack/react-query";
import {deleteUser, getAll, useMe} from "@/service/auth";
import { useCookies } from "react-cookie";
import { UserType } from "@/schema";
import { ColumnDef, getCoreRowModel } from "@tanstack/table-core";
import { flexRender, useReactTable } from "@tanstack/react-table";
import {
    Table,
    TableBody,
    TableCell,
    TableHead,
    TableHeader,
    TableRow,
} from "@/components/ui/table";
import { Checkbox } from "@/components/ui/checkbox";
import { Button } from "@/components/ui/button";
import {
    AlertDialog,
    AlertDialogAction,
    AlertDialogCancel,
    AlertDialogContent,
    AlertDialogFooter,
    AlertDialogHeader,
    AlertDialogTitle,
    AlertDialogTrigger,
} from "@/components/ui/alert-dialog";
import Link from "next/link";
import DialogUptadateUser from "@/components/DialogUptadateUser";
import { Dialog, DialogTrigger } from "@/components/ui/dialog";
import {getForfait} from "@/service/forfait";
import {ForfaitType} from "@/schema/forfait";


const ForfaitPage = () => {
    const [cookies] = useCookies(["token"]);
    const { data = [], refetch } = useQuery<ForfaitType[]>({
        queryKey: ["forfait"],
        queryFn: () => getForfait(),
    });
    console.log(data);
    const deleteUserMutation = useMutation({
        mutationFn: (id: string) => deleteUser(cookies.token, id),
        mutationKey: ["delete", "user"],
    });
    const columns: ColumnDef<ForfaitType>[] = [
        {
            id: "select",
            header: "select",
            cell: ({ row }) => {

                return (
                    <Checkbox
                        checked={row.getIsSelected()}
                        onCheckedChange={(value) => {
                            row.toggleSelected();
                        }}
                        aria-label="select row"
                    />
                );
            },
        },
        {
            accessorKey: "nom",
            header: "Nom",
        },
        {
            accessorKey: "type",
            header: "Type",
        },
        {
            accessorKey: "description",
            header: "Description",
        },
        {
            accessorKey: "duree",
            header: "Durée",
        },
        {
            accessorKey: "categorie_velo",
            header: "Catégorie vélo",
        },
        {
            accessorKey: "prix",
            header: "Prix",
        },
        {
            id: "actions",
            header: "Actions",
            cell: ({ row }) => {
                const user = row.original;
                return (
                    <Dialog>
                        <DialogTrigger asChild>
                            <Button
                                variant="link"
                            >
                                Modifier
                            </Button>
                        </DialogTrigger>
                        <DialogUptadateUser user={user} refetch={refetch} />
                    </Dialog>
                );
            },
        },
    ];
    const table = useReactTable({
        data,
        columns,
        getCoreRowModel: getCoreRowModel(),
    });
    const selectedRows = table
        .getSelectedRowModel()
        .flatRows.map((row) => row.original);
    const handleDeleteUsers = () => {
        selectedRows.forEach((user) => {
            deleteUserMutation.mutate(user?.id!);
        });
    };
    return (
        <div className="h-10">
            <div className="h-10 flex gap-5">
                <AlertDialog>
                    <AlertDialogTrigger asChild>
                        <Button variant={"destructive"} disabled={!selectedRows.length}>
                            Supprimer
                        </Button>
                    </AlertDialogTrigger>
                    <AlertDialogContent>
                        <AlertDialogHeader>
                            <AlertDialogTitle>
                                Êtes-vous sûr de vouloir supprimer ces comptes?
                            </AlertDialogTitle>
                        </AlertDialogHeader>
                        <AlertDialogFooter>
                            <AlertDialogCancel>Annuler</AlertDialogCancel>
                            <AlertDialogAction onClick={handleDeleteUsers}>
                                Supprimer
                            </AlertDialogAction>
                        </AlertDialogFooter>
                    </AlertDialogContent>
                </AlertDialog>
                <Button variant="secondary" asChild>
                    <Link href={'/dashboard/forfait/create'}>Ajouter</Link>
                </Button>
            </div>
            <Table>
                <TableHeader>
                    {table.getHeaderGroups().map((headerGroup) => {
                        return (
                            <TableRow key={headerGroup.id}>
                                {headerGroup.headers.map((header) => (
                                    <TableHead key={header.id}>
                                        {header.isPlaceholder
                                            ? null
                                            : header.column.columnDef.header?.toString()}
                                    </TableHead>
                                ))}
                            </TableRow>
                        );
                    })}
                </TableHeader>
                <TableBody>
                    {table.getRowModel().rows?.length ? (
                        table.getRowModel().rows.map((row) => (
                            <TableRow key={row.id}>
                                {row.getVisibleCells().map((cell) => (
                                    <TableCell key={cell.id}>
                                        {flexRender(cell.column.columnDef.cell, cell.getContext())}
                                    </TableCell>
                                ))}
                            </TableRow>
                        ))
                    ) : (
                        <TableRow>
                            <TableCell colSpan={columns.length} className="h-24 text-center">
                                Aucun compte trouvé
                            </TableCell>
                        </TableRow>
                    )}
                </TableBody>
            </Table>
        </div>
    );
};

export default ForfaitPage;