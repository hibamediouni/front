import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { environment } from 'src/environments/environment';

@Component({
  selector: 'app-accueil',
  templateUrl: './accueil.component.html',
  styleUrls: ['./accueil.component.scss']
})
export class AccueilComponent implements OnInit {

  constructor(private route: ActivatedRoute) {
    // gère l'url spéciale auth/logout qui doit pointer sur une URL du backend
    if (this.route.routeConfig.path == 'auth/logout') {
      window.location.href = environment.apiUrl + '/auth/logout';
    }
  }

  ngOnInit() {
  }

}
