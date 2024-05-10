import { sql } from "@vercel/postgres";
import { NextResponse } from "next/server";

export async function GET(req,res){
  const resp = await  sql`select * from notebooks;`
  return NextResponse.json(resp);
}