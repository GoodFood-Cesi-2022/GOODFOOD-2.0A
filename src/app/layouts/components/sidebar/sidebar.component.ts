import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-sidebar',
  templateUrl: './sidebar.component.html',
  styleUrls: ['./sidebar.component.scss'],
})
export class SidebarComponent implements OnInit {
  display: any;

  constructor(private router: Router) {}

  ngOnInit(): void {}

  logOut(): void {
    this.router.navigateByUrl('/login');
  }
}
