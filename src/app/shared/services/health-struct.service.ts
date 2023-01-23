import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Health_struct } from 'src/app/models/health_struct';

@Injectable({
  providedIn: 'root',
})
export class HealthStructService {
  baseUrl: string = 'http://localhost:5000/api/location';

  constructor(private http: HttpClient) {}

  addHealth_struct(health_struct: Health_struct) {
    return this.http.post(this.baseUrl + '/add-health_struct', health_struct);
  }

  getAllHealth_struct(): Observable<Health_struct[]> {
    return this.http.get<Health_struct[]>(this.baseUrl + '/all-health_struct');
  }
}
