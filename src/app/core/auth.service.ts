import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { environment } from '../../environments/environment';
import { Observable, of, BehaviorSubject } from 'rxjs';
import { map, tap } from 'rxjs/operators';
import { CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot } from '@angular/router';


@Injectable({
  providedIn: 'root'
})
export class AuthService implements CanActivate {
  private _isAuthenticated = new BehaviorSubject(false);
  protected user: Object;

  constructor(protected http: HttpClient) { }

  getUser():Observable<any>{
    if (this.user != null) {
      return of(this.user);
    }
    return this.http.get(environment.apiUrl + '/auth/user')
    .pipe(
      map(response => {
        this.user = response;
        this._isAuthenticated.next(true);
        return this.user;
      })
    );
  }

  get isAuthenticated(){
    return this._isAuthenticated.asObservable();
  }

  checkLogin(frontUrl: string) {
    return this.http.get(environment.apiUrl + '/auth/cas', {
      params: new HttpParams().set("front_url", window.location.origin + frontUrl)
    })
    .pipe(
      tap(_ => {
        this._isAuthenticated.next(true);
      })
    );
  }

  canActivate(_: ActivatedRouteSnapshot, state: RouterStateSnapshot): boolean|Observable<boolean> {
    if (this._isAuthenticated.value == false) {
      return this.checkLogin(state.url).pipe(
        map(_ => true)
      );
    }
    return true;
  }

}
