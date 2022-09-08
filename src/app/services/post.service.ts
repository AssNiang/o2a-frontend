import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Post } from '../models/post';

@Injectable({
  providedIn: 'root'
})
export class PostService {

  baseUrl: string = 'http://localhost:5000/api/post';

  constructor(private http: HttpClient) { }

  createPublicPost(post: Post): Observable<any>{
    return this.http.post(this.baseUrl+'/public-post', post);
  }

  createPrivatePost(post: Post): Observable<any>{
    return this.http.post(this.baseUrl+'/private-post', post);
  }

  deletePost(postId: string){
    return this.http.delete(this.baseUrl+'/'+postId);
  }

  updatePost(post: Post, postId: string){
    return this.http.put(this.baseUrl+'/'+postId, post);
  }

  getAllPosts(): Observable<Post[]>{
    return this.http.get<Post[]>(this.baseUrl+'/');
  }

  getAllPostsById(id: string): Observable<Post[]>{
    return this.http.get<Post[]>(this.baseUrl+'/historique-posts/'+id);
  }

}
