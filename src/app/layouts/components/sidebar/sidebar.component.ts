import { Component, OnInit } from '@angular/core';
import { select, Store } from '@ngrx/store';
import { Observable } from 'rxjs';
import { EndPoints } from 'src/app/shared/constants/constants';
import { User } from 'src/app/shared/models/user.model';
import { SidebarService } from 'src/app/shared/services/sidebar/sidebar.service';
import { AppState } from 'src/app/shared/store/state/store.reducer';
import { selectUserDetails } from 'src/app/shared/store/state/user/user.selector';

@Component({
  selector: 'app-sidebar',
  templateUrl: './sidebar.component.html',
  styleUrls: ['./sidebar.component.scss'],
})
export class SidebarComponent implements OnInit {
  display!: boolean;
  hideHomeBtn = false;
  user$?: Observable<User | undefined>;

  constructor(
    private store: Store<AppState>,
    private sidebarService: SidebarService
  ) {
    // No code
  }

  ngOnInit(): void {
    this.sidebarService.display$.subscribe((res) => (this.display = res));

    if (this.user$ != new Observable<undefined>()) {
      this.user$ = this.store.pipe(select(selectUserDetails));
    }
  }

  onClose(): void {
    this.sidebarService.open(false);
  }

  logOut(): void {
    window.location.href = EndPoints.LOGOUT;
  }
}
