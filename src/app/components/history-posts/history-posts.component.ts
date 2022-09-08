import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AppComponent } from 'src/app/app.component';
import { Post } from 'src/app/models/post';
import { PostService } from 'src/app/services/post.service';
import { UserService } from 'src/app/services/user.service';
import { LeftSideBarComponent } from '../left-side-bar/left-side-bar.component';

@Component({
  selector: 'app-history-posts',
  templateUrl: './history-posts.component.html',
  styleUrls: ['./history-posts.component.css']
})
export class HistoryPostsComponent implements OnInit {
  myPublicPosts: Post[] = [];
  myPrivatePosts: Post[] = [];
  myPosts: Post[] = [];
  user_id!: string;
  pu!: string;
  pr!: string;
  onlyPublics!: boolean;
  onlyPrivates!: boolean;
  all!: boolean;
  a!: string;

  constructor(private router: Router, private _postService: PostService, private _userService: UserService) { }

  ngOnInit(): void {
    this.user_id = this.router.url.split('/')[2];
    //alert(this.user_id)
    // try {

    // } catch (error) {
    //   console.log(error);
    // }

    this._postService.getAllPostsById(this.user_id as string).subscribe(
      posts => {
        this.myPosts = posts;
        this.myPublicPosts = posts.filter(post => post.statut == "public");
        this.myPrivatePosts = posts.filter(post => post.statut == "private");
        console.log(this.myPosts);
      }
    )

    // refresh the left-side-bar and the app-component-----> could catch an error if an incorrect user_id is given
    this._userService.getUserById(this.user_id+'').subscribe(
      user => {
        //console.log("user:", user); // just for test
        LeftSideBarComponent.user_id = this.user_id;
        if(user.is_specialist){
          AppComponent.typeUser = LeftSideBarComponent.typeUser = 'specialist';
        }
        else if(user.is_admin){
          AppComponent.typeUser = LeftSideBarComponent.typeUser = 'admin';
        }
        else{
          AppComponent.typeUser = LeftSideBarComponent.typeUser = 'connected';
        }
      }
    );

    this.onAll();
  }

  onPublic(){
    this.pu = "bg-button-active";
    this.pr = "";
    this.a = "";
    this.onlyPublics = true;
    this.onlyPrivates = false;
    this.all = false;
  }

  onPrivate(){
    this.pr = "bg-button-active";
    this.pu = "";
    this.a = "";
    this.onlyPublics = false;
    this.onlyPrivates = true;
    this.all = false;
  }

  onAll(){
    this.a = "bg-button-active";
    this.pu = "";
    this.pr = "";
    this.onlyPublics = false;
    this.onlyPrivates = false;
    this.all = true;
  }

}
