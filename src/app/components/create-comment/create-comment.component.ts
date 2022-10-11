import { Component, Input, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Router } from '@angular/router';
import { Comment } from 'src/app/models/comment';
import { User } from 'src/app/models/user';
import { CommentService } from 'src/app/services/comment.service';
import { PostService } from 'src/app/services/post.service';
import { UserService } from 'src/app/services/user.service';

@Component({
  selector: 'app-create-comment',
  templateUrl: './create-comment.component.html',
  styleUrls: ['./create-comment.component.css'],
})
export class CreateCommentComponent implements OnInit {
  profile: string = '';
  user_id!: string;
  user!: User;
  postId: string = '';

  @Input() toUpdateCommentId: string = '';
  commentContent: string = '';

  constructor(
    private router: Router,
    private _userService: UserService,
    private _postService: PostService,
    private _commentService: CommentService
  ) {}

  ngOnInit(): void {
    this.user_id = this.router.url.split('/')[2];
    this.postId = this.router.url.split('/')[4];

    this._userService.getUserById(this.user_id).subscribe((data) => {
      this.user = data;
      this.profile = this._userService.baseUrl + '/file/' + data.picture;
    });

    // get the comment content if `toUpdateCommentId` isn't empty.
    if (this.toUpdateCommentId) {
      this._commentService
        .getPostComments(this.postId)
        .subscribe((comments) => {
          this.commentContent = comments.filter(
            (comment) => comment._id == this.toUpdateCommentId
          )[0].text;
        });
    }
  }

  onSave(send: NgForm) {
    send.value.commenterId = this.user_id;

    // create a comment if `toUpdateCommentId` is empty, else update the existing comment
    try {
      if (!this.toUpdateCommentId) {
        this._commentService
          .addComment(send.value, this.postId)
          .subscribe((comment: Comment) => {
            //console.log(comment);
            this.reloadComponent();
          });
      } else {
        this._commentService
          .editComment(send.value, this.toUpdateCommentId)
          .subscribe((comment: Comment) => {
            //console.log(comment);
            this.reloadComponent();
          });
      }
    } catch (error) {
      console.log(error);
    }
  }

  reloadComponent() {
    let currentUrl = this.router.url;
    this.router.navigateByUrl('/', { skipLocationChange: true }).then(() => {
      this.router.navigate([currentUrl]);
    });
  }
}
