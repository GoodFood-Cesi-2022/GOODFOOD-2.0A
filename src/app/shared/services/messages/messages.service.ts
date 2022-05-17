import { Injectable } from '@angular/core';
import { BehaviorSubject, filter, Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class MessagesService {
  private subject = new BehaviorSubject<string[]>([]);

  errors$: Observable<string[]> = this.subject
    .asObservable()
    .pipe(filter((msg) => msg && msg.length > 0));

  showErrors(...errors: string[]) {
    this.subject.next(errors);
    window.scrollTo(0, 0);
  }
}
