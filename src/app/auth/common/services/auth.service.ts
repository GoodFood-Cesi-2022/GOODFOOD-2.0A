import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  // Variables
  authUrl = 'http://localhost:8085/oauth/token';
  apiUrl = 'http://localhost:4200/api';
  options: any;

  /**
   * Constructor
   * @param http The http client object
   */
  constructor(private http: HttpClient) {
    this.options = {
      headers: new HttpHeaders({
        Accept: 'application/json',
        'Content_Type': 'application/json'
      })
    }
  }

  /**
   * Get an access token
   * @param e The email address
   * @param p The password string
   */
   login(e: string, p: string) {
    return this.http.post(this.authUrl, {
      grant_type: 'password',
      client_id: '2',
      client_secret: 'srKHlpLcnyLaBhZmQsAIuztgY7C0N8gjZPFKjYgu',
      username: e,
      password: p,
      scope: ''
    }, this.options);
   }

  /**
   * Revoke the authenticated user token
   */
   logout() {
    this.options.headers.Authorization = 'Bearer ' + localStorage.getItem('access_token');
    return this.http.get(this.apiUrl + '/token/revoke', this.options);
  }
}
