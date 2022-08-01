import { HttpClientModule } from '@angular/common/http';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { RouterTestingModule } from '@angular/router/testing';
import { provideMockStore } from '@ngrx/store/testing';
import { mockElements } from 'src/app/@fake-backend/mock/db';
import { ElementsService } from '../service/elements.service';

import { HomeIndexComponent } from './home-index.component';

describe('HomeIndexComponent', () => {
  let component: HomeIndexComponent;
  let fixture: ComponentFixture<HomeIndexComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [ HomeIndexComponent ],
      imports: [ HttpClientModule, RouterTestingModule.withRoutes([]) ],
      providers: [ 
        ElementsService,
        provideMockStore() 
      ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(HomeIndexComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should search elements', () => {
    fixture = TestBed.createComponent(HomeIndexComponent);
    const component = fixture.componentInstance;
    component.onFocus()
    component.elements$.subscribe(elements => {
      expect(elements).toEqual(mockElements)
    })
  });
  
  it('should cancle search', () => {
    fixture = TestBed.createComponent(HomeIndexComponent);
    const component = fixture.componentInstance;
    component.onFocusout()
    component.elements$.subscribe(elements => {
      expect(elements).toEqual([])
    })
  });
});
