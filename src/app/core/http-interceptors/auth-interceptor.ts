import { Injectable } from "@angular/core";
import { HttpInterceptor, HttpRequest, HttpHandler, HttpEvent, HttpErrorResponse } from "@angular/common/http";
import { Observable, throwError } from "rxjs";
import { tap, catchError } from "rxjs/operators";

@Injectable()
export class AuthInterceptor implements HttpInterceptor {
  intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>>{
    // ajoute l'option withCredentials pour passer les cookies si on est en CORS
    // (sinon par défaut ça ne le fait pas et ça bloque l'auth)
    const newReq = req.clone({withCredentials: true});
    // traite la réponse de type 401 en effectuant la redirection sur l'URL spécifiée par l'app Symfony
    return next.handle(newReq)
      .pipe(
        catchError((error: HttpErrorResponse) => {
          if (error.status == 401 && error.error['login_url']) {
            window.location.href = error.error.login_url;
          } else {
            return throwError(error);
          }
        })
      );
  }
}
