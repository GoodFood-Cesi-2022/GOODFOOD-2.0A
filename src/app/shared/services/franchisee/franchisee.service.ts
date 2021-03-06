import { Injectable } from "@angular/core";
import { HttpClient } from "@angular/common/http";
import { map, Observable, catchError, throwError } from "rxjs";

import { environment } from "src/environments/environment";
import { Message } from "../../constants/message.const";
import { FranchiseeRecipe } from "../../models/franchisee-recipe.model";
import { Franchisee } from "../../models/franchisee.model";
import { ErrorHttpService } from "../error-http/error-http.service";

@Injectable({
  providedIn: "root",
})
export class FranchiseeService {
  constructor(private http: HttpClient, private errorHttpService: ErrorHttpService) {
    //NOSONAR
  }

  /**
   * @url GET : localhost:8080/api/contractors
   * @returns all Franchisee
   */
  public getFranchisees(): Observable<Franchisee[]> {
    return this.http.get<Franchisee[]>(`${environment.apiBaseUrl}/contractors`).pipe(map((res: any) => res["data"]));
  }

  /**
   * @url GET : localhost:8080/api/contractors/{contractor_id}/recipes
   * @param recipe
   * @returns franchisee recipes
   */
  public getFranchiseeRecipes(franchisee: Franchisee): Observable<FranchiseeRecipe[]> {
    return this.http
      .get<FranchiseeRecipe[]>(`${environment.apiBaseUrl}/contractors/${franchisee.id}/recipes`)
      .pipe(map((res): any => res["data"]));
  }

  /**
   * @url POST : localhost:8080/api/contractors
   * @param create new franchisee
   * @returns franchisee id - message
   */
  public newFranchisee(create: Partial<Franchisee>, owner_id: number): Observable<Franchisee> {
    let franchisee: Franchisee;
    franchisee = {
      ...create,
    };
    franchisee.owned_by = owner_id;
    return this.http.post(`${environment.apiBaseUrl}/contractors`, franchisee).pipe(map((res) => res));
  }

  /**
   * @url PUT : localhost:8080/api/contractors
   * @param update franchisee
   * @returns update franchisee
   */
  public updateFranchisee(update: Partial<Franchisee>): Observable<Franchisee> {
    return this.http.put(`${environment.apiBaseUrl}/contractors`, update).pipe(map((res) => res));
  }

  /**
   * @url POST : localhost:8080/api/contractors/{contractor_id}/recipes
   * Create new recipe with igredients for franchisee
   * @param item franchisee (recipe)
   * @returns new recipe
   */
  public addRecipe(item: Franchisee, recipe: FranchiseeRecipe): Observable<FranchiseeRecipe> {
    return this.http
      .post(`${environment.apiBaseUrl}/contractors/${item.id}/recipes`, recipe)
      .pipe(map((res: any) => res));
  }

  /**
   * @url PUT : localhost:8080/api/contractors/{contractor_id}/recipes/{recipe_id}
   * @param update franchisee schedule
   * @returns update recipe
   */
  public updateRecipePrice(update: Partial<FranchiseeRecipe>, recipe: FranchiseeRecipe): Observable<string> {
    return this.http
      .put(`${environment.apiBaseUrl}/contractors/${update.id}/recipes/${recipe.id}`, recipe)
      .pipe(map((res: any) => (res ? res["message"] : Message.UPDATE)));
  }

  /**
   * @url DELETE : localhost:8080/api/contractors/{contractor_id}/recipes/{recipe_id}
   * @param id franchisee_id
   * @param recipe.id recipe_id
   * @returns Remove a recipe from franchisee catalog
   */
  public removeRecipe(id: number, recipe: FranchiseeRecipe): Observable<string> {
    return this.http
      .delete(`${environment.apiBaseUrl}/contractors/${id}/recipes/${recipe.id}`)
      .pipe(map((res: any) => (res ? res["message"] : Message.DELETE)));
  }

  /**
   * @url DELETE : localhost:8080/api/contractors/{contractors_id}
   * @param id franchisee_id
   * @returns Delete a franchisee
   */
  public deleteFranchisee(id: number): Observable<string> {
    return this.http.delete(`${environment.apiBaseUrl}/contractors/${id}`).pipe(
      map((res) => (res ? res["message"] : Message.DELETE)),
      catchError((httpErrorResponse) => {
        this.errorHttpService.newErrorHttp(httpErrorResponse, "get all recipes");
        return throwError(() => httpErrorResponse);
      })
    );
  }
}
