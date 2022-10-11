import { Component, Input, OnInit } from '@angular/core';
import { Comment } from 'src/app/models/comment';
import { User } from 'src/app/models/user';
import { UserService } from 'src/app/services/user.service';

@Component({
  selector: 'app-comment-item',
  templateUrl: './comment-item.component.html',
  styleUrls: ['./comment-item.component.css']
})
export class CommentItemComponent implements OnInit {
  @Input() comment!: Comment;
  profile: string = '';
  commentAuthor!: User;

  constructor(private _userService: UserService) { }

  ngOnInit(): void {
    try {
      this._userService
        .getUserById(this.comment.commenterId + '')
        .subscribe((author) => {
          this.commentAuthor = author;
          this.profile = this._userService.baseUrl + '/file/' + author.picture;
        });
    } catch (error) {
      console.log(error);
    }
  }

}
