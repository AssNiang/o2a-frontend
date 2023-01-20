import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { UserService } from 'src/app/services/user.service';

@Component({
  selector: 'app-header-connecte',
  templateUrl: './header-connecte.component.html',
  styleUrls: ['./header-connecte.component.css']
})
export class HeaderConnecteComponent implements OnInit {

  user_id: string = '';
  profile: string = '';

  constructor(private router: Router, private _userService: UserService) {
    //...
  }

  ngOnInit(): void {
    this.user_id = this.router.url.split('/')[2];

    this._userService.getUserById(this.user_id).subscribe((data) => {
      this.profile = this._userService.baseUrl + '/file/' + data.picture;
    });

  }

}
