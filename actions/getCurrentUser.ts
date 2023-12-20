import { authOptions } from "@/pages/api/auth/[...nextauth]";
import { getServerSession } from "next-auth";
import prisma from "@/libs/prismadb"
export async function getSession(){
return await getServerSession(authOptions)
}
// get all data aBOUT CURRENT USER 
export async function getCurrentUser(){
    try{
const session= await getSession()
if(!session?.user?.email){
return null
}
const currentUser=await prisma.user.findUnique({
    where:{
email:session?.user?.email
    },
    include:{
        orders:true
    }
})
if(!currentUser){
    return null
}
return {
    ...currentUser,createdAt:currentUser.createdAt.toISOString(),
    updatedAt:currentUser.updateAt.toISOString(),
    emailVerified:currentUser?.emailVerified?.toISOString() || null

}
    }
    catch(error:any){
console.log(error)
return null
    }
}