import { Component, OnInit } from '@angular/core';
import { NavigationEnd, Router } from '@angular/router';
import { select, Store } from '@ngrx/store';
import { filter, Observable } from 'rxjs';
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
    private router: Router,
    private sidebarService: SidebarService
  ) {
    this.initMenu();
  }

  ngOnInit(): void {
    this.sidebarService.display$.subscribe((res) => (this.display = res));

    if (this.user$ != new Observable<undefined>()) {
      this.user$ = this.store.pipe(select(selectUserDetails));
    }
  }

  logOut(): void {
    window.location.href = EndPoints.LOGOUT;
  }

  private initMenu(): void {
    this.router.events
      .pipe(
        filter(
          (event): event is NavigationEnd => event instanceof NavigationEnd
        )
      )
      .subscribe((event: NavigationEnd) => {
        switch (event.url) {
          case '/home':
            this.hideHomeBtn = false;
            break;
          case '/users':
            this.hideHomeBtn = false;
            break;
          case '/franchisee':
            this.hideHomeBtn = true;
            break;
          case '/client-complaint':
            this.hideHomeBtn = false;
            break;
          case '/notifications':
            this.hideHomeBtn = false;
            break;
          case '/recipes':
            this.hideHomeBtn = true;
            break;
          case '/orders':
            this.hideHomeBtn = false;
            break;
          case '/account':
            this.hideHomeBtn = true;
            break;
          case '/':
            this.hideHomeBtn = true;
            break;
          default:
            this.hideHomeBtn = !event.url.includes('/');
            break;
        }
      });
  }
}
