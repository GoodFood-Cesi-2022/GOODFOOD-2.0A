import { Injectable } from "@angular/core";
import { CanActivate, Router, UrlTree } from "@angular/router";
import { Observable } from "rxjs";
import { AuthService } from "../../services/auth/auth/auth.service";

@Injectable({
  providedIn: "root",
})
export class IsUnauthenticatedGuard implements CanActivate {
  constructor(private authService: AuthService, private router: Router) {}

  canActivate(): Observable<boolean | UrlTree> | Promise<boolean | UrlTree> | boolean | UrlTree {
    const isAuthenticated: boolean = this.authService.isAuthenticated();

    if (isAuthenticated) {
      this.router.navigate(["/home"]);
    }
    return true;
  }
}
