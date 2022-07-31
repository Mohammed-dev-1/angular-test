import { Injectable } from '@angular/core';
import { Resolve, ActivatedRouteSnapshot } from '@angular/router';
import { Observable } from 'rxjs';
import { IElement } from '../interfaces/element.interface';
import { ElementsService } from '../service/elements.service';

@Injectable({ providedIn: 'root' })
export class ElementDetailsResolver implements Resolve<IElement[]> {
    constructor(
        private readonly elementsService: ElementsService
    ) {}
    
    resolve(route: ActivatedRouteSnapshot): Observable<IElement[]> {
        return this.elementsService.getElementBySlug(route.params['slug']);
    }
}