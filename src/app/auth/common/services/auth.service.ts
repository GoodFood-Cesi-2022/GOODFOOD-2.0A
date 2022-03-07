import { Inject, Injectable } from '@angular/core';
import { HttpClient, HttpErrorResponse, HttpResponse } from '@angular/common/http';
import { BehaviorSubject, Observable, tap, throwError } from 'rxjs';
import { catchError, map } from 'rxjs/operators';
import { Router } from '@angular/router';
import { CookieService } from 'ngx-cookie-service'
import { DOCUMENT } from '@angular/common';

import { User } from '../models/user';
import { Endpoints, Roles } from 'src/app/shared/constants/endpoints';


@Injectable({
  providedIn: 'root',
})
export class AuthService {

  private endPoint: string = 'http://localhost:8080/';
  
  loginStatus = new BehaviorSubject<boolean>(this.hasToken());
  
  /**
   * 
   * @param http 
   * @param cookieService 
   * @param router 
   */
  constructor(
    private http: HttpClient,
    @Inject(DOCUMENT) private document: Document,
    private cookieService: CookieService,
    private router: Router) { }

  getUser(): Observable<User> {

    return this.http.get<User>(Endpoints.SECURE_USER).pipe(
      map(user => this.initAutorisation(user)),
        catchError((err) => this.doAuthentication(err)));
  }
  
  private initAutorisation(user: User): User {
    
    const users = {
      ...user,
      autorisation: {
        isAdmin: false,
        isManager: false,
        isFranchisee: false,
      }
    }
    if (users.roles?.includes(Roles.ADMINISTRATOR)) {
      users.autorisation.isAdmin = true;
    }
    if (users.roles?.includes(Roles.MANAGER)) {
      users.autorisation.isManager = true;
    }
    if (users.roles?.includes(Roles.FRANCHISEE)) {
      users.autorisation.isFranchisee = true;
    }

    return users;
  }
  
  private doAuthentication(error: HttpErrorResponse): Observable<never> {
    
    const callbackURL = this.document.location.href;
    console.log('//doAuthentication - callbackURL : ', callbackURL);

    const authEndpoint = '/api/secure/auth?callbackURL=' + callbackURL;
    console.log('//soAuthentication - authEndpoint : ', authEndpoint);

    window.location.href = authEndpoint;

    return throwError(error);
  }
  

  /**
   * login function from Backend URL
   * @param formData
   * @returns answer
   */
  login(formData: any): Observable<HttpResponse<any>> {

    return this.http.post<any>(
      this.endPoint + 'login', formData, {
      observe: 'response'
    }
    ).pipe(tap((answer: HttpResponse<any>) => {
      if (answer.body.token) {
        this.cookieService.set('currentUser', 'null')
          // answer.headers.get('x-auth'));
        this.loginStatus.next(true);
      }
      return answer;
    }),
      catchError(this.HandleError)
    );
  }

  /**
   * Handle error function
   * 
   * @param error error message
   * @returns error message body
   */
  private HandleError(error: HttpErrorResponse) {
    
    if (error.error instanceof ErrorEvent) {
      console.error('Il y a une erreur: ', error.error.message);

    } else {
      console.error(`Backend returned code ${error.status}, `
        + `body was: ${error.error}`);
    }
    return throwError('Ca arrive un problème, veuillez re-essayer plus tard.');
  }

  /**
   * Disconnect function
   * Return to login page
   */
  logout() {

    this.loginStatus.next(false);
    this.cookieService.deleteAll();
    this.router.navigateByUrl('/');
  }

  /**
   * 
   * @returns {observable<T>}
   */
  isLoggedIn(): Observable<boolean> {
    return this.loginStatus.asObservable();
  }

  /**
   * Check if there is token for user
   * @returns boolean
   */
  private hasToken(): boolean {
    return this.cookieService.check('currentUser');
  }
}