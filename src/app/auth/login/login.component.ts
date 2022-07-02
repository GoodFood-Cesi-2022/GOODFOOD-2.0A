import { Component, OnInit } from '@angular/core';
import { AuthService } from 'src/app/shared/services/user/auth/auth.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss'],
})
export class LoginComponent implements OnInit {
  constructor(private authService: AuthService) {}

  ngOnInit(): void {
     //NOSONAR
  }

  onLogin() {
    this.authService.getAuthorizationCode();
  }
}
