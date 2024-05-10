import { PrismaClient } from "@prisma/client";
import { NextResponse } from "next/server";
export async function POST(req,res){
    const request = await req.json();
    // console.log(request);
    const prisma = new PrismaClient();
    await prisma.questions.create({
        data : {
            question_id : request.id,
            question : request.question,
            answer : request.answer,
            sources : JSON.stringify(request.sources),
            user_id : request.userId,
            notebook_id : request.notebookId,
            youtube :  JSON.stringify(request.youtube)
        }
    })
    // await sql`insert into questions(question_id,question,answer,sources,user_id,notebook_id) values (${request.id},${request.question},${request.answer},${JSON.stringify(request.sources)},${request.userId},${request.notebookId})`;
    return NextResponse.json(true)
}