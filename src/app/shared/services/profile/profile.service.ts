import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { map, tap } from 'rxjs/operators';
import { environment } from 'src/environments/environment';
import { User } from '../../models/user.model';
import { LocalStorageService } from 'src/app/shared/services/user/local-storage/local-storage.service';
import { StorageKeys } from 'src/app/shared/constants/constants';
import { AuthService } from '../user/auth/auth.service';

const PAYLOAD = 'payload';

@Injectable({
  providedIn: 'root',
})
export class ProfileService {
  constructor(
    private http: HttpClient,
    private localStorageService: LocalStorageService,
    private authService: AuthService
  ) {}

  // getUser(id: number): Observable<User> {
  //   return this.http
  //     .get<User>(`${environment.apiBaseUrl}/users/${id}`)
  //     .pipe(map((res) => res[PAYLOAD]));
  // }

  getUser(): Observable<User> {
    return this.http
      .get<User>(`${environment.apiBaseUrl}/users/current`)
      .pipe(map((res) => res[PAYLOAD]));
  }

  getCurrentUser(): User {
    var currentUser: User;
    currentUser = <User>this.localStorageService.get(StorageKeys.USER);
    type role = { code: string };
    var currentRole: role;
    currentRole = <role>this.localStorageService.get(StorageKeys.ROLE);
    currentUser.code = currentRole.code;
    return this.authService.roleById(currentUser);
  }

  updateUser(user: User): Observable<User> {
    const newUserDetails: User = { ...user };
    console.log('et ensuite ici');
    if (newUserDetails != null) {
      newUserDetails.firstname = JSON.stringify(newUserDetails.firstname);
      newUserDetails.lastname = JSON.stringify(newUserDetails.lastname);
      newUserDetails.phone = JSON.stringify(newUserDetails.phone);
      newUserDetails.email = JSON.stringify(newUserDetails.email);
    }

    // const newUserDetails: User = <User>(
    //   this.localStorageService.get(StorageKeys.USER)
    // );

    return this.http
      .put<User>(`${environment.apiBaseUrl}/users/${user.id}`, newUserDetails)
      .pipe(
        tap((res) => {
          if (res[PAYLOAD] != null) {
            newUserDetails.firstname = JSON.stringify(newUserDetails.firstname);
            newUserDetails.lastname = JSON.stringify(newUserDetails.lastname);
            newUserDetails.phone = JSON.stringify(newUserDetails.phone);
            newUserDetails.email = JSON.stringify(newUserDetails.email);
          }
        }),
        map((res) => res[PAYLOAD])
      );
  }
}
