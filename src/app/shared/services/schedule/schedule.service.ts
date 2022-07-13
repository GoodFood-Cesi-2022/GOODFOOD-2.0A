import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, tap, map } from 'rxjs';

import { Schedule } from '../../models/schedule.model';
import { Franchisee } from '../../models/franchisee.model';
import { environment } from 'src/environments/environment';
import { Message } from '../../constants/constants';

@Injectable({
  providedIn: 'root',
})
export class ScheduleService {
  constructor(private http: HttpClient) {
    //NOSONAR
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
      .pipe(
        tap((obj: any) => console.log('service -> schedule : ', obj)),
        map((res: any) => res)
      );
  }

  /**
   * localhost:8080/api/contractors/{contractor_id}/times
   * @param create franchisee schedule
   * @returns update recipe
   */
  public createSchedule(create: Partial<Franchisee>): Observable<Schedule> {
    return this.http
      .post(`${environment.apiBaseUrl}/contractors/${create.id}/times`, create)
      .pipe(
        tap((obj: any) => console.log('service -> All recipes : ', obj)),
        map((res: any) => (res ? res['message'] : Message.CREATE))
      );
  }

  /**
   * localhost:8080/api/contractors/{contractor_id}/times
   * @param update franchisee schedule
   * @returns update recipe
   */
  public updateSchedule(update: Partial<Franchisee>): Observable<Schedule> {
    return this.http
      .put(`${environment.apiBaseUrl}/contractors/${update.id}/times`, update)
      .pipe(
        tap((obj: any) => console.log('service -> All recipes : ', obj)),
        map((res: any) => (res ? res['message'] : Message.UPDATE))
      );
  }
}
