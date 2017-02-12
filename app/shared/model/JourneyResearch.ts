
export class JourneyResearch {
    constructor(
        public departure_date: string,
        public departure_city: string,
        public arrival_city: string,
        public duration: number,
        public nb_passengers: number) {
    }

    get isValid(): boolean {
        return (this.departure_city.length > 0) &&
            (this.departure_date.length > 0) &&
            (this.arrival_city.length > 0) &&
            (this.duration > 0) &&
            (this.nb_passengers > 0);
    }
}