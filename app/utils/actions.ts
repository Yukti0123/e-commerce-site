// app/utils/actions.ts

"use server";

import { products } from "./productData";


export const getData = async () => {
  return products;  
};
