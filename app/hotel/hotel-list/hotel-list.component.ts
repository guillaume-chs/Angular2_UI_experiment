import { Component, Input } from '@angular/core';

import { JourneyResearch } from '../../shared/model/JourneyResearch';
import { HotelsService } from '../../shared/services/hotels.service';
var module: any;

@Component({
    moduleId: module.id,
    selector: 'hotel-list',
    providers: [],
    templateUrl: './hotel-list.component.html',
    styles: [`
        tr.selected {
            background-color: #a8a8a8;
        }
        tr.selected:hover {
            background-color: #a8a8a8;
        }
    `]
})
export class HotelListComponent {
    hotels: any[] = [];
    selectedHotel: number = -1;
    initialized: boolean = false;
    submitted: boolean = false;
    loading: boolean = false;

    constructor(private hotelsService: HotelsService) {
        this.hotelsService.searchStartedEvent.subscribe(() => {
            this.loading = true;
            if (!this.initialized) this.initialized = true;
        });
        this.hotelsService.selectionEventEmitter.subscribe((hotel: any) => {
            if (!hotel) {
                this.selectedHotel = -1;
                this.submitted = false;
            }
        });
        this.hotelsService.searchCompletedEvent.subscribe((hotels: any[]) => {
            this.hotels = hotels;
            this.submitted = false;
            this.selectedHotel = -1;
            this.loading = false;
        });
    }

    selectHotel(index: number) {
        if (this.selectedHotel !== index) {
            this.selectedHotel = index;
        } else {
            this.selectedHotel = undefined;
        }
    }

    onSubmit() {
        this.hotelsService.selectHotel(this.selectedHotel);
        this.submitted = true;
    }
}
