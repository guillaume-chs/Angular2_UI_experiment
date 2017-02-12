import { Component } from '@angular/core';

import { JourneyResearch } from '../shared/model/JourneyResearch';
import { FlightsService } from '../shared/services/flights.service';
import { HotelsService } from '../shared/services/hotels.service';
import { CitiesService } from '../shared/services/cities.service';
var module: any;
declare var jQuery: any;

@Component({
    moduleId: module.id,
    selector: 'search-form',
    providers: [],
    templateUrl: './search-form.component.html',
    styles: [`
        .call_received {
            transform: rotateY(180deg);
            padding-left: 15px;
        }
        .prefix {
            padding-top: 10px;
        }
        .input-field.inline input {
            width: 100%;
        }
        .submitted-container {
            cursor: pointer;
        }
    `]
})
export class SearchFormComponent {
    searchModel = new JourneyResearch(new Date().toLocaleDateString("fr", "dd/mm/yyyy"), "", "", 1, 1);
    submitted = false;
    cities: any = {};

    constructor(private flightsService: FlightsService,
                private hotelsService: HotelsService,
                private citiesService: CitiesService) {
        this.citiesService.searchCompletedEvent.subscribe((cities: string[]) => {
            console.log(this.citiesService.cities);
            this.cities = this.citiesService.citiesForAutocomplete;
            this.initUI(false, true);
        });
        this.citiesService.searchCities();
    }

    onSubmit() {
        this.submitted = true;
        this.flightsService.searchFlights(this.searchModel.departure_city, this.searchModel.arrival_city, this.searchModel.departure_date);
        this.hotelsService.searchHotels(this.searchModel.arrival_city);
    }

    onUnsubmit() {
        this.submitted = false;
        this.flightsService.unselectFlight();
        this.hotelsService.unselectHotel();
        setTimeout(this.initUI, 200);
    }

    ngAfterViewInit() {
        this.initUI();
    }

    initUI(datepicker: Boolean = true, autocomplete: Boolean = true) {
        if (datepicker) {
            jQuery('.datepicker').pickadate({
                selectMonths: true, // Creates a dropdown to control month
                format: "dd/mm/yyyy"
            });
        }
        if (autocomplete) {
            jQuery('input.autocomplete').autocomplete({
                data: this.cities,
                limit: 20 // The max amount of results that can be shown at once. Default: Infinity.
            });
        }
    }

    updateDate(event: any) {
        this.searchModel.departure_date = event.target.value;
    }

    get isFormValid(): boolean {
        return this.searchModel.isValid;
    }
}
