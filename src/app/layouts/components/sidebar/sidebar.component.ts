import { Component, OnInit } from '@angular/core';
import { select, Store } from '@ngrx/store';
import { Observable } from 'rxjs';
import { EndPoints } from 'src/app/shared/constants/constants';
import { User } from 'src/app/shared/models/user.model';
import { UserState } from 'src/app/shared/store/state/user';
import { selectUserDetails } from 'src/app/shared/store/state/user/user.selector';

@Component({
  selector: 'app-sidebar',
  templateUrl: './sidebar.component.html',
  styleUrls: ['./sidebar.component.scss'],
})
export class SidebarComponent implements OnInit {
  display: any;
  user$?: Observable<User | undefined>;

  constructor(private store: Store<UserState>) {}

  ngOnInit(): void {
    if (this.user$ != new Observable<undefined>()) {
      this.user$ = this.store.pipe(select(selectUserDetails));
    }
  }

  logOut(): void {
    window.location.href = EndPoints.LOGOUT;
  }
}
