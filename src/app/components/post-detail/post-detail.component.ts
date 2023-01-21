import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AppComponent } from 'src/app/app.component';
import { Post } from 'src/app/models/post';
import { PostService } from 'src/app/services/post.service';
import { UserService } from 'src/app/services/user.service';
import { LeftSideBarComponent } from '../left-side-bar/left-side-bar.component';

@Component({
  selector: 'app-post-detail',
  templateUrl: './post-detail.component.html',
  styleUrls: ['./post-detail.component.css'],
})
export class PostDetailComponent implements OnInit {
  postId: string = '';
  post!: Post;
  userId: string = '';

  constructor(
    private router: Router,
    private _postService: PostService,
    private _userService: UserService
  ) {}

  ngOnInit(): void {
    this.userId = this.router.url.split('/')[2];
    this.postId = this.router.url.split('/')[4];

    this._postService.getPostById(this.postId).subscribe((post) => {
      this.post = post;
      //console.log(post);
    });

    this._userService.getUserById(this.userId).subscribe((user) => {
      LeftSideBarComponent.userId = this.userId;
      if (user.role = 'specialist') {
        AppComponent.typeUser = LeftSideBarComponent.typeUser = 'specialist';
      } else if (user.role == 'admin') {
        AppComponent.typeUser = LeftSideBarComponent.typeUser = 'admin';
      } else {
        AppComponent.typeUser = LeftSideBarComponent.typeUser = 'connected';
      }
    });
  }
}
