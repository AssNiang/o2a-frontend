import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Specialist } from '../../models/specialist';
import { User } from '../../models/user';

@Injectable({
  providedIn: 'root',
})
export class AdminService {
  baseUrl: string = 'http://localhost:5000/api/user/admin';

  constructor(private http: HttpClient) {}

  createSpecialist(specialistInfos: any): Observable<string> {
    return this.http.post<string>(this.baseUrl + '/create-specialist', specialistInfos)
  }

  retireSpecialist(userId: any) {
    return this.http.delete(this.baseUrl + '/retire-specialist/' + userId)
  }

  getAllAccounts(): Observable<User[]> {
    return this.http.get<User[]>(this.baseUrl + '/all-accounts');
  }

  getReportedPosts(): Observable<User[]> {
    return this.http.get<User[]>(this.baseUrl + '/reported-posts');
  }

  getLockedAccounts(): Observable<User[]> {
    return this.http.get<User[]>(this.baseUrl + '/retired-accounts');
  }

  getUnlockedAccounts(): Observable<User[]> {
    return this.http.get<User[]>(this.baseUrl + '/no-retired-accounts');
  }

  blockAnAccount(userId: string): Observable<any> {
    return this.http.put<any>(this.baseUrl + '/block-account', {userId: userId});
  }

  unblockAnAccount(userId: string): Observable<any> {
    return this.http.put<any>(this.baseUrl + '/unblock-account', {userId: userId});
  }
}
