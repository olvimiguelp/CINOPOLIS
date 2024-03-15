import { Routes } from '@angular/router';

export const routes: Routes = [
  {
    path: 'home',
    loadComponent: () => import('./home/home.page').then((m) => m.HomePage),
  },
  {
    path: '',
    redirectTo: 'home',
    pathMatch: 'full',
  },
  {
    path: 'login1',
    loadComponent: () => import('./login1/login1.page').then( m => m.Login1Page)
  },
  {
    path: '',
    redirectTo: 'login1',
    pathMatch: 'full',
  },
  {
    path: 'movie',
    loadComponent: () => import('./movie/movie.page').then( m => m.MoviePage)
  },

];
