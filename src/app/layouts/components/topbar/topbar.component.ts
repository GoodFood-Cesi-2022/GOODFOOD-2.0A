import { Component, OnInit } from '@angular/core';
import { NavigationEnd, Router } from '@angular/router';
import { select, Store } from '@ngrx/store';
import { Observable } from 'rxjs';
import { filter } from 'rxjs/operators';
import { User } from 'src/app/shared/models/user.model';
import { SidebarService } from 'src/app/shared/services/sidebar/sidebar.service';
import { selectUserDetails, UserState } from 'src/app/shared/store/state/user';

@Component({
  selector: 'app-topbar',
  templateUrl: './topbar.component.html',
  styleUrls: ['./topbar.component.scss'],
})
export class TopbarComponent implements OnInit {
  user$?: Observable<User | undefined>;
  hideHomeBtn = false;
  constructor(
    private store: Store<UserState>,
    private router: Router,
    private sidebarService: SidebarService
  ) {
    this.initMenu();
  }

  ngOnInit(): void {
    this.user$ = this.store.pipe(select(selectUserDetails));
  }

  public openSidebar(): void {
    this.sidebarService.open(true);
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
          case '/franchisee':
            this.hideHomeBtn = true;
            break;
          case '/recipes':
            this.hideHomeBtn = true;
            break;
          case '/account':
            this.hideHomeBtn = true;
            break;
          case '/':
            this.hideHomeBtn = false;
            break;
          default:
            this.hideHomeBtn = !event.url.includes('/home');
            break;
        }
      });
  }
}
