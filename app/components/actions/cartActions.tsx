// app/actions/cartActions.ts

import CartItem from "@/app/Interfaces/CartItem";


// We'll simulate a simple in-memory cart for the sake of this example.
let cartStorage: CartItem[] = [];

export async function addToCartAction(product: CartItem) {
  // Simulate async behavior
  return new Promise<CartItem[]>((resolve) => {
    const existingProductIndex = cartStorage.findIndex(
      (item) => item.id === product.id
    );

    if (existingProductIndex >= 0) {
      cartStorage[existingProductIndex].quantity += 1; // Update quantity
    } else {
      cartStorage.push({ ...product, quantity: 1 }); // Add new item to cart
    }
    resolve(cartStorage); // Return the updated cart
  });
}

export async function getCartData() {
  // Simulate fetching cart data from a storage (database or memory)
  return new Promise<CartItem[]>((resolve) => {
    resolve(cartStorage);
  });
}

export async function removeItemAction(id: number) {
  // Simulate removing an item from the cart
  return new Promise<CartItem[]>((resolve) => {
    cartStorage = cartStorage.filter((item) => item.id !== id);
    resolve(cartStorage); // Return updated cart
  });
}

export async function updateCartAction(id: number, quantity: number) {
  // Simulate updating the quantity of an item in the cart
  return new Promise<CartItem[]>((resolve) => {
    const productIndex = cartStorage.findIndex((item) => item.id === id);

    if (productIndex !== -1) {
      cartStorage[productIndex].quantity = quantity;
    }
    resolve(cartStorage); // Return updated cart
  });
}

export async function clearCartAction() {
  return new Promise<void>((resolve) =>{
    cartStorage = [];
    resolve();
  });
}