// app/utils/actions.ts

"use server";

import { fetchProducts } from "./productData";
import Product from "../Interfaces/Product";

export const getData = async (): Promise<Product[]> => {
  return await fetchProducts(); 
};
