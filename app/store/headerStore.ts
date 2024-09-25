import { create } from 'zustand';
import axios from 'axios';

interface IHCurrency {
    usdTOuah:number
    eurTouah:number
    loading:boolean
}

interface IAction {
    execute: () => Promise<void>;
}

const initialState: IHCurrency = {
 usdTOuah:0,
 eurTouah:0,
 loading:false
};

const useHeaderStore = create<IHCurrency & IAction>((set) => ({
    ...initialState,
    execute: async () => {
        set({ ...initialState, loading: true });
        try {
            const resEur = await axios.get('https://v6.exchangerate-api.com/v6/4a5fdf26b664ee8f4aa8f4fa/pair/eur/uah/')
            const resUsd = await axios.get('https://v6.exchangerate-api.com/v6/4a5fdf26b664ee8f4aa8f4fa/pair/usd/uah/')
            set({ eurTouah: resEur.data.conversion_rate, usdTOuah:resUsd.data.conversion_rate, loading: false });
        } catch (err) {
            console.error(err);
            set({ loading: false });
        }
    }
}));

export default useHeaderStore;
