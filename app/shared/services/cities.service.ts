import { Injectable, EventEmitter } from '@angular/core';
import { Http, Response } from '@angular/http';

@Injectable()
export class CitiesService {
    private c: string[] = [];
    private searchStarted: EventEmitter<any> = new EventEmitter();
    private searchCompleted: EventEmitter<string[]> = new EventEmitter<string[]>();

    constructor(private http: Http) {
    }

    public searchCities() {
        this.searchStarted.emit();

        this.http.get("api/cities.json").subscribe((res: any) => {
            this.c = res.json();
            console.log(this.c.length + ' cities loaded');
            this.searchCompleted.emit(this.c);
        }, (error: any) => {
            this.c = [];
            console.log(error);
            this.searchCompleted.emit(this.c);
        });
    }

    public get cities(): any[] {
        return this.c;
    }

    public get citiesForAutocomplete(): any {
        const obj = {};
        this.c.forEach((cityName: string) => {
            obj[cityName] = null;
        });
        return obj;
    }
    
    public get searchStartedEvent(): EventEmitter<any> {
        return this.searchStarted;
    }

    public get searchCompletedEvent(): EventEmitter<string[]> {
        return this.searchCompleted;
    }
}