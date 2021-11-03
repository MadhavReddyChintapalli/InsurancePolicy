import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';

import { Policy } from '../models/Policy';

@Injectable({
  providedIn: 'root',
})
export class PolicyService {
  httpOptions = {
    headers: new HttpHeaders({ 'Content-Type': 'application/json' }),
  };
  policiesUrl: string = 'http://localhost:5000/api/policies';

  constructor(private http: HttpClient) {}

  getPolicies(): Observable<Policy[]> {
    return this.http.get<Policy[]>(this.policiesUrl);
  }

  addPolicy(policy: Policy): Observable<Policy> {
    return this.http.post<Policy>(this.policiesUrl, policy, this.httpOptions);
  }

  deletePolicy(number: string | any): Observable<Policy> {
    const url = `${this.policiesUrl}/${number}`;
    return this.http.delete<Policy>(url, this.httpOptions);
  }

  updatePolicy(policy: Policy): Observable<Policy> {
    const url = `${this.policiesUrl}/${policy.number}`;
    return this.http.put<Policy>(url, policy, this.httpOptions);
  }
}
