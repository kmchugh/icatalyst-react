import { ElementType, ReactNode } from "react";
import { BaseComponent } from "./base-component.type";
export declare type ContainerComponent<T extends ElementType> = {
    children: ReactNode;
} & BaseComponent<T>;
