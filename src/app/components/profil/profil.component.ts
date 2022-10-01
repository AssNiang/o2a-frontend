import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Router } from '@angular/router';
import { AppComponent } from 'src/app/app.component';
import { User } from 'src/app/models/user';
import { UserService } from 'src/app/services/user.service';
import { LeftSideBarComponent } from '../left-side-bar/left-side-bar.component';

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
  formData!: FormData;

  constructor(private router: Router, private _userService: UserService) {}

  ngOnInit(): void {
    this.user_id = this.router.url.split('/')[2];

    this._userService.getUserById(this.user_id).subscribe((user) => {
      this.user = user;
      this.profile = this._userService.baseUrl + '/file/' + user.picture;

      LeftSideBarComponent.user_id = this.user_id;
        if(user.is_specialist){
          AppComponent.typeUser = LeftSideBarComponent.typeUser = 'specialist';
        }
        else if(user.is_admin){
          AppComponent.typeUser = LeftSideBarComponent.typeUser = 'admin';
        }
        else{
          AppComponent.typeUser = LeftSideBarComponent.typeUser = 'connected';
        }
    });

    // this._userService.getProfile().subscribe((data) => {
    //   this.profile = data;

    // });
    //this.profile = "http://localhost:5000/api/user/file/profile.1664281704325_++++.png";
  }

  onFileSelect(event: Event) {
    const file = (event.target as HTMLInputElement).files?.[0];
    const allowedMimeTypes = ['image/png', 'image/jpeg', 'image/jpg'];

    this.formData = new FormData();
    this.formData.append('file', file as File);

    if (file && allowedMimeTypes.includes(file.type)) {
      console.log('image selected');

      try {
        this._userService
          .addPicture(this.formData, this.user_id)
          .subscribe((user) => {
            window.location.reload();
          });
      } catch (error) {
        console.log(error);
      }
    }
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
