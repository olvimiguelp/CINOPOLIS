import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { Router } from '@angular/router';
import { IonicModule } from '@ionic/angular';
import { IonHeader } from '@ionic/angular/standalone';
@Component({
  selector: 'app-login1',
  templateUrl: './login1.page.html',
  styleUrls: ['./login1.page.scss'],
  standalone: true,
  imports: [IonicModule, CommonModule, FormsModule, IonHeader,]
})
export class Login1Page implements OnInit {

  constructor(private router: Router) { }

  ngOnInit() {
  }
  redirectToLogin1() {
    console.log('redirected');
    this.router.navigateByUrl('/movie');
  }
}
