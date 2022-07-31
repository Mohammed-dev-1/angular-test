import { Observable } from "rxjs";

export interface IElement {
    slug: string;
    id: string|number;
    title: string;
    subtitle: string;
    author: string
}

export interface IElementService {
    getElements(): Observable<IElement[]>;
    getElementBySlug(slug: string): Observable<IElement[]>
}