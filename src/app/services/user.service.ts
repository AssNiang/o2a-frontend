import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { User } from '../models/user';

@Injectable({
  providedIn: 'root'
})
export class UserService {

  baseUrl: string = 'http://localhost:5000/api/user';

  constructor(private http: HttpClient) { }

  signUpUser(user: User): Observable<any>{
    return this.http.post(this.baseUrl + '/register', user);
  }

  signInUser(infos: any): Observable<any>{
    return this.http.post(this.baseUrl + '/login', infos);
  }

  logoutUser():Observable<any>{
    return this.http.get<any>(this.baseUrl+'/logout');
  }

  getUsers():Observable<any[]>{
    return this.http.get<any[]>(this.baseUrl+'/');
  }

  getUserById(id:string):Observable<User>{
    return this.http.get<User>(this.baseUrl+'/'+id);
  }

  updateUser(user:any){
    return this.http.put(this.baseUrl+'/'+user.id, user);
  }

  deleteUser(id:string){
    return this.http.delete(this.baseUrl + '/delete/'+id);
  }

  // images
  // getProfile():Observable<File>{
  //   return this.http.get<File>(this.baseUrl+'/file/profile.1664281704325_++++.png');
  // }

  addPicture(formData: FormData, idUser: string) {
    return this.http.post(this.baseUrl + '/file/'+idUser, formData);
  }


}
