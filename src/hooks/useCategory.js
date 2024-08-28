import { useState,useEffect } from "react";
import { axiosInstance } from "../config/axiosInstance";

export default function useCategory() {
    const [categories,setCategories] = useState([])

    //get category
    const getCategories = async () =>{
        try{
            const {data} = await axiosInstance({
                url:'/category/get-category',
             method:"GET",
             
            })
            setCategories(data?.category)
        }catch(error){
            console.log(error)
        }
    }

    useEffect(() =>{
        getCategories()
    }, [])

    return categories;
}