import { HttpClientModule } from '@angular/common/http';
import { TestBed } from '@angular/core/testing';
import { Observable, of } from 'rxjs';
import { mockElements } from 'src/app/@fake-backend/mock/db';
import { IElement } from '../interfaces/element.interface';
import { ElementsService } from './elements.service';

describe('Elements Service', () => {
    const resConfig: IElement = mockElements.find(element => element.slug == 'angular') as IElement
    const observableData = of(resConfig);
    
    class MockElementsService extends ElementsService {
        public override getElementBySlug(slug: string): Observable<IElement> {
            return of(resConfig)
        }
    }
    

    beforeEach(async () => {
        await TestBed.configureTestingModule({
            imports: [ HttpClientModule ],
            providers: [ 
                { provide: ElementsService, useClass: MockElementsService },
            ]
        })
        .compileComponents();
    });

    it('should get element details by slug', () => {
        const elementsService = TestBed.inject(ElementsService);

        elementsService.getElementBySlug('angular')
            .subscribe(element => {
                expect(element).toEqual(resConfig)
            })
    })

    it('should get all elements', () => {
        const elementsService = TestBed.inject(ElementsService);

        elementsService.getElements()
            .subscribe(elements => {
                expect(elements).toEqual(mockElements)
            })
    })
});
