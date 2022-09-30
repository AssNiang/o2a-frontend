import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Router } from '@angular/router';
import { User } from 'src/app/models/user';
import { UserService } from 'src/app/services/user.service';

@Component({
  selector: 'app-profil',
  templateUrl: './profil.component.html',
  styleUrls: ['./profil.component.css'],
})
export class ProfilComponent implements OnInit {
  user!: User;
  user_id!: string;
  showPassword: boolean = false;
  //profile!: File;
  profile: string = '';

  constructor(private router: Router, private _userService: UserService) {}

  ngOnInit(): void {
    this.user_id = this.router.url.split('/')[2];

    this._userService.getUserById(this.user_id).subscribe((data) => {
      this.user = data;
    });

    // this._userService.getProfile().subscribe((data) => {
    //   this.profile = data;

    // });
    this.profile = "http://localhost:5000/api/user/file/profile.1664281704325_++++.png";
  }

  onUpdate(update: NgForm) {
    // a tryCatch may be a good idea

    update.value.id = this.user._id;

    this._userService.updateUser(update.value).subscribe();
  }

  togglePasswordVisibility(): void {
    this.showPassword = !this.showPassword;
  }
}
