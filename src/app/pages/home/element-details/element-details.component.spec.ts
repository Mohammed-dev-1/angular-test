import { Location } from '@angular/common';
import { Actions } from '@ngrx/effects';
import { ActivatedRoute, Router, RouterOutlet } from '@angular/router';

import { from, Observable, of } from 'rxjs';
import { Mock, MockRender, ngMocks } from 'ng-mocks';

import { ComponentFixture, fakeAsync, TestBed, tick } from '@angular/core/testing';
import { MockStore, provideMockStore } from '@ngrx/store/testing';
import { provideMockActions } from '@ngrx/effects/testing';
import { RouterTestingModule } from '@angular/router/testing';

import { IElement } from '../interfaces/element.interface';
import { ElementsService } from '../service/elements.service';
import { ElementDetailsComponent } from './element-details.component';
import { HttpClientModule } from '@angular/common/http';

describe('ElementDetailsComponent', () => {
  let component: ElementDetailsComponent;
  let fixture: ComponentFixture<ElementDetailsComponent>;
  let store: MockStore;
  let actions: Actions;

  const resConfig = {
    id: 1,
    slug: "angular",
    title: "angular framework",
    subtitle: "angular framework angular framework angular framework angular framework" ,
    author: "Google"
  }

  const observableData = of({
    elementDetails: resConfig
  });

  const fakeActivatedRoute = {
    data: observableData
  }; 

  class MockElementsService extends ElementsService {
    public override getElementBySlug(slug: string): Observable<IElement> {
      return of(resConfig)
    }
  }

  beforeEach(async () => {   
    await TestBed.configureTestingModule({
      declarations: [ ElementDetailsComponent ],
      imports: [
        HttpClientModule, 
        RouterTestingModule.withRoutes([]), 
        // provideMockStore(),
        // provideMockActions(() => actions)      
      ],
      providers: [ 
        { provide: ActivatedRoute, useValue: fakeActivatedRoute },
        { provide: ElementsService, useClass: MockElementsService },
      ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ElementDetailsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should recived details', () => {
    const fixture = TestBed.createComponent(ElementDetailsComponent);
    const component = fixture.componentInstance;
    const elementsService = TestBed.inject(ElementsService);
    
    elementsService.getElementBySlug('angular')
      .subscribe(details => {
        component.elementDetails = details;
        expect(component.elementDetails).toEqual(resConfig);
      })
  });
  
  it(`should have a title ${resConfig.title}`, () => {
    const fixture = TestBed.createComponent(ElementDetailsComponent);
    const component = fixture.componentInstance;
    const elementsService = TestBed.inject(ElementsService);
    
    elementsService.getElementBySlug('angular')
      .subscribe(details => {
        component.elementDetails = details;
        expect(component.elementDetails?.title).toEqual(resConfig.title);
      })
  });
  
  it(`should have a subtitle ${resConfig.subtitle}`, () => {
    const fixture = TestBed.createComponent(ElementDetailsComponent);
    const component = fixture.componentInstance;
    const elementsService = TestBed.inject(ElementsService);
    
    elementsService.getElementBySlug('angular')
      .subscribe(details => {
        component.elementDetails = details;
        expect(component.elementDetails?.subtitle).toEqual(resConfig.subtitle);
      })    
  });
});
