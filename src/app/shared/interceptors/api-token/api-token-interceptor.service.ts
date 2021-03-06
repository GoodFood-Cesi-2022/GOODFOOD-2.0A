import { HttpEvent, HttpHandler, HttpInterceptor, HttpRequest } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { from, lastValueFrom, Observable } from "rxjs";
import { environment } from "src/environments/environment";
import { AuthService } from "src/app/shared/services/auth/auth/auth.service";

@Injectable({
  providedIn: "root",
})
export class ApiTokenInterceptorService implements HttpInterceptor {
  constructor(private authService: AuthService) {}

  intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    console.log("[INTERCEPT API TOKEN] handle", req);

    if (!req.urlWithParams.startsWith(environment.apiBaseUrl)) {
      return next.handle(req);
    }
    return from(this.handle(req, next));
  }

  async handle(req: HttpRequest<any>, next: HttpHandler): Promise<HttpEvent<any>> {
    const token = await this.authService.getAccessToken();

    req = req.clone({
      setHeaders: {
        Authorization: `Bearer ${token}`,
      },
    });
    return lastValueFrom(next.handle(req));
  }
}
