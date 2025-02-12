// app/actions/orderActions.ts
import CartItem from "@/app/Interfaces/CartItem";

type Order = {
    items: string[];
    id: number;
    date: string;
    total: number;
    status: string;
  };

let orderStorage: Order[] = [];  // Simulating a simple in-memory order storage

// Server action for creating an order
export async function createOrderAction(cartItems: CartItem[], totalPrice: number) {
  return new Promise<Order>((resolve) => {
    const newOrder: Order = {
      id: Date.now(),
      date: new Date().toISOString(),
      total: totalPrice,
      status: "Completed",
      items: cartItems.map((item) => item.name),
    };

    orderStorage.push(newOrder); // Save the order to in-memory storage
    resolve(newOrder); // Return the created order
  });
}

// Server action for getting order history
export async function getOrderHistoryAction() {
  return new Promise<Order[]>((resolve) => {
    resolve(orderStorage); // Return the stored orders
  });
}

export async function clearOrderActions() {
    orderStorage = [];
    return { message: "All orders have been cleared."};
}
