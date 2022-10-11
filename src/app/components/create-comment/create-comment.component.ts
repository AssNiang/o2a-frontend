import { Component, OnInit } from '@angular/core';
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
  }

  onSave(send: NgForm) {
    send.value.commenterId = this.user_id;

    try {
      this._commentService
        .addComment(send.value, this.postId)
        .subscribe((comment: Comment) => {
          //console.log(comment);
          this.reloadComponent();
        });
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
