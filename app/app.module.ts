import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule } from '@angular/forms';
import { HttpModule, JsonpModule } from '@angular/http';

import { AppComponent } from './app.component';
import { NavbarComponent } from './navbar/navbar.component';
import { SearchFormComponent } from './search-form/search-form.component';

import { FlightListComponent } from './flight/flight-list/flight-list.component';
import { FlightCardComponent } from './flight/flight-card/flight-card.component';
import { FlightsService } from './shared/services/flights.service';

import { HotelListComponent } from './hotel/hotel-list/hotel-list.component';
import { HotelCardComponent } from './hotel/hotel-card/hotel-card.component';
import { HotelsService } from './shared/services/hotels.service';

import { CheckoutComponent } from './checkout/checkout.component';

import { CitiesService } from './shared/services/cities.service';
import { ResaService } from './shared/services/resa.service';

@NgModule(({
    imports: [
        BrowserModule,
        FormsModule,
        HttpModule,
        JsonpModule
    ],
    declarations: [
        AppComponent,
        NavbarComponent,
        SearchFormComponent,
        FlightListComponent,
        FlightCardComponent,
        HotelListComponent,
        HotelCardComponent,
        CheckoutComponent
    ],
    bootstrap: [AppComponent],
    providers: [
        FlightsService,
        HotelsService,
        CitiesService,
        ResaService
    ]
}) as any)
export class AppModule { }
