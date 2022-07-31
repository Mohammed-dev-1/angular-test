import { Component, OnDestroy, OnInit } from '@angular/core';
import { FormControl } from '@angular/forms';
import { combineLatest, debounceTime, map, Observable, of, startWith, tap } from 'rxjs';
import { IElement } from '../interfaces/element.interface';
import { ElementsService } from '../service/elements.service';

@Component({
  selector: 'app-home-index',
  templateUrl: './home-index.component.html',
  styleUrls: ['./home-index.component.scss']
})
export class HomeIndexComponent implements OnInit, OnDestroy {
  public searchField!: FormControl;
  public elements$: Observable<IElement[]> = of([]);

  private waitTimeOut!: any;
  
  numberOfElement: number = 0;
  
  constructor(
    private readonly elementsService: ElementsService
  ) { 
    this.searchField = new FormControl('')
  }

  ngOnInit(): void {}

  public onFocus(): void {
    //Get elements, when input was foucs in
    this.elements$ = this.elementsService
      .getElements()
      .pipe(tap((elements) => this.numberOfElement = elements.length))

    const searchTerm = this.searchField
      .valueChanges
      .pipe(startWith(this.searchField.value))

    this.elements$ = this.getFilteredElements(this.elements$, searchTerm);
  }

  private getFilteredElements(elements: Observable<IElement[]>, searchTerm: Observable<string>): Observable<IElement[]> {
    return combineLatest([elements, searchTerm])
      .pipe(
        debounceTime(500),
        map(([elementsResponse, searchTerm]) => 
          elementsResponse.filter((element) => 
            searchTerm == '' || 
            element.title.toLocaleLowerCase().includes(searchTerm)
          )
        ),
        tap((elements) => this.numberOfElement = elements.length)
      )
  }

  public onFocusout(): void {
    //Clear search input after 1/2 s, when focus out
    this.waitTimeOut = setTimeout(() => {
      this.elements$ = of([]);
      this.numberOfElement = 0;
    }, 500);
  }

  public ngOnDestroy(): void {
    clearTimeout(this.waitTimeOut);
  }
}
