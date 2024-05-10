import { sql } from "@vercel/postgres";
import { nanoid } from "@reduxjs/toolkit";
import { NextResponse } from "next/server";
import { PrismaClient } from "@prisma/client";

export async function POST(req,res){
    const request = await req.json();
    const prisma = new PrismaClient();
    try {
       const checkIfNotebook = await prisma.notebooks.findMany({
        where : {
            uid : request.userId,
            notebook_name : request.notebookName
        }
       })
       if(checkIfNotebook.length == 0) {
        await prisma.notebooks.create({
            data : {
                notebook_id : nanoid(),
                uid : request.userId,
                notebook_name : request.notebookName
            }
        })
        // await sql`insert into notebooks (notebook_id,uid,notebook_name) values (${nanoid()},${request.userId},${request.notebookName});`
        return NextResponse.json({message : 'success'});
       }else{
        return NextResponse.json({message : 'failed'});
       }
    } catch (error) {
        console.log(error);
        return NextResponse.json({message : 'failed'});
    }
}