import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { select, Store } from '@ngrx/store';
import { Roles } from 'src/app/shared/constants/constants';
import { User } from 'src/app/shared/models/user.model';
import { AuthService } from 'src/app/shared/services/user/auth/auth.service';
import { AppState } from 'src/app/shared/store';
import {
  selectUserDetails,
  UserActions,
} from 'src/app/shared/store/state/user';

@Component({
  selector: 'app-callback',
  templateUrl: './callback.component.html',
  styleUrls: ['./callback.component.scss'],
})
export class CallbackComponent implements OnInit {
  user: User;

  constructor(
    private store: Store<AppState>,
    private router: Router,
    private activatedRoute: ActivatedRoute,
    private authService: AuthService
  ) {}

  ngOnInit(): void {
    let code: string = '';
    let state: string = '';

    this.activatedRoute.queryParams.subscribe((parameters) => {
      code = parameters['code'];
      state = parameters['state'];
    });
    this.authService.authorizationCodeToAccessToken(code, state);
    console.log('callback component');
  }

  private loadAppUser(): void {
    this.store.pipe(select(selectUserDetails)).subscribe(
      (user) => {
        if (user == null) {
          this.store.dispatch(UserActions.loadUser());
          console.log('je passe dans *** callback dispatch ***', user);
        } else {
          this.user = user;
          var authorized: boolean = false;
          user.roles.forEach((e) => {
            if (e['code'] === Roles.ADMIN || e['code'] === Roles.FRANCHISEE) {
              authorized = true;
            }
          });
          if (authorized) {
            this.router.navigateByUrl('/home');
          } else {
            this.router.navigateByUrl('/');
          }
        }
      },
      (err) => console.log('AUTH COMPONENT > STORE > loadUser > error: ', err)
    );
  }
}
