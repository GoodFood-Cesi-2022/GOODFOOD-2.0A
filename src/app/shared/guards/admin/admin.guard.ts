import { Injectable } from '@angular/core';
import {
  ActivatedRouteSnapshot,
  CanActivate,
  CanLoad,
  Route,
  Router,
  RouterStateSnapshot,
  UrlSegment,
  UrlTree,
} from '@angular/router';
import { select, Store } from '@ngrx/store';
import { Observable, tap } from 'rxjs';
import { AppState } from '../../store/state/store.reducer';
import { adminAccess } from '../../store/state/user/user.selector';

/**
 * @implements @CanActivate function that checks whether the current user has permission
 * to activate the requested route.
 *
 * @implements @CanLoad function that decides whether the current user has permission
 * to load requested child routes.
 */
@Injectable({
  providedIn: 'root',
})
export class AdminGuard implements CanActivate, CanLoad {
  constructor(private router: Router, private store: Store<AppState>) {}

  private checkIfAuthenticated(): Observable<boolean> {
    return this.store.pipe(
      select(adminAccess),
      tap((canAccess) => {
        if (!canAccess) {
          this.router.navigateByUrl('/');
        }
      })
    );
  }

  /**
   *
   * @param route ActivatedRouteSnapshot : Contains the information about a route associated
   *              with a component loaded in an outlet at a particular moment in time.
   *              ActivatedRouteSnapshot can also be used to traverse the router state tree.
   * @param state RouterStateSnapshot : Represents the state of the router at a moment in time.
   * @returns
   */
  canActivate(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot
  ): Observable<boolean | UrlTree> {
    return this.checkIfAuthenticated();
  }

  /**
   *
   * @param route
   * @param segments A UrlSegment is a part of a URL between the two slashes.
   *   It contains a path and the matrix parameters associated with the segment
   * @returns
   */
  canLoad(route: Route, segments: UrlSegment[]): Observable<boolean | UrlTree> {
    return this.checkIfAuthenticated();
  }
}
