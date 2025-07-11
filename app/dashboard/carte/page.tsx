import dynamic from "next/dynamic";

const CarteClient = dynamic(() => import("@/components/carte-client"), {
  ssr: false,
});

export default function Page() {
  return (
    <div>
      <CarteClient />
    </div>
  );
}
