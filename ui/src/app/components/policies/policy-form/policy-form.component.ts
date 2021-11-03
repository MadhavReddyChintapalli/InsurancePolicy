import { Component, OnInit, EventEmitter, Output, Input } from '@angular/core';
import { PolicyService } from 'src/app/services/policy.service';
import { Policy } from 'src/app/models/Policy';

@Component({
  selector: 'app-policy-form',
  templateUrl: './policy-form.component.html',
  styleUrls: ['./policy-form.component.css'],
})
export class PolicyFormComponent implements OnInit {
  @Input() currentPolicy: Policy = {
    _id: '',
    number: '',
    startDate: '',
    endDate: '',
    description: '',
    firstName: '',
    surName: '',
    dob: '',
  };
  @Input() isEdit: boolean = false;
  @Output() updatedPolicy: EventEmitter<Policy> = new EventEmitter();
  @Output() newPolicy: EventEmitter<Policy> = new EventEmitter();
  constructor(private policyService: PolicyService) {}

  ngOnInit(): void {}

  addPolicy(
    number: string,
    startDate: any,
    endDate: any,
    description: string,
    firstName: string,
    surName: string,
    dob: any
  ) {
    this.policyService
      .addPolicy({
        number,
        startDate,
        endDate,
        description,
        firstName,
        surName,
        dob,
      } as Policy)
      .subscribe((policy) => {
        this.newPolicy.emit(policy);
      });
    this.clearAll();
  }
  updatePolicy() {
    this.policyService
      .updatePolicy(this.currentPolicy)
      .subscribe((policy) => this.updatedPolicy.emit(policy));
    this.clearAll();
  }

  clearAll() {
    this.currentPolicy = {
      _id: '',
      number: '',
      startDate: '',
      endDate: '',
      description: '',
      firstName: '',
      surName: '',
      dob: '',
    };
  }
}
