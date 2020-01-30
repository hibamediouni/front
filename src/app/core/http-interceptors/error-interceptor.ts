import { Injectable } from "@angular/core";
import { HttpInterceptor, HttpRequest, HttpHandler, HttpEvent, HttpErrorResponse } from "@angular/common/http";
import { Observable, throwError } from "rxjs";
import { catchError } from "rxjs/operators";
import { AlertService } from 'src/app/core/alert.service';

@Injectable()
export class ErrorInterceptor implements HttpInterceptor {
  constructor(private alertService: AlertService) {}
  intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>>{
    // traite les exceptions de manière générique en ajoutant un message d'erreur
    return next.handle(req)
      .pipe(
        catchError((error: HttpErrorResponse) => {
          // affiche les erreurs dans une alerte, sauf pour les 401 qui sont traitées par AuthInterceptor
          if (error.status != 401) {
            if (error.error instanceof Blob) {
              const reader = new FileReader();
              reader.onload = () => {
                const err = JSON.parse(reader.result as string);
                const msg = err && err["msg"] ? err["msg"] : "Le serveur a retourné une erreur";
                this.alertService.error(msg);
              }
              reader.readAsText(error.error);
            } else {
              const msg = error.error["msg"] ? error.error["msg"] : "Le serveur a retourné une erreur";
              this.alertService.error(msg);
            }
          }
          return throwError(error);
        })
      );
  }
}
