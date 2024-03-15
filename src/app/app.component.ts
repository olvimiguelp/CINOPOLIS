import { HttpClientModule } from '@angular/common/http';
import { Component } from '@angular/core';
import { IonApp, IonRouterOutlet } from '@ionic/angular/standalone';
import { MovieService } from './services/movie/movie.service';

@Component({
  selector: 'app-root',
  templateUrl: 'app.component.html',
  standalone: true,
  imports: [IonApp, IonRouterOutlet, HttpClientModule],
  providers: [
    MovieService
  ]
})
export class AppComponent {
  constructor() { }
}
