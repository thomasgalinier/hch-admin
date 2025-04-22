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
import { useQuery } from "@tanstack/react-query";
import { getProduits } from "@/service/produit";
import { flexRender, useReactTable } from "@tanstack/react-table";

const ProduitPage = () => {
  const [cookies] = useCookies(["token"]);
  const { data = [] } = useQuery<ProduitType[]>({
    queryKey: ["produit"],
    queryFn: () => getProduits(cookies.token),
  });
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
  ];
  const table = useReactTable({
    data,
    columns,
    getCoreRowModel: getCoreRowModel(),
  });
  return (
    <div className="h-10">
      <div className="mx-2">
        <Button>
          <Link href={"/dashboard/produits/create"}>Créer</Link>
        </Button>
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
