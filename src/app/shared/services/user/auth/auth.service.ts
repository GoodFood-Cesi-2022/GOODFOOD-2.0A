import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import getPkce from 'oauth-pkce';
import { catchError, firstValueFrom, Observable, throwError } from 'rxjs';
import { Router, RouterStateSnapshot } from '@angular/router';
import { environment } from 'src/environments/environment';
import { AccessTokenModel } from '../../../models/access-token.model';
import { User } from '../../../models/user.model';
import { LocalStorageService } from '../local-storage/local-storage.service';
import { Roles } from 'src/app/shared/constants/constants';
import { map, tap } from 'rxjs/operators';
import { StorageKeys } from 'src/app/shared/constants/storageKeys.const';

@Injectable({
  providedIn: 'root',
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
  constructor(
    private http: HttpClient,
    private localStorageService: LocalStorageService,
    private router: Router
  ) {}

  /**
   * Redirect user to login backend page
   */
  getAuthorizationCode(): void {
    if (this.localStorageService.has(StorageKeys.USER_TOKEN)) {
      this.router.navigate(['/home']);
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
          response_type: 'code',
          scope: '',
          state: state,
          code_challenge: challenge,
          code_challenge_method: 'S256',
        });

        window.location.href = `${
          environment.oAuthProviderBaseUrl
        }/authorize?${query.toString()}`;
      } else {
        throw new Error('failed to get code challenger');
      }
    });
  }

  /** Transform authorization code to AccessToken */
  async authorizationCodeToAccessToken(
    code: string,
    state: string
  ): Promise<void> {
    console.log('try to change authorization code to access token');

    if (
      !this.localStorageService.has(StorageKeys.STATE) ||
      !this.localStorageService.has(StorageKeys.CODE_VERIFY)
    ) {
      throw new Error('Workflow auth is not inizialized');
    }

    if (this.localStorageService.get(StorageKeys.STATE) !== state) {
      throw new Error('State has changed');
    }

    this.http
      .post<AccessTokenModel>(`${environment.oAuthProviderBaseUrl}/token`, {
        grant_type: 'authorization_code',
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
        console.log('Set to local storage token access');
        data.expire_at = Date.now() + data.expires_in * 1000;
        this.localStorageService.set(StorageKeys.USER_TOKEN, data);
        this.localStorageService.remove(StorageKeys.STATE);
        this.localStorageService.remove(StorageKeys.CODE_VERIFY);
        await this.getCurrentUser();
        //await this.getCurrentUserRemote();

        this.router.navigate(['/home']);
      });
  }

  /** Revoke the authenticated user token */
  logout() {
    this.localStorageService.remove(StorageKeys.USER);
    this.router.navigateByUrl('/');
  }

  async getAccessToken(): Promise<string> {
    if (!this.localStorageService.has(StorageKeys.USER_TOKEN)) {
      throw new Error('user unauthenticated');
    }

    const userAccessToken = <AccessTokenModel>(
      this.localStorageService.get(StorageKeys.USER_TOKEN)
    );

    if (this.accessTokenIsExpired(userAccessToken)) {
      console.log('REFRESH USER TOKEN');
      await this.refreshToken(userAccessToken);
      console.log('USER TOKEN REFRESHED');
    }
    console.log('RETURN ACCESS TOKEN FROM STORAGE');

    const freshAccessToken = <AccessTokenModel>(
      this.localStorageService.get(StorageKeys.USER_TOKEN)
    );
    return freshAccessToken.access_token;
  }

  isAuthenticated(): boolean {
    return (
      !!this.localStorageService.has(StorageKeys.USER) &&
      !!this.localStorageService.has(StorageKeys.ROLE) &&
      !!this.localStorageService.has(StorageKeys.USER_TOKEN)
    );
  }

  /**
   * Get user by id as a franchisee or an admin (goodfood)
   */
  getUserById(id: number): Observable<User> {
    return this.http
      .get<User>(`${environment.apiBaseUrl}/users/${id}`)
      .pipe(map((res) => res));
  }

  doSign(): Observable<any> {
    return this.http
      .get(`${environment.oAuthProviderBaseUrl}/token`)
      .pipe(map((res) => res['payload']));
  }

  getUser(): Observable<User> {
    return this.http
      .get<User>(`${environment.apiBaseUrl}/users/current?includes[]=roles`)
      .pipe(map((user) => this.initAuth(user)));
  }

  getUserRole(user: User): Observable<User> {
    const currentRole = <User>this.localStorageService.get(StorageKeys.ROLE);
    return this.http
      .get<User>(`${environment.apiBaseUrl}/users/${user.id}/roles`)
      .pipe(
        tap(() => currentRole),
        map((value) => this.initAuth(value))
      );
  }

  /**
   *
   * @param user Defone user role
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
      if (e['code'] === Roles.ADMIN) {
        _user.autorisations.isAdmin = true;
      }
      if (e['code'] === Roles.FRANCHISEE) {
        _user.autorisations.isFranchisee = true;
      }
    });

    return _user;
  }

  async getCurrentUser(): Promise<User> {
    let currentUser: User;
    if (this.localStorageService.has(StorageKeys.USER)) {
      console.log('[AUTHSERVICE] Retrieve USER from CACHE');
      currentUser = <User>this.localStorageService.get(StorageKeys.USER);
    } else {
      console.log('[AUTHSERVICE] Retrieve USER from remote');
      const usr = this.http.get<User>(
        `${environment.apiBaseUrl}/users/current`
      );
      currentUser = await firstValueFrom(usr);
      this.localStorageService.set(StorageKeys.USER, currentUser);
    }
    return this.getRole(currentUser);
  }

  async getCurrentUserRemote(): Promise<User> {
    let currentUser: User;
    const usr = this.http.get<User>(`${environment.apiBaseUrl}/users/current`);
    currentUser = await firstValueFrom(usr);

    return this.getRoleRemote(currentUser);
  }

  async getRole(user: User): Promise<User> {
    type role = { code: string };
    type roleArrayType = Array<role>;
    let currentRole: role;
    if (this.localStorageService.has(StorageKeys.ROLE)) {
      console.log('[AUTHSERVICE] Retrieve ROLE from CACHE');
      currentRole = <role>this.localStorageService.get(StorageKeys.ROLE);
    } else {
      console.log('[AUTHERVICE] Retrieve ROLE from remote');
      const userRoles = this.http.get<roleArrayType>(
        `${environment.apiBaseUrl}/users/${user.id}/roles`
      );
      const userCurrentRoles: roleArrayType = await firstValueFrom(userRoles);
      currentRole = userCurrentRoles[0];
      this.localStorageService.set(StorageKeys.ROLE, currentRole);
    }
    user.roles.push(currentRole);

    return this.roleById(user);
  }

  async getRoleRemote(user: User): Promise<User> {
    type role = { code: string };
    type roleArrayType = Array<role>;
    let currentRole: role;
    const userRoles = this.http.get<roleArrayType>(
      `${environment.apiBaseUrl}/users/${user.id}/roles`
    );
    const userCurrentRoles: roleArrayType = await firstValueFrom(userRoles);
    currentRole = userCurrentRoles[0];

    user.roles.push(currentRole);
    return this.roleById(user);
  }

  /** Verify user role */
  public roleById(_user: User): User {
    const user = {
      ..._user,
      autorisations: {
        isAdmin: false,
        isFranchisee: false,
      },
    };
    user.roles.forEach((e) => {
      if (e['code'] === Roles.ADMIN) {
        user.autorisations.isAdmin = true;
      }
      if (e['code'] === Roles.FRANCHISEE) {
        user.autorisations.isFranchisee = true;
      }
    });
    return user;
  }

  private async refreshToken(data: AccessTokenModel): Promise<void> {
    const response = this.http
      .post<AccessTokenModel>(`${environment.oAuthProviderBaseUrl}/token`, {
        grant_type: 'refresh_token',
        refresh_token: data.refresh_token,
        client_id: environment.oAuthClientId,
        scope: '',
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
    return (
      !!data.expire_at && data.expire_at > 0 && Date.now() >= data.expire_at
    );
  }
}
