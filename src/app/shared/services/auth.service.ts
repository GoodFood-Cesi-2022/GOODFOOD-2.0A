import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import getPkce from 'oauth-pkce';
import { StringService } from './string.service';
import { LocalStorageService } from './local-storage.service';
import { AccessTokenModel } from '../models/access-token.model';
import { catchError, firstValueFrom, throwError } from 'rxjs';
import { Router } from '@angular/router';
import { environment } from '../../environments/environment';
import { UserModel } from '../models/user.model';

@Injectable({
  providedIn: 'root'
})
export class AuthService {


  readonly STORAGE_KEY_STATE = 'AUTH_STATE'
  readonly STORAGE_KEY_CODE_VERIFIER = 'AUTH_CODE_VERIFIER'
  readonly STORAGE_KEY_USER_TOKEN = 'AUTH_USER_TOKEN'
  readonly STORAGE_KEY_USER = 'CURRENT_USER'

  /**
   * Constructor
   * @param http The http client object
   */
  constructor(
    private http: HttpClient,
    private stringService: StringService,
    private localStorageService: LocalStorageService,
    private router: Router
  ) { }


  /**
   * Redirect user to login backend page
   */
  getAuthorizationCode(): void {

    if(this.localStorageService.has(this.STORAGE_KEY_USER_TOKEN)) {
      this.router.navigate(['/home'])
      return
    }

    this.localStorageService.remove(this.STORAGE_KEY_STATE)
    this.localStorageService.remove(this.STORAGE_KEY_CODE_VERIFIER)

    const state:string = this.stringService.getRandomString(40)
    
    getPkce(128, (error, {verifier, challenge}) => {
      if(!error) {

        this.localStorageService.set(this.STORAGE_KEY_CODE_VERIFIER, verifier)
        this.localStorageService.set(this.STORAGE_KEY_STATE, state)

        const query = new URLSearchParams({ 
          client_id: environment.oAuthClientId,
          redirect_uri: environment.oAuthCallbackUri,
          response_type: 'code',
          scope: '',
          state: state,
          code_challenge: challenge,
          code_challenge_method: 'S256'
        })

        window.location.href = `${environment.oAuthProviderBaseUrl}/authorize?${query.toString()}`
      }else{
        throw new Error("failed to get code challenger")
      }
    })

  }

  /**
   * Transform authorization code to AccessToken 
   */
  async authorizationCodeToAccessToken(code:string, state:string): Promise<void> {
    
    console.log('try to change authorization code to access token')

    if(!this.localStorageService.has(this.STORAGE_KEY_STATE) ||
         !this.localStorageService.has(this.STORAGE_KEY_CODE_VERIFIER)) {
          throw new Error("Workflow auth is not inizialized")
        }
    
    if(this.localStorageService.get(this.STORAGE_KEY_STATE) !== state) {
      throw new Error("State has changed")
    }


    this.http.post<AccessTokenModel>(`${environment.oAuthProviderBaseUrl}/token`, {
      grant_type: 'authorization_code',
      client_id: environment.oAuthClientId,
      redirect_uri: environment.oAuthCallbackUri,
      code_verifier: this.localStorageService.get(this.STORAGE_KEY_CODE_VERIFIER),
      code: code
    }).pipe(
      catchError(err => {
        const error = err.message || err.statusText
        return throwError(() => new Error(error))
      })
    )
    .subscribe(async data => {
        console.log('Set to local storage token access')
        data.expire_at = Date.now() + data.expires_in * 1000
        this.localStorageService.set(this.STORAGE_KEY_USER_TOKEN, data)
        this.localStorageService.remove(this.STORAGE_KEY_STATE)
        this.localStorageService.remove(this.STORAGE_KEY_CODE_VERIFIER)
        await this.getCurrentUser()
        this.router.navigate(['/home'])
    })
    

  }


  /**
   * Revoke the authenticated user token
   */
  logout() {

  }


  async getAccessToken(): Promise<string> {

    if(!this.localStorageService.has(this.STORAGE_KEY_USER_TOKEN)) {
      throw new Error("user unauthenticated")
    } 

    const userAccessToken = <AccessTokenModel>this.localStorageService.get(this.STORAGE_KEY_USER_TOKEN)

    console.log(this.accessTokenIsExpired(userAccessToken))
    if(this.accessTokenIsExpired(userAccessToken)) {
      console.log('REFRESH USER TOKEN')
      await this.refreshToken(userAccessToken)
      console.log('USER TOKEN REFRESHED')
    }

    console.log('RETURN ACCESS TOKEN FROM STORAGE')

    const freshAccessToken = <AccessTokenModel>this.localStorageService.get(this.STORAGE_KEY_USER_TOKEN)
    return freshAccessToken.access_token

  }

  isAuthenticated() : boolean {

    return !!this.localStorageService.has(this.STORAGE_KEY_USER) && 
            !!this.localStorageService.has(this.STORAGE_KEY_USER_TOKEN)

  }

  async getCurrentUser(): Promise<UserModel> {

    if(this.localStorageService.has(this.STORAGE_KEY_USER)) {
      console.log('[USERSERVICE] Retreive USER from CACHE')
      return <UserModel> this.localStorageService.get(this.STORAGE_KEY_USER)
    }

    console.log('[USERSERVICE] Retreive USER from remote')

    const req = this.http.get<UserModel>(`${environment.apiBaseUrl}/users/current`)
    
    const res = await firstValueFrom(req)

    this.localStorageService.set(this.STORAGE_KEY_USER, res)

    return res

  }


  private async refreshToken(data: AccessTokenModel): Promise<void> {
    
    const response = this.http.post<AccessTokenModel>(`${environment.oAuthProviderBaseUrl}/token`, {
      grant_type: 'refresh_token',
      refresh_token: data.refresh_token,
      client_id: environment.oAuthClientId,
      scope: ''
    }).pipe(
      catchError(err => {
        const error = err.message || err.statusText
        return throwError(() => new Error(error))
      })
    )

    const dataResponse = await firstValueFrom(response)

    dataResponse.expire_at = Date.now() + dataResponse.expires_in * 1000
    this.localStorageService.set(this.STORAGE_KEY_USER_TOKEN, dataResponse)

  }

  private accessTokenIsExpired(data: AccessTokenModel) : boolean {
    return (!! data.expire_at && data.expire_at > 0 && Date.now() >= data.expire_at)
  }

  


}