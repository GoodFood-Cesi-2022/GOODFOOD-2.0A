import { Injectable } from '@angular/core';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { map, tap, Observable, throwError, catchError } from 'rxjs';

import { environment } from 'src/environments/environment';
import { User } from 'src/app/shared/models/user.model';
import { Message } from '../../constants/constants';
import { CodeHTTP } from '../../constants/code-http';

@Injectable({
  providedIn: 'root',
})
export class UsersService {
  constructor(private http: HttpClient) {
    //NOSONAR
  }

  /**
   * @url GET : localhost:8080/api/users/{user_id}
   * @returns one franchisee
   */
  public getUser(id: number): Observable<User> {
    return this.http
      .get<User>(`${environment.apiBaseUrl}/users/${id}`)
      .pipe(map((res) => res));
  }

  /**
   * @url GET : localhost:8080/api/users
   * @returns all users (franch)
   */
  public getUsers(): Observable<User[]> {
    return this.http.get<User[]>(`${environment.apiBaseUrl}/users`).pipe(
      map((res) => res['data']),
      tap((values) => {
        this.log('fetched users');
        console.log('get users in service class : ', values);
      }),
      catchError((err) => this.handleError(err))
    );
  }

  /**
   * @url GET : localhost:8080/api/users/{user_id}/roles
   * @returns franchisee role
   */
  public getUserRole(id: number): Observable<User> {
    return this.http
      .get<User>(`${environment.apiBaseUrl}/users/${id}/roles`)
      .pipe(
        tap((obj) => console.log('service -> get user role: ', obj)),
        map((res) => res)
      );
  }

  /**
   * @url POST : localhost:8080/api/users
   * Create new franchisee user
   * @param item userModel
   * @returns new franchisee
   */
  public newUser(item: User): Observable<User> {
    return this.http
      .post(`${environment.apiBaseUrl}/users`, item)
      .pipe(map((res) => res));
  }

  /**
   * @url PUT : localhost:8080/api/users/{user_id}
   * @param update franchisee info
   * @returns update franchisee
   */
  public updateUser(update: Partial<User>): Observable<string> {
    return this.http
      .put(`${environment.apiBaseUrl}/users/${update.id}`, update)
      .pipe(
        // tap((obj) => console.log('service -> update user : ', obj)),
        map((res) => (res ? res['message'] : Message.UPDATE_SUCCESS))
      );
  }

  /**
   * @url DELETE : localhost:8080/api/users/{user_id}
   * @param id franchisee_id
   * @returns Delete a franchisee
   */
  public deleteUser(id: number): Observable<string> {
    return this.http.delete(`${environment.apiBaseUrl}/users/${id}`).pipe(
      // tap((obj) => console.log('service -> delete : ', obj)),
      map((res) => (res ? res['message'] : ''))
    );
  }

  /**
   * Returns a function that handles Http operation failures.
   * This error handler lets the app continue to run as if no error occurred.
   *
   * @param operation - name of the operation that failed
   */
  private handleError(error: HttpErrorResponse): Observable<never> {
    switch (error.status) {
      case CodeHTTP.HTTP_511_NETWORK_AUTHENTICATION_REQUIRED:
        console.log("Désolé, vous n'etes pas authentifier sur notre serveur.");
        break;
      case CodeHTTP.HTTP_401_UNAUTHORIZED:
        console.log("Désolé, vous n'etes pas autorise a acceder a cette page.");
        break;
      case CodeHTTP.HTTP_404_NOT_FOUND:
        console.log('Page introuvable.');
        break;
      default:
        console.log('Une erreur est survenue: ', error.message);
    }
    return throwError(() => new Error(error.message));
  }

  private log(message: string) {
    console.log('UsersService : ' + message);
  }
}
