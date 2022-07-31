import { Location } from '@angular/common';
import { HttpClientModule } from '@angular/common/http';
import { ComponentFixture, fakeAsync, TestBed, tick } from '@angular/core/testing';
import { ActivatedRoute, Router, RouterModule, RouterOutlet } from '@angular/router';
import { RouterTestingModule } from '@angular/router/testing';
import { MockBuilder, MockRender, ngMocks, NG_MOCKS_GUARDS } from 'ng-mocks';
import { from, of } from 'rxjs';
import { SharedModule } from 'src/app/shared/shared.module';
import { HomeRoutingModule } from '../home-routing.module';
import { HomeModule } from '../home.module';
import { ElementsService } from '../service/elements.service';
import { ElementDetailsComponent } from './element-details.component';
import { ElementDetailsResolver } from './element-details.resolver';

describe('ElementDetailsComponent', () => {
  let component: ElementDetailsComponent;
  let fixture: ComponentFixture<ElementDetailsComponent>;

  const resConfig = [{
    id: 1,
    slug: "angular",
    title: "angular framework",
    subtitle: "angular framework angular framework angular framework angular framework" ,
    author: "Google"
  }]

  const fakeActivatedRoute = {
    snapshot: { 
      data: {
        elementDetails: from([resConfig])
      } 
    }
  } as ActivatedRoute | any; 

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ElementDetailsComponent ],
      imports: [ HttpClientModule, HomeRoutingModule, SharedModule ],
      providers: [ 
        ElementsService,
        {provide: ActivatedRoute, useValue: fakeActivatedRoute}
      ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ElementDetailsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  beforeEach(() =>
    MockBuilder(
      // Things to keep and export.
      [
        ElementDetailsResolver,
        HomeRoutingModule,
        RouterTestingModule.withRoutes([]),
      ],
      // Things to mock.
      HomeModule,
    ).exclude(NG_MOCKS_GUARDS)
  );

  it('provides data to on the route', fakeAsync(() => {
    const fixture = MockRender(RouterOutlet);
    const router: Router = fixture.point.injector.get(Router);
    const location: Location = fixture.point.injector.get(Location);
    const dataService: ElementsService = fixture.point.injector.get(ElementsService);

    // DataService has been replaced with a mock copy,
    // let's set a custom value we will assert later on.
    dataService.getElementBySlug = () => from([resConfig]);

    // Let's switch to the route with the resolver.
    location.go('/angular');

    // Now we can initialize navigation.
    if (fixture.ngZone) {
      fixture.ngZone.run(() => router.initialNavigation());
      tick(); // is needed for rendering of the current route.
    }

    // Checking that we are on the right page.
    expect(location.path()).toEqual('/angular');

    // Let's extract ActivatedRoute of the current component.
    const el = ngMocks.find(ElementDetailsComponent);
    const route: ActivatedRoute = el.injector.get(ActivatedRoute);

    // Now we can assert that it has expected data.
    expect(route.snapshot.data).toEqual(
      jasmine.objectContaining({
        data: {
          elementDetails: resConfig
        },
      }),
    );
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
