import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/auth/common/services/auth.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {

  username?: string;
  password?: string;
  selectRe: boolean = false;
  loginError?: string;
  form!: FormGroup;

  constructor(private authService: AuthService, private router: Router) { }

  roles: string[] = [];

  ngOnInit() {
    this.loginForm();
  }
  
  private loginForm() {
    
    this.form = new FormGroup({
    
      username: new FormControl('', [Validators.required]),
      password: new FormControl('', [Validators.required]),
      selectRe: new FormControl(Boolean)
    })
  }
  onSubmit() {
    if (this.form.valid) {
      this.authService.login(this.form.value).subscribe((data) => {
        console.log(data);
        if (data.status === 10 && !data.body.ErrorCode) {
          this.router.navigateByUrl('/home')
        } else {
          this.loginError = data.body.message;
        }
      },
        (error: string | undefined) => this.loginError = error
      )
    }
  }
}