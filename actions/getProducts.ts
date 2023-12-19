import prisma from '@/libs/prismadb'
export interface IProductParams{
    category?: string | null;
    searchTerm?: string | null;    
}
// get products by search term or category
export default async function getProducts(params: IProductParams){
    try{
        const { category, searchTerm } =params
        let searchString=searchTerm
        if(!searchTerm){
            searchString=''
        }
        let query:any={}
        // if have category update query object
        if(category){
            query.category=category
        }
        const products=await prisma.product.findMany({
            // if no search category serch product by search term
            where:{
                ...query,
                OR:[
                    {
                        name:{
                            contains:searchString,
                            mode:'insensitive'
                        },
                        description:{
                            contains:searchString,
                            mode:'insensitive'

                        }
                    }
                ]
            },
            include:{
                reviews:{
                    include:{
                        user:true
                    },
                    orderBy:{
                        createdDate:'desc'
                    }
                }
            }
        })
        return products



    }
    catch(err:any){
        throw new Error(err)
    }
}