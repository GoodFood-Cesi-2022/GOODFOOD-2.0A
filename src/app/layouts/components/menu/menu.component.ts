import { Component, OnInit } from '@angular/core';


@Component({
  selector: 'app-menu',
  templateUrl: './menu.component.html',
  styleUrls: ['./menu.component.scss']
})
export class MenuComponent implements OnInit {
  hideHomeBtn?: boolean;


  constructor() {
    this.initMenu();
}

  ngOnInit(): void {
  }

  public OpenSidebar(): void {
  }

  private initMenu(): void {
    // this.rouer.events.pipe(filter(event => event instanceof NavigationEnd)).subscribe((event: NavigationEnd) => {
    //   switch (event.url) {
    //     case '/account': this.hideHomeBtn = false; break;
    //     case '/profil': this.hideHomeBtn = false; break;
    //     case '/user': this.hideHomeBtn = false; break;
    //     case '/manager': this.hideHomeBtn = false; break;
    //     case '/franchisee': this.hideHomeBtn = false; break;
    //     case '/orders': this.hideHomeBtn = false; break;
    //     case '/user-complaint': this.hideHomeBtn = false; break;
    //     case '/recipe': this.hideHomeBtn = false; break;
    //     case '/notification': this.hideHomeBtn = false; break;
    //     case '/': this.hideHomeBtn = false; break;
    //     default: this.hideHomeBtn = !(event.url.includes('/')); break;
    //   }
    // })
  }
}
