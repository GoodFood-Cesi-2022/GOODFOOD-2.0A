import { Injectable } from "@angular/core";
import { HttpClient } from "@angular/common/http";
import { map, tap, Observable } from "rxjs";

import { environment } from "src/environments/environment";
import { User } from "src/app/shared/models/user.model";
import { Message } from "../../constants/message.const";

@Injectable({
  providedIn: "root",
})
export class UsersService {
  constructor(private http: HttpClient) {
    //NOSONAR
  }

  /**
   * @url GET : localhost:8080/api/users/{user_id}
   * @returns one user
   */
  public getUser(id: number): Observable<User> {
    return this.http.get<User>(`${environment.apiBaseUrl}/users/${id}`).pipe(map((res: User): User => res));
  }

  /**
   * @url GET : localhost:8080/api/users
   * @returns all users (franch)
   */
  public getUsers(): Observable<User[]> {
    return this.http.get<User[]>(`${environment.apiBaseUrl}/users`).pipe(map((res: User[]): any => res["data"]));
  }

  /**
   * @url GET : localhost:8080/api/users/{user_id}/roles
   * @returns user role
   */
  public getUserRole(id: number): Observable<User> {
    return this.http.get<User>(`${environment.apiBaseUrl}/users/${id}/roles`).pipe(
      tap((obj: User): void => console.log("service -> get user role: ", obj)),
      map((res: User): User => res)
    );
  }

  /**
   * @url POST : localhost:8080/api/users/{user_id}/roles
   * Create new user role
   * @param user userModel
   * @returns Add role to an user
   */
  public AddRole(user: User): Observable<User> {
    return this.http.post(`${environment.apiBaseUrl}/users/${user.id}`, user.roles).pipe(map((res) => res));
  }

  /**
   * @url POST : localhost:8080/api/users
   * Create new user user
   * @param item userModel
   * @returns new user
   */
  public newUser(item: User): Observable<User> {
    return this.http.post(`${environment.apiBaseUrl}/users`, item).pipe(map((res) => res));
  }

  /**
   * @url PUT : localhost:8080/api/users/{user_id}
   * @param update user info
   * @returns update user
   */
  public updateUser(update: Partial<User>): Observable<string> {
    return this.http
      .put(`${environment.apiBaseUrl}/users/${update.id}`, update)
      .pipe(map((res: Object): any => (res ? res["message"] : Message.UPDATE_SUCCESS)));
  }

  /**
   * @url DELETE : localhost:8080/api/users/{user_id}
   * @param id user_id
   * @returns Delete a user
   */
  public deleteUser(id: number): Observable<string> {
    return this.http
      .delete(`${environment.apiBaseUrl}/users/${id}`)
      .pipe(map((res: Object): any => (res ? res["message"] : Message.DELETE)));
  }
}
