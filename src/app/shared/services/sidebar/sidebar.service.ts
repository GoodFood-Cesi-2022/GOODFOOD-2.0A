import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';

const PAYLOAD = 'payload';

@Injectable({
  providedIn: 'root',
})
export class SidebarService {
  private subject = new BehaviorSubject<boolean>(false);

  display$: Observable<boolean> = this.subject.asObservable();

  readonly url: any;

  constructor(private http: HttpClient) {
    this.url = this.http.get('/api');
  }

  public open(display: boolean): void {
    this.subject.next(display);
  }

  //   public getUserByRoleID(criteres: SearchUserRole): Observable<User[]> {
  //     return this.http
  //       .post(`${this.url.userRole}`, criteres)
  //       .pipe(Object.values(PAYLOAD).map(res) => res()));
  //   }
}
