import { Component } from '@angular/core';
import { AuthService } from './core/auth.service';
import { AlertService } from './core/alert.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  user: Object;

  constructor(private authService: AuthService, private alertService: AlertService) { }

  ngOnInit() {
    this.authService.getUser().subscribe(user => this.user = user);
    const isIE = /msie\s|trident\//i.test(window.navigator.userAgent);
    if (isIE) {
      this.alertService.warning(
        "Votre navigateur Internet Explorer n'est plus supporté !<br><br>" +
        "Il est vivement conseillé d'utiliser un navigateur récent tel que <a href=\"https://www.microsoft.com/fr-fr/windows/microsoft-edge\">Microsoft&nbsp;Edge</a>, <a href=\"https://www.mozilla.org/fr/firefox/new/\">Mozilla&nbsp;Firefox</a> ou <a href=\"https://www.google.com/intl/fr_fr/chrome/\">Google&nbsp;Chrome</a> pour utiliser cette application.",
        "Navigateur obsolète"
      );
    }
  }
}
