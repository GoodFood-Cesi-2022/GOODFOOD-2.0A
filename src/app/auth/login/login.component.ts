import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { Store, select } from '@ngrx/store';
import { AuthService } from 'src/app/auth/common/services/auth.service';
import { Roles } from 'src/app/shared/constants/endpoints';
import { AuthActions } from 'src/app/shared/store/action-types';
import { AppState } from 'src/app/shared/store/reducers';
import { User } from '../common/models/user';
import { loadUser } from '../common/store/auth.actions';
import { selectUser } from '../common/store/auth.selector';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {

  rememberMe?: boolean;
  loginError?: string;
  
  user?: User
  form!: FormGroup;

  constructor(private store: Store<AppState>,private authService: AuthService, private router: Router) { }

  roles: string[] = [];

  ngOnInit() {

    // TODO : Verify with Dev-lead
    this.store.pipe(select(selectUser)).subscribe(user => {
      console.log('***2 - STORE > user: ', user);

      if (user == null) {
        this.store.dispatch(AuthActions.loadUser());
      
      } else {
        this.user = user;
        
        if (this.user.roles?.includes(Roles.ADMINISTRATOR)) {
          this.router.navigateByUrl('/admin');
        
        } else if (this.user.roles?.includes(Roles.MANAGER)) {
          this.router.navigateByUrl('/manager');
        
        } else if (this.user.roles?.includes(Roles.FRANCHISEE)) {
          this.router.navigateByUrl('/franchisee');
        
        } else {
          this.router.navigateByUrl('/not-authorized');
        }
      }
    },
      err => {
        console.log('***3 - STORE > err', err);
      });



    this.rememberMe = false;
    this.loginForm();
    // this.AutoLogin();
  }
  
  private loginForm() {
    
    this.form = new FormGroup({
    
      username: new FormControl('', [Validators.required]),
      password: new FormControl('', [Validators.required]),
      rememberMe: new FormControl(Boolean)
    })
  }

  onSubmit() {
    this.store.dispatch(loadUser());
  }
//}






  // onSubmit() {
  //   if (this.form.valid) {
  //     this.authService.login(this.form.value).subscribe((data) => {
  //       console.log(data);
  //       if (data.status === 10 && !data.body.ErrorCode && this.rememberMe) {
  //         this.router.navigateByUrl('/home')
  //       } else {
  //         this.loginError = data.body.message;
  //       }
  //     },
  //       (error: string | undefined) => this.loginError = error
  //     )
  //   }
  // }
  }