import type { TypedUseSelectorHook } from "react-redux";
import { useDispatch, useSelector } from "react-redux";
import { getStore } from "../utilities";

const store = getStore();

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;

export const useAppDispatch: ()=> AppDispatch = useDispatch;
export const useAppSelector: TypedUseSelectorHook<RootState> = useSelector;

export function useSettingsSelector(settingsSelector : (state : RootState)=>any){
    return useAppSelector((state)=>{
        return settingsSelector(state['icatalyst/settings']);
    });
};