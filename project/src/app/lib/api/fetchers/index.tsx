"use client";
import React from "react";
import { useState, useEffect } from "react";

const TENANT_ID = "r0e9";

export default function Index() {
  const [menu, setMenu] = useState([]);

  async function getMenuItems() {
    const url = `https://fdnzawlcf6.execute-api.eu-north-1.amazonaws.com/${TENANT_ID}/menu`;

    const response = await fetch(url, {
      headers: {
        accept: "application/json",
        "x-api-key": process.env.NEXT_PUBLIC_API_KEY || "yum-PxtRFopRoKZwir25",
      },
    });
    if (!response.ok) {
      throw new Error(`Error fetching menu items: ${response.status}`);
    }
    const data = await response.json();
    console.log(data);
    setMenu(data);
    console.log("menu", menu);
  }

  useEffect(() => {
    getMenuItems();
  }, []);

  return (
    <div>
      {menu.map((item, index) => (
        <div key={index}>{item}</div>
      ))}
    </div>
  );
}

// async function getMenuItems(tenantId: string, type: string) {
//   const url = "https://fdnzawlcf6.execute-api.eu-north-1.amazonaws.com/menu";

//   const response = await fetch(url, {
//     headers: {
//       accept: "application/json",
//       "x-api-key": process.env.API_KEY || "yum-PxtRFopRoKZwir25",
//     },
//   });
//   if (!response.ok) {
//     throw new Error(`Error fetching menu items: ${response.status}`);
//   }
//   const data = response.json();
//   console.log(data);
//   return data;
// }
