import { Component, Input, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Comment } from 'src/app/models/comment';
import { User } from 'src/app/models/user';
import { CommentService } from 'src/app/services/comment.service';
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

  updateActivated: boolean = false;
  deleteUpdateButtonPresent: boolean = false;
  userId: string = '';

  constructor(private _commentService: CommentService, private _userService: UserService, private router: Router) { }

  ngOnInit(): void {
    this.userId = this.router.url.split('/')[2];

    try {
      this._userService
        .getUserById(this.comment.commenterId + '')
        .subscribe((author) => {
          this.commentAuthor = author;
          this.profile = this._userService.baseUrl + '/file/' + author.picture;
          // delete and update buttons are presents if the comment is from the user instance (which is connected)
          this.deleteUpdateButtonPresent = this.comment.commenterId == this.userId;

        });
    } catch (error) {
      console.log(error);
    }
  }

  onUpdate() {
    this.updateActivated = true;
  }

  onDelete() {
    try {
      this._commentService.deleteComment(this.comment._id as string).subscribe(result => {
        console.log(result.message);
        this.reloadComponent();
      })
    } catch (error) {
      console.log(error);
    }
  }

  public reloadComponent() {
    let currentUrl = this.router.url;
    this.router.navigateByUrl('/', { skipLocationChange: true }).then(() => {
      this.router.navigate([currentUrl]);
    });
  }

}
