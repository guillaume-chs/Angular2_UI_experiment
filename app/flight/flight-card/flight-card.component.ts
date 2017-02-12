import { Component, Input } from '@angular/core';

import { FlightsService } from '../../shared/services/flights.service';
var module: any;

@Component({
    moduleId: module.id,
    selector: 'flight-card',
    providers: [],
    templateUrl: './flight-card.component.html',
    styles: [`
        .airplane-img {
            min-width: 32px;
            width: 15%;
            margin-right: 1rem;
        }
        .airplane-content {
            display: inline-block;
            width: 66%;
        }
        .card {
            cursor: pointer;
        }
    `]
})
export class FlightCardComponent {
    flight: any = undefined;

    constructor(private flightsService: FlightsService) {
        this.flightsService.selectionEventEmitter.subscribe((flight: any) => {
            this.flight = flight;
        });
    }

    onUnselect() {
        this.flightsService.unselectFlight();
    }
}
