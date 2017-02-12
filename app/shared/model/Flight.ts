
export class Flight {
    constructor(public arrival_date: string,
        public arrival_city: string,
        public departure_date: string,
        public departure_city: string,
        public capacity: number,
        public name: string,
        public id: number,
        public price: number) {
    }

    public static parseFlight(raw: any): Flight {
        return new Flight(
            raw.ArrivalDate,
            raw.ArrivalCity,
            raw.DepartureDate,
            raw.DepartureCity,
            raw.Capacity,
            raw.Name,
            raw.IdVol,
            raw.Price
        );
    }
}