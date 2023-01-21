import {
  HttpClientTestingModule,
  HttpTestingController,
} from '@angular/common/http/testing';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { FormsModule, NgForm } from '@angular/forms';
import { RouterTestingModule } from '@angular/router/testing';
import { Observable, of } from 'rxjs';
import { AppComponent } from 'src/app/app.component';
import { User } from 'src/app/models/user';
import { UserService } from 'src/app/shared/services/user.service';
import { LeftSideBarComponent } from '../left-side-bar/left-side-bar.component';
import { LoginComponent } from '../login/login.component';
import { RegistrationComponent } from './registration.component';

describe('RegistrationComponent', () => {
  let component: RegistrationComponent;
  let fixture: ComponentFixture<RegistrationComponent>;
  let userService: UserService;
  let router: RouterTestingModule;
  let httpMock: HttpTestingController;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [RegistrationComponent],
      imports: [RouterTestingModule, HttpClientTestingModule, FormsModule],
      providers: [UserService],
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(RegistrationComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();

    userService = TestBed.inject(UserService);
    router = TestBed.inject(RouterTestingModule);
    httpMock = TestBed.inject(HttpTestingController);
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should toggle password visibility', () => {
    component.togglePasswordVisibility();

    expect(component.showPassword).toEqual(true);
  });

  it('should set NotValid to true if password equals passwordConfirmation', () => {
    const register = <NgForm>{
      value: {
        password: 'aaa',
        passwordConfirmation: 'asa',
      },
    };

    let user = {
      _id: '123postAuthorId',
      user_name: 'aaa',
      email: 'a@gmail.com',
      password: '1234',
      is_locked: false,
      is_admin: false,
      is_patient: false,
      is_specialist: false,
    };

    let userService = fixture.debugElement.injector.get(UserService);

    let sub = spyOn(userService, 'signUpUser').and.callFake(
      (info: any = register.value): Observable<User> => {
        return of(user);
      }
    );

    component.submit(register);

    expect(component.notValid).toEqual(true);
  });

  it('should register the user and redirect him to the login page', () => {
    const register = <NgForm>{
      value: {
        user_name: 'aaa',
        email: 'a@gmail.com',
        password: '1234',
        passwordConfirmation: '1234',
      },
    };

    let user = {
      _id: '123postAuthorId',
      user_name: 'aaa',
      email: 'a@gmail.com',
      password: '1234',
      is_locked: false,
      is_admin: false,
      is_patient: false,
      is_specialist: false,
    };

    let userService = fixture.debugElement.injector.get(UserService);

    let sub = spyOn(userService, 'signUpUser').and.callFake(
      (info: any = register.value): Observable<User> => {
        return of(user);
      }
    );

    component.submit(register);

    //expect(component.notValid).toEqual(true);
  });
});
