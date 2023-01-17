import { Component, Input, OnInit } from '@angular/core';
import { Comment } from 'src/app/models/comment';
import { CommentService } from 'src/app/services/comment.service';

@Component({
  selector: 'app-list-comments',
  templateUrl: './list-comments.component.html',
  styleUrls: ['./list-comments.component.css']
})
export class ListCommentsComponent implements OnInit {
  @Input() postId: string = '';
  comments: Comment[] = [];

  constructor(private _commentService: CommentService) { }

  ngOnInit(): void {
    this._commentService.getPostComments(this.postId).subscribe(comments => {
      this.comments = comments;
    })
  }

}
