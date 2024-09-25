import { create } from 'zustand';
import axios from 'axios';

interface ICurrency {
    loading: boolean;
    result: string;
    documentation: string;
    terms_of_use: string;
    time_last_update_unix: number;
    time_last_update_utc: string;
    time_next_update_unix: number;
    time_next_update_utc: string;
    base_code: string;
    conversion_rates: {
        [key: string]: number;
    };
}

interface IAction {
    execute: () => Promise<void>;
    calculateCurrency: (from: string, to: string, amount:number) => Promise<void>
}

const initialState: ICurrency = {
    loading: false,
    result: '',
    documentation: '',
    terms_of_use: '',
    time_last_update_unix: 0,
    time_last_update_utc: '',
    time_next_update_unix: 0,
    time_next_update_utc: '',
    base_code: '',
    conversion_rates: {},
};

const useExchangeStore = create<ICurrency & IAction>((set) => ({
    ...initialState,
    execute: async () => {
        set({ ...initialState, loading: true });
        try {
            const res = await axios.get('https://v6.exchangerate-api.com/v6/4a5fdf26b664ee8f4aa8f4fa/latest/usd/')
            set({ ...res.data, loading: false });             
        } catch (err) {
            console.error(err);
            set({ loading: false }); 
        }
    },
    calculateCurrency: async (from, to, amount)=>{
        set({...initialState, loading:true})
        try{
            const res = await axios.get(`https://v6.exchangerate-api.com/v6/4a5fdf26b664ee8f4aa8f4fa/pair/${from}/${to}/${amount}`)
            set({...res.data, loading:false})
            console.log(res);
            
        }catch(err){
            console.log(err);
            set({loading:false})
        }
    }
}));

export default useExchangeStore;
