import { HttpClient } from '@angular/common/http';
import { Injectable, inject } from '@angular/core';
import { Observable, delay } from 'rxjs';
import { environment } from 'src/environments/environment';
import { ApiResult, MovieResult } from '../interfaces/movie.interface';
import { MoviesGenres } from '../interfaces/movieGenres.interface';

const BASE_URL = 'https://api.themoviedb.org/3';
const API_KEY = environment.apiKey;

@Injectable({
  providedIn: 'root'
})

export class MovieService {

  private http = inject(HttpClient)

  constructor() { }

  /**
   * Obtiene las películas más valoradas de The Movie DB
   * @param page Número de página a obtener, por defecto 1
   * @returns Observable con los resultados de la API de The Movie DB
   */
  getTopRatedMovies(page = 1): Observable<ApiResult> {
    // Se realiza la petición a la API de The Movie DB
    return this.http // Retorna un Observable con los resultados de la API
      .get<ApiResult>( // URL de la petición
        `${BASE_URL}/movie/popular?page=${page}&api_key=${API_KEY}&language=es` // Parámetros de la petición
      )
      .pipe(
        delay(2000) // Un pequeño retardo para mostrar el indicador de carga
      );
  }

  /**
   * Obtiene los detalles de una película
   * @param id Identificador de la película
   */
  getMovieDetails(id: string): Observable<MovieResult> {
    // Se realiza la petición a la API de The Movie DB
    return this.http.get<MovieResult>( // Retorna un Observable con los detalles de la película
      `${BASE_URL}/movie/${id}?api_key=${API_KEY}` // URL de la petición
    );
  }

  // Fetch Movies Genres
  getMovieGenres(): Observable<MoviesGenres> {
    return this.http.get<MoviesGenres>(
      `${BASE_URL}/genre/movie/list?api_key=${API_KEY}&language=es`
    );
  }

  // filter movie by genre
  filterByGenre(genreID: string): Observable<ApiResult> {
    return this.http.get<ApiResult>(
      `${BASE_URL}/discover/movie?api_key=${API_KEY}&with_genres=${genreID}&language=es`
    )
  }

    // filter movie by genre
    getMovieTrailer(movieID: string): Observable<ApiResult> {
      return this.http.get<ApiResult>(
        `${BASE_URL}/movie/${movieID}/videos?api_key=${API_KEY}&&language=es`
      )
    }

}
