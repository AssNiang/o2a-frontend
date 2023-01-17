import { Component, Input, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Comment } from 'src/app/models/comment';
import { Post } from 'src/app/models/post';
import { User } from 'src/app/models/user';
import { CommentService } from 'src/app/services/comment.service';
import { PostService } from 'src/app/services/post.service';
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
  userId: string = '';

  // @Input() commentedPost!: Post;
  // @Input() commenterId: string = '';
  commenter!: User;
  @Input() comment!: Comment;
  commentedPost!: Post;

  constructor(private _userService: UserService, private _commentService: CommentService, private _postService: PostService, private router: Router) { }

  ngOnInit(): void {

    if(this.likerId){
      this._userService.getUserById(this.likerId).subscribe(
        (user) => {
          this.liker = user;
          //console.log(user)
          this.profile = this._userService.baseUrl + '/file/' + user.picture;
        }
      )
    }

    if(this.comment){
      this._postService.getPostById(this.comment.postId).subscribe(post => {
        this.commentedPost = post;
      })

      this._userService.getUserById(this.comment.commenterId).subscribe(
        (user) => {
          this.commenter = user;
          //console.log(user)
          this.profile = this._userService.baseUrl + '/file/' + user.picture;
        }
      )
    }


    this.userId = this.router.url.split('/')[2];
  }

}
