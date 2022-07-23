import { Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'app-title',
  templateUrl: './title.component.html',
  styleUrls: ['./title.component.scss'],
})
export class TitleComponent implements OnInit {
  @Input() title: string;
  @Input() description: string;

  constructor() {
    //NOSONAR
  }

  ngOnInit(): void {
    //NOSONAR
  }
}
