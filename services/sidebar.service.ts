import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
// import { Personne } from '../../models/user.model';
import { HttpClient } from '@angular/common/http';
// import { BackendService } from '@ag2rlamondiale/metis-ng';
import { map } from 'rxjs/operators';


const PAYLOAD = 'payload';

@Injectable({
  providedIn: 'root'
})
export class SidebarStoreService {

  private subject = new BehaviorSubject<boolean>(false);

  display$: Observable<boolean> = this.subject.asObservable();

  readonly url: any;

  constructor(private http: HttpClient,
    // private backendService: BackendService
  ) {

    // this.url = this.backendService._backendUrls;

  }

  public open(display: boolean): void {
    this.subject.next(display);
  }

  // public getEquipes(delegation: number): Observable<Equipe[]> {

  //   return this.http.get(`${this.url.equipes}/${delegation}`)
  //     .pipe(
  //       map(res => res[PAYLOAD]),
  //     );
  // }

  // public getPersonnesByEquipeID(criteres: RecherchePersonneEquipe): Observable<Personne[]> {

  //   return this.http.post(`${this.url.personnesEquipe}`,criteres)
  //     .pipe(
  //       map(res => res[PAYLOAD]),
  //     );

  // }

}
