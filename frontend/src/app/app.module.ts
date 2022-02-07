import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MatIconModule } from '@angular/material/icon';

import { AppComponent } from './app.component';
import { HeaderComponent } from './header/header.component';
import { EcoStationMapComponent } from './eco-station-map/eco-station-map.component';
import { WasteTypesListComponent } from './waste-types-list/waste-types-list.component';
import { EcoStationComponent } from './eco-station/eco-station.component';
import { HomeComponent } from './home/home.component';
import { LeafletModule } from '@asymmetrik/ngx-leaflet';
import { EcoStationSidebarComponent } from './eco-station-sidebar/eco-station-sidebar.component';

import { AppRoutingModule } from './app-routing.module';
import { WasteItemComponent } from './waste-item/waste-item.component';
import { WasteItemSubtypeComponent } from './waste-item-subtype/waste-item-subtype.component';
import { WasteTypeComponent } from './waste-type/waste-type.component';
import { HttpClientModule } from '@angular/common/http';
import { AuthModule } from './auth/auth.module';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { NgxsModule } from '@ngxs/store';
import { environment } from 'src/environments/environment';
import { StationsState } from './store/states/stationsState';
import { EcoStationPageComponent } from './eco-station-page/eco-station-page.component';
import { NgRatingBarModule } from './ng-rating-bar/ng-rating-bar.module';
import { EcoStationAdderComponent } from './eco-station-adder/eco-station-adder.component';

@NgModule({
  declarations: [
    AppComponent,
    HeaderComponent,
    EcoStationMapComponent,
    WasteTypesListComponent,
    EcoStationComponent,
    HomeComponent,
    EcoStationSidebarComponent,
    WasteItemComponent,
    WasteItemSubtypeComponent,
    WasteTypeComponent,
    EcoStationPageComponent,
    EcoStationAdderComponent
  ],
  imports: [
    NgxsModule.forRoot([StationsState], {
      developmentMode: !environment.production
    }),
    BrowserModule,
    BrowserAnimationsModule,
    ReactiveFormsModule,
    FormsModule,
    MatIconModule,
    AppRoutingModule,
    LeafletModule,
    AuthModule,
    HttpClientModule,
    NgRatingBarModule,
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
