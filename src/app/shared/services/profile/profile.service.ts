import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { map, tap } from 'rxjs/operators';
import { environment } from 'src/environments/environment';
import { Roles } from '../../constants/role.const';
import { User } from '../../models/user.model';

@Injectable({
  providedIn: 'root',
})
export class ProfileService {
  constructor(private http: HttpClient) {
    //NOSONAR
  }

  getUser(): Observable<User> {
    return this.http
      .get<User>(`${environment.apiBaseUrl}/users/current?includes[]=roles`)
      .pipe(map((user) => this.initAuth(user)));
  }

  /**
   *
   * @param user Defone user role
   * @returns
   */
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

  updateUser(user: User): Observable<User> {
    const newUserDetails: User = { ...user };

    const formData = new FormData();
    if (newUserDetails != null) {
      newUserDetails.firstname = JSON.stringify(newUserDetails.firstname);
      newUserDetails.lastname = JSON.stringify(newUserDetails.lastname);
      newUserDetails.phone = JSON.stringify(newUserDetails.phone);
      newUserDetails.email = JSON.stringify(newUserDetails.email);

      formData.append('firstname', newUserDetails.firstname);
      formData.append('lastname', newUserDetails.lastname);
      formData.append('phone', newUserDetails.phone);
      formData.append('email', newUserDetails.email);
    }

    return this.http
      .put<User>(`${environment.apiBaseUrl}/users/${user.id}`, formData)
      .pipe(
        tap((res) => {
          if (res != null) {
            newUserDetails.firstname = JSON.stringify(newUserDetails.firstname);
            newUserDetails.lastname = JSON.stringify(newUserDetails.lastname);
            newUserDetails.phone = JSON.stringify(newUserDetails.phone);
            newUserDetails.email = JSON.stringify(newUserDetails.email);
          }
        }),
        map((res) => res)
      );
  }
}
