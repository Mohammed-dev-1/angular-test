import { AfterContentChecked, ChangeDetectorRef, Component, OnDestroy, OnInit } from '@angular/core';
import { FormControl } from '@angular/forms';
import { Store } from '@ngrx/store';
import { combineLatest, debounceTime, map, Observable, of, startWith, tap } from 'rxjs';
import { IAppState } from 'src/app/store/reducer';
import { IElement } from '../interfaces/element.interface';
import { loadElements, selectElements } from '../store';

@Component({
  selector: 'app-home-index',
  templateUrl: './home-index.component.html',
  styleUrls: ['./home-index.component.scss']
})
export class HomeIndexComponent implements OnInit, AfterContentChecked, OnDestroy {
  public searchField!: FormControl;
  public elements$: Observable<IElement[]> = of([]);

  private waitTimeOut!: any;
  
  numberOfElement: number = 0;
  
  constructor(
    private readonly store: Store<IAppState>,
    private readonly cdr: ChangeDetectorRef
  ) { 
    this.searchField = new FormControl('')
  }

  ngOnInit(): void {}
  
  ngAfterContentChecked(): void {
    this.cdr.detectChanges();
  }

  ngOnDestroy(): void {
    clearTimeout(this.waitTimeOut);
  }

  public onFocus(): void {
    //Get elements, when input was foucs in
    this.elements$ = this.getElements();
    const searchTerm = this.getSearchTerm();
    this.elements$ = this.getFilteredElements(this.elements$, searchTerm);
  }

  public onFocusout(): void {
    //Clear search input after 1/2 s, when focus out
    this.waitTimeOut = setTimeout(() => {
      this.elements$ = of([]);
      this.numberOfElement = 0;
    }, 500);
  }


  private getElements(): Observable<IElement[]> {
    this.store.dispatch(loadElements());
    return this.store
      .select(selectElements)
      .pipe(tap((elements) => this.numberOfElement = elements.length))
  }

  private getSearchTerm(): Observable<string> {
    return this.searchField
      .valueChanges
      .pipe(startWith(this.searchField.value))
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
}
