import { sql } from "@vercel/postgres";
import { NextResponse } from "next/server";
export async function POST(req,res){
    const request = await req.json();
    await sql`delete from notebooks where notebook_id = ${request.notebookId}`
    return NextResponse.json({message  : "success"})
}