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

  constructor(private router: Router, private _userService: UserService) {}

  ngOnInit(): void {
    this.user_id = this.router.url.split('/')[2];
    //console.log(this.user_id);

    this._userService.getUserById(this.user_id).subscribe((data) => {
      this.user = data;
      //console.log(this.user.email);
    });
  }

  onUpdate(update: NgForm) {
    // try {

    // } catch (error) {
    //   console.log(error);
    // }

    update.value.id = this.user._id;

    this._userService.updateUser(update.value).subscribe();
  }

  togglePasswordVisibility(): void {
    this.showPassword = !this.showPassword;
  }
}
