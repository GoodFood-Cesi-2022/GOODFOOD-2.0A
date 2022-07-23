import { Component, OnInit } from "@angular/core";
import { ActivatedRoute } from "@angular/router";

import { User } from "src/app/shared/models/user.model";
import { AuthService } from "src/app/shared/services/auth/auth/auth.service";

@Component({
  selector: "app-auth",
  templateUrl: "./auth.component.html",
  styleUrls: ["./auth.component.scss"],
})
export class AuthComponent implements OnInit {
  user: User;

  constructor(private activatedRoute: ActivatedRoute, private authService: AuthService) {
    //NOSONAR
  }

  ngOnInit(): void {
    let code: string = "";
    let state: string = "";

    this.activatedRoute.queryParams.subscribe((parameters) => {
      code = parameters["code"];
      state = parameters["state"];
    });
    this.authService.authorizationCodeToAccessToken(code, state);
  }
}
