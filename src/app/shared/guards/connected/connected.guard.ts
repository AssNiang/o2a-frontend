import { Injectable } from '@angular/core';
import {
  ActivatedRouteSnapshot,
  CanActivate,
  Router,
  RouterStateSnapshot,
  UrlTree,
} from '@angular/router';
import { Observable } from 'rxjs';
import { AuthService } from '../../services/auth.service';

@Injectable({
  providedIn: 'root',
})
export class ConnectedGuard implements CanActivate {
  constructor(private auth: AuthService, private router: Router) {}
  canActivate() {
    if (this.auth.IsLoggedIn()) {
      return true;
    }
    alert("L'accès est refusé. Vous devez d'abord vous connecter.")
    this.router.navigate(['login']);
    return false;
  }
}
