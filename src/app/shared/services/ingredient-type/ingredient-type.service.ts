import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, tap, map, catchError, throwError } from 'rxjs';

import { environment } from 'src/environments/environment';
import { IngreType } from '../../models/ingredient-type.model';
import { ErrorHttpService } from '../error-http/error-http.service';
import { Message } from '../../constants/constants';

@Injectable({
  providedIn: 'root',
})
export class IngredientTypeService {
  constructor(
    private http: HttpClient,
    private errorHttpService: ErrorHttpService
  ) {
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
        tap((value) => {
          this.log('fetched ingredient-types');
          console.log('get ingredient-types in service class : ', value);
        }),
        catchError((httpErrorResponse) => {
          this.errorHttpService.newErrorHttp(
            httpErrorResponse,
            'get all ingredient-types'
          );
          return throwError(() => new Error(httpErrorResponse));
        })
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
      .pipe(
        map((res) => res),
        catchError((httpErrorResponse) => {
          this.errorHttpService.newErrorHttp(
            httpErrorResponse,
            'create ingredient-type'
          );
          return throwError(() => new Error(httpErrorResponse));
        })
      );
  }

  /**
   * @url localhost:8080/api/ingredients/types/{ingredient_type_id}
   * @param update
   */
  public updateIngredientType(update: Partial<IngreType>): Observable<string> {
    return this.http
      .put(`${environment.apiBaseUrl}/ingredients/types/${update.id}`, update)
      .pipe(
        map((data) => (data ? data['message'] : Message.UPDATE_SUCCESS)),
        catchError((httpErrorResponse) => {
          this.errorHttpService.newErrorHttp(
            httpErrorResponse,
            'update ingredient-type'
          );
          return throwError(() => new Error(httpErrorResponse));
        })
      );
  }

  /**
   * @url localhost:8080/api/ingredients/types/{ingredient_type_id}
   * @param id ingredient-type_id
   * @returns Delete a ingredient_type
   * Attention : All ingredients attched to this type will lose their type
   */
  public deleteIngredientType(id: number): Observable<string> {
    return this.http
      .delete(`${environment.apiBaseUrl}/ingredients/types/${id}`)
      .pipe(
        map((res) => (res ? res['message'] : '')),
        catchError((httpErrorResponse) => {
          this.errorHttpService.newErrorHttp(
            httpErrorResponse,
            'delete ingredient-type'
          );
          return throwError(() => new Error(httpErrorResponse));
        })
      );
  }

  private log(message: string) {
    console.log('IngredientTypesService: ' + message);
  }
}
