import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

import { Observable, map } from 'rxjs';
import { Roles } from 'src/app/shared/constants/role.const';
import { User } from 'src/app/shared/models/user.model';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root',
})
export class UserService {
  constructor(private http: HttpClient) {
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
}
