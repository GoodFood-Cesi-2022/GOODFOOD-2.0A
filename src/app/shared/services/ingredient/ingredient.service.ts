import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { map, Observable } from 'rxjs';

import { Ingredient } from 'src/app/shared/models/ingredient.model';
import { environment } from 'src/environments/environment';
import { Message } from '../../constants/constants';

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
      .pipe(map((res) => res['data']));
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
      .pipe(map((res) => (res ? res['message'] : Message.UPDATE_SUCCESS)));
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
}
