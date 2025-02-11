// app/api/cart/route.ts

import { NextResponse } from "next/server";

let cartStorage: any[] = []; // Temporary storage for the cart, replace with actual DB

// GET: Fetch cart items
export async function GET() {
  try {
    return NextResponse.json(cartStorage, { status: 200 });
  } catch (error) {
    return NextResponse.json({ error: "Error fetching cart data" }, { status: 500 });
  }
}

// POST: Save cart items
export async function POST(req: Request) {
  try {
    const cartItems = await req.json();
    cartStorage = cartItems; // Save to temporary storage (replace with DB)
    return NextResponse.json(cartItems, { status: 201 });
  } catch (error) {
    return NextResponse.json({ error: "Error saving cart data" }, { status: 500 });
  }
}

// DELETE: Clear the cart
export async function DELETE() {
  try {
    cartStorage = []; // Clear the cart storage (replace with DB action)
    return NextResponse.json({ message: "Cart has been cleared." }, { status: 200 });
  } catch (error) {
    return NextResponse.json({ error: "Error clearing the cart" }, { status: 500 });
  }
}
