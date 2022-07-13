import { ReactNode } from "react";
import { BaseComponent } from "./base-component.type";

export type ContainerComponent = {
    children: ReactNode
} & BaseComponent;