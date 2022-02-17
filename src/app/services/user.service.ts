import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

const API_URL = 'http://localhost:8081/api/test/';

@Injectable({
  providedIn: 'root',
})
export class UserService {
  constructor(private http: HttpClient) {}
  getPublicContent(): Observable<any> {
    return this.http.get(API_URL + 'all', { responseType: 'text' });
  }
  getFranshise(): Observable<any> {
    return this.http.get(API_URL + 'franchise', { responseType: 'text' });
  }
  getAdmin(): Observable<any> {
    return this.http.get(API_URL + 'admin', { responseType: 'text' });
  }
}
