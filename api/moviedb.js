import axios from 'axios';
import { api_key as API_KEY} from '../constants/index';


const apiBaseUrl = 'https://api.themoviedb.org/3';
const trendingMovies = `${apiBaseUrl}/trending/movie/day?api_key=${API_KEY}`;
const upcomingMovies = `${apiBaseUrl}/movie/upcoming?api_key=${API_KEY}`;
const topRatedMovies = `${apiBaseUrl}/movie/top_rated?api_key=${API_KEY}`;
const searchMovies =  `${apiBaseUrl}/search/movie?api_key=${API_KEY}`;


// dynamic endpoints
const movieDetails = (id) => `${apiBaseUrl}/movie/${id}?api_key=${API_KEY}`;
const movieCredits = (id) => `${apiBaseUrl}/movie/${id}/credits?api_key=${API_KEY}`;
const similarMovies = (id) => `${apiBaseUrl}/movie/${id}/similar?api_key=${API_KEY}`;
const personDetails = (id) => `${apiBaseUrl}/person/${id}?api_key=${API_KEY}`;
const personMovies = (id) => `${apiBaseUrl}/person/${id}/movie_credits?api_key=${API_KEY}`;


export const image500 =path=>path?  `https://image.tmdb.org/t/p/w500${path}`:null;
export const image342 =path=>path?  `https://image.tmdb.org/t/p/w342${path}`:null;
export const image185 =path=>path?  `https://image.tmdb.org/t/p/w185${path}`:null;

export const fallbackMoviePoster = 'https://www.movienewz.com/img/films/poster-holder.jpg';
export const fallbackPersonPoster = 'https://www.gravatar.com/avatar/?d=mp';


const apiCall = async (url,params) => {
    const options = {
        method: 'GET',
        url: url,
        params: params? params:{}
    }
    try {
        const response = await axios.request(options);
        return response.data;
    } catch (error) {
        console.error(error);
    }
}

export const fetchTrendingMovies = async () => {
    return await apiCall(trendingMovies);
}

export const fetchUpcomingMovies = async () => {
    return await apiCall(upcomingMovies);
}

export const fetchTopRatedMovies = async () => {
    return await apiCall(topRatedMovies);
}

export const fetchMovieDetails = async (id) => {
    return await apiCall(movieDetails(id));
}

export const fetchMovieCredits = async (id) => {
    return await apiCall(movieCredits(id));
}

export const fetchSimilarMovies = async (id) => {
    return await apiCall(similarMovies(id));
}

export const fetchPersonDetails = async (id) => {
    return await apiCall(personDetails(id));
}

export const fetchPersonCredits = async (id) => {
    return await apiCall(personMovies(id));
}

export const searchMovie = async (query) => {
    return await apiCall(searchMovies, query);
}
