import { DOCUMENT } from '@angular/common';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Inject, Injectable } from '@angular/core';
import { Observable, throwError } from 'rxjs';
import { User } from '../../models/user.model';
import { catchError, map } from 'rxjs/operators';
import { EndPoints, Roles } from '../../constants/constants';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  constructor(
    private http: HttpClient,
    @Inject(DOCUMENT) private document: Document
  ) {}

  getUser(): Observable<User> {
    // TODO check with @Thomas for endpoint.secure
    return this.http.get<User>(EndPoints.SECURE_USER).pipe(
      map((user) => this.initAutorisation(user)),
      catchError((err) => this.doAuthentication(err))
    );
  }

  private initAutorisation(user: User): User {
    const _user = {
      ...user,
      autorisations: {
        isAdmin: false,
        isFranchisee: false,
      },
    };

    if (_user.roles?.includes(Roles.ADMIN)) {
      _user.autorisations.isAdmin = true;
    }

    if (_user.roles?.includes(Roles.FRANCHISEE)) {
      _user.autorisations.isFranchisee = true;
    }
    return user;
  }

  private doAuthentication(error: HttpErrorResponse): Observable<never> {
    const callbackURL = this.document.location.href;
    console.log('//doAuthentication - callbackURL : ', callbackURL);

    const authEndpoint = '/api/secure/auth?callbackURL=' + callbackURL;
    console.log('//doAuthentication - authEndpoint : ', authEndpoint);

    window.location.href = authEndpoint;

    return throwError(error);
  }
}
