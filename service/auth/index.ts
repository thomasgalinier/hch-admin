import { z } from "zod";
import { SignInSchema, SignUpSchema, UserType, AllDataSignUp } from "@/schema";
import { getUrl } from "@/service/api";
import { useQuery, UseQueryResult } from "@tanstack/react-query";

const { url } = getUrl();
const signinAdmin = async (data: z.infer<typeof SignInSchema>) => {
  const response = await fetch(`${url}/auth/signin`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(data),
  });

  return await response.json();
};
const signupAdmin = async (data: AllDataSignUp) => {
  const { token, ...dataUser } = data;
  const response = await fetch(`${url}/auth/signup`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
    },
    body: JSON.stringify(dataUser),
  });
  return await response.json();
};
const getMe = async (token: string): Promise<UserType> => {
  const response = await fetch(`${url}/auth/me`, {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
    },
  });
  if (!response.ok) {
    const errorData = await response.json();
    console.error("Response error:", errorData);
  }
  return await response.json();
};
const useMe = (token: string): UseQueryResult<UserType, Error> => {
  return useQuery({
    queryKey: ["me", token],
    queryFn: () => getMe(token),
    enabled: !!token,
  });
};

const getAll = async (token: { token?: any }) => {
  const response = await fetch(`${url}/auth/all`, {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
    },
  });
  return await response.json();
};

const deleteUser = async (token: { token?: any }, id: string) => {
  const response = await fetch(`${url}/auth/delete/${id}`, {
    method: "DELETE",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
    },
  });
  return await response.json();
};
const updateUser = async (
  token: { token?: string },
  id: string | undefined,
  data: UserType,
) => {
  const response = await fetch(`${url}/auth/update/${id}`, {
    method: "PUT",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token.token}`,
    },
    body: JSON.stringify(data),
  });
  return await response.json();
};
export { signinAdmin, signupAdmin, useMe, getAll, deleteUser, updateUser };
