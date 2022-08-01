import { createReducer, on } from "@ngrx/store";

import { homeState } from "./state";
import * as HomeActionsType from './action';

export const homeReducers = createReducer(
    //Initial State
    homeState,

    on(HomeActionsType.loadElements, (state) => ({ ...state, status: "loading" })),
    on(HomeActionsType.loadElementDetailsBySlug, (state, { slug }) => ({ ...state, status: "loading" })),

    on(HomeActionsType.loadElementsSuccess, (state, { elements }) => ({
        ...state,
        elements: [ ...elements ],
        details: null,
        error: '',
        status: "success"
    })),
    
    on(HomeActionsType.loadElementDetailsSuccess, (state, { details }) => ({
        ...state,
        details,
        error: '',
        status: "success"
    })),
    
    on(HomeActionsType.loadFailure, (state, { error }) => ({
        ...state,
        error,
        details: null,
        elements: [],
        status: "error"
    }))
)