import { Injectable } from "@angular/core";
import { HttpClient, HttpParams } from '@angular/common/http';
import { Observable } from "rxjs";
import { IElement, IElementService } from "../interfaces/element.interface";
import { baseEndPoints, environment } from "src/environments/environment";

@Injectable({providedIn: 'root'})
export class ElementsService implements IElementService {
    constructor(
        private readonly http: HttpClient
    ) {}

    public getElements(): Observable<IElement[]> {
        return this.http.get<IElement[]>(
            `${environment.testURL}/${baseEndPoints.Elements}`
        )
    }

    public getElementBySlug(slug: string): Observable<IElement[]> {
        let httpParams = new HttpParams()
        httpParams = httpParams.append('slug', slug);

        return this.http.get<IElement[]>(
            `${environment.testURL}/${baseEndPoints.Elements}`,
            { params: httpParams }
        )
    }
}