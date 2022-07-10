import { Injectable } from '@angular/core';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Observable, tap, map, catchError, throwError } from 'rxjs';

import { environment } from 'src/environments/environment';
import { IngreType } from '../../models/ingredient-type.model';
import { CodeHTTP, Message } from '../../constants/constants';

@Injectable({
  providedIn: 'root',
})
export class IngredientTypeService {
  constructor(private http: HttpClient) {
    //NOSONAR
  }

  /**
   * @url localhost:8080/api/ingredients/types
   * @returns ingredients types as Vegetebale, fruit, ...
   */
  public getIngredientsTypes(): Observable<IngreType[]> {
    return this.http
      .get<IngreType[]>(`${environment.apiBaseUrl}/ingredients/types`)
      .pipe(
        map((res) => res),
        tap((values) => {
          this.log('fetched recipes');
          console.log('get recipes in service class : ', values);
        }),
        catchError((err) => this.handleError(err))
      );
  }

  /**
   * @url localhost:8080/api/ingredients/types
   * Create new ingredient type
   * @param item
   * @returns
   */
  public createIngredientType(item: IngreType): Observable<IngreType> {
    return this.http
      .post(`${environment.apiBaseUrl}/ingredients/types`, item)
      .pipe(map((res) => res));
  }

  /**
   * @url localhost:8080/api/ingredients/types/{ingredient_type_id}
   * @param update
   */
  public updateIngredientType(update: Partial<IngreType>): Observable<string> {
    return this.http
      .put(`${environment.apiBaseUrl}/ingredients/types/${update.id}`, update)
      .pipe(
        tap((obj) => console.log('service -> edit ingredient type : ', obj)),
        map((data) => (data ? data['message'] : Message.UPDATE_SUCCESS))
      );
  }

  /**
   * @url localhost:8080/api/ingredients/types/{ingredient_type_id}
   * @param id ingredient-type_id
   * @returns Delete a ingredient_type
   * Attention : All ingredients attched to this type will lose their type
   */
  public removeIngredientType(id: number): Observable<string> {
    return this.http
      .delete(`${environment.apiBaseUrl}/ingredients/types/${id}`)
      .pipe(map((res) => (res ? res['message'] : '')));
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
    return throwError(error);
  }

  private log(message: string) {
    console.log('IngredientTypesService: ' + message);
  }
}
