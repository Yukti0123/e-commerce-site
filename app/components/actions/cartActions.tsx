// app/actions/cartActions.ts

import CartItem from "@/app/Types/CartItem";

let cartStorage: CartItem[] = [];

export async function addToCartAction(product: CartItem) {
  return new Promise<CartItem[]>((resolve) => {
    const existingProductIndex = cartStorage.findIndex(
      (item) => item.id === product.id
    );

    if (existingProductIndex >= 0) {
      cartStorage[existingProductIndex].quantity += 1;
    } else {
      cartStorage.push({ ...product, quantity: 1 });
    }
    resolve(cartStorage);
  });
}

export async function getCartData() {
  return new Promise<CartItem[]>((resolve) => {
    resolve(cartStorage);
  });
}

export async function removeItemAction(id: number) {
  return new Promise<CartItem[]>((resolve) => {
    cartStorage = cartStorage.filter((item) => item.id !== id);
    resolve(cartStorage);
  });
}

export async function updateCartAction(id: number, quantity: number) {
  return new Promise<CartItem[]>((resolve) => {
    const productIndex = cartStorage.findIndex((item) => item.id === id);

    if (productIndex !== -1) {
      cartStorage[productIndex].quantity = quantity;
    }
    resolve(cartStorage);
  });
}

export async function clearCartAction() {
  return new Promise<void>((resolve) => {
    cartStorage = [];
    resolve();
  });
}
