import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { AuthService } from 'src/app/services/auth.service';

@Component({
  selector: 'app-callback',
  templateUrl: './callback.component.html',
  styleUrls: ['./callback.component.scss']
})
export class CallbackComponent implements OnInit {

  constructor(
    private activatedRoute: ActivatedRoute,
    private authService: AuthService 
  ) { }

  ngOnInit(): void {

    let code:string = ''
    let state:string = '' 

    this.activatedRoute.queryParams.subscribe(parameters => {
      code = parameters['code']
      state = parameters['state']
    })

    this.authService.authorizationCodeToAccessToken(code, state)

  }

}
