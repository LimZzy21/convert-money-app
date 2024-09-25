'use client'
import { z } from 'zod';
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import useExchangeStore from "@/app/store/store";
import { useEffect, useState } from "react";

interface IForm {
    amount: number;
    exchange?: number;
    from: string;
    to: string;
}

const ExchangeFormSchema = z.object({
    amount: z.number().nonnegative('This field must be non-negative').min(1, 'This field is required'),
    exchange: z.number().optional(),
    from: z.string().min(2, 'From currency is required'),
    to: z.string().min(2, 'To currency is required')
});

export const FormExchange = () => {
    const { calculateCurrency } = useExchangeStore();
    const store = useExchangeStore((store) => store.conversion_rate);

    const { register,  watch, setValue, formState: { errors } } = useForm<IForm>({
        resolver: zodResolver(ExchangeFormSchema)
    });

    const [isAmountChanged, setIsAmountChanged] = useState(true); 


    const amount = watch("amount");
    const exchange = watch("exchange");
    const from = watch("from");
    const to = watch("to");

    useEffect(() => {
        const exchangeRate = store;

        if (isAmountChanged && amount && amount > 0) {
            setValue("exchange", amount * exchangeRate);
        }
    }, [amount, setValue, isAmountChanged, store]);

    useEffect(() => {
        const exchangeRate = store;

        if (!isAmountChanged && exchange && exchange > 0) {
            setValue("amount", exchange / exchangeRate);
        }

    }, [exchange, setValue, isAmountChanged, store]);

    
    
    useEffect(() => {
        if(amount>0    ){
            calculateCurrency(from, to, amount, false)

        }

    }, [to,from, isAmountChanged]);

    const handleAmountChange = () => {
        setIsAmountChanged(true);  
    };

    const handleExchangeChange = () => {
        setIsAmountChanged(false); 
    };

    return (
        <form  className="border border-solid p-4 border-gray rounded shadow-lg ">
            <div className="flex ">
                <div className="block mb-4 md:placeholder:">
                    <label htmlFor="amount" className="block text-gray-700 mb-2">Amount</label>
                    <input
                        {...register('amount', {
                            setValueAs: (value) => parseFloat(value) || 0,
                            onChange: handleAmountChange  
                        })}
                        type="number"
                        id="amount"
                        className="border border-gray-300 p-2 rounded  shadow-md "
                    />
                    {errors.amount && <div className="text-red-500">{errors.amount.message}</div>}
                </div>
                            
                <div className="block ps-5 mb-4">
                    <label htmlFor="exchange" className="block text-gray-700 mb-2">Exchange</label>
                    <input
                        {...register('exchange', {
                            setValueAs: (value) => parseFloat(value) || 0,
                            onChange: handleExchangeChange 
                        })}
                        type="number"
                        id="exchange"
                        className="border border-gray-300 p-2 rounded w-full shadow-md"
                    />
                    {errors.exchange && <div className="text-red-500">{errors.exchange.message}</div>}
                </div>

                <div className="block mb-4 ps-5">
                    <label htmlFor="from" className="block text-gray-700 mb-2">From</label>
                    <select {...register('from')} id="from" className="border border-gray-300 p-2 rounded w-full bg-white shadow-md">
                        <option value="USD">USD</option>
                        <option value="EUR">EUR</option>
                        <option value="UAH">UAH</option>
                    </select>
                    {errors.from && <div className="text-red-500">{errors.from.message}</div>}
                </div>

                <div className="block mb-4 ps-5">
                    <label htmlFor="to" className="block text-gray-700 mb-2">To</label>
                    <select {...register('to')} id="to" className="border border-gray-300 p-2 rounded w-full bg-white shadow-md">
                        <option value="EUR">EUR</option>
                        <option value="USD">USD</option>
                        <option value="UAH">UAH</option>
                    </select>
                    {errors.to && <div className="text-red-500">{errors.to.message}</div>}
                </div>
            </div>
        </form>
    );
};
