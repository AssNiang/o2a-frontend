import { localizedString } from '@angular/compiler/src/output/output_ast';
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AppComponent } from 'src/app/app.component';
import { UserService } from 'src/app/shared/services/user.service';

@Component({
  selector: 'app-left-side-bar',
  templateUrl: './left-side-bar.component.html',
  styleUrls: ['./left-side-bar.component.css'],
})
export class LeftSideBarComponent implements OnInit {
  static typeUser: string = 'unknown';
  lsbRef = LeftSideBarComponent;

  static user_id: string;


  constructor(private router: Router, private _userService: UserService) {}

  public disconnect() {
    // a tryCatch may be a good idea

    this._userService.logoutUser().subscribe();
      localStorage.clear();
      AppComponent.typeUser = LeftSideBarComponent.typeUser = "unknown";
      this.router.navigate(['']);
  }

  ngOnInit(): void {
    //...

  }
}
