import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AppComponent } from 'src/app/app.component';
import { Post } from 'src/app/models/post';
import { PostService } from 'src/app/shared/services/post.service';
import { UserService } from 'src/app/shared/services/user.service';
import { LeftSideBarComponent } from '../left-side-bar/left-side-bar.component';

@Component({
  selector: 'app-post-detail',
  templateUrl: './post-detail.component.html',
  styleUrls: ['./post-detail.component.css'],
})
export class PostDetailComponent implements OnInit {
  postId: string = '';
  post!: Post;
  user_id: string = '';

  constructor(
    private router: Router,
    private _postService: PostService,
    private _userService: UserService
  ) {}

  ngOnInit(): void {
    this.user_id = this.router.url.split('/')[2];
    this.postId = this.router.url.split('/')[4];

    this._postService.getPostById(this.postId).subscribe((post) => {
      this.post = post;
      //console.log(post);
    });

    this._userService.getUserById(this.user_id).subscribe((user) => {
      LeftSideBarComponent.user_id = this.user_id;
      if (user.is_specialist) {
        AppComponent.typeUser = LeftSideBarComponent.typeUser = 'specialist';
      } else if (user.is_admin) {
        AppComponent.typeUser = LeftSideBarComponent.typeUser = 'admin';
      } else {
        AppComponent.typeUser = LeftSideBarComponent.typeUser = 'connected';
      }
    });
  }
}
