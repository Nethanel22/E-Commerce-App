import prisma from "@/libs/prismadb"
import moment from "moment"
export default async function getGraphData(){
    try{
        // get the start and end dates for the data range(7 days ago to today)
        const startDate = moment().subtract(6,"days").startOf("day")
        const endDate = moment().endOf("day")
        // Query the database to get order data grouped by CreateDate
        const result=await prisma.order.groupBy({
            by:["createdDate"],
            where:{
                createdDate:{
                    gte:startDate.toISOString(),//begain with
                    lte:endDate.toISOString(),
                },
                status:"complete",
            },
            // sum orders each of these days
            _sum:{
                amount:true
            }

        })
        // Intlize an object to aggregate the data by key
        const aggregateData:{
            [day:string]:{day:string,date:string,totalAmount:number}
        }={}
        // create clone of the start date to iterate over each day
        const currentDate=startDate.clone()
// Iterate over each day in the date range
while(currentDate<=endDate){
    // Format the day as a string
    const day=currentDate.format("dddd") 
    console.log("day<<<",day,currentDate);
    // Initalize the aggregated data for the day with the day,date and totol amount 
    aggregateData[day]={
        day,
        date:currentDate.format("YYYY-MM-DD"),
        totalAmount:0
    };
    // Move the next Day
    currentDate.add(1,"day")
}
// Calculate the total amount for each day in the date range by summing the order amounts
result.forEach((entry)=>{
    const day=moment(entry.createdDate).format("dddd")
    const amount =entry._sum.amount || 0
    aggregateData[day].totalAmount+=amount
})
// Convert the aggregatedDate object to an array and sort it by datae
const formattedDate = Object.values(aggregateData).sort((a,b)=>
moment(a.date).diff(moment(b.date))
);
// return the formatted data
return formattedDate
    }
    catch(err:any){
        throw new Error(err)
    }
    
}