import { PrismaClient } from "@prisma/client";
import { sql } from "@vercel/postgres";
import { NextResponse } from "next/server";

export async function POST(req,res){
   const prisma = new PrismaClient();
   const resp = await req.json();
  const response = await prisma.users.create({
      data : {
         email : resp.email,
         name : resp.name,
         phone : resp.phone,
         college : resp.college,
         city : resp.city,
         sem : +resp.semester,
         branch : resp.branch,
         passing_year : +resp.passingYear,
         scheme : resp.scheme,
         uid : resp.userId
      }
   })
   // const sqlResponse =  await sql`insert into users (email,name,phone,college,city,sem,branch,passing_Year,scheme,uid) values (${resp.email},${resp.name},${resp.phone},${resp.college},${resp.city},${resp.semester},${resp.branch},${resp.passingYear},${resp.passingYear},${resp.userId})`
   return NextResponse.json({response});
}