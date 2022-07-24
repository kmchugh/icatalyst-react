import { Slice, ReducersMapObject } from "@reduxjs/toolkit";
import applicationSlices from './slices';

export function getApplicationReducers() : ReducersMapObject {
    return applicationSlices.reduce(
        (acc: ReducersMapObject, slice: Slice) => {
            acc[slice.name] = slice.reducer;
            return acc;
        }, 
        {}
    );
}

export default getApplicationReducers;