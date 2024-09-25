import { useEffect } from "react"
import {FormExchange} from '@/app/components/FormExchange/FormExchange'
import useExchangeStore from "@/app/store/store"





export const Content = () => {


    useEffect(() => {
        // getData.execute()
        // getData.calculateCurrency('usd', 'uah', 5)
    }, [])




    return (
        <main className="h-72 flex justify-center items-center">
            <FormExchange/>
        </main>

    )
}