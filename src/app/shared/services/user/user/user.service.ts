import { DOCUMENT } from '@angular/common';
import { HttpClient } from '@angular/common/http';
import { Inject, Injectable } from '@angular/core';
import { Store } from '@ngrx/store';
import { Router } from 'express';
import { Observable, map } from 'rxjs';
import { Roles } from 'src/app/shared/constants/constants';
import { User } from 'src/app/shared/models/user.model';
import { AppState } from 'src/app/shared/store';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root',
})
export class UserService {
  constructor(
    private store: Store<AppState>,
    private router: Router,
    private http: HttpClient,
    @Inject(DOCUMENT) private document: Document
  ) {
    //NOSONAR
  }

  getNewUser(): Observable<User> {
    return this.http
      .get<User>(`${environment.apiBaseUrl}/users/current`)
      .pipe(map((user) => this.initAuth(user)));
  }
  getNewUserRole(id: number): Observable<User> {
    return this.http
      .get<User>(`${environment.apiBaseUrl}/users/${id}/roles`)
      .pipe(map((user) => this.initAuth(user)));
  }
  private initAuth(user: User): User {
    const _user = {
      ...user,
      autorisations: {
        isAdmin: false,
        isFranchisee: false,
      },
    };
    _user.roles.forEach((e) => {
      if (e['code'] === Roles.ADMIN) {
        _user.autorisations.isAdmin = true;
      }
      if (e['code'] === Roles.FRANCHISEE) {
        _user.autorisations.isFranchisee = true;
      }
    });
    return _user;
  }
  doAuth(): void {
    const callbackUrl = this.document.location.href;
    const authPoint = 'http://localhost:8085/oauth/token' + callbackUrl;
    window.location.href = authPoint;
  }
}
