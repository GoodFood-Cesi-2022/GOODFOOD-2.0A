import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class LocalStorageService {

  constructor() {}

  set(key: string, value: string|object): void {

    let valueSerialized:string = '';

    switch (typeof value) {
      case 'object': 
        valueSerialized = JSON.stringify(value)
        break
      default:
        valueSerialized = value.toString()
    }

    localStorage.setItem(key, valueSerialized)
  }

  get(key: string): string|object|null{

    if(this.has(key)) {
      try {
        return JSON.parse(<string>localStorage.getItem(key))
      }catch{
        return localStorage.getItem(key)
      }
    }

    return null
  }

  remove(key: string): void {
    localStorage.removeItem(key)
  }

  has(key: string): boolean {
    return localStorage.getItem(key) === null ? false : true
  }

}
