import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, tap, map } from 'rxjs';

import { Address } from '../../models/address.model';
import { environment } from 'src/environments/environment';
import { User } from '../../models/user.model';
import { Message } from '../../constants/constants';

@Injectable({
  providedIn: 'root',
})
export class AddressService {
  constructor(private http: HttpClient) {
    //NOSONAR
  }

  /**
   * @url GET : localhost:8080/api/users/{user_id}/addresses
   * @returns all users addresses
   */
  public getAddresses(user: User): Observable<Address[]> {
    return this.http
      .get<Address>(`${environment.apiBaseUrl}/users/${user.id}/addresses`)
      .pipe(map((res) => [res]));
  }

  /**
   * @url POST : localhost:8080/api/addresses
   * @param create new address
   * @returns address_id
   */
  public createAddress(create: Partial<Address>): Observable<Address> {
    return this.http
      .post(`${environment.apiBaseUrl}/addresses`, create)
      .pipe(map((res: any) => res));
  }

  /**
   * @url PUT : localhost:8080/api/addresses/{address_id}
   * @param update address
   * @returns updated address
   */
  public updateAddress(update: Partial<Address>): Observable<string> {
    return this.http
      .put(`${environment.apiBaseUrl}/addresses/${update.id}`, update)
      .pipe(map((res) => (res ? res['message'] : Message.UPDATE)));
  }

  /**
   *@url DELETE : localhost:8080/api/addresses/{address_id}
   * @param id address_id
   * @returns Delete address
   * Attention : Deletes an address from the system, only if it is not used
   */
  public deleteAddress(id: number): Observable<string> {
    return this.http
      .delete(`${environment.apiBaseUrl}/addresses/${id}`)
      .pipe(map((res) => (res ? res['message'] : Message.DELETE)));
  }
}
