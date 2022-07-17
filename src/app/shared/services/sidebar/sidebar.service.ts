import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BehaviorSubject, map, Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { User } from '../../models/user.model';
import { AuthService } from '../user/auth/auth.service';

const PAYLOAD = 'payload';

@Injectable({
  providedIn: 'root',
})
export class SidebarService {
  private subject = new BehaviorSubject<boolean>(false);

  display$: Observable<boolean> = this.subject.asObservable();

  readonly url: any;

  constructor(private http: HttpClient, private authService: AuthService) {
    this.url = this.authService.getUser;
  }

  public open(display: boolean): void {
    this.subject.next(display);
  }

  // public getProfile(details: number): Observable<User> {
  //   return this.http
  //     .get(`${environment.apiBaseUrl}/${details}`)
  //     .pipe(map((res: any) => res[PAYLOAD]));
  // }

  getUsers() {
    return this.http.get(`${environment.apiBaseUrl}/users`).pipe(
      map((res: any) => {
        return res;
      })
    );
  }
}
