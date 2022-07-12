import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { catchError, map, Observable, tap } from 'rxjs';

import { Recipe } from '../../models/recipe.model';
import { Picture } from '../../models/picture.model';

import { environment } from 'src/environments/environment';
import { Message } from '../../constants/constants';

@Injectable({
	providedIn: 'root'
})
export class RecipeService {
	constructor(private http: HttpClient) {
		//NOSONAR
	}

	/**
   * @url GET : localhost:8080/api/recipes/{recipe_id}
   * @returns one recipes
   */
	public getRecipe(id: number): Observable<Recipe> {
		return this.http.get<Recipe>(`${environment.apiBaseUrl}/recipes/${id}`).pipe(map((res) => res));
	}

	/**
   * @url GET : localhost:8080/api/recipes
   * @returns all recipes
   */
	public getRecipes(): Observable<Recipe[]> {
		return this.http.get<Recipe[]>(`${environment.apiBaseUrl}/recipes?includes[]=pictures`).pipe(
			map((res) => res['data']),
			tap((recipes) => {
				this.log('fetched recipes');
				console.log('get recipes in service class : ', recipes);
			}),
			catchError(this.handleError('getRecipes'))
		);
	}

	/**
   * @url GET : localhost:8080/api/recipes/{recipe_id}/ingredients
   * @param id recipe_id
   * @returns all ingredients of a recipe
   */
	public getIngredientsByRecipeId(id: number): Observable<Recipe[]> {
		return this.http
			.get(`${environment.apiBaseUrl}/recipes/${id}/ingredients`)
			.pipe(map((res) => (res ? res['message'] : '')));
	}

	/**
   *
   * @returns recipes type as dessert
   */
	public getRecipesType(): Observable<Recipe[]> {
		return this.http.get<Recipe[]>(`${environment.apiBaseUrl}/recipes/types`).pipe(map((res) => res));
	}

	/**
   * @url POST : localhost:8080/api/recipes
   * Create new recipe with igredients
   * @param item RecipePostModel
   * @returns new recipe
   */
	public createRecipe(item: Recipe): Observable<Recipe> {
		return this.http
			.post(`${environment.apiBaseUrl}/recipes`, {
				...item,
				ingredients: item.ingredients.map((ingredient) => ingredient.id)
			})
			.pipe(map((res) => res));
	}

	/**
   * @url PUT : localhost:8080/api/recipes/{recipe_id}
   * @param update recipe items
   * @returns update recipe
   */
	public updateRecipe(update: Partial<Recipe>): Observable<string> {
		return this.http
			.put(`${environment.apiBaseUrl}/recipes/${update.id}`, {
				ingredients: update.ingredients.map((ingredient) => ingredient.id),
				name: update.name,
				description: update.description,
				base_price: update.base_price,
				star: update.star,
				recipe_type: update.recipe_type
			})
			.pipe(
				tap((obj) => console.log('service ---------------------->  ', obj)),
				map((res) => (res ? res['message'] : Message.UPDATE_SUCCESS))
			);
	}

	/**
   * @url DELETE : localhost:8080/api/recipes/{recipe_id}
   * @param id recipe_id
   * @returns Delete a recipe
   */
	public removeRecipe(id: number): Observable<string> {
		return this.http
			.delete(`${environment.apiBaseUrl}/recipes/${id}`)
			.pipe(map((res) => (res ? res['message'] : '')));
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
	public uploadPicture(picture): Observable<any> {
		const formData = new FormData();

		formData.append('name', picture.name);
		formData.append('filename', picture);

		return this.http.post(`${environment.apiBaseUrl}/files`, formData);
	}

	/**
   * @url POST : localhost:8080/api/recipes/{recipe_id}/pictures
   * @param id uuid
   * @returns all pictures of recipe
   */
	public attachPictures(picture: Partial<Picture>, recipe: Recipe): Observable<string> {
		const formData = new FormData();
		formData.append('file_uuid', picture.uuid);
		return this.http
			.post(`${environment.apiBaseUrl}/recipes/${recipe.id}/pictures`, formData)
			.pipe(map((res) => (res ? res['message'] : '')));
	}

	/**
   * Returns a function that handles Http operation failures.
   * This error handler lets the app continue to run as if no error occurred.
   *
   * @param operation - name of the operation that failed
   */
	private handleError<T>(operation = 'operation') {
		return (error: HttpErrorResponse): Observable<T> => {
			// TODO: send the error to remote logging infrastructure
			console.error(error); // log to console instead

			// If a native error is caught, do not transform it. We only want to
			// transform response errors that are not wrapped in an `Error`.
			if (error.error instanceof Event) {
				throw error.error;
			}

			const message = `server returned code ${error.status} with body "${error.error}"`;
			// TODO: better job of transforming error for user consumption
			throw new Error(`${operation} failed: ${message}`);
		};
	}

	private log(message: string) {
		console.log('RecipeService: ' + message);
	}
}
