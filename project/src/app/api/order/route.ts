import { OrderBody } from "@/app/types/menuType";
import { NextRequest, NextResponse } from "next/server";

const TENANT_ID = "r0e9";
const API_KEY = "yum-24wDDIiKn23xmDqw";

export async function POST(req: NextRequest) {
  const { itemIds } = await req.json();

  const orderBody: OrderBody = {
    items: itemIds,
  };

  try {
    console.log(itemIds);
    console.log(orderBody);

    const response = await fetch(
      `https://fdnzawlcf6.execute-api.eu-north-1.amazonaws.com/${TENANT_ID}/orders`,
      {
        method: "POST",
        headers: {
          accept: "application/json",
          "x-requested-with": "XMLHttpRequest",
          "x-zocom": API_KEY,
          "Content-Type": "application/json",
        },
        body: JSON.stringify(orderBody),
      }
    );

    const data = await response.json();

    console.log("data:", data.order);
    console.log("eta is:", data.order.eta);

    // return  res.status(200).json(data);
    // data.items !!!!!!!!!!
    return NextResponse.json(data.order, { status: 200 });
  } catch (error) {
    //res.status(500).json({ error: 'Failed to fetch data' });
    return NextResponse.json(
      { error: "Failed to POST order" },
      { status: 500 }
    );
  }
}
