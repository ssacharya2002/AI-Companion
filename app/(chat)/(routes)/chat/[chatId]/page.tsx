import prismadb from "@/lib/prismadb";
import { auth, redirectToSignIn } from "@clerk/nextjs";
import { redirect } from "next/navigation";
import ChatClient from "./components/client";


interface ChatIdProps{
    params :{
        chatId: string
    }
}



const ChatId = async ({
    params
}:ChatIdProps) => {

    const {userId} = auth();


    if (!userId) {
        return redirectToSignIn();
    }


    const companion = await prismadb.companion.findUnique({
        where:{
            id:params.chatId
        },
        include:{
            messages:{
                orderBy:{
                    createdAt:"desc"
                },
                where:{
                    userId:userId
                }
            },

            _count:{
                select:{
                    messages:true
                }
            }
        },


    })


    if(!companion){
        return redirect("/");
    }


    return ( 
       <ChatClient companion={companion} />
     );
}
 
export default ChatId;