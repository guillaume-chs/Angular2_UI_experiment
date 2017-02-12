import { Injectable, EventEmitter } from '@angular/core';
import { Http, Response } from '@angular/http';

import { Flight } from '../model/Flight';

@Injectable()
export class FlightsService {
    private f: Flight[] = [];
    private selectedIndex: number = -1;

    private searchStarted: EventEmitter<any> = new EventEmitter();
    private searchCompleted: EventEmitter<Flight[]> = new EventEmitter<Flight[]>();
    private flightSelection: EventEmitter<Flight> = new EventEmitter<Flight>();

    constructor(private  http: Http) {
    }

    public searchFlights(departureCity: string, arrivalCity: string, departureDate: string): void {
        this.searchStarted.emit();

        this.http.get("api/flights.json").subscribe((res: any) => {
            this.f = res.json()
                .filter((r: any) => r.DepartureCity===departureCity && r.ArrivalCity===arrivalCity)
                .map((rawF:any) => Flight.parseFlight(rawF));

            console.log(this.f.length + ' flights found');
            this.searchCompleted.emit(this.f);
        }, (error: any) => {
            this.f = [];
            console.log(error);
            this.searchCompleted.emit([]);
        });
    }

    public selectFlight(flightId: number) {
        for (let i = 0; i < this.f.length; i++) {
            if (this.f[i].id === flightId) {
                this.selectedIndex = i;
                this.flightSelection.emit(this.f[i]);
                return;
            }
        }
        this.selectedIndex = -1;
    }

    public unselectFlight() {
        if (this.selectedIndex >= 0) {
            this.selectedIndex = -1;
            this.flightSelection.emit(undefined);
        }
    }

    public get flights(): Flight[] {
        return this.f;
    }

    public get selectedFlight(): Flight {
        return (this.selectedIndex >= 0)
            ? this.f[this.selectedIndex]
            : undefined;
    }

    public get searchStartedEvent(): EventEmitter<any> {
        return this.searchStarted;
    }

    public get searchCompletedEvent(): EventEmitter<Flight[]> {
        return this.searchCompleted;
    }

    public get selectionEventEmitter(): EventEmitter<Flight> {
        return this.flightSelection;
    }
}