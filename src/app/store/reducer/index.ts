import { ActionReducerMap, MetaReducer } from "@ngrx/store";

import { environment } from "src/environments/environment";
import * as fromHome from '../../pages/home/store';

export interface IAppState {
    home: fromHome.IHomeState;
}

export const AppReducers: ActionReducerMap<IAppState> = {
    home: fromHome.homeReducers
}

export const metaReducers: MetaReducer<IAppState>[] = !environment.production ? [] : [];