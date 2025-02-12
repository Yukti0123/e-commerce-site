//app\api\orders\route.ts
import { NextResponse } from "next/server";

let orderStorage: any[] = []; 

export async function GET() {
  try {
    return NextResponse.json(orderStorage, { status: 200 });
  } catch (error) {
    return NextResponse.json({ error: "Error fetching orders" }, { status: 500 });
  }
}


export async function POST(req: Request) {
  try {
    const newOrder = await req.json();
    orderStorage.push(newOrder); 
    return NextResponse.json(newOrder, { status: 201 });
  } catch (error) {
    return NextResponse.json({ error: "Error adding order" }, { status: 500 });
  }
}


export async function DELETE() {
  try {
    orderStorage = []; 
    return NextResponse.json({ message: "All orders have been cleared." }, { status: 200 });
  } catch (error) {
    return NextResponse.json({ error: "Error clearing orders" }, { status: 500 });
  }
}
