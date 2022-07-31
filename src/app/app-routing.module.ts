import { NgModule } from "@angular/core";
import { ExtraOptions, RouterModule, Routes } from "@angular/router";
import { NotFoundComponent } from "./pages/not-found/not-found.component";

const routes: Routes = [
    { path: '', redirectTo: 'pages', pathMatch: 'full' },
    {
        path: 'pages',
        loadChildren: () => import('./pages/pages.module')
            .then(m => m.PagesModule)
    },
    {
        path: 'not-found',
        component: NotFoundComponent
    },
    { path: '**', redirectTo: 'not-found' },  
]

const config: ExtraOptions = {
    useHash: false,
};

@NgModule({
    imports: [RouterModule.forRoot(routes, config)],
    exports: [RouterModule]
})
export class AppRoutingModule {}