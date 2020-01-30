import { Injectable } from "@angular/core";
import { HttpInterceptor, HttpRequest, HttpHandler, HttpEvent, HttpErrorResponse } from "@angular/common/http";
import { Observable, of, TimeoutError, throwError } from "rxjs";
import { timeout, catchError } from "rxjs/operators";
import { AlertService } from 'src/app/core/alert.service';

// timeout des requêtes http en secondes
const HTTP_TIMEOUT = 60;

@Injectable()
export class TimeoutInterceptor implements HttpInterceptor {
  constructor(private alertService: AlertService) { }

  intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>>{
    return next.handle(req)
      .pipe(
        timeout(HTTP_TIMEOUT * 1000),
        catchError((err: HttpErrorResponse) => {
          if (err instanceof TimeoutError) {
            this.alertService.error(`Aucune réponse du serveur au bout de ${HTTP_TIMEOUT} secondes. Veuillez réessayer plus tard.`);
          }
          return throwError(err);
        }),
      );
  }
}
