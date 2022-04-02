import { Component, OnInit } from '@angular/core';
import { NavigationEnd, Router } from '@angular/router';
import { Store } from '@ngrx/store';
import { filter, Observable } from 'rxjs';
import { Const } from 'src/app/shared/constants/constants';


@Component({
  selector: 'app-menu',
  templateUrl: './menu.component.html',
  styleUrls: ['./menu.component.scss']
})
export class MenuComponent implements OnInit {

  user$: Observable<User>;
  VERSION = const.VERSION;
  hideHomeBtn = false;


  constructor(private store: Store<AppState>, private rouer: Router, private sidebarStoreService: SidebarStoreService) {
    this.initMenu();
}

  ngOnInit(): void {
    this.user$ = this.store.pipe(select(getUser));

  }

  public OpenSidebar(): void {
    this.sidebarStoreService.open(true);
  }

  private initMenu(): void {
    this.rouer.events.pipe(filter(event => event instanceof NavigationEnd)).subscribe((event: NavigationEnd) => {
      switch (event.url) {
        case '/account': this.hideHomeBtn = false; break;
        case '/profil': this.hideHomeBtn = false; break;
        case '/user': this.hideHomeBtn = false; break;
        case '/manager': this.hideHomeBtn = false; break;
        case '/franchisee': this.hideHomeBtn = false; break;
        case '/orders': this.hideHomeBtn = false; break;
        case '/user-complaint': this.hideHomeBtn = false; break;
        case '/recipe': this.hideHomeBtn = false; break;
        case '/notification': this.hideHomeBtn = false; break;
        case '/': this.hideHomeBtn = false; break;
        default: this.hideHomeBtn = !(event.url.includes('/')); break;
      }
    })
  }
}
