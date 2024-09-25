import {create} from 'zustand'

interface ICurrency {
    result:string,
    documentation:string,
    terms_of_use:string,
    time_last_update_unix:number,
    time_last_update_utc:string,
    time_next_update_unix:number,
    time_next_update_utc:string,
    base_code:string

    conversion_rates:{
        [key: string]: number
    }
}

interface IAction {
    
}

const initialState:ICurrency = {
    result:'',
    documentation:'',
    terms_of_use:'',
    time_last_update_unix:0,
    time_last_update_utc:'',
    time_next_update_unix:0,
    time_next_update_utc:'',
    base_code:'',
    conversion_rates:{
    }
}

const useExchangeStore = create<ICurrency & IAction>((set) => ({
    ...initialState,
    
}))