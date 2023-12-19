import Container from "@/app/components/Container";
import MangeOrdersClient from "./ManageOrdersClient";
import { getCurrentUser } from "@/actions/getCurrentUser";
import NullData from "@/app/components/NullData";
import getOrders from "@/actions/getOrders";

const MangeOrders = async() => {
    const orders=await getOrders()
    const currentUser = await getCurrentUser()
    if(!currentUser || currentUser.role!=="ADMIN"){
        return <NullData title="Oops! Acess denied"/>
            }
        
    return ( 
        <div className="pt-8">
            <Container>
                 <MangeOrdersClient orders={orders}/>
            </Container>

        </div>
    );
}
 
export default MangeOrders;