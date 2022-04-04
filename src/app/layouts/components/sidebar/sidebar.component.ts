import { Router } from '@angular/router';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

import { AuthService } from 'src/app/auth/common/services/auth.service';

@Component({
  selector: 'app-sidebar',
  templateUrl: './sidebar.component.html',
  styleUrls: ['./sidebar.component.scss'],
})
export class SidebarComponent implements OnInit {
  form!: FormGroup;

  display!: boolean;

  constructor(
    private fb: FormBuilder,
    private router: Router,
    private authService: AuthService
  ) {}

  ngOnInit(): void {
    this.initForm();
  }

  private initForm(): void {
    this.form = this.fb.group({
      selectedUser: [[Validators.required]],
      allHistorique: [],
    });
  }

  public onSubmit(): void {}

  public checkError(controlName: string, errorName: string): boolean {
    return (
      this.form.controls[controlName].dirty &&
      this.form.controls[controlName].hasError(errorName)
    );
  }

  public sidenavClosed(): void {}

  logoutUser() {
    this.authService.logout();
  }
}
