import { IStatus } from "src/app/shared/interfaces/store.interface";
import { IElement } from "../interfaces/element.interface";

export interface IHomeState {
    details: IElement|null;
    elements: IElement[];
    error: string;
    status: IStatus
}

export const homeState: IHomeState = {
    details: null,
    elements: [],
    error: '',
    status: "pending"
}