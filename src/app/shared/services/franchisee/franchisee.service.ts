import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { map, Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { Message } from '../../constants/constants';
import { Franchisee } from '../../models/franchisee.model';
import { Schedule } from '../../models/schedule.model';

@Injectable({
  providedIn: 'root',
})
export class FranchiseeService {
  constructor(private http: HttpClient) {}

  /**
   *
   * @returns all Franchisee
   */
  public getFranchisee(): Observable<Franchisee[]> {
    return this.http
      .get<Franchisee[]>(`${environment.apiBaseUrl}/contractors`)
      .pipe(map((res) => res));
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
      .put(`${environment.apiBaseUrl}/contractors/${create.id}/times`, create)
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
