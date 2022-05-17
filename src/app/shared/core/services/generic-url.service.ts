import { Injectable } from '@angular/core';
import {
  DefaultHttpUrlGenerator,
  HttpResourceUrls,
  Pluralizer,
} from '@ngrx/data';

@Injectable({
  providedIn: 'root',
})
export class GenericUrlService extends DefaultHttpUrlGenerator {
  constructor(private _pluralizer: Pluralizer) {
    super(_pluralizer);
  }

  protected etResourceUrls(entityName: string, root: string): HttpResourceUrls {
    let resourceUrls = this.knownHttpResourceUrls[entityName];
    if (entityName == 'user') {
      const url = 'https://localhost:8080/api/users/{user_id}';
      resourceUrls = {
        entityResourceUrl: url,
        collectionResourceUrl: url,
      };
      this.registerHttpResourceUrls({ [entityName]: resourceUrls });
    }
    return resourceUrls;
  }
}
