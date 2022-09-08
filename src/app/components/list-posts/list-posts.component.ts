import { Component, OnInit } from '@angular/core';
import { Post } from 'src/app/models/post';
import { PostService } from 'src/app/services/post.service';

@Component({
  selector: 'app-list-posts',
  templateUrl: './list-posts.component.html',
  styleUrls: ['./list-posts.component.css']
})
export class ListPostsComponent implements OnInit {
  allPosts: Post[] = [];

  constructor(private _postService:PostService) { }

  ngOnInit(): void {
    // try {

    // } catch (error) {
    //   console.log(error);
    // }

    this._postService.getAllPosts().subscribe(
      posts => {
        this.allPosts = posts.filter(post => post.statut == "public");
        //console.log(this.allPosts);
      }
    )

  }

}
