import { Component, Input } from '@angular/core';

import { HotelsService } from '../../shared/services/hotels.service';
var module: any;

@Component({
    moduleId: module.id,
    selector: 'hotel-card',
    providers: [],
    templateUrl: './hotel-card.component.html',
    styles: [`
        .hotel-img {
            min-width: 32px;
            width: 15%;
            margin-right: 1rem;
        }
        .hotel-content {
            display: inline-block;
            width: 66%;
        }
        .card {
            cursor: pointer;
        }
    `]
})
export class HotelCardComponent {
    hotel: any = undefined;

    constructor(private hotelsService: HotelsService) {
        this.hotelsService.selectionEventEmitter.subscribe((hotel: any) => {
            this.hotel = hotel;
        });
    }

    onUnselect() {
        this.hotelsService.unselectHotel();
    }
}
