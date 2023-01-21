import { ComponentFixture, TestBed } from '@angular/core/testing';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { PostItemComponent } from './post-item.component';
import { Post } from 'src/app/models/post';
import { PostService } from 'src/app/shared/services/post.service';
import { UserService } from 'src/app/shared/services/user.service';
import { Observable, of } from 'rxjs';
import { User } from 'src/app/models/user';

describe('PostItemComponent', () => {
  let component: PostItemComponent;
  let fixture: ComponentFixture<PostItemComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ PostItemComponent ],
      imports: [ HttpClientTestingModule ],
      providers: [PostService, UserService]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(PostItemComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should call ngOnInit and get the author of the post', () => {
    let post: Post = {
      _id: '123postId1',
      posterId: '123postAuthorId',
      message: 'This a public post. Thanks',
      statut: 'public',
    };

    let user: User = {
      _id: '123postAuthorId',
      user_name: 'aaa',
      email: 'a@gmail.com',
      password: '1234',
      is_locked: false,
      is_admin: false,
      is_patient: false,
      is_specialist: false,
    };

    component.post = post;

    let userService = fixture.debugElement.injector.get(UserService);

    let stub = spyOn(userService, 'getUserById').and.callFake(
      (id: string = post.posterId): Observable<User> => {
        return of(user);
      }
    );
    component.ngOnInit();

    expect(component.postAuthor).toEqual(user);

  });

  it('should call onDelete() and delete the post', () => {
    let post: Post = {
      _id: '123postId1',
      posterId: '123postAuthorId',
      message: 'This a public post. Thanks',
      statut: 'public',
    };

    component.post = post;


    let postService = fixture.debugElement.injector.get(PostService);

    let stub = spyOn(postService, 'deletePost').and.callFake(
      (id: string = component.post._id+''): Observable<Post> => {
        return of(post);
      }
    );
    component.onDelete();
    // expect(stub).toEqual(User);

  });

  // //=> working, but gotta handle errors
  // it('should call onDelete(), but not delete the post with an incorrect postId', () => {
  //   let post: Post = {
  //     _id: '123postId1',
  //     posterId: '123postAuthorId',
  //     message: 'This a public post. Thanks',
  //     statut: 'public',
  //   };



  //   let postService = fixture.debugElement.injector.get(PostService);

  //   let stub = spyOn(postService, 'deletePost').and.callFake(
  //     (id: string = component.post._id+''): Observable<Post> => {
  //       return of(post);
  //     }
  //   );
  //   component.onDelete();

  // });


  it('should call onUpdate() and set updateActivated to true', () => {

    component.onUpdate();
    expect(component.updateActivated).toEqual(true);

  });

  it('should call setUpdateActivatedToFalse() and set updateActivated to false', () => {

    component.setUpdateActivatedToFalse();
    expect(component.updateActivated).toEqual(false);

  });

});
