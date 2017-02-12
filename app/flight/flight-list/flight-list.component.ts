import { Component, Input } from '@angular/core';

import { JourneyResearch } from '../../shared/model/JourneyResearch';
import { FlightsService } from '../../shared/services/flights.service';
var module: any;

@Component({
    moduleId: module.id,
    selector: 'flight-list',
    providers: [],
    templateUrl: './flight-list.component.html',
    styles: [`
        tr.selected {
            background-color: #a8a8a8;
        }
        tr.selected:hover {
            background-color: #a8a8a8;
        }
    `]
})
export class FlightListComponent {
    flights: any[] = [];
    selectedFlight: number = -1;
    initialized: boolean = false;
    submitted: boolean = false;
    loading: boolean = false;

    constructor(private flightsService: FlightsService) {
        this.flightsService.searchStartedEvent.subscribe(() => {
            this.loading = true;
            if (!this.initialized) this.initialized = true;
        });
        this.flightsService.selectionEventEmitter.subscribe((flight: any) => {
            if (!flight) {
                this.selectedFlight = -1;
                this.submitted = false;
            }
        });
        this.flightsService.searchCompletedEvent.subscribe((flights: any[]) => {
            this.flights = flights;
            this.submitted = false;
            this.selectedFlight = -1;
            this.loading = false;
        });
    }

    selectFlight(index: number) {
        if (this.selectedFlight !== index) {
            this.selectedFlight = index;
        } else {
            this.selectedFlight = undefined;
        }
    }

    onSubmit() {
        this.flightsService.selectFlight(this.selectedFlight);
        this.submitted = true;
    }
}
