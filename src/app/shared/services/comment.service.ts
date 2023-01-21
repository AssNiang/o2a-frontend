import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Comment } from '../../models/comment';

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

  editComment(comment: any, commentId: string): Observable<Comment> {
    return this.http.put<Comment>(this.baseUrl + '/edit-comment/' + commentId, comment);
  }

  deleteComment(commentId: string) : Observable<any> {
    return this.http.delete<any>(this.baseUrl + '/delete-comment/' + commentId);
  }

  likeComment(commentId: string, userId: string): Observable<any> {
    return this.http.patch<any>(this.baseUrl + '/like-comment/' + commentId, {
      id: userId,
    });
  }

  unlikeComment(commentId: string, userId: string): Observable<any> {
    return this.http.patch<any>(this.baseUrl + '/unlike-comment/' + commentId, {
      id: userId,
    });
  }

  reportComment(commentId: string, userId: string): Observable<any> {
    return this.http.patch<any>(this.baseUrl + '/report-comment/' + commentId, {
      id: userId,
    });
  }

  unreportComment(commentId: string, userId: string): Observable<any> {
    return this.http.patch<any>(this.baseUrl + '/unreport-comment/' + commentId, {
      id: userId,
    });
  }
}
