
'use client'
import useHeaderStore from "@/app/store/headerStore"
import { useEffect } from "react"


export const Header = () =>{

    const { execute } = useHeaderStore()
    const { usdTOuah, eurTouah } = useHeaderStore()
    
        useEffect(()=>{
            execute()
        }, [])

    return(
        <header className="border border-b-2 shadow-md">
            <div className="bg-white text-black flex  justify-between ">
                <div className="p-5">
                    <p className=" text-3xl" >Exchange </p>
                </div>
                <div className="p-5 flex text-xl text-amber-700 ">
                    <p className="ps-4 ">EUR = {eurTouah ? eurTouah: 'loading'} UAH</p>
                    <p className="ps-4">USD = {usdTOuah ? usdTOuah : 'loading'} UAH</p>
                </div>
            </div>
        </header>
    )
}