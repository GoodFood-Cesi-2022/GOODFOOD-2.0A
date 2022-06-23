import { Component, OnInit } from '@angular/core';
import { select, Store } from '@ngrx/store';
import { Observable } from 'rxjs';
import { User } from 'src/app/shared/models/user.model';
import { SidebarService } from 'src/app/shared/services/sidebar/sidebar.service';
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
  user$: Observable<User>;
  user?: User;
  titre1!: string;
  constructor(
    private store: Store<AppState>,
    private sidebarService: SidebarService
  ) {
    // No code
  }

  ngOnInit(): void {
    this.loadAppUser();
    this.user$ = this.store.pipe(select(selectUserDetails));
  }

  private loadAppUser(): void {
    this.store.pipe(select(selectUserDetails)).subscribe(
      (user) => {
        if (user == null) {
          this.store.dispatch(UserActions.loadUser());
        } else {
          this.user = user;
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
