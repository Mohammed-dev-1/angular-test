import { createSelector } from "@ngrx/store";
import { IAppState } from "src/app/store/reducer";
import { IHomeState } from "./state";

export const selectState = (state: IAppState) => state.home;

export const selectElements = createSelector(
    selectState,
    (state: IHomeState) => state.elements
)

export const selectElementDetails = createSelector(
    selectState,
    (state: IHomeState) => state.details
)