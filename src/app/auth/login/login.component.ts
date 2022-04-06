import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {

  constructor(private http:HttpClient, private router: Router) { }

  ngOnInit(): void {
  }
  onLogin() {
    //this.http.post('http://localhost:8085/api/login', {}).subscribe();
    this.router.navigateByUrl('/home');
  }

}
