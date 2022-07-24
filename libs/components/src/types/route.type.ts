import { ReactNode } from "react";

export type RouteT = {
    title: string;
    navigation: boolean;
    path: string;
    component: ReactNode;
    children? : RouteT[];
    auth?: any;
    exact?: boolean;
};