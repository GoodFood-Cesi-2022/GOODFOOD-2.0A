// import { Component, OnInit } from '@angular/core';
// import { finalize } from 'rxjs/operators';
// import { FormGroup } from '@angular/forms';

// import { Franchisee } from 'src/app/shared/models/franchisee.model';

// import { FranchiseeService } from 'src/app/shared/services/franchisee/franchisee.service';
// import { LoadingService } from 'src/app/shared/services/loading/loading.service';
// import { Schedule } from 'src/app/shared/models/schedule.model';
// import { Address } from 'src/app/shared/models/address.model';
// import { MessageService } from 'primeng/api';

// @Component({
//   selector: 'app-franchisee',
//   templateUrl: './franchisee.component.html',
//   styleUrls: ['./franchisee.component.scss'],
// })
// export class FranchiseeComponent implements OnInit {
//   contact: Franchisee[] = [];
//   address: Address;
//   schedule: Schedule;

//   form: FormGroup;
//   editMode: boolean;

//   constructor(
//     private franchiseeService: FranchiseeService,
//     public messageService: MessageService,
//     private loading: LoadingService
//   ) {
//     //NOSONAR
//   }

//   ngOnInit(): void {
//     this.loading.loadingOn();
//     this.franchiseeService
//       .getFranchisees()
//       .pipe(finalize(() => this.loading.loadingOff()))
//       .subscribe((res) => {
//         this.contact = res;
//         this.form.patchValue(this.contact);
//         console.log('franchisee component --> get contact --> ', res);
//       });
//   }

//   newContact(): void {
//     //NOSONAR
//   }
//   editContact(): void {
//     //NOSONAR
//   }

//   newSchedule(): void {
//     //NOSONAR
//   }
// }
