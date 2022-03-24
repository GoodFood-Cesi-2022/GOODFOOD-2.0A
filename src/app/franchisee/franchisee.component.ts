import { Component, OnInit } from '@angular/core';
import { UserService } from '../services/user.service';

@Component({
  selector: 'app-franchisee',
  templateUrl: './franchisee.component.html',
  styleUrls: ['./franchisee.component.scss'],
})
export class FranchiseeComponent implements OnInit {
  content?: string;

  constructor(private userService: UserService) {}

  ngOnInit(): void {
    this.userService.getFranchisee().subscribe({
      next: (data) => {
        this.content = data;
      },
      error: (err) => {
        this.content = JSON.parse(err.error).message;
      },
    });
  }
}
