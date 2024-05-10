import { PrismaClient } from "@prisma/client";
import { sql } from "@vercel/postgres";
import { NextResponse } from "next/server";

export async function GET(req,res){
    const prisma = new PrismaClient();
    // const request = await req.json();
    const notebookId = req.nextUrl.searchParams.get('notebookId')
    const questions = await prisma.questions.findMany({
        where : {
            notebook_id : notebookId
        },
        select : {
            question_id : true,
            question : true,
            answer : true,
            sources : true,
            youtube : true
        }
    })
    return NextResponse.json(questions);
}