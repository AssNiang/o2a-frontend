import { ComponentFixture, TestBed } from '@angular/core/testing';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { ListPostsComponent } from './list-posts.component';
import { Post } from 'src/app/models/post';
import { PostService } from 'src/app/shared/services/post.service';
import { Observable, of } from 'rxjs';

describe('ListPostsComponent', () => {
  let component: ListPostsComponent;
  let fixture: ComponentFixture<ListPostsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ListPostsComponent ],
      imports: [HttpClientTestingModule],
      providers: [PostService]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ListPostsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should call ngOninit and get all the public posts', () => {
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
    let stub = spyOn(postService, 'getAllPosts').and.callFake(
      (): Observable<Post[]> => {
        return of(posts);
      }
    );
    component.ngOnInit();
    expect(component.allPosts.length).toEqual(1);
    expect(component.allPosts[0].statut).toEqual('public');
  });

  it('should call ngOninit and return an empty list if there is not a public post', () => {
    let posts: Post[] = [
      {
        _id: '123postId1',
        posterId: '123postAuthorId',
        message: 'This is a private post. Thanks',
        statut: 'private',
      },
      {
        _id: '123postId2',
        posterId: '123postAuthorId',
        message: 'This is another private post. Thanks',
        statut: 'private',
      },

    ];

    let postService = fixture.debugElement.injector.get(PostService);
    let stub = spyOn(postService, 'getAllPosts').and.callFake(
      (): Observable<Post[]> => {
        return of(posts);
      }
    );
    component.ngOnInit();
    expect(component.allPosts.length).toEqual(0);
  });

});
