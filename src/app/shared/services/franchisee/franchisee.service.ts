import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { tap, map, Observable } from 'rxjs';

import { environment } from 'src/environments/environment';
import { Message } from '../../constants/constants';
import { FranchiseeRecipe } from '../../models/franchisee-recipe.model';
import { Franchisee } from '../../models/franchisee.model';
import { Recipe } from '../../models/recipe.model';

@Injectable({
  providedIn: 'root',
})
export class FranchiseeService {
  constructor(private http: HttpClient) {
    //NOSONAR
  }

  /**
   * @url GET : localhost:8080/api/contractors
   * @returns all Franchisee
   */
  public getFranchisees(): Observable<Franchisee[]> {
    return this.http
      .get<Franchisee[]>(`${environment.apiBaseUrl}/contractors`)
      .pipe(map((res) => res));
  }

  /**
   * @url GET : localhost:8080/api/contractors/{contractor_id}/recipes
   * @param recipe
   * @returns franchisee recipes
   */
  public getFranchiseeRecipes(
    recipe: FranchiseeRecipe
  ): Observable<FranchiseeRecipe[]> {
    return this.http
      .get<FranchiseeRecipe[]>(
        `${environment.apiBaseUrl}/contractors/${recipe.id}/recipes`
      )
      .pipe(
        tap((obj): void => console.log('service -> All recipes : ', obj)),
        map((res): any => res['data'])
      );
  }

  /**
   * @url POST : localhost:8080/api/contractors
   * @param create new franchisee
   * @returns franchisee id - message
   */
  public newFranchisee(create: Partial<Franchisee>): Observable<string> {
    console.log(
      '******************* new franchisee **********************',
      create.name,
      create.phone,
      create.email,
      create.max_delivery_radius,
      create.address_id,
      create.owned_by
    );
    return this.http.post(`${environment.apiBaseUrl}/contractors`, create).pipe(
      tap((obj) => console.log('service -> All recipes : ', obj)),
      map((res: any): any => res)
    );
  }

  /**
   * @url POST : localhost:8080/api/contractors/{contractor_id}/recipes
   * Create new recipe with igredients for franchisee
   * @param item franchisee (recipe)
   * @returns new recipe
   */
  public addStarRecipe(item: Franchisee): Observable<FranchiseeRecipe> {
    return this.http
      .post(`${environment.apiBaseUrl}/contractors${item.id}/recipes`, item)
      .pipe(
        tap((obj): void => console.log('service -> All recipes : ', obj)),
        map((res) => res)
      );
  }

  /**
   * @url PUT : localhost:8080/api/contractors/{contractor_id}/recipes/{recipe_id}
   * @param update franchisee schedule
   * @returns update recipe
   */
  public updateRecipePrice(
    update: Partial<FranchiseeRecipe>,
    recipe: Recipe
  ): Observable<string> {
    return this.http
      .put(
        `${environment.apiBaseUrl}/contractors/${update.id}/recipes/${recipe.id}`,
        update
      )
      .pipe(
        tap((obj): void => console.log('service -> All recipes : ', obj)),
        map((res): any => (res ? res['message'] : Message.UPDATE))
      );
  }

  /**
   * @url DELETE : localhost:8080/api/contractors/{contractor_id}/recipes/{recipe_id}
   * @param id franchisee_id
   * @param recipe.id recipe_id
   * @returns Remove a recipe from franchisee catalog
   */
  public removeRecipe(id: number, recipe: Recipe): Observable<string> {
    return this.http
      .delete(
        `${environment.apiBaseUrl}/contractors/${id}/recipes/${recipe.id}`
      )
      .pipe(
        tap((obj: any): void =>
          console.log('service -> Remove recipe from catalog : ', obj)
        ),
        map((res: any): any => (res ? res['message'] : ''))
      );
  }

  /**
   * @url DELETE : localhost:8080/api/contractors/{contractors_id}
   * @param id franchisee_id
   * @returns Delete a franchisee
   */
  public deleteFranchisee(id: number): Observable<string> {
    return this.http.delete(`${environment.apiBaseUrl}/contractors/${id}`).pipe(
      // tap((obj) => console.log('service -> delete : ', obj)),
      map((res: Object): any => (res ? res['message'] : ''))
    );
  }
}
