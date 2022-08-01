import { Injectable } from "@angular/core";
import { Actions, createEffect, ofType } from "@ngrx/effects";
import { catchError, concatMap, map, of, tap } from "rxjs";

import { ElementsService } from "../service/elements.service";
import * as HomeActionsType from './action';

@Injectable()
export class HomeEffects {
    constructor(
        private readonly actions$: Actions,
        private readonly elementsService: ElementsService
    ) {}

    loadElements = createEffect(() =>
        this.actions$.pipe(
            ofType(HomeActionsType.loadElements),
            concatMap(() => this.elementsService.getElements()),
            map(elements => HomeActionsType.loadElementsSuccess({ elements })),
            catchError(error => of(HomeActionsType.loadFailure({ error })))
        )
    )

    loadElementDetails = createEffect(() =>
        this.actions$.pipe(
            ofType(HomeActionsType.loadElementDetailsBySlug),
            concatMap((action) => this.elementsService.getElementBySlug(action.slug)),
            tap(data => console.log(data)),
            map(details => HomeActionsType.loadElementDetailsSuccess({ details })),
            catchError(error => of(HomeActionsType.loadFailure({ error })))
        ),
        {dispatch: false}
    )
}