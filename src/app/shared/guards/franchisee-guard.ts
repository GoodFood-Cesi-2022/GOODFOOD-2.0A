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
import { AppState } from 'src/app/reducers';
import { franchiseeAccess } from '../store/state/user/user.selector';

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
export class FranchiseeGuard implements CanActivate, CanLoad {
  constructor(private router: Router, private store: Store<AppState>) {}

  canActivate(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot
  ): Observable<boolean | UrlTree> {
    return this.checkIfAuthenticated();
  }

  /**
   *
   * @param route
   * @param segments UrlTree, the current navigation is cancelled
   *                  and a new navigation begins to the UrlTree
   *                  returned from the guard
   * @returns franchisee access
   */
  canLoad(route: Route, segments: UrlSegment[]): Observable<boolean | UrlTree> {
    return this.checkIfAuthenticated();
  }

  /**
   * Verify if user (here franchisee) is authorizad to navigate,
   * if not he will redirect to login page
   * @returns
   */
  private checkIfAuthenticated(): Observable<boolean> {
    return this.store.pipe(
      select(franchiseeAccess),
      tap((canAccess) => {
        console.log('GUARD > FRANCHISEE > canAccess: ', canAccess);

        if (!canAccess) {
          this.router.navigateByUrl('/');
        }
      })
    );
  }
}
