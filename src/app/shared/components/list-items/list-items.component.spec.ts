import { HttpClientModule } from '@angular/common/http';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { provideMockStore } from '@ngrx/store/testing';
import { mockElements } from 'src/app/@fake-backend/mock/db';
import { HomeIndexComponent } from 'src/app/pages/home/home-index/home-index.component';
import { ElementsService } from '../../../pages/home/service/elements.service';
import { ListItemsComponent } from './list-items.component';


describe('ListItemsComponent', () => {
  let component: ListItemsComponent;
  let fixtureListItems: ComponentFixture<ListItemsComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [ ListItemsComponent ],
      imports: [ HttpClientModule ],
      providers: [ 
        ElementsService,
        provideMockStore() 
      ]
    })
    .compileComponents();

    fixtureListItems = TestBed.createComponent(ListItemsComponent);
    component = fixtureListItems.componentInstance;
    fixtureListItems.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should recived elements from parent component', () => {
    const fixtureHome = TestBed.createComponent(HomeIndexComponent);
    const homeIndexComponent = fixtureHome.componentInstance;
    homeIndexComponent.onFocus();

    fixtureListItems = TestBed.createComponent(ListItemsComponent);
    const listItemsComponent = fixtureListItems.componentInstance;

    listItemsComponent.elements$ = homeIndexComponent.elements$;
    
    listItemsComponent.elements$.subscribe(elements => {
      expect(elements).toEqual(mockElements);
    })
  });
});
