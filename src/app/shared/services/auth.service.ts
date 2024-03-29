import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  constructor() {}
  IsLoggedIn() {
    return !!localStorage.getItem('token');
  }
  IsLoggedAsAdmin() {
    return localStorage.getItem('userType') == 'admin';
  }

  IsLoggedAsSpecialist() {
    return localStorage.getItem('userType') == 'specialist';
  }
}
