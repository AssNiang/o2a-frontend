import { Component, Input, OnInit } from '@angular/core';
import { Post } from 'src/app/models/post';
import { User } from 'src/app/models/user';
import { UserService } from 'src/app/services/user.service';

@Component({
  selector: 'app-notification-item',
  templateUrl: './notification-item.component.html',
  styleUrls: ['./notification-item.component.css']
})
export class NotificationItemComponent implements OnInit {

  profile: string = '';
  @Input() likedPost!: Post;
  @Input() likerId!: string;

  liker!: User;

  @Input() reportedPost!: Post;

  constructor(private _userService: UserService) { }

  ngOnInit(): void {

    this._userService.getUserById(this.likerId).subscribe(
      (user) => {
        this.liker = user;
        console.log(user)
        this.profile = this._userService.baseUrl + '/file/' + user.picture;
      }
    )
  }

}
