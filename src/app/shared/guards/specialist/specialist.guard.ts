import { Injectable } from '@angular/core';
import {
  ActivatedRouteSnapshot,
  CanActivate,
  Router,
  RouterStateSnapshot,
  UrlTree,
} from '@angular/router';
import { Observable } from 'rxjs';
import { LeftSideBarComponent } from '../../../components/left-side-bar/left-side-bar.component';
import { AuthService } from '../../services/auth.service';
import { UserService } from '../../services/user.service';

@Injectable({
  providedIn: 'root',
})
export class SpecialistGuard implements CanActivate {
  constructor(
    private auth: AuthService,
    private router: Router,
    private _userService: UserService
  ) {}
  canActivate() {
    if (this.auth.IsLoggedAsSpecialist()) {
      return true;
    }
    alert(
      "L'accès est refusé. Vous devez d'abord vous connecter en tant que Spécialiste."
    );
    // the user will be automatically disconnected
    let lsbRef = new LeftSideBarComponent(this.router, this._userService);
    lsbRef.disconnect();
    this.router.navigate(['login']);
    return false;
  }
}
