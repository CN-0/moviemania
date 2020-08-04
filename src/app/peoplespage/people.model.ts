export class People {
    constructor(
        public adult: boolean,
        public id: number,
        public name: string,
        public popularity: number,
        public known_for: {
            overview: string,
            genre_ids: [],
            id: number,
            media_type: string,
            original_language: string,
            popularity: number,
            vote_count: number,
            vote_average: number,
            poster_path?: string,
            backdrop_path?: string
            adult?: boolean,
            release_date?: string,
            original_title?: string,
            title?: string,
            vedio?: boolean,
            first_air_date?: string,
            origin_country?: [],
            name?: string,
            orignal_name?: string
        }[],
        public profile_path?: string,
        known_for_department?: string
    ) {}
}

export class Person {
    constructor(
        public known_for_department: string,
        public id: number,
        public name: string,
        public also_known_as: string[],
        public gender: number,
        public biography: number,
        public popularity: number,
        public adult: boolean,
        public imdb_id: string,
        public place_of_birth ?: string,
        public profile_path?: string,
        public homepage?: string,
        public birthday?: string,
        public deathday?: string
    ) {}
}

export class PersonCredits {
    constructor(
        public id: number,
        public cast: {
            id: number,
            original_language: string,
            episode_count: number,
            overview: string,
            origin_country: string[],
            original_name: string,
            genre_ids: number[],
            name: string,
            media_type: string,
            first_air_date: string,
            vote_average: number,
            vote_count: number,
            character: string,
            popularity: number,
            credit_id: string,
            original_title: string,
            video: boolean,
            release_date: string,
            title: string,
            adult: boolean,
            poster_path?: string,
            backdrop_path?: string
        }[],
        public crew: {
            id: number,
            department: string,
            original_language: string,
            episode_count: number,
            job: string,
            overview: string,
            origin_country: string[],
            original_name: string,
            name: string,
            media_type: string,
            first_air_date: string,
            genre_ids: number[],
            vote_average: number,
            vote_count: number,
            popularity: number,
            credit_id: string,
            original_title: string,
            video: boolean,
            release_date: string,
            title: string,
            adult: boolean,
            poster_path?: string,
            backdrop_path?: string
        }[]
    ) {}
}
