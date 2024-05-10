import { NextResponse } from "next/server";
import { PrismaClient } from "@prisma/client";
export async function GET(req,res){
    const userId = req.nextUrl.searchParams.get('userId');
    const prisma = new PrismaClient();
    const notebooks = await prisma.notebooks.findMany({
        where : {
            uid : userId
        },
        select :{
            notebook_id : true,
            notebook_name : true
        }
    });
    return NextResponse.json(notebooks);
}