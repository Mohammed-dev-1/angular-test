import { NgModule } from "@angular/core";
import { PagesRoutingModule } from "./pages-routing.module";
import { PagesComponent } from "./pages.component";
import { NotFoundComponent } from './not-found/not-found.component';

@NgModule({
    declarations: [
        PagesComponent,
        NotFoundComponent
    ],
    imports: [
        PagesRoutingModule
    ],
    exports: []
})
export class PagesModule {}