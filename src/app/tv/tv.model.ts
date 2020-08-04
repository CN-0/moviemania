export class TvModel {
    constructor(
        public created_by: {id: string, credit_id: string, name: string, gender: number, profile_path: string}[],
        public episode_run_time: number[],
        public first_air_date: string,
        public genres: {id: number, name: string}[],
        public homepage: string,
        public id: number,
        public in_production: boolean,
        public languages: string[],
        public last_air_date: string,
        public last_episode_to_air: {
            air_date: string,
            episode_nummber: number,
            id: number,
            name: string,
            overview: string,
            production_code: string,
            season_number: number,
            show_id: number,
            still_path: string,
            vote_average: number,
            vote_count: number
        },
        public name: string,
        public next_episode_to_air: null,
        public networks: {name: string, id: number, logo_path: string, origin_country: string}[],
        public number_of_episodes: number,
        public number_of_seasons: number,
        public origin_country: string[],
        public original_language: string,
        public original_name: string,
        public overview: string,
        public popularity: number,
        public seasons: {
            air_date: string,
            episode_count: number,
            id: number,
            name: string,
            overview: string,
            poster_path: string,
            season_number: number
        }[],
        public status: string,
        public type: string,
        public vote_average: number,
        public vote_count: number,
        public production_companies: {
            id: number,
            name: string,
            origin_country: string,
            logo_path?: string
        }[],
        public backdrop_path?: string,
        public poster_path?: string
    ) {}
}

