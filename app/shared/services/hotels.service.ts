import { Injectable, EventEmitter } from '@angular/core';
import { Http, Response } from '@angular/http';

import { Hotel } from '../model/Hotel';

@Injectable()
export class HotelsService {
    private h: Hotel[] = [];
    private selectedIndex: number = -1;

    private searchStarted: EventEmitter<any> = new EventEmitter();
    private searchCompleted: EventEmitter<Hotel[]> = new EventEmitter<Hotel[]>();
    private hotelSelection: EventEmitter<Hotel> = new EventEmitter<Hotel>();

    constructor(private http: Http) {
    }

    public searchHotels(arrivalCity: string) {
        this.searchStarted.emit();

        this.http.get("api/hotels.json").subscribe(res => {
            this.h = res.json()
                .filter((r: any) => r.City===arrivalCity)
                .map((rawH:any) => Hotel.parseHotel(rawH));
                
            console.log(this.h.length + ' hotels found');
            this.searchCompleted.emit(this.h);
        }, (error: any) => {
            this.h = [];
            console.log(error);
            this.searchCompleted.emit(this.h);
        });
    }

    public selectHotel(hotelId: number) {
        for (let i = 0; i < this.h.length; i++) {
            if (this.h[i].id === hotelId) {
                this.selectedIndex = i;
                this.hotelSelection.emit(this.h[i]);
                return;
            }
        }
        this.selectedIndex = -1;
    }

    public unselectHotel() {
        if (this.selectedIndex >= 0) {
            this.selectedIndex = -1;
            this.hotelSelection.emit(undefined);
        }
    }

    public get hotels(): Hotel[] {
        return this.h;
    }

    public get selectedHotel(): Hotel {
        return (this.selectedIndex >= 0)
            ? this.h[this.selectedIndex]
            : undefined;
    }

    public get searchStartedEvent(): EventEmitter<any> {
        return this.searchStarted;
    }

    public get searchCompletedEvent(): EventEmitter<Hotel[]> {
        return this.searchCompleted;
    }

    public get selectionEventEmitter(): EventEmitter<Hotel> {
        return this.hotelSelection;
    }
}