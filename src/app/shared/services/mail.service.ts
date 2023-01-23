import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class MailService {
  baseUrl: string = 'http://localhost:5000/api/mail';

  constructor(private http: HttpClient) {}

  sendMail(mail: any): Observable<any> {
    return this.http.post<any>(this.baseUrl + '/send-mail', mail);
  }
}
