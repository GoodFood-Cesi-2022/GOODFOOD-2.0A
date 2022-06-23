import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { map, Observable, tap } from 'rxjs';

import { Recipe } from '../../models/recipe.model';
import { Picture } from '../../models/picture.model';

import { environment } from 'src/environments/environment';

import { Message } from '../../constants/constants';


@Injectable({
  providedIn: 'root',
})
export class RecipeService {
  constructor (private http: HttpClient) { }

  /**
   * @url GET : localhost:8080/api/recipes/{recipe_id}
   * @returns one recipes
   */
  public getRecipe (id: number): Observable<Recipe> {
    return this.http
      .get<Recipe>(`${ environment.apiBaseUrl }/recipes/${ id }`)
      .pipe(
        // tap((obj) => console.log('service -> A recipe : ', obj)),
        map((res) => res)
      );
  }

  /**
   * @url GET : localhost:8080/api/recipes
   * @returns all recipes
   */
  public getRecipes (): Observable<Recipe[]> {
    return this.http
      .get<Recipe[]>(`${ environment.apiBaseUrl }/recipes?includes[]=pictures`)
      .pipe(
        // tap((obj) => console.log('service -> All recipes : ', obj)),
        map((res) => res[ 'data' ])
      );
  }

  /**
  * @url GET : localhost:8080/api/recipes/{recipe_id}/ingredients
  * @param id recipe_id
  * @returns all ingredients of a recipe
  */
  public getIngredientsByRecipeId (id: number): Observable<Recipe[]> {
    return this.http
      .get(`${ environment.apiBaseUrl }/recipes/${ id }/ingredients`)
      .pipe(map((res) => (res ? res[ 'message' ] : '')));
  }

  /**
   *
   * @returns recipes type as dessert
   */
  public getRecipesType (): Observable<Recipe[]> {
    return this.http
      .get<Recipe[]>(`${ environment.apiBaseUrl }/recipes/types`)
      .pipe(map((res) => res));
  }

  /**
  * @url POST : localhost:8080/api/recipes
  * Create new recipe with igredients
  * @param item RecipePostModel
  * @returns new recipe
  */
  public createRecipe (item: Recipe): Observable<Recipe> {
    return this.http
      .post(`${ environment.apiBaseUrl }/recipes`, {
        ...item,
        ingredients: item.ingredients.map((ingredient) => ingredient.id),
      })
      .pipe(
        map((res) => res)
      );
  }

  /**
   * @url PUT : localhost:8080/api/recipes/{recipe_id}
   * @param update recipe items
   * @returns update recipe
   */
  public updateRecipe (update: Partial<Recipe>): Observable<string> {
    return this.http
      .put(`${ environment.apiBaseUrl }/recipes/${ update.id }`, update)
      .pipe(map((res) => (res ? res[ 'message' ] : Message.UPDATE)));
  }

  /**
   * @url DELETE : localhost:8080/api/recipes/{recipe_id}
   * @param id recipe_id
   * @returns Delete a recipe
   */
  public removeRecipe (id: number): Observable<string> {
    return this.http
      .delete(`${ environment.apiBaseUrl }/recipes/${ id }`)
      .pipe(map((res) => (res ? res[ 'message' ] : '')));
  }

  /**
   * @param FormData() Create form data
   *
   * Store form name as "picture" with picture data
   * Make http post request over api with formData as req
   *
   * @param picture
   * @returns
   */
  public uploadPicture (picture): Observable<any> {
    const formData = new FormData();

    formData.append('name', picture.name);
    formData.append('filename', picture);

    return this.http.post(`${ environment.apiBaseUrl }/files`, formData);
  }

  /**
   * @url POST : localhost:8080/api/recipes/{recipe_id}/pictures
   * @param id uuid
   * @returns all pictures of recipe
   */
  public attachPictures (picture: Partial<Picture>, recipe: Recipe): Observable<string> {
    const formData = new FormData();
    formData.append('file_uuid', picture.uuid);
    return this.http
      .post(`${ environment.apiBaseUrl }/recipes/${ recipe.id }/pictures`, formData)
      .pipe(map((res) => (res ? res[ 'message' ] : '')));
  }

}
