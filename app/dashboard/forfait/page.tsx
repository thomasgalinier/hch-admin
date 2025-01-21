import { Button } from "@/components/ui/button";
import Link from "next/link";

const Forfait = () => {
  return (
    <main className="p-5">
      <section>
        <Link href={"/dashboard/forfait/create"} >
          <Button>Ajouter</Button>
        </Link>
      </section>
      <section></section>
    </main>
  );
};

export default Forfait;
