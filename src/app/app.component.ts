import { Component, OnInit } from '@angular/core';
import { NavigationStart, Router } from '@angular/router';
import { PrimeNGConfig } from 'primeng/api';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
})
export class AppComponent implements OnInit {
  title = 'GOODFOOD';

  constructor(private primengConfig: PrimeNGConfig, private router: Router) {}

  ngOnInit() {
    this.primengConfig.ripple = true;

    this.router.events.subscribe((event) => {
      if (event instanceof NavigationStart) {
        if (!!event.url && event.url.match(/^\/#/)) {
          this.router.navigate([event.url.replace('/#', '')]);
        }
      }
    });
  }
}
