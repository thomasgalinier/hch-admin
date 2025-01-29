"use client";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import { useQuery } from "@tanstack/react-query";
import { ForfaitType } from "@/schema/forfait";
import { getForfait } from "@/service/forfait";
import { useCookies } from "react-cookie";

import CardForfait from "@/components/forfait/card-forfait";

const Forfait = () => {
  const [cookies] = useCookies(["token"]);
  const { data: forfaits, isLoading, refetch } = useQuery<ForfaitType[]>({
    queryKey: ["forfait"],
    queryFn: () => getForfait(cookies.token),
  });


  return (
    <main className="p-5">
      <section className="pb-5">
        <Link href={"/dashboard/forfait/create"}>
          <Button>Ajouter</Button>
        </Link>
      </section>
      <section className="flex flex-row gap-2">
        {isLoading && <p>Loading...</p>}
        {forfaits &&
          forfaits.map((forfait) => (
            <CardForfait key={forfait.id} forfait={forfait} refetch={refetch} />
          ))}
      </section>
    </main>
  );
};

export default Forfait;
