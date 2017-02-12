import { Component } from '@angular/core';

import { FlightsService } from '../shared/services/flights.service';
import { HotelsService } from '../shared/services/hotels.service';
import { ResaService } from '../shared/services/resa.service';
var module: any;

@Component({
    moduleId: module.id,
    selector: 'checkout',
    providers: [],
    templateUrl: './checkout.component.html'
})
export class CheckoutComponent {
    flight: any = {};
    hotel: any = {};
    firstname: string = "";
    lastname: string = "";

    loading: boolean = false;
    submitted: boolean = false;

    constructor(private resaService: ResaService,
                private flightsService: FlightsService,
                private hotelsService: HotelsService) {
        this.flightsService.selectionEventEmitter.subscribe((flight: any) => {
            this.flight = flight;
        });
        this.hotelsService.selectionEventEmitter.subscribe((hotel: any) => {
            this.hotel = hotel;
        });
    }

    onSubmit() {
        this.submitted = true;
        this.loading = true;
        this.resaService.reserveVoyage(
            this.flight.id,
            this.flight.id,
            this.firstname,
            this.lastname
        ).subscribe((res: any) => {
            this.loading = false;
        });
    }

    get isFormValid(): boolean {
        return this.firstname.length > 0 && this.lastname.length > 0;
    }

    get initialized(): boolean {
        return !!this.flightsService.selectedFlight
            && !!this.hotelsService.selectedHotel;
    }
}