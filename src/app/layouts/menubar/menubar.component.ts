import { Component, OnInit } from '@angular/core';
import { MenuItem } from 'primeng/api';


@Component({
  selector: 'app-menubar',
  templateUrl: './menubar.component.html',
  styleUrls: ['./menubar.component.scss']
})
export class MenubarComponent implements OnInit {

  items!: MenuItem[];

  constructor() { }

  ngOnInit(): void {
    this.items = [
      {
        icon: "pi pi-fw pi-file",
        
      }

    ]
  }

}
