import { JSXElementConstructor } from "react";

export type LayoutT = {
    name: string;
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    component: JSXElementConstructor<any>
};