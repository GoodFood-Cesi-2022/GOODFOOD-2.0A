import { Injectable } from '@angular/core';
import { HttpClient, HttpErrorResponse, HttpResponse } from '@angular/common/http';
import { BehaviorSubject, catchError, Observable, tap, throwError } from 'rxjs';
import { Router } from '@angular/router';
import { CookieService } from 'ngx-cookie-service'


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
    private cookieService: CookieService,
    private router: Router) { }

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
    this.router.navigateByUrl('/login');
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