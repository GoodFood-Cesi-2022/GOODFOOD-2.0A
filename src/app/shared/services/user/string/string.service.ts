import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class StringService {
  constructor() {
    //NOSONAR
  }

  /**
   * Return a pseudo random string
   */
  getRandomString(length: number, randomString = ''): string {
    randomString += Math.random().toString(20).substring(2, length);

    if (randomString.length > length) {
      return randomString.slice(0, length);
    }
    return this.getRandomString(length, randomString);
  }
}
