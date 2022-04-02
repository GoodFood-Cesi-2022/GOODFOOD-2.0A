import { Router } from '@angular/router';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { filter, tap, mergeMap } from 'rxjs/operators';
import { Store } from '@ngrx/store';

import { SidebarStoreService } from 'src/app/shared/services/sidebar/sidebar-store.service';

import { User } from 'src/app/shared/models/user.model';

@Component({
  selector: 'app-sidebar',
  templateUrl: './sidebar.component.html',
  styleUrls: ['./sidebar.component.scss']
})
export class SidebarComponent implements OnInit {

  form!: FormGroup;

  display!: boolean;

  constructor(
    private fb: FormBuilder,
    private sidebarStoreService: SidebarStoreService,
    private router: Router,
    private store: Store<AppState>) { }

  ngOnInit(): void {

    this.sidebarStoreService.display$.subscribe((res: boolean) => this.display = res);
    this.initForm();
  }

  private initForm(): void {

    this.form = this.fb.group({
      selectedUser: [[Validators.required]],
      allHistorique: [],
    });
  }

  public onSubmit(): void {
    }

  public onClose(): void {

    this.sidebarStoreService.open(false);

  }

  public checkError(controlName: string, errorName: string): boolean {
    return this.form.controls[controlName].dirty && this.form.controls[controlName].hasError(errorName);
  }

  public sidenavClosed(): void {
  }

}
