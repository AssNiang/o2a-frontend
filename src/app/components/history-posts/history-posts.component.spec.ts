import { HttpClientTestingModule } from '@angular/common/http/testing';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { RouterTestingModule } from '@angular/router/testing';
import { Observable, of } from 'rxjs';
import { AppComponent } from 'src/app/app.component';
import { Post } from 'src/app/models/post';
import { User } from 'src/app/models/user';
import { PostService } from 'src/app/services/post.service';
import { UserService } from 'src/app/services/user.service';
import { LeftSideBarComponent } from '../left-side-bar/left-side-bar.component';

import { HistoryPostsComponent } from './history-posts.component';

describe('HistoryPostsComponent', () => {
  let component: HistoryPostsComponent;
  let fixture: ComponentFixture<HistoryPostsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [HistoryPostsComponent],
      imports: [RouterTestingModule, HttpClientTestingModule],
      providers: [PostService, UserService],
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(HistoryPostsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should call getUserById() and typeUser should be `connected`', () => {
    let user: User = {
      user_name: 'aaa',
      email: 'a@gmail.com',
      password: '1234',
      is_locked: false,
      is_admin: false,
      is_patient: false,
      is_specialist: false,
    };

    let userService = fixture.debugElement.injector.get(UserService);
    let stub = spyOn(userService, 'getUserById').and.callFake(
      (id: string): Observable<User> => {
        return of(user);
      }
    );
    component.user_id = '123';
    component.ngOnInit();
    expect(AppComponent.typeUser).toEqual('connected');
    expect(LeftSideBarComponent.typeUser).toEqual('connected');
  });

  it('should call getUserById() and typeUser should be `specialist`', () => {
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
    component.user_id = '123';
    component.ngOnInit();
    expect(AppComponent.typeUser).toEqual('specialist');
    expect(LeftSideBarComponent.typeUser).toEqual('specialist');
  });

  it('should call getUserById() and typeUser should be `admin`', () => {
    let user: User = {
      user_name: 'aaa',
      email: 'a@gmail.com',
      password: '1234',
      is_locked: false,
      is_admin: true,
      is_patient: false,
      is_specialist: false,
    };

    let userService = fixture.debugElement.injector.get(UserService);
    let stub = spyOn(userService, 'getUserById').and.callFake(
      (id: string): Observable<User> => {
        return of(user);
      }
    );
    component.user_id = '123';
    component.ngOnInit();
    expect(AppComponent.typeUser).toEqual('admin');
    expect(LeftSideBarComponent.typeUser).toEqual('admin');
  });

  it('should call get all the post of a given user id and divide them into private, public, and all', () => {
    let posts: Post[] = [
      {
        _id: '123postId1',
        posterId: '123postAuthorId',
        message: 'This a public post. Thanks',
        statut: 'public',
      },
      {
        _id: '123postId2',
        posterId: '123postAuthorId',
        message: 'This a private post. Thanks',
        statut: 'private',
      },

    ];

    let postService = fixture.debugElement.injector.get(PostService);
    let stub = spyOn(postService, 'getAllPostsById').and.callFake(
      (id: string = '123postAuthorId'): Observable<Post[]> => {
        return of(posts);
      }
    );
    component.ngOnInit();
    expect(component.myPosts.length).toEqual(2);
    expect(component.myPrivatePosts.length).toEqual(1);
    expect(component.myPublicPosts.length).toEqual(1);

    expect(component.myPrivatePosts[0].statut).toEqual('private');
    expect(component.myPublicPosts[0].statut).toEqual('public');
  });

  it('should return an empty list of posts', () => {
    let posts: Post[] = [
      {
        _id: '123postId1',
        posterId: '123postAuthorId',
        message: 'This a public post. Thanks',
        statut: 'public',
      },
      {
        _id: '123postId2',
        posterId: '123postAuthorId',
        message: 'This a private post. Thanks',
        statut: 'private',
      },

    ];

    let postService = fixture.debugElement.injector.get(PostService);
    let stub = spyOn(postService, 'getAllPostsById').and.callFake(
      (id: string = 'posterIdNotFound'): Observable<Post[]> => {
        return of([]);
      }
    );
    component.ngOnInit();
    expect(component.myPosts.length).toEqual(0);
    expect(component.myPrivatePosts.length).toEqual(0);
    expect(component.myPublicPosts.length).toEqual(0);

  });

  it('should set onlyPublics true if onPublic() is called', () => {

    component.onPublic();
    expect(component.onlyPublics).toEqual(true);
    expect(component.onlyPrivates).toEqual(false);
    expect(component.all).toEqual(false);

  });

  it('should set onlyPrivates true if onPrivate() is called', () => {

    component.onPrivate();
    expect(component.onlyPublics).toEqual(false);
    expect(component.onlyPrivates).toEqual(true);
    expect(component.all).toEqual(false);

  });

  it('should set all true if onAll() is called', () => {

    component.onAll();
    expect(component.onlyPublics).toEqual(false);
    expect(component.onlyPrivates).toEqual(false);
    expect(component.all).toEqual(true);

  });


});
