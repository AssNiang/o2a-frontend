import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AppComponent } from 'src/app/app.component';
import { Comment } from 'src/app/models/comment';
import { Post } from 'src/app/models/post';
import { CommentService } from 'src/app/services/comment.service';
import { PostService } from 'src/app/services/post.service';
import { UserService } from 'src/app/services/user.service';
import { LeftSideBarComponent } from '../left-side-bar/left-side-bar.component';

@Component({
  selector: 'app-notification',
  templateUrl: './notification.component.html',
  styleUrls: ['./notification.component.css'],
})
export class NotificationComponent implements OnInit {
  userId!: string;
  likedPosts: Post[] = [];
  reportedPosts: Post[] = [];
  // commentedPosts: Post[] = [];
  allComments: Comment[] = [];

  constructor(
    private router: Router,
    private _userService: UserService,
    private _postService: PostService,
    private _commentService: CommentService
  ) {}

  ngOnInit(): void {
    // refresh the left-side-bar and the app-component

    this.userId = this.router.url.split('/')[2];
    this._userService.getUserById(this.userId + '').subscribe((user) => {
      LeftSideBarComponent.userId = this.userId;
      if (user.role = 'specialist') {
        AppComponent.typeUser = LeftSideBarComponent.typeUser = 'specialist';
      } else if (user.role == 'admin') {
        AppComponent.typeUser = LeftSideBarComponent.typeUser = 'admin';
      } else {
        AppComponent.typeUser = LeftSideBarComponent.typeUser = 'connected';
      }
    });

    // get posts
    this._postService.getAllPostsById(this.userId).subscribe((posts) => {
      this.likedPosts = posts.filter(
        (post) => (post.likers?.length as number) > 0
      );
      this.reportedPosts = posts.filter(
        (post) => (post.reporters?.length as number) > 0
      );
      //get commented posts
      posts.forEach(post => {
        this._commentService.getPostComments(post._id as string).subscribe(comments => {
          if(comments.length > 0){
            comments.forEach(comment => {
              this.allComments.push(comment);
            });
          }
        });
      });
    });
  }
}
