import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Post } from '../models/post';

@Injectable({
  providedIn: 'root',
})
export class PostService {
  baseUrl: string = 'http://localhost:5000/api/posts';

  constructor(private http: HttpClient) {}

  createPublicPost(post: Post): Observable<any> {
    return this.http.post(this.baseUrl + '/newPublicPost', post);
  }

  createPrivatePost(post: Post): Observable<any> {
    return this.http.post(this.baseUrl + '/newPrivatePost', post);
  }

  deletePost(postId: string): Observable<any> {
    return this.http.delete(this.baseUrl + '/delete/' + postId);
  }

  updatePost(post: Post, postId: string): Observable<any> {
    return this.http.put(this.baseUrl + '/update/' + postId, post);
  }

  getAllPosts(): Observable<Post[]> {
    return this.http.get<Post[]>(this.baseUrl + '/allPosts');
  }

  getPostById(postId: string): Observable<Post> {
    return this.http.get<Post>(this.baseUrl + '/postDetails' + postId);
  }

  getAllPostsById(id: string): Observable<Post[]> {
    return this.http.get<Post[]>(this.baseUrl + '/historique-posts/' + id);
  }

  likePost(postId: string, userId: string): Observable<any> {
    return this.http.patch<any>(this.baseUrl + '/like-post/' + postId, {
      id: userId,
    });
  }

  unlikePost(postId: string, userId: string): Observable<any> {
    return this.http.patch<any>(this.baseUrl + '/unlike-post/' + postId, {
      id: userId,
    });
  }

  reportPost(postId: string, userId: string): Observable<any> {
    return this.http.patch<any>(this.baseUrl + '/report-post/' + postId, {
      id: userId,
    });
  }

  unreportPost(postId: string, userId: string): Observable<any> {
    return this.http.patch<any>(this.baseUrl + '/unreport-post/' + postId, {
      id: userId,
    });
  }

  addPicture(formData: FormData, idPost: string) {
    return this.http.post(this.baseUrl + '/file/' + idPost, formData);
  }
}
