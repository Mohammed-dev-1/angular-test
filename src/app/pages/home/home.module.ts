import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HomeRoutingModule, RoutedComponent } from './home-routing.module';
import { ReactiveFormsModule } from '@angular/forms';
import { SharedModule } from 'src/app/shared/shared.module';
import { StoreModule } from '@ngrx/store';
import { HomeEffects, homeReducers } from './store';
import { EffectsModule } from '@ngrx/effects';

@NgModule({
  declarations: [
    ...RoutedComponent
  ],
  imports: [
    CommonModule,
    HomeRoutingModule,
    ReactiveFormsModule,
    SharedModule,
    StoreModule.forFeature('home', homeReducers),
    EffectsModule.forFeature([HomeEffects])
  ]
})
export class HomeModule { }
