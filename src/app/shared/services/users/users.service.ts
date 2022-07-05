import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { User } from 'src/app/shared/models/user.model';

@Injectable({
  providedIn: 'root',
})
export class UsersService {
  userFirstnames: string[] = ['Sara', 'Zara', 'bahar'];
  userLastnames: string[] = ['Dubois', 'Dubeau', 'Sdqi'];
  userEmails: string[] = [
    'Product@Description.fr',
    'Product@Description.com',
    'Product@Description.org',
  ];
  userPhones: string[] = ['12345678', '11111111', '00000000'];

  constructor(private http: HttpClient) {
    //NOSONAR
  }

  getUsersSmall() {
    return this.http
      .get<any>('assets/users-small.json')
      .toPromise()
      .then((res) => <User[]>res.data)
      .then((data) => {
        return data;
      });
  }

  getUsers() {
    return this.http
      .get<any>('assets/users.json')
      .toPromise()
      .then((res) => <User[]>res.data)
      .then((data) => {
        return data;
      });
  }

  getUsersWithOrdersSmall() {
    return this.http
      .get<any>('assets/users-orders-small.json')
      .toPromise()
      .then((res) => <User[]>res.data)
      .then((data) => {
        return data;
      });
  }

  generatePrduct(): User {
    const user: User = {
      id: this.generateId(),
      firstname: this.generateFirstname(),
      lastname: this.generateLastname(),
      email: this.generateEmail(),
      phone: this.generatePhone(),
    };
    return user;
  }

  generateId() {
    return Math.floor(Math.random() * Math.floor(299) + 1);
  }

  generateFirstname() {
    return this.userFirstnames[Math.floor(Math.random() * Math.floor(30))];
  }
  generateLastname() {
    return this.userLastnames[Math.floor(Math.random() * Math.floor(30))];
  }
  generateEmail() {
    return this.userEmails[Math.floor(Math.random() * Math.floor(30))];
  }
  generatePhone() {
    return this.userPhones[Math.floor(Math.random() * Math.floor(30))];
  }
}
