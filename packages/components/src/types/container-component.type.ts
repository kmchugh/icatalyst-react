import { ElementType, ReactNode } from "react";
import { BaseComponent } from "./base-component.type";

export type ContainerComponent<T extends ElementType> = {
    children: ReactNode
} & BaseComponent<T>;