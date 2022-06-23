import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, tap, map } from 'rxjs';

import { environment } from 'src/environments/environment';

import { IngreType } from '../../models/ingredient-type.model';

import { Message } from '../../constants/constants';


@Injectable({
  providedIn: 'root'
})
export class IngredientTypeService {

  constructor (private http: HttpClient) { }

  /**
  * @url localhost:8080/api/ingredients/types
  * @returns ingredients types as Vegetebale, fruit, ...
  */
  public getIngredientsTypes (): Observable<IngreType[]> {
    return this.http
      .get<IngreType[]>(`${ environment.apiBaseUrl }/ingredients/types`)
      .pipe(
        // tap((obj) => console.log('service -> ingredient types : ', obj)),
        map((res) => res));
  }

  /**
  * @url localhost:8080/api/ingredients/types
  * Create new ingredient type
  * @param item
  * @returns
  */
  public createIngredientType (item: IngreType): Observable<IngreType> {
    return this.http
      .post(`${ environment.apiBaseUrl }/ingredients/types`, item)
      .pipe(map((res) => res));
  }

  /**
  * @url localhost:8080/api/ingredients/types/{ingredient_type_id}
  * @param update
  */
  public updateIngredientType (update: Partial<IngreType>): Observable<string> {
    return this.http
      .put(`${ environment.apiBaseUrl }/ingredients/types/${ update.id }`, update)
      .pipe(map((res) => (res ? res[ 'message' ] : Message.UPDATE)));
  }

  /**
   * @url localhost:8080/api/ingredients/types/{ingredient_type_id}
   * @param id ingredient-type_id
   * @returns Delete a ingredient_type
   * Attention : All ingredients attched to this type will lose their type
   */
  public removeIngredientType (id: number): Observable<string> {
    return this.http
      .delete(`${ environment.apiBaseUrl }/ingredients/types/${ id }`)
      .pipe(map((res) => (res ? res[ 'message' ] : '')));
  }

}
