import { Component, OnInit } from '@angular/core';
import { PolicyService } from 'src/app/services/policy.service';
import { Policy } from 'src/app/models/Policy';
@Component({
  selector: 'app-policies',
  templateUrl: './policies.component.html',
  styleUrls: ['./policies.component.css'],
})
export class PoliciesComponent implements OnInit {
  policies: Policy[] = [];
  currentPolicy: Policy = {
    _id: '',
    number: '',
    startDate: '',
    endDate: '',
    description: '',
    firstName: '',
    surName: '',
    dob: '',
  };
  isEdit: boolean = false;
  constructor(private policyService: PolicyService) {}

  ngOnInit(): void {
    this.policyService.getPolicies().subscribe((policies) => {
      this.policies = policies;
    });
  }

  onNewPolicy(policy: Policy) {
    this.policies.unshift(policy);
  }

  onUpdatedPolicy(policy: Policy) {
    this.policies.forEach((cur, index) => {
      if (policy.number === cur.number) {
        this.policies.splice(index, 1);
        this.policies.unshift(policy);
        this.isEdit = false;
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
    });
  }

  updatePolicy(policy: Policy) {
    this.currentPolicy = policy;
    this.isEdit = true;
  }

  deletePolicy(policy: Policy) {
    this.policyService.deletePolicy(policy.number).subscribe(() => {
      this.policies.forEach((cur, index) => {
        if (policy.number === cur.number) {
          this.policies.splice(index, 1);
          this.isEdit = false;
        }
      });
    });
  }
}
