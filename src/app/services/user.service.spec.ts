import { TestBed } from '@angular/core/testing';
import {
  HttpClientTestingModule,
  HttpTestingController,
} from '@angular/common/http/testing';

import { UserService } from './user.service';
import { HttpClient } from '@angular/common/http';

describe('UserService', () => {
  let userService: UserService;
  let http: HttpClient;
  let httpController: HttpTestingController;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
      providers: [UserService],
    });

    userService = TestBed.inject(UserService);
    http = TestBed.inject(HttpClient);
    httpController = TestBed.inject(HttpTestingController);
  });

  afterEach(() => {
    httpController.verify();
  });

  it('should be created', () => {
    expect(userService).toBeTruthy();
  });

  it('should sign in the user via POST', () => {
    const testData = '1234';
    const inputData = {
      email: 'nianga@ept.sn',
      password: '1111',
    };

    userService
      .signInUser(inputData)
      .subscribe((data) => expect(data).toEqual(testData));

    const req = httpController.expectOne(userService.baseUrl + '/login');

    expect(req.request.method).toEqual('POST');

    req.flush(testData);
  });

  it('should sign up the user via POST', () => {
    const inputData = {
      first_name: 'Ass',
      last_name: 'NIANG',
      user_name: 'a2s',
      email: 'nianga@ept.sn',
      password: '1111',
      is_locked: false,
      is_specialist: false,
      is_admin: false,
      is_patient: false,
    };

    const testData = inputData;

    userService
      .signUpUser(inputData)
      .subscribe((data) => expect(data).toEqual(testData));

    const req = httpController.expectOne(userService.baseUrl + '/register');

    expect(req.request.method).toEqual('POST');

    req.flush(testData);
  });

  it('should get the users via GET', () => {
    const testData = [
      {
        first_name: 'Ass',
        last_name: 'NIANG',
        user_name: 'a2s',
        email: 'nianga@ept.sn',
        password: '1111',
        is_locked: false,
        is_specialist: false,
        is_admin: false,
        is_patient: false,
      },
      {
        first_name: 'Oumou',
        last_name: 'SOUGOU',
        user_name: 'khairy',
        email: 'skhairy@ept.sn',
        password: '123',
        is_locked: false,
        is_specialist: true,
        is_admin: false,
        is_patient: false,
      },
    ];

    userService.getUsers().subscribe((data) => expect(data).toEqual(testData));

    const req = httpController.expectOne(userService.baseUrl + '/');

    expect(req.request.method).toEqual('GET');

    req.flush(testData);
  });

  it('should get a user by id via GET', () => {
    const testData = {
      first_name: 'Ass',
      last_name: 'NIANG',
      user_name: 'a2s',
      email: 'nianga@ept.sn',
      password: '1111',
      is_locked: false,
      is_specialist: false,
      is_admin: false,
      is_patient: false,
    };

    const inputData = '123MyId45';

    userService
      .getUserById(inputData)
      .subscribe((data) => expect(data).toEqual(testData));

    const req = httpController.expectOne(userService.baseUrl + '/' + inputData);

    expect(req.request.method).toEqual('GET');

    req.flush(testData);
  });

  it('should update a user via PUT', () => {
    const testData = {
      _id: undefined, // gotta look at this again ...
      first_name: 'Ass',
      last_name: 'NIANG',
      user_name: 'a2s',
      email: 'nianga@ept.sn',
      password: '1111',
      is_locked: false,
      is_specialist: false,
      is_admin: false,
      is_patient: false,
    };

    const inputData = testData;

    userService.updateUser(inputData).subscribe((data) => {
      expect(data).toEqual(testData);
    });

    const req = httpController.expectOne(
      userService.baseUrl + '/' + inputData._id
    );

    expect(req.request.method).toEqual('PUT');

    req.flush(testData);
  });

  it('should log out the user via GET', () => {
    userService.logoutUser().subscribe();

    const req = httpController.expectOne(userService.baseUrl + '/logout');

    expect(req.request.method).toEqual('GET');
  });

  it('should delete a user by id via DELETE', () => {
    const testData = {
      first_name: 'Ass',
      last_name: 'NIANG',
      user_name: 'a2s',
      email: 'nianga@ept.sn',
      password: '1111',
      is_locked: false,
      is_specialist: false,
      is_admin: false,
      is_patient: false,
    };

    const inputData = '123MyId45';

    userService
      .deleteUser(inputData)
      .subscribe((data) => expect(data).toEqual(testData));

    const req = httpController.expectOne(userService.baseUrl + '/delete/' + inputData);

    expect(req.request.method).toEqual('DELETE');

    req.flush(testData);
  });
});
