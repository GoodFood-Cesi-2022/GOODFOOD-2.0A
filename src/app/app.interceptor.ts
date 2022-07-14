// import { Injectable } from '@angular/core';
// import {
//   HttpEvent,
//   HttpHandler,
//   HttpInterceptor,
//   HttpRequest,
//   HttpErrorResponse,
// } from '@angular/common/http';
// import { Observable, throwError } from 'rxjs';
// import { catchError } from 'rxjs/operators';
// import { Router } from '@angular/router';

// @Injectable()
// export class GlobalHttpInterceptorService implements HttpInterceptor {
//   constructor(public router: Router) {}

//   intercept(
//     req: HttpRequest<any>,
//     next: HttpHandler
//   ): Observable<HttpEvent<any>> {
//     return next.handle(req).pipe(
//       catchError((error) => {
//         if (error instanceof HttpErrorResponse) {
//           if (error.error instanceof ErrorEvent) {
//             console.error('Error Event');
//           } else {
//             console.log(`error status : ${error.status} ${error.statusText}`);
//             if (error.status === 500) {
//               this.router.navigateByUrl(`/500`);
//             }
//           }
//         } else {
//           console.error('something was happened in app interceptor!');
//         }
//         console.log(req);
//         return throwError(() => new Error(error));
//       })
//     );
//   }
// }
