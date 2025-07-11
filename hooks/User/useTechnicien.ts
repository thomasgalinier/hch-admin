import { useCookies } from "react-cookie";
import { useQuery } from "@tanstack/react-query";
import { getTechnicien } from "@/service/auth";

export function useTechnicien () {
  const [cookies] = useCookies(["token"])
  return useQuery({
    queryFn: () => getTechnicien(cookies.token),
    queryKey: ["technicien"],
  })
}