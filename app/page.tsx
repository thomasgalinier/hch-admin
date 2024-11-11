"use client";
import Header from "@/components/Header";
import { useMe } from "@/service/auth";
import { useCookies } from "react-cookie";
import { Skeleton } from "@/components/ui/skeleton";
import {redirect} from "next/navigation";

export default function Home() {
  const [cookies] = useCookies(["token"]);
  const { data: user, isFetched } = useMe(cookies.token);
  console.log(isFetched);
  if (isFetched && !user) {
    redirect("/auth/signin");
  }
    return (<div className="bg-accent w-screen h-screen p-2 flex justify-between">
      <Skeleton className="h-full w-2/12 "/>
      <Skeleton className="h-full w-9/12"/>
    </div>);
}
