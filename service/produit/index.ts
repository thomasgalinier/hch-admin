import { ProduitType } from "@/schema/produits";
import { getUrl } from "@/service/api";
const { url } = getUrl();

export const createProduit = async (obj: {
  token: string;
  data: ProduitType;
}) => {
  const { token, data } = obj;
  const response = await fetch(`${url}/produit/create`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
    },
    body: JSON.stringify(data),
  });
  return await response.json();
};
export const getProduits = async (token: string) => {
  const response = await fetch(`${url}/produit`, {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
    },
  });
  return await response.json();
};

export const deleteProduit = async (token: { token?: string }, id: string) => {
  const response = await fetch(`${url}/produit/delete/${id}`, {
    method: "DELETE",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
    },
  });
  return await response.json();
};

export const updateProduit = async (obj: {
  token: string;
  id: string;
  data: ProduitType;
}) => {
  const { token, id, data } = obj;
  console.log(data)
  const response = await fetch(`${url}/produit/update/${id}`, {
    method: "PUT",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
    },
    body: JSON.stringify(data),
  });
  return await response.json();
};
