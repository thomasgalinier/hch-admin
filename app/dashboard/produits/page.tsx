"use client";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { ColumnDef, getCoreRowModel } from "@tanstack/table-core";
import { ProduitType } from "@/schema/produits";
import { Checkbox } from "@/components/ui/checkbox";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { useCookies } from "react-cookie";
import { useMutation, useQuery } from "@tanstack/react-query";
import { deleteProduit, getProduits } from "@/service/produit";
import { flexRender, useReactTable } from "@tanstack/react-table";
import { Dialog, DialogTrigger } from "@/components/ui/dialog";
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
import {toast} from "@/hooks/use-toast";
import {ToastAction} from "@/components/ui/toast";
import DialogUpdateProduit from "@/components/Produit/DialogUpdateProduit";

const ProduitPage = () => {
  const [cookies] = useCookies(["token"]);
  const { data = [], refetch } = useQuery<ProduitType[]>({
    queryKey: ["produit"],
    queryFn: () => getProduits(cookies.token),
  });
  const deleteProduitMutation = useMutation({
    mutationFn: (id: string) => deleteProduit(cookies.token, id),
    mutationKey: ["delete", "produit"],
    onSuccess: (data) => {
        // Show a success toast when the dashboard is successfully created
        data.error
            ? toast({
                title: "Erreur lors de la suppression du produit",
                action: <ToastAction altText="Close">OK</ToastAction>,
                variant: "destructive",
            })
            : toast({
                title: "Produit supprimé avec succés",
                action: <ToastAction altText="Close">OK</ToastAction>,
            });
        refetch();
    }
  });
  const handleDeleteUsers = () => {
    selectedRows.forEach((row) => {
      deleteProduitMutation.mutate(row?.id);
    });
  };
  const columns: ColumnDef<ProduitType>[] = [
    {
      id: "select",
      header: "select",
      cell: ({ row }) => {
        const user = row.original;
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
      header: "Nom du produit",
    },
    {
      accessorKey: "description",
      header: "Description",
    },
    {
      accessorKey: "prix",
      header: "Prix",
    },
    {
      accessorKey: "quantite",
      header: "Quantité",
    },
    { accessorKey: "categorie", header: "Catégorie" },
    {
      id: "action",
      header: "Action",
      cell: ({ row }) => {
        const produit = row.original;
        return (
          <Dialog>
            <DialogTrigger asChild>
              <Button variant="link">Modifier</Button>
            </DialogTrigger>
            <DialogUpdateProduit produit={produit} refetch={refetch} />
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
  return (
    <div className="h-10">
      <div className="mx-2 flex gap-2">
        <Button>
          <Link href={"/dashboard/produits/create"}>Créer</Link>
        </Button>
        <AlertDialog>
          <AlertDialogTrigger asChild>
            <Button variant="destructive" disabled={!selectedRows.length}>
              Supprimer
            </Button>
          </AlertDialogTrigger>
          <AlertDialogContent>
            <AlertDialogHeader>
              <AlertDialogTitle>
                Êtes-vous sûr de vouloir supprimer ces produits?
              </AlertDialogTitle>
            </AlertDialogHeader>
            <AlertDialogFooter>
              <AlertDialogCancel>Annuler</AlertDialogCancel>
              <AlertDialogAction onClick={handleDeleteUsers}>Supprimer</AlertDialogAction>
            </AlertDialogFooter>
          </AlertDialogContent>
        </AlertDialog>
      </div>
      <Table>
        <TableHeader>
          {table.getHeaderGroups().map((headerGroup) => (
            <TableRow key={headerGroup.id}>
              {headerGroup.headers.map((header) => (
                <TableHead key={header.id}>
                  {header.isPlaceholder
                    ? null
                    : header.column.columnDef.header?.toString()}
                </TableHead>
              ))}
            </TableRow>
          ))}
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
                Aucun produit trouvé
              </TableCell>
            </TableRow>
          )}
        </TableBody>
      </Table>
    </div>
  );
};

export default ProduitPage;
