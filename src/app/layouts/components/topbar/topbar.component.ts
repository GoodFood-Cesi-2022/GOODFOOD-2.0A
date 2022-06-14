import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { select, Store } from '@ngrx/store';
import { Observable } from 'rxjs';
import { Roles } from 'src/app/shared/constants/constants';
import { User } from 'src/app/shared/models/user.model';
import { SidebarService } from 'src/app/shared/services/sidebar/sidebar.service';
import { LocalStorageService } from 'src/app/shared/services/user/local-storage/local-storage.service';
import { AppState } from 'src/app/shared/store/state/store.reducer';
import {
  selectUserDetails,
  UserActions,
} from 'src/app/shared/store/state/user';

@Component({
  selector: 'app-topbar',
  templateUrl: './topbar.component.html',
  styleUrls: ['./topbar.component.scss'],
})
export class TopbarComponent implements OnInit {
  user?: User;
  titre1!: string;
  constructor(
    private store: Store<AppState>,
    private router: Router,
    private sidebarService: SidebarService //, private localStorage: LocalStorageService
  ) {}

  ngOnInit(): void {
    this.loadAppUser();
  }

  private loadAppUser(): void {
    //this.user$ = this.store.pipe(select(selectUserDetails));
    //console.log(this.localStorage.get('CURRENT_USER'));
    this.store.pipe(select(selectUserDetails)).subscribe(
      (user) => {
        console.log('STORE > user: ', user);
        if (user == null) {
          this.store.dispatch(UserActions.loadUser());
        } else {
          this.user = user;
          if (
            this.user.code?.includes(Roles.ADMIN) ||
            this.user.code?.includes(Roles.FRANCHISEE)
          ) {
            this.router.navigateByUrl('/home');
          } else {
            this.router.navigateByUrl('/');
          }
        }
      },
      (err) =>
        console.log('TOPBAR COMPONENT > STORE > loadAppUser > error: ', err)
    );
  }

  public openSidebar(): void {
    this.sidebarService.open(true);
  }
}
