import {
  HttpClientTestingModule,
  HttpTestingController,
} from '@angular/common/http/testing';
import { TestBed } from '@angular/core/testing';
import { Post } from '../models/post';

import { PostService } from './post.service';

describe('PostService', () => {
  let postService: PostService;
  let httpMock: HttpTestingController;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
      providers: [PostService],
    });
    postService = TestBed.inject(PostService);
    httpMock = TestBed.inject(HttpTestingController);
  });

  afterEach(() => {
    httpMock.verify();
  });

  it('should be created', () => {
    expect(postService).toBeTruthy();
  });

  it('should create a public post via POST', () => {
    let inputData = {
      posterId: '1234',
      message: 'This is a post',
      statut: 'public',
    };

    let testData: Post = inputData;
    postService
      .createPublicPost(inputData)
      .subscribe((data) => expect(data).toEqual(testData));

    let req = httpMock.expectOne(postService.baseUrl + '/public-post');

    expect(req.request.method).toEqual('POST');

    req.flush(testData);
  });

  it('sould create a private post via POST', () => {
    let inputData = {
      posterId: '12345',
      message: 'This is a private post',
      statut: 'private',
    };

    let testData: Post = inputData;

    postService
      .createPrivatePost(inputData)
      .subscribe((data) => expect(data).toEqual(testData));

    let req = httpMock.expectOne(postService.baseUrl + '/private-post');

    expect(req.request.method).toEqual('POST');

    req.flush(testData);
  });

  it('sould delete a post by id via DELETE', () => {
    let inputData = '123isMyId';
    let testData: Post = {
      _id: '123isMyId',
      posterId: '12345',
      message: 'This is a post',
      statut: 'public',
    };

    postService
      .deletePost(inputData)
      .subscribe((data) => expect(data).toEqual(testData));

    let req = httpMock.expectOne(postService.baseUrl + '/' + inputData);

    expect(req.request.method).toEqual('DELETE');

    req.flush(testData);
  });

  it('should update a post via PUT', () => {
    let inputData = {
      post: {
        _id: '123postId',
        posterId: '123postAuthorId',
        message: 'This post is going to be updated. Thanks',
        statut: 'public',
      },
      postId: '123postId',
    };
    let testData: Post = {
      _id: '123postId',
      posterId: '123postAuthorId',
      message: 'This post is going to be updated.',
      statut: 'public',
    };

    postService
      .updatePost(inputData.post, inputData.postId)
      .subscribe((data) => expect(data).toEqual(testData));

    let req = httpMock.expectOne(postService.baseUrl + '/' + inputData.postId);

    expect(req.request.method).toEqual('PUT');

    req.flush(testData);

  });

  it('should get the posts via GET', () => {
    let testData: Post[] = [
      {
        _id: '123postId1',
        posterId: '123postAuthorId',
        message: 'This a post. Thanks',
        statut: 'public',
      },
      {
        _id: '123postId2',
        posterId: '123postAuthorId',
        message: 'This is another post. Thanks',
        statut: 'private',
      },
    ];

    postService.getAllPosts().subscribe((data) => expect(data).toEqual(testData));

    let req = httpMock.expectOne(postService.baseUrl + '/');

    expect(req.request.method).toEqual('GET');

    req.flush(testData);
  });

  it('should get all posts by author id via GET', () => {
    let inputData: string = '123postAuthorId';
    let testData: Post[] = [
      {
        _id: '123postId1',
        posterId: '123postAuthorId',
        message: 'This a post. Thanks',
        statut: 'public',
      },
      {
        _id: '123postId2',
        posterId: '123postAuthorId',
        message: 'This is another post. Thanks',
        statut: 'private',
      },
    ];

    postService.getAllPostsById(inputData).subscribe((data) => expect(data).toEqual(testData));

    let req = httpMock.expectOne(postService.baseUrl + '/historique-posts/'+ inputData);

    expect(req.request.method).toEqual('GET');

    req.flush(testData);
  });

});
