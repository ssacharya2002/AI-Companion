
import prismadb from '@/lib/prismadb';
import { auth, currentUser } from '@clerk/nextjs';
import { NextResponse } from 'next/server';



export async function PATCH(req: Request, { params }: { params: { companionId: string } }) {

    console.log("hello from patch ");


    try {

        const body = await req.json();
        const user = await currentUser();

        const { name, description, instructions, seed, src, categoryId } = (body)

        if (!params.companionId) {
            return new NextResponse("CompanionId not found", { status: 400 })
        }




        if (!user || !user.id || !user.firstName) {
            return new NextResponse("Unauthorized", { status: 400 })
        }

        if (!name || !description || !instructions || !seed || !src || !categoryId) {
            return new NextResponse("Missing required fields", { status: 400 })
        }

        // todo: check for subscription

        const companion = await prismadb.companion.update({
            where: {
                id: params.companionId,
                userId:user.id
            },
            data: {
                categoryId,
                userId: user.id,
                userName: user.firstName,
                src,
                name,
                description,
                instructions,
                seed
            }
        })


        return NextResponse.json(companion);



    } catch (error) {
        console.log("[COMPANION_PATCH]", error);
        return new NextResponse("Internal server Error", { status: 500 })

    }

}


export async function DELETE (req:Request , {params}:{params:{companionId:string}}){

    try {
        const {userId}  = auth();

        if (!userId) {
            return new NextResponse("Unauthenticated",{status:400})
        }

        const companion = await prismadb.companion.delete({
            where:{
                userId,
                id:params.companionId
            }
        })

        return NextResponse.json(companion);


        
    } catch (error) {
        console.log("COMPANION_DELETE",error);
    }
}