import { products } from "@/app/globals";
import { NextResponse } from "next/server";

const sleep = (timer) => {
  return new Promise((resolve) => setTimeout(resolve, timer));
};

export const GET = async () => {
  await sleep(1000);
  return NextResponse.json(products);
};
