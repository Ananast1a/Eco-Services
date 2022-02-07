import { NgModule } from "@angular/core";
import { Routes, RouterModule } from "@angular/router";
import { EcoStationMapComponent } from "./eco-station-map/eco-station-map.component";
import { EcoStationPageComponent } from "./eco-station-page/eco-station-page.component";
import { HomeComponent } from "./home/home.component";
import { LoginComponent } from "./auth/login/login.component";
import { RegisterComponent } from "./auth/register/register.component";
import { WasteTypesListComponent } from "./waste-types-list/waste-types-list.component";

const appRoutes: Routes = [
    {path: '', component: HomeComponent},
    {path: 'sorting', component: WasteTypesListComponent},
    {path: 'map', component: EcoStationMapComponent},
    {path: 'register', component: RegisterComponent},
    {path: 'login', component: LoginComponent},
    {path: 'services/:id', component: EcoStationPageComponent},

]

@NgModule({
    imports: [
        RouterModule.forRoot(appRoutes)
    ],
    exports: [RouterModule]
})

export class AppRoutingModule {

}