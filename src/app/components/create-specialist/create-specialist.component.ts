import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Router } from '@angular/router';
import { AppComponent } from 'src/app/app.component';
import { User } from 'src/app/models/user';
import { AdminService } from 'src/app/shared/services/admin.service';
import { UserService } from 'src/app/shared/services/user.service';
import { LeftSideBarComponent } from '../left-side-bar/left-side-bar.component';

@Component({
  selector: 'app-create-specialist',
  templateUrl: './create-specialist.component.html',
  styleUrls: ['./create-specialist.component.css'],
})
export class CreateSpecialistComponent implements OnInit {
  registerIcon: string = '../../../assets/images/register-icon2.jpg';
  admin_id: string = '';
  specialistToBe_id: string = '';
  specialistToBe!: User;

  constructor(
    private router: Router,
    private _userService: UserService,
    private _adminService: AdminService
  ) {}

  ngOnInit(): void {
    this.specialistToBe_id = this.router.url.split('/')[3];

    this._userService
      .getUserById(this.specialistToBe_id)
      .subscribe((user) => (this.specialistToBe = user));

    this.admin_id = this.router.url.split('/')[2];
    // refresh the left-side-bar and the app-component-----> could catch an error if an incorrect admin_id is given
    this._userService.getUserById(this.admin_id + '').subscribe((user) => {
      LeftSideBarComponent.user_id = this.admin_id;
      if (user.is_specialist) {
        AppComponent.typeUser = LeftSideBarComponent.typeUser = 'specialist';
      } else if (user.is_admin) {
        AppComponent.typeUser = LeftSideBarComponent.typeUser = 'admin';
      } else {
        AppComponent.typeUser = LeftSideBarComponent.typeUser = 'connected';
      }
    });
  }

  submit(addSpecialist: NgForm) {
    addSpecialist.value.userId = this.specialistToBe_id;
    this._adminService
      .createSpecialist(addSpecialist.value)
      .subscribe(() => this.router.navigate(['accounts', this.admin_id]));
  }
}
