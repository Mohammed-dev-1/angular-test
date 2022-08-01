import { createAction, props } from "@ngrx/store";
import { IElement } from "../interfaces/element.interface";

export const loadElements = createAction(
    '[Home Page] Load elements'
);

export const loadElementsSuccess = createAction(
    '[Home Page] Load elements success',
    props<{ elements: IElement[] }>()
)

export const loadElementDetailsBySlug = createAction(
    '[Element details Page] Load details of element by slug',
    props<{ slug: string }>()
)

export const loadElementDetailsSuccess = createAction(
    '[Element Details Page] Load details of element',
    props<{ details: IElement }>()
)

export const loadFailure = createAction(
    '[Home Page] Load fail',
    props<{ error: string }>()
)