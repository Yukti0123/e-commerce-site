

import { NextResponse } from "next/server";

let cartStorage: any[] = []; 


export async function GET() {
  try {
    return NextResponse.json(cartStorage, { status: 200 });
  } catch (error) {
    return NextResponse.json({ error: "Error fetching cart data" }, { status: 500 });
  }
}


export async function POST(req: Request) {
  try {
    const cartItems = await req.json();
    cartStorage = cartItems;
    return NextResponse.json(cartItems, { status: 201 });
  } catch (error) {
    return NextResponse.json({ error: "Error saving cart data" }, { status: 500 });
  }
}


export async function DELETE() {
  try {
    cartStorage = [];
    return NextResponse.json({ message: "Cart has been cleared." }, { status: 200 });
  } catch (error) {
    return NextResponse.json({ error: "Error clearing the cart" }, { status: 500 });
  }
}
