import { configureStore, EnhancedStore, ReducersMapObject } from "@reduxjs/toolkit";
import { getApplicationReducers } from "../store";

export type CreateStoreProps = {
    reducers?: ReducersMapObject
};


let __store : EnhancedStore;

export function getStore(){
    return __store;
}

export function createStore({
    reducers
} : CreateStoreProps ){
    if (!__store) {
        // This is the general pattern for creating the store
        __store = configureStore({
            reducer : {
                ...getApplicationReducers(),
                ...reducers
            }
        });
    }
    return __store;
};

export default createStore;
