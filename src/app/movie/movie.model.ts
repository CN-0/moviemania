export class MovieModel {
    constructor(
        public adult: boolean,
        public genres: [],
        public budget: number,
        public revenue: number,
        public id: number,
        public original_language: string,
        public spoken_languages: [],
        public status: string,
        public original_title: string,
        public popularity: number,
        public release_date: string,
        public title: string,
        public video: boolean,
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
        public tagline?: string
    ) {}
}

