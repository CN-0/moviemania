export class Card {
    constructor(
        public genre_ids: [],
        public id: number,
        public original_language: string,
        public overview: string,
        public popularity: number,
        public vote_average: number,
        public vote_count: number,
        public backdrop_path?: string,
        public release_date?: string,
        public poster_path?: string,
        public media_type?: string,
        public title?: string,
        public name?: string,
        public first_air_date?: string,
        public dates?: {
            maximum: string,
            minimum: string
        }
    ) {}
}
