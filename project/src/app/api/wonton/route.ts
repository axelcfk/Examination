import { NextResponse } from "next/server";
import { WontonItem } from "@/app/types/menuType";

const TENANT_ID = "r0e9";
const API_KEY = "yum-24wDDIiKn23xmDqw";

export async function GET() {
  try {
    const response = await fetch(
      `https://fdnzawlcf6.execute-api.eu-north-1.amazonaws.com/menu?type=wonton`,
      {
        method: "GET",
        headers: {
          accept: "application/json",
          "x-zocom": API_KEY,
          "x-requested-with": "XMLHttpRequest",
          "Content-Type": "application/json",
        },
      }
    );

    if (!response.ok) {
      throw new Error(`Error: ${response.status}`);
    }

    const data = (await response.json()) as WontonItem[];
    return NextResponse.json(data);
  } catch (error) {
    return NextResponse.json(
      { error: "Failed to fetch menu" },
      { status: 500 }
    );
  }
}
