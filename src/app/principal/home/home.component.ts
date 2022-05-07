import { Component, OnInit } from '@angular/core';
import { LocalStorageService } from 'src/app/shared/services/local-storage.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {

  constructor(private localStorage: LocalStorageService) { }

  ngOnInit(): void {
    console.log("[HOMECOMPONENT] INIT")
    console.log(this.localStorage.get('CURRENT_USER'))
  }

}
