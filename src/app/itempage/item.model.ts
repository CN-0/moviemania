export class ItemModel {
    constructor(
        public genres: [],
        public id: number,
        public original_language: string,
        public status: string,
        public popularity: number,
        public vote_average: number,
        public vote_count: number,
        public production_companies?: [],
        public production_countries?: [],
        public backdrop_path?: string,
        public belongs_to_collection?: {},
        public homepage?: string,
        public imdb_id?: string,
        public overview?: string,
        public poster_path?: string,
        public runtime?: number,
        public tagline?: string,
        public title?: string,
        public name?: string,
        public release_date?: string,
        public first_air_date?: string,
        public budget?: number,
        public revenue?: number,
    ) {}
}

