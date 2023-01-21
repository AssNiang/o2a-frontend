import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { User } from '../models/user';

@Injectable({
  providedIn: 'root'
})
export class UserService {

  baseUrl: string = 'http://localhost:5000/api/users';

  constructor(private http: HttpClient) { }

  signUpUser(user: User): Observable<any>{
    return this.http.post('http://localhost:5000/api/auth/signup', user);
  }

  signInUser(infos: any): Observable<any>{
    return this.http.post('http://localhost:5000/api/auth/signin', infos);
  }

  logoutUser():Observable<any>{
    return this.http.get<any>(this.baseUrl+'/logout');
  }

  getUsers():Observable<User[]>{
    return this.http.get<User[]>(this.baseUrl+'/allUsers');
  }

  getUserById(id:string):Observable<User>{
    return this.http.get<User>(this.baseUrl+'/userDetails');
  }

  updateUser(user:any){
    return this.http.put(this.baseUrl+'/updateUser', user);
  }

  changeUserStatusByAdmin(id:string){
    return this.http.delete(this.baseUrl + '/userStatus/'+id);
  }

  // images
  // getProfile():Observable<File>{
  //   return this.http.get<File>(this.baseUrl+'/file/profile.1664281704325_++++.png');
  // }

  addPicture(formData: FormData, idUser: string) {
    return this.http.post(this.baseUrl + '/file/'+idUser, formData);
  }


}
