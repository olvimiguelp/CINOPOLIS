import { DatePipe } from '@angular/common';
import { Component, OnInit, inject } from '@angular/core';
import { RouterModule } from '@angular/router';
import { InfiniteScrollCustomEvent, IonAlert, IonModal, IonAvatar, IonBadge, IonButton, IonButtons, IonCard, IonCardContent, IonCardHeader, IonCardSubtitle, IonCardTitle, IonCol, IonContent, IonGrid, IonHeader, IonInfiniteScroll, IonInfiniteScrollContent, IonItem, IonLabel, IonList, IonLoading, IonRow, IonSelect, IonSelectOption, IonSkeletonText, IonTitle, IonToolbar } from '@ionic/angular/standalone';
import { catchError, delay, finalize } from 'rxjs';
import { MovieService } from '../services/movie/movie.service';
import { DomSanitizer, SafeResourceUrl } from '@angular/platform-browser';

@Component({
  selector: 'app-movie',
  templateUrl: './movie.page.html',
  styleUrls: ['./movie.page.scss'],
  standalone: true,
  imports: [IonButton, IonButtons, IonModal, IonCol, IonRow, IonGrid, IonHeader,
    IonToolbar,
    IonTitle,
    IonContent,
    IonLabel,
    IonBadge,
    IonAvatar,
    IonItem,
    IonList,
    IonLoading,
    IonInfiniteScroll,
    IonInfiniteScrollContent,
    IonSkeletonText,
    IonAlert,
    DatePipe,
    IonCard,
    IonCardContent,
    IonCardHeader,
    IonCardTitle,
    IonCardSubtitle,
    IonGrid,
    IonCol,
    IonRow,
    IonSelectOption,
    IonSelect,
    RouterModule]
})
export class MoviePage implements OnInit {

  private movieService = inject(MovieService);

  private currentPage = 1;
  public movies: any[] = [];
  public imageBaseUrl = 'https://image.tmdb.org/t/p';
  public isLoading = true;
  public error = null;
  public dummyArray = new Array(10);
  public selectedMovie: any = null;
  public currentTrailer: string = "";
  isModalOpen = false;


  // for movies Genres
  public movieGenres: any[] = [];

  constructor(private sanitizer: DomSanitizer) { }

  ngOnInit() {
    this.loadMovies();
    this.loadGenres()
  }

  async loadMovies(event?: InfiniteScrollCustomEvent) {
    this.error = null;

    // Solo muestra el indicador de carga en la carga inicial    
    if (!event) {
      this.isLoading = true;
    }

    // Obtenga la siguiente página de películas de las películas.
    this.movieService
      .getTopRatedMovies(this.currentPage)
      .pipe(
        delay(2000), // Un simple delay para simular
        finalize(() => {
          this.isLoading = false;
        }),
        catchError((err: any) => {
          this.error = err.error.status_message;
          return [];
        })
      )
      .subscribe({
        next: (res) => {
          // Agregar los resultados al array de películas 🤘
          this.movies.push(...res.results);

          // Resuelve la promesa. 
          event?.target.complete();

          // deshabilitar el infinite scroll(scroll infinito xd) cuando se llegue al final de la lista.
          if (event) {
            event.target.disabled = res.total_pages === this.currentPage;
          }
        },
      });
  }

  // Este metodo/funcion es llamada cuando se hace scroll infinito.
  loadMore(event: InfiniteScrollCustomEvent) {
    this.currentPage++;
    this.loadMovies(event);
  }

  async loadGenres() {
    this.movieService
      .getMovieGenres()
      .pipe(
        catchError((err: any) => {
          this.error = err.error.status_message;
          return [];
        })
      )
      .subscribe({
        next: (res) => {
          this.movieGenres = res.genres;
        },
      });
  }

  filterByGenre(event: any) {
    this.isLoading = true;
    this.movieService.filterByGenre(event.detail.value).pipe(
      delay(2000), // Un simple delay para simular
      finalize(() => {
        this.isLoading = false;
      }),
      catchError((err: any) => {
        this.error = err.error.status_message;
        return [];
      })
    ).subscribe({
      next: (res) => {
        this.movies = res.results
      }
    })

  }

  async selectMovie(movie: any) {
    this.selectedMovie = movie;
    
    // console.log(this.selectedMovie)

    await this.movieService.getMovieTrailer(movie.id).pipe(
      delay(500), // Un simple delay para simular
      finalize(() => {
        this.isLoading = false;
      }),
      catchError((err: any) => {
        this.error = err.error.status_message;
        return [];
      })
    ).subscribe({
      next: (res) => {
        console.log(res.results)
        this.currentTrailer = `https://www.youtube.com/embed/${res.results[res.results.length - 1].key}`
        console.log(this.currentTrailer)
        setTimeout(() => {
          this.isModalOpen = true
        }, 100);
      }
    })
    
  }

  setOpen(isOpen: boolean) {
    this.isModalOpen = isOpen;
  }
  
  getTrailer() {
    return this.sanitizer.bypassSecurityTrustResourceUrl(this.currentTrailer)
  }

}