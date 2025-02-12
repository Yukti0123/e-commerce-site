// app/actions/orderActions.ts
import CartItem from "@/app/Interfaces/CartItem";

type Order = {
    items: string[];
    id: number;
    date: string;
    total: number;
    status: string;
  };

let orderStorage: Order[] = [];  


export async function createOrderAction(cartItems: CartItem[], totalPrice: number) {
  return new Promise<Order>((resolve) => {
    const newOrder: Order = {
      id: Date.now(),
      date: new Date().toISOString(),
      total: totalPrice,
      status: "Completed",
      items: cartItems.map((item) => item.name),
    };

    orderStorage.push(newOrder); 
    resolve(newOrder); 
  });
}


export async function getOrderHistoryAction() {
  return new Promise<Order[]>((resolve) => {
    resolve(orderStorage); 
  });
}

export async function clearOrderActions() {
    orderStorage = [];
    return { message: "All orders have been cleared."};
}
