import { Injectable } from '@angular/core';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { catchError, tap, map, Observable } from 'rxjs';

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
      .pipe(
        map((res: any) => res),
        tap((franchisees: any) => {
          this.log('fetched franchisees');
          console.log(
            '------------------> service -> all franchisees : ',
            franchisees
          );
        }),
        catchError(this.handleError('getFranchisees'))
      );
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
        tap((obj: any) => console.log('service -> All recipes : ', obj)),
        map((res: any) => res['data'])
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
      tap((obj: any) => console.log('service -> All recipes : ', obj)),
      map((res: any) => res)
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
        tap((obj: any) => console.log('service -> All recipes : ', obj)),
        map((res: any) => res)
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
        tap((obj: any) => console.log('service -> All recipes : ', obj)),
        map((res: any) => (res ? res['message'] : Message.UPDATE))
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
        tap((obj: any) =>
          console.log('service -> Remove recipe from catalog : ', obj)
        ),
        map((res: any) => (res ? res['message'] : ''))
      );
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
    console.log('FranchiseeService: ' + message);
  }
}
