import { HttpClientModule } from '@angular/common/http';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ReactiveFormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';
import { SharedModule } from 'src/app/shared/shared.module';
import { HomeRoutingModule } from '../home-routing.module';
import { ElementsService } from '../service/elements.service';

import { HomeIndexComponent } from './home-index.component';

describe('HomeIndexComponent', () => {
  let component: HomeIndexComponent;
  let fixture: ComponentFixture<HomeIndexComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ HomeIndexComponent ],
      imports: [ HttpClientModule, HomeRoutingModule, SharedModule, ReactiveFormsModule ],
      providers: [ ElementsService ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(HomeIndexComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
