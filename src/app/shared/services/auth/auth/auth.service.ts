import { Injectable } from "@angular/core";
import { HttpClient } from "@angular/common/http";
import { Router, RouterStateSnapshot } from "@angular/router";
import getPkce from "oauth-pkce";
import { catchError, firstValueFrom, Observable, throwError } from "rxjs";
import { map } from "rxjs/operators";

import { environment } from "src/environments/environment";
import { AccessTokenModel } from "../../../models/access-token.model";
import { User } from "../../../models/user.model";
import { LocalStorageService } from "../local-storage/local-storage.service";
import { StorageKeys } from "src/app/shared/constants/storageKeys.const";
import { Roles } from "src/app/shared/constants/role.const";

@Injectable({
  providedIn: "root",
})
export class AuthService {
  /**
   *
   * Constructor
   * @param http The http client object
   * @param stringService
   * @param localStorageService
   * @param router
   */
  constructor(private http: HttpClient, private localStorageService: LocalStorageService, private router: Router) {}

  /**
   * Redirect user to login backend page
   */
  getAuthorizationCode(): void {
    if (this.localStorageService.has(StorageKeys.USER_TOKEN)) {
      this.router.navigate(["/home"]);
      return;
    }

    this.localStorageService.remove(StorageKeys.STATE);
    this.localStorageService.remove(StorageKeys.CODE_VERIFY);
    const state = RouterStateSnapshot.toString();

    getPkce(128, (error, { verifier, challenge }) => {
      if (!error) {
        this.localStorageService.set(StorageKeys.CODE_VERIFY, verifier);
        this.localStorageService.set(StorageKeys.STATE, state);

        const query = new URLSearchParams({
          client_id: environment.oAuthClientId,
          redirect_uri: environment.oAuthCallbackUri,
          response_type: "code",
          scope: "",
          state: state,
          code_challenge: challenge,
          code_challenge_method: "S256",
        });

        window.location.href = `${environment.oAuthProviderBaseUrl}/authorize?${query.toString()}`;
      } else {
        throw new Error("failed to get code challenger");
      }
    });
  }

  /** Transform authorization code to AccessToken */
  async authorizationCodeToAccessToken(code: string, state: string): Promise<void> {
    if (!this.localStorageService.has(StorageKeys.STATE) || !this.localStorageService.has(StorageKeys.CODE_VERIFY)) {
      throw new Error("Workflow auth is not inizialized");
    }
    if (this.localStorageService.get(StorageKeys.STATE) !== state) {
      throw new Error("State has changed");
    }

    this.http
      .post<AccessTokenModel>(`${environment.oAuthProviderBaseUrl}/token`, {
        grant_type: "authorization_code",
        client_id: environment.oAuthClientId,
        redirect_uri: environment.oAuthCallbackUri,
        code_verifier: this.localStorageService.get(StorageKeys.CODE_VERIFY),
        code: code,
      })
      .pipe(
        catchError((err) => {
          const error = err.message || err.statusText;
          return throwError(() => new Error(error));
        })
      )
      .subscribe(async (data) => {
        data.expire_at = Date.now() + data.expires_in * 1000;
        this.localStorageService.set(StorageKeys.USER_TOKEN, data);
        this.localStorageService.remove(StorageKeys.STATE);
        this.localStorageService.remove(StorageKeys.CODE_VERIFY);

        this.getUser();

        this.router.navigate(["/home"]);
      });
  }

  async getAccessToken(): Promise<string> {
    if (!this.localStorageService.has(StorageKeys.USER_TOKEN)) {
      throw new Error("user unauthenticated");
    }

    const userAccessToken = <AccessTokenModel>this.localStorageService.get(StorageKeys.USER_TOKEN);

    if (this.accessTokenIsExpired(userAccessToken)) {
      console.log("REFRESH USER TOKEN");
      await this.refreshToken(userAccessToken);
      console.log("USER TOKEN REFRESHED");
    }
    console.log("RETURN ACCESS TOKEN FROM STORAGE");

    const freshAccessToken = <AccessTokenModel>this.localStorageService.get(StorageKeys.USER_TOKEN);
    return freshAccessToken.access_token;
  }

  isAuthenticated(): boolean {
    return (
      !!this.localStorageService.has(StorageKeys.USER) &&
      !!this.localStorageService.has(StorageKeys.ROLE) &&
      !!this.localStorageService.has(StorageKeys.USER_TOKEN)
    );
  }

  getUser(): Observable<User> {
    return this.http
      .get<User>(`${environment.apiBaseUrl}/users/current?includes[]=roles`)
      .pipe(map((user) => this.initAuth(user)));
  }

  /**
   *
   * @param user Define user role
   * @returns
   */
  private initAuth(user: User): User {
    const _user = {
      ...user,
      autorisations: {
        isAdmin: false,
        isFranchisee: false,
      },
    };
    _user.roles.forEach((e) => {
      if (e["code"] === Roles.ADMIN) {
        _user.autorisations.isAdmin = true;
      }
      if (e["code"] === Roles.FRANCHISEE) {
        _user.autorisations.isFranchisee = true;
      }
    });

    return _user;
  }

  private async refreshToken(data: AccessTokenModel): Promise<void> {
    const response = this.http
      .post<AccessTokenModel>(`${environment.oAuthProviderBaseUrl}/token`, {
        grant_type: "refresh_token",
        refresh_token: data.refresh_token,
        client_id: environment.oAuthClientId,
        scope: "",
      })
      .pipe(
        catchError((err) => {
          const error = err.message || err.statusText;
          return throwError(() => new Error(error));
        })
      );
    const dataResponse = await firstValueFrom(response);

    dataResponse.expire_at = Date.now() + dataResponse.expires_in * 1000;
    this.localStorageService.set(StorageKeys.USER_TOKEN, dataResponse);
  }

  private accessTokenIsExpired(data: AccessTokenModel): boolean {
    return !!data.expire_at && data.expire_at > 0 && Date.now() >= data.expire_at;
  }
}
