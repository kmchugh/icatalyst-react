import { ElementType, ReactNode } from "react";
import { BaseComponent } from "./base-component.interface";

export interface ContainerComponent<T extends ElementType> extends BaseComponent<T> {
    children: ReactNode
};