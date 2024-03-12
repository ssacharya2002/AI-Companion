
import prismadb from '@/lib/prismadb';
import { currentUser } from '@clerk/nextjs';
import { NextResponse } from 'next/server';


export async function POST(req: Request) {

    try {

        const body = await req.json();
        const user = await currentUser();

        const { name, description, instructions, seed, src, categoryId } = (body)


        if (!user || !user.id || !user.firstName) {
            return new NextResponse("Unauthorized", { status: 400 })
        }

        if (!name || !description || !instructions || !seed || !src || !categoryId) {
            return new NextResponse("Missing required fields", { status: 400 })
        }

        // const data = formSchema.parse(body)



        // todo: check for subscription

        const companion = await prismadb.companion.create({
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

        console.log("[COMPANION_POST]", companion);
        


        return NextResponse.json(companion);



    } catch (error) {
        console.log("[COMPANION_POST]", error);

    }

}