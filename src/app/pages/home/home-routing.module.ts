import { NgModule } from "@angular/core";
import { RouterModule, Routes } from "@angular/router";
import { ElementDetailsComponent } from "./element-details/element-details.component";
import { ElementDetailsResolver } from "./element-details/element-details.resolver";
import { HomeIndexComponent } from "./home-index/home-index.component";
import { HomeComponent } from "./home.component";

const routes: Routes = [{
    path: '',
    component: HomeComponent,
    children: [
        {
            path: '',
            component: HomeIndexComponent,
            data: {
                breadcrumb: 'Home'
            }
        },
        {
            path: ':slug',
            component: ElementDetailsComponent,
            resolve: {
                elementDetails: ElementDetailsResolver
            }
        }
    ]
}]

@NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule]
})
export class HomeRoutingModule {}
export const RoutedComponent = [
    HomeComponent,
    HomeIndexComponent,
    ElementDetailsComponent
]