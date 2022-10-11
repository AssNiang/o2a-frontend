import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Comment } from '../models/comment';

@Injectable({
  providedIn: 'root',
})
export class CommentService {
  baseUrl: string = 'http://localhost:5000/api/comment';

  constructor(private http: HttpClient) {}

  addComment(comment: any, postId: string): Observable<Comment> {
    return this.http.post<Comment>(this.baseUrl + '/' + postId, comment);
  }

  getPostComments(postId: string): Observable<Comment[]> {
    return this.http.get<Comment[]>(this.baseUrl + '/' + postId);
  }

  editComment(comment: any, postId: string): Observable<Comment> {
    return this.http.put<Comment>(this.baseUrl + '/edit-comment/' + postId, comment);
  }
}
