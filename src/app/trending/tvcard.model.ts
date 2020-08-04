export class TvCard {
    constructor(
        public genre_ids: [],
        public id: number,
        public original_language: string,
        public original_name: string,
        public origin_country: [],
        public overview: string,
        public popularity: number,
        public name: string,
        public vote_average: number,
        public vote_count: number,
        public first_air_date: string,
        public backdrop_path?: string,
        public poster_path?: string
    ) {}
}