import { ComponentFixture, TestBed } from '@angular/core/testing';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { CreatePostComponent } from './create-post.component';
import { RouterTestingModule } from '@angular/router/testing';
import { UserService } from 'src/app/services/user.service';
import { FormsModule, NgForm } from '@angular/forms';
import { User } from 'src/app/models/user';
import { Observable, of } from 'rxjs';
import { PostService } from 'src/app/services/post.service';
import { Post } from 'src/app/models/post';

describe('CreatePostComponent', () => {
  let component: CreatePostComponent;
  let fixture: ComponentFixture<CreatePostComponent>;


  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [CreatePostComponent],
      imports: [RouterTestingModule, HttpClientTestingModule, FormsModule],
      providers: [UserService, PostService],
    }).compileComponents();

    fixture = TestBed.createComponent(CreatePostComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should call ngOnInit(), then getUserById() and intialize user', () => {
    let user: User = {
      user_name: 'aaa',
      email: 'a@gmail.com',
      password: '1234',
      is_locked: false,
      is_admin: false,
      is_patient: false,
      is_specialist: true,
    };

    let userService = fixture.debugElement.injector.get(UserService);
    let stub = spyOn(userService, 'getUserById').and.callFake(
      (id: string): Observable<User> => {
        return of(user);
      }
    );

    component.ngOnInit();
    expect(component.user).toEqual(user);
  });

  it('should call ngOnInit(), then getAllPosts() and intialize the form content', () => {
    let posts: Post[] = [
      {
        _id: 'idPost',
        posterId: 'idPoster',
        message: 'I am a post',
        statut: 'public',
      },
    ];

    let postService = fixture.debugElement.injector.get(PostService);
    let stub = spyOn(postService, 'getAllPosts').and.callFake(
      (): Observable<Post[]> => {
        return of(posts);
      }
    );

    component.toUpdate = 'idPost';
    component.ngOnInit();
    expect(component.content).toEqual(posts[0].message);
  });

  // it('should call ngOnInit(), then getAllPosts() and intialize the form content', () => {
  //   let posts: Post[] = [
  //     {
  //       _id: 'idPost',
  //       posterId: 'idPoster',
  //       message: 'I am a post',
  //       statut: 'public',
  //     },
  //   ];

  //   let postService = fixture.debugElement.injector.get(PostService);
  //   let stub = spyOn(postService, 'getAllPosts').and.callFake(
  //     (): Observable<Post[]> => {
  //       return of(posts);
  //     }
  //   );

  //   component.toUpdate = '111111';
  //   component.ngOnInit();
  //   expect(component.content).toEqual('');
  // });

  it('should call onSave(), then createPrivatePost() to create the post if it does not exist', () => {
    let post: Post = {
      _id: 'idPost',
      posterId: 'idPoster',
      message: 'I am a post',
      statut: 'private',
    };

    let send = <NgForm>{
      value: {
        _id: 'idPost',
        posterId: 'idPoster',
        message: 'I am a post',
        statut: 'private',
      },
    };

    let user: User = {
      user_name: 'aaa',
      email: 'a@gmail.com',
      password: '1234',
      is_locked: false,
      is_admin: false,
      is_patient: false,
      is_specialist: true,
    };

    let postService = fixture.debugElement.injector.get(PostService);
    let stub = spyOn(postService, 'createPrivatePost').and.callFake(
      (info: any = send.value): Observable<Post> => {
        return of(post);
      }
    );

    //let window = jasmine.createSpy('$window');

    component.toUpdate = '';
    component.user = user;
    component.onSave(send);
  });

  it('should call onSave(), then createPublicPost() to create the post if it does not exist', () => {
    let post: Post = {
      _id: 'idPost',
      posterId: 'idPoster',
      message: 'I am a post',
      statut: 'public',
    };

    let send = <NgForm>{
      value: {
        _id: 'idPost',
        posterId: 'idPoster',
        message: 'I am a post',
        statut: 'public',
      },
    };

    let user: User = {
      user_name: 'aaa',
      email: 'a@gmail.com',
      password: '1234',
      is_locked: false,
      is_admin: false,
      is_patient: false,
      is_specialist: true,
    };

    let postService = fixture.debugElement.injector.get(PostService);
    let stub = spyOn(postService, 'createPublicPost').and.callFake(
      (info: any = send.value): Observable<Post> => {
        return of(post);
      }
    );

    //let window = jasmine.createSpy('$window');

    component.toUpdate = '';
    component.user = user;
    component.onSave(send);
  });

  it('should call onSave(), then createPublicPost() to create the post if it does not exist', () => {
    let post: Post = {
      _id: 'idPost',
      posterId: 'idPoster',
      message: 'I am a post',
      statut: 'aa',
    };

    let send = <NgForm>{
      value: {
        _id: 'idPost',
        posterId: 'idPoster',
        message: 'I am a post',
        statut: 'aa',
      },
    };

    let user: User = {
      user_name: 'aaa',
      email: 'a@gmail.com',
      password: '1234',
      is_locked: false,
      is_admin: false,
      is_patient: false,
      is_specialist: true,
    };

    let postService = fixture.debugElement.injector.get(PostService);
    let stub = spyOn(postService, 'createPublicPost').and.callFake(
      (info: any = send.value): Observable<Post> => {
        return of(post);
      }
    );

    //let window = jasmine.createSpy('$window');

    component.toUpdate = '';
    component.user = user;
    component.onSave(send);
  });

  it('should call onSave(), then createPublicPost() to create the post if it does not exist', () => {
    let post: Post = {
      _id: 'idPost',
      posterId: 'idPoster',
      message: 'I am a post',
      statut: 'public',
    };

    let send = <NgForm>{
      value: {
        _id: 'idPost',
        posterId: 'idPoster',
        message: 'I am a post',
        statut: 'public',
      },
    };

    let user: User = {
      user_name: 'aaa',
      email: 'a@gmail.com',
      password: '1234',
      is_locked: false,
      is_admin: false,
      is_patient: false,
      is_specialist: true,
    };

    component.toUpdate = 'idPost';

    let postService = fixture.debugElement.injector.get(PostService);
    let stub = spyOn(postService, 'updatePost').and.callFake(
      (info: any = send.value, id: string = component.toUpdate): Observable<Post> => {
        return of(post);
      }
    );

    //let window = jasmine.createSpy('$window');

    component.user = user;
    component.onSave(send);
  });


});
