import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, map, catchError, throwError } from 'rxjs';

import { Schedule } from '../../models/schedule.model';
import { Franchisee } from '../../models/franchisee.model';
import { environment } from 'src/environments/environment';
import { Message } from '../../constants/message.const';
import { ErrorHttpService } from '../error-http/error-http.service';

@Injectable({
  providedIn: 'root',
})
export class ScheduleService {
  constructor(
    private http: HttpClient,
    private errorHttpService: ErrorHttpService
  ) {
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
      .pipe(map((res: any) => res));
  }

  /**
   * localhost:8080/api/contractors/{contractor_id}/times
   * @param create franchisee schedule
   * @returns update schedule
   */
  public createSchedule(
    create: Partial<Franchisee>,
    schedule: Partial<Schedule>
  ): Observable<Schedule> {
    return this.http
      .post(
        `${environment.apiBaseUrl}/contractors/${create.id}/times`,
        schedule
      )
      .pipe(
        map((res: any) => (res ? res['message'] : Message.CREATE)),
        catchError((httpErrorResponse) => {
          this.errorHttpService.newErrorHttp(
            httpErrorResponse,
            'create schedule'
          );
          return throwError(()=> (httpErrorResponse));
        })
      );
  }

  /**
   * localhost:8080/api/contractors/{contractor_id}/times
   * @param update franchisee schedule
   * @returns update schedule
   */
  public updateSchedule(
    update: Partial<Franchisee>,
    schedule: Partial<Schedule>
  ): Observable<any> {
    return this.http
      .put(`${environment.apiBaseUrl}/contractors/${update.id}/times`, schedule)
      .pipe(
        map((res) => (res ? res['message'] : Message.UPDATE)),
        catchError((httpErrorResponse) => {
          this.errorHttpService.newErrorHttp(
            httpErrorResponse,
            'update schedule'
          );
          return throwError(()=> (httpErrorResponse));
        })
      );
  }
}
