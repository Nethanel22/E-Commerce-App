'use client'

import { useRouter } from "next/navigation";
import queryString from "query-string";
import { FieldValues, SubmitHandler, useForm } from "react-hook-form";

const SearchBar = () => {
    const router=useRouter()
    const {register,handleSubmit,reset,formState:{errors}}=useForm<FieldValues>({
        defaultValues:{
            searchTerm:''
        }
    })
    const onSubmit:SubmitHandler<FieldValues> =async(data)=>{
        if(!data.searchTerm) return router.push('/')
        // construct url-insert the parameters to url
        const url=queryString.stringifyUrl({
            url:'/',
            query:{
                searchTerm:data.searchTerm
            }
            
        },{skipNull:true})
        // push the user to url
        router.push(url)
        reset()

    }
    return (  
    <div className="flex items-center">
<input
{...register('searchTerm')}
autoComplete="off"
type="text"
placeholder="Explore E-shop"
className="p-2 border-gray-300 rounded-l-md focus:outline-none focus:border-[0.5px] focus:border-slate-500 w-80"
/>
<button onClick={handleSubmit(onSubmit)} className="bg-slate-700 hover:opacity-80 text-white p-2 rounded-r-md">Search</button>
    </div>
    );
}
 
export default SearchBar;