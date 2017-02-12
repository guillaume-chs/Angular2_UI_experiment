import { Injectable, EventEmitter } from '@angular/core';
import { Http, Response } from '@angular/http';

import { Flight } from '../model/Flight';
import { Hotel } from '../model/Hotel';

@Injectable()
export class ResaService {
    constructor(private http: Http) {
    }

    public reserveVoyage(vol: Flight, hotel: Hotel, lastname: string, firstname: string) {
        const queryString = `?hotelId=${hotel.id}&volId=${vol.id}&nom=${lastname}&prenom=${firstname}`;
        return this.http.get("api/reserve.json");
    }
}