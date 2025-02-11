import { NextResponse } from "next/server";

let orderStorage: any[] = []; // Temporary storage for demonstration, replace with actual DB

// GET: Fetch orders
export async function GET() {
  try {
    return NextResponse.json(orderStorage, { status: 200 });
  } catch (error) {
    return NextResponse.json({ error: "Error fetching orders" }, { status: 500 });
  }
}

// POST: Add a new order
export async function POST(req: Request) {
  try {
    const newOrder = await req.json();
    orderStorage.push(newOrder); // Store order in memory (replace with DB)
    return NextResponse.json(newOrder, { status: 201 });
  } catch (error) {
    return NextResponse.json({ error: "Error adding order" }, { status: 500 });
  }
}

// DELETE: Clear all orders
export async function DELETE() {
  try {
    orderStorage = []; // Clear all orders from the temporary storage (replace with DB action)
    return NextResponse.json({ message: "All orders have been cleared." }, { status: 200 });
  } catch (error) {
    return NextResponse.json({ error: "Error clearing orders" }, { status: 500 });
  }
}
