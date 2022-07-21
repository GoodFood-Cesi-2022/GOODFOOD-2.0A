import {
  Wednesday,
  Thursday,
  Lunch,
} from './../../../shared/models/schedule.model';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { MessageService } from 'primeng/api';
import { Subscription } from 'rxjs';
import { Address } from 'src/app/shared/models/address.model';

import { Franchisee } from 'src/app/shared/models/franchisee.model';
import { Schedule } from 'src/app/shared/models/schedule.model';
import { FranchiseeService } from 'src/app/shared/services/franchisee/franchisee.service';
import { LoadingService } from 'src/app/shared/services/loading/loading.service';
import { ScheduleService } from 'src/app/shared/services/schedule/schedule.service';

@Component({
  selector: 'app-franchisee-detail',
  templateUrl: './franchisee-detail.component.html',
  styleUrls: ['./franchisee-detail.component.scss'],
})
export class FranchiseeDetailComponent implements OnInit {
  franchisees: Franchisee[] = [];
  franchisee: Franchisee;
  id: number;
  address: Address;
  schedule: Schedule;
  private routeSub: Subscription;
  form: FormGroup;
  editMode: boolean;

  constructor(
    private franchiseeService: FranchiseeService,
    private scheduleService: ScheduleService,
    public messageService: MessageService,
    private loading: LoadingService,
    private fb: FormBuilder,
    private route: ActivatedRoute
  ) {
    //NOSONAR
  }

  ngOnInit(): void {
    this.routeSub = this.route.params.subscribe((params) => {
      this.id = params['id']; //assign the value of id
    });
    this.franchiseeService.getFranchisees().subscribe((res) => {
      this.franchisees = res;
      this.getFranchiseeById();
      this.scheduleService.getSchedule(this.franchisee).subscribe((res) => {
        this.schedule = res;
        console.log('get schedule ---> ', res);
      });
    });

    this.initSchedule();
  }

  initSchedule(): void {
    this.form = this.fb.group({
      monday: [this.schedule?.monday, [Validators.required]],
      tuesday: [this.schedule?.tuesday, [Validators.required]],
      Wednesday: [this.schedule?.wednesday, [Validators.required]],
      Thursday: [this.schedule?.thursday, [Validators.required]],
      friday: [this.schedule?.friday, [Validators.required]],
      saturday: [this.schedule?.saturday, [Validators.required]],
      sunday: [this.schedule?.sunday, [Validators.required]],
    });
  }

  private getSchedule(): void {
    this.schedule.monday.lunch = this.form.value.monday.lunch;
    this.schedule.monday.night = this.form.value.monday.night;
    this.schedule.tuesday.lunch = this.form.value.tuesday.lunch;
    this.schedule.tuesday.night = this.form.value.tuesday.night;
    this.schedule.wednesday.lunch = this.form.value.wednesday.lunch;
    this.schedule.wednesday.night = this.form.value.wednesday.night;
    this.schedule.thursday.lunch = this.form.value.thursday.lunch;
    this.schedule.thursday.night = this.form.value.thursday.night;
    this.schedule.friday.lunch = this.form.value.friday.lunch;
    this.schedule.friday.night = this.form.value.friday.night;
    this.schedule.saturday.lunch = this.form.value.saturday.lunch;
    this.schedule.saturday.night = this.form.value.saturday.night;
    this.schedule.sunday.lunch = this.form.value.sunday.lunch;
    this.schedule.sunday.night = this.form.value.sunday.night;
  }

  public onSubmit(): void {
    this.loading.loadingOn();
    this.getSchedule();
    if (this.editMode) {
      this.updateSchedule();
    } else {
      this.newSchedule();
    }
  }

  getFranchiseeById(): void {
    this.franchisees.forEach((e) => {
      if (e.id == this.id) {
        this.franchisee = e;
      }
    });
  }

  updateSchedule(): void {
    //NOSONAR
  }

  newSchedule(): void {
    //NOSONAR
  }
}
