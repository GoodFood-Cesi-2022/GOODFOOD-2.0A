import { Ingredients } from 'src/app/shared/models/ingredients.model';
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { firstValueFrom, map, Observable, tap } from 'rxjs';
import { environment } from 'src/environments/environment';
import { Recipe } from '../../models/recipe.model';
import { Message } from '../../constants/constants';
import { Picture } from '../../models/picture.model';

//const getRecipes$=getIngredients().pipe(mergeMap(res=>getRecipes(res)))

@Injectable({
  providedIn: 'root',
})
export class RecipeService {
  constructor(private http: HttpClient) {}

  /**
   *
   * @returns one recipes
   */
  public getRecipe(id: number): Observable<Recipe> {
    return this.http
      .get<Recipe>(`${environment.apiBaseUrl}/recipes/${id}`)
      .pipe(map((res) => res['payload']));
  }

  /**
   *
   * @returns all recipes
   */
  public getRecipes(): Observable<Recipe> {
    return this.http.get<Recipe>(`${environment.apiBaseUrl}/recipes`).pipe(
      tap((obj) => console.log('All recipes : ', obj)),
      map((res) => res['data'])
      // map((res) => (res['payload'].json = JSON.parse(res['payload'].json)))
    );
  }
  async getAllRecipes(): Promise<Recipe> {
    // return this.http
    //   .get<Recipe>(`${environment.apiBaseUrl}/recipes`)
    //   .pipe(map((res) => res['payload']));
    var recipe: Recipe;
    const recipeFetch = this.http.get<Recipe>(
      `${environment.apiBaseUrl}/recipes`
    );
    recipe = await firstValueFrom(recipeFetch);
    return recipe;
  }

  /**
   *
   * @returns recipes type as dessert
   */
  public getRecipesType(): Observable<Recipe> {
    return this.http
      .get<Recipe>(`${environment.apiBaseUrl}/recipes/types`)
      .pipe(
        tap((obj) => console.log('ingredients by recipe: ', obj)),
        map((res) => res)
      );
  }

  /**
   * Add mandatory to a recipe
   */
  public mandatoryRecipe(recipe: Recipe): Observable<Recipe> {
    return this.http
      .post(`${environment.apiBaseUrl}/recipes/${recipe}/star`, recipe)
      .pipe(map((res) => res['data']));
  }

  /**
   *
   * @param id recipe_id
   * @returns all ingredients of a recipe
   */
  public getIngredientsByRecipeId(id: number): Observable<Recipe[]> {
    return this.http
      .get(`${environment.apiBaseUrl}/recipes/${id}/ingredients`)
      .pipe(
        tap((obj) => console.log('ingredients by recipe: ', obj)),
        map((res) => res['data'])
      );
  }
  /**
   *
   * @returns all ingredients
   */
  public getIngredients(): Observable<Ingredients[]> {
    return this.http
      .get<Ingredients>(`${environment.apiBaseUrl}/ingredients`)
      .pipe(
        tap((obj) => console.log('ingredients : ', obj)),
        map((res) => res['payload'])
      );
  }

  /**
   *
   * @returns ingredients types as Vegetebale, fruit, ...
   */
  public getIngredientsTypes(): Observable<Ingredients[]> {
    return this.http
      .get<Ingredients>(`${environment.apiBaseUrl}/ingredients/types`)
      .pipe(
        tap((obj) => console.log('ingredients types : ', obj)),
        map((res) => res['data'].json())
      );
  }

  /**
   *
   * @param id uuid
   * @returns all pictures of recipe
   */
  public getPictures(id: number): Observable<Picture[]> {
    return this.http
      .get(`${environment.apiBaseUrl}/recipes/${id}/pictures`)
      .pipe(map((res) => res['payload']));
  }

  /**
   * Create new recipe with igredients
   * @param change RecipeModel
   * @returns
   */
  createRecipe(change: Partial<Recipe>): Observable<string> {
    return this.http
      .post(`${environment.apiBaseUrl}/recipes`, change)
      .pipe(map((res) => res['payload']));
  }

  /**
   *
   * @param change recipe items
   * @returns update recipe
   */
  public updateRecipe(change: Partial<Recipe>): Observable<string> {
    return this.http
      .put(`${environment.apiBaseUrl}/recipes/${change.id}`, change)
      .pipe(map((res) => (res ? res['message'] : Message.UPDATE)));
  }

  /**
   *
   * @param id recipe_id
   * @returns Delete a recipe
   */
  public removeRecipe(id: number): Observable<string> {
    return this.http
      .delete(`${environment.apiBaseUrl}/recipes/${id}`)
      .pipe(map((res) => res['payload']));
  }

  generateId() {
    return Math.floor(Math.random() * Math.floor(299) + 1);
  }

  generatePrice() {
    return Math.floor(Math.random() * Math.floor(299) + 1);
  }

  generateQuantity() {
    return Math.floor(Math.random() * Math.floor(75) + 1);
  }
}
