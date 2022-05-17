// import { Injectable } from '@angular/core';
// import { HttpClient } from '@angular/common/http';
// import { Observable } from 'rxjs';
// import { User } from '../../models/user';

// const API_URL = 'http://localhost:8081/api/users/{user_id}';

// @Injectable({
//   providedIn: 'root',
// })
// export class UserService {
//   isAuthenticated$: any;
//   user$: any;
//   constructor(private http: HttpClient) {}

//   getUserSmall() {
//     return this.http
//       .get<any>('../shared/mock/user-mock.json')
//       .toPromise()
//       .then((res) => <User[]>res.data)
//       .then((data) => {
//         return data;
//       });
//   }

//   getUser() {
//     return this.http
//       .get<any>('../shared/mock/user-mock.json')
//       .toPromise()
//       .then((res) => <User[]>res.data)
//       .then((data) => {
//         return data;
//       });
//   }

//   generateUser(): User {
//     const product: User = {
//       id: this.generateId(),
//       firstname: this.generateFirstname(),
//       lastname: this.generateLastname(),
//       description: 'Product Description',
//       price: this.generatePrice(),
//       quantity: this.generateQuantity(),
//       category: 'Product Category',
//       rating: this.generateRating(),
//     };
//     return product;
//   }
//   generateLastname(): string | undefined {
//     throw new Error('Method not implemented.');
//   }

//   generateId() {
//     let text = '';
//     let possible =
//       'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';

//     for (var i = 0; i < 5; i++) {
//       text += possible.charAt(Math.floor(Math.random() * possible.length));
//     }

//     return text;
//   }

//   generateFirstname() {
//     return this.user.firstname[Math.floor(Math.random() * Math.floor(30))];
//   }

//   generatePrice() {
//     return Math.floor(Math.random() * Math.floor(299) + 1);
//   }

//   generateQuantity() {
//     return Math.floor(Math.random() * Math.floor(75) + 1);
//   }

//   generateRating() {
//     return Math.floor(Math.random() * Math.floor(5) + 1);
//   }

// getPublicContent(): Observable<any> {
//   return this.http.get(API_URL + 'all', { responseType: 'text' });
// }
// getFranchisee(): Observable<any> {
//   return this.http.get(API_URL + 'franchise', { responseType: 'text' });
// }
// getAdmin(): Observable<any> {
//   return this.http.get(API_URL + 'admin', { responseType: 'text' });
// }
//}
