import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { map, Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { Message } from '../../constants/constants';
import { Franchisee, FranchiseeRecipe } from '../../models/franchisee.model';
import { Recipe } from '../../models/recipe.model';
import { Schedule } from '../../models/schedule.model';

@Injectable({
  providedIn: 'root',
})
export class FranchiseeService {
  constructor(private http: HttpClient) {}

  /**
   * @url GET : localhost:8080/api/contractors
   * @returns all Franchisee
   */
  public getFranchisee(): Observable<Franchisee> {
    return this.http
      .get<Franchisee>(`${environment.apiBaseUrl}/contractors`)
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
        // tap((obj) => console.log('service -> All recipes : ', obj)),
        map((res) => res['data'])
      );
  }

  /**
   * @url POST : localhost:8080/api/contractors
   * @param create new franchisee
   * @returns franchisee id - message
   */
  public newFranchisee(create: Franchisee): Observable<Franchisee> {
    return this.http
      .post(`${environment.apiBaseUrl}/contractors`, create)
      .pipe(map((res) => res));
  }

  /**
   * @url POST : localhost:8080/api/contractors/{contractor_id}/recipes
   * Create new recipe with igredients for franchisee
   * @param item franchisee (recipe)
   * @returns new recipe
   */
  public newFranchiseeRecipe(
    item: FranchiseeRecipe
  ): Observable<FranchiseeRecipe> {
    return this.http
      .post(`${environment.apiBaseUrl}/contractors${item.id}/recipes`, item)
      .pipe(map((res) => res));
  }

  /**
   * @url PUT : localhost:8080/api/contractors/{contractor_id}/recipes/{recipe_id}
   * @param update franchisee schedule
   * @returns update recipe
   */
  public updateRecipePrice(
    update: Partial<FranchiseeRecipe>,
    recipe: Recipe
  ): Observable<FranchiseeRecipe> {
    return this.http
      .put(
        `${environment.apiBaseUrl}/contractors/${update.id}/recipes/${recipe.id}`,
        update
      )
      .pipe(map((res) => (res ? res['message'] : Message.UPDATE)));
  }

  /**
   * localhost:8080/api/contractors/{contractor_id}/times
   * @param franchisee
   * @returns
   */
  public getSchedule(franchisee: Franchisee): Observable<Schedule> {
    return this.http
      .get<Schedule>(
        `${environment.apiBaseUrl}/contractors/${franchisee.id}/times`
      )
      .pipe(map((res) => res));
  }

  /**
   * localhost:8080/api/contractors/{contractor_id}/times
   * @param create franchisee schedule
   * @returns update recipe
   */
  public createSchedule(create: Partial<Franchisee>): Observable<Schedule> {
    return this.http
      .post(`${environment.apiBaseUrl}/contractors/${create.id}/times`, create)
      .pipe(map((res) => (res ? res['message'] : Message.UPDATE)));
  }

  /**
   * localhost:8080/api/contractors/{contractor_id}/times
   * @param update franchisee schedule
   * @returns update recipe
   */
  public updateSchedule(update: Partial<Franchisee>): Observable<Schedule> {
    return this.http
      .put(`${environment.apiBaseUrl}/contractors/${update.id}/times`, update)
      .pipe(map((res) => (res ? res['message'] : Message.UPDATE)));
  }
}
