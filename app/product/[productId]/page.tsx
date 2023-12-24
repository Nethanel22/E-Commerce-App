import Container from "@/app/components/Container";
import ProductDetails from "./ProductDetails";
import ListRating from "./ListRating";
import { products } from "@/utils/Products";
import getProductById from "@/actions/getProductById";
import NullData from "@/app/components/NullData";
interface IPrams{
    productId:string
}
const Product = async({params}:{params:IPrams}) => {
    const product=await getProductById(params)
    if(!product) return <NullData title="Oops Product with the given id does not exist"/>

    
    return ( 
         <div className="p-8"> 
            <Container>
                <ProductDetails product={product}/>
                <div className="flex flex-col mt-20 gap-4">
                    <div >Add Rating</div>
                    <ListRating product={product}/>
                </div>
            </Container>
         </div>
         );
}
 
export default Product;