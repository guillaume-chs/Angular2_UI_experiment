
export class Hotel {
    constructor(public city: string,
        public capacity: number,
        public name: string,
        public id: number,
        public price: number) {
    }

    public static parseHotel(raw: any): Hotel {
        return new Hotel(
            raw.City,
            raw.Capacity,
            raw.Name,
            raw.IdHotel,
            raw.Price
        );
    }
}