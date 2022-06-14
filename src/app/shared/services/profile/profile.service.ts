import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { Observable } from 'rxjs';
import { map, tap } from 'rxjs/operators';
import { environment } from 'src/environments/environment';
import { User } from '../../models/user.model';

const PAYLOAD = 'payload';

@Injectable({
  providedIn: 'root',
})
export class ProfileService {
  constructor(private http: HttpClient, private router: Router) {}

  updateUser(user: User): Observable<User> {
    const newUserDetails: User = { ...user };

    return this.http
      .put<User>(`${environment.apiBaseUrl}/users/${user.id}`, newUserDetails)
      .pipe(tap((res: any) => res[PAYLOAD]));
  }
}
