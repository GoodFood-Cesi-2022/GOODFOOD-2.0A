import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BehaviorSubject, map, Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { AuthService } from '../user/auth/auth.service';

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

  getUsers() {
    return this.http.get(`${environment.apiBaseUrl}/users`).pipe(
      map((res: any) => {
        return res;
      })
    );
  }
}
