import { useEffect } from "react"
import Image from "next/image"
import img from "@/app/assets/change.svg"
import useExchangeStore from "@/app/store/store"





export const Content = () => {

    const getData = useExchangeStore()

    useEffect(() => {
        // getData.execute()
        getData.calculateCurrency('usd', 'uah', 5)
    }, [])




    return (
        <main className="h-72 flex justify-center items-center">
            <div className="border border-solid p-4 border-gray rounded flex shadow-lg">
                <div className="block mb-4">
                    <label htmlFor="amount" className="block text-gray-700 mb-2">Amount</label>
                    <input type="text" id="amount" className="border border-gray-300 p-2 rounded w-full shadow-md" />
                </div>

                <div className="flex mb-4 ps-5 items-end ">
                    <Image className=":hover cursor-pointer" 
                        src={img}
                        width={50}
                        height={50}
                        alt="change"/>

                </div>

           
                <div className="block  ps-5">
                    <label htmlFor="amount" className="block text-gray-700 mb-2">Exchange</label>
                    <input type="text" id="amount" className="border border-gray-300 p-2 rounded w-full shadow-md" />
                </div>
                <div className="block mb-4 ps-5">
                    <label htmlFor="select" className="block text-gray-700 mb-2">From</label>
                    <select name="" id="select" className="border border-gray-300 p-2 rounded w-full bg-white shadow-md">
                        <option value="USD">$USD</option>
                        <option value="EUR">€EUR</option>
                    </select>
                </div>
                <div className="block mb-4 ps-5">
                    <label htmlFor="select" className="block text-gray-700 mb-2">To</label>
                    <select name="" id="select" className="border border-gray-300 p-2 rounded w-full bg-white shadow-md">
                        <option value="USD">$USD</option>
                        <option value="EUR">€EUR</option>
                    </select>
                </div>

                


                </div>
        </main>

    )
}