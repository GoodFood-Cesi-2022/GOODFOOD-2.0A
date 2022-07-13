import { Injectable } from '@angular/core';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { catchError, map, Observable, tap, throwError } from 'rxjs';

import { Ingredient } from 'src/app/shared/models/ingredient.model';
import { environment } from 'src/environments/environment';
import { CodeHTTP, Message } from '../../constants/constants';

@Injectable({
  providedIn: 'root',
})
export class IngredientService {
  constructor(private http: HttpClient) {
    //NOSONAR
  }

  /**
   * @url GET : localhost:8080/api/ingredients/{ingredient_id}
   * @param id ingredient
   * @returns an ingredient
   */
  public getIngredient(id: number): Observable<Ingredient> {
    return this.http
      .get<Ingredient>(`${environment.apiBaseUrl}/ingredients/${id}`)
      .pipe(map((res) => res));
  }

  /**
   * @url GET : localhost:8080/api/ingredients
   * @returns all ingredients
   */
  public getIngredients(): Observable<Ingredient[]> {
    return this.http
      .get<Ingredient[]>(`${environment.apiBaseUrl}/ingredients`)
      .pipe(
        tap((obj: any) => console.log('service -> All ingredients : ', obj)),
        map((res) => res['data']),
        tap((values) => {
          this.log('fetched recipes');
          console.log('get recipes in service class : ', values);
        }),
        catchError((err) => this.handleError(err))
      );
  }

  /**
   * @url POST : localhost:8080/api/ingredients
   * @param item Create new ingredient
   * @returns new ingredient
   */
  public createIngredient(item: Partial<Ingredient>): Observable<string> {
    return this.http
      .post(`${environment.apiBaseUrl}/ingredients`, item)
      .pipe(map((res) => (res ? res['message'] : Message.CREATE)));
  }

  /**
   * @url PUT : localhost:8080/api/ingredients/{ingredient_id}
   * @param update ingredient items
   * @returns update ingredient
   */
  public updateIngredient(update: Partial<Ingredient>): Observable<string> {
    return this.http
      .put(`${environment.apiBaseUrl}/ingredients/${update.id}`, update)
      .pipe(
        map((res) => (res ? res['message'] : Message.UPDATE_SUCCESS)),
        tap((_) => this.log(`updated ingredient id=${update.id}`))
        // catchError(this.handleError<Observable<never>>('updateIngredient'))
      );
  }

  /**
   *@url DELETE : localhost:8080/api/ingredients/{ingredient_id}
   * @param id recipe_id
   * @returns Delete a recipe
   * Attention : All recipes attached to this ingredient will lose their ingredient
   */
  public removeIngredient(id: number): Observable<string> {
    return this.http
      .delete(`${environment.apiBaseUrl}/ingredients/${id}`)
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
    return throwError(() => new Error(error.message));
  }

  private log(message: string) {
    console.log('IngredientTypesService: ' + message);
  }
}
