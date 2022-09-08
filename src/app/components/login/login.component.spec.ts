import { ComponentFixture, TestBed } from '@angular/core/testing';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { LoginComponent } from './login.component';
import { FormsModule, NgForm } from '@angular/forms';
import { RouterTestingModule } from '@angular/router/testing';
import { UserService } from 'src/app/services/user.service';
import { Observable, of } from 'rxjs';
import { User } from 'src/app/models/user';
import { AppComponent } from 'src/app/app.component';
import { LeftSideBarComponent } from '../left-side-bar/left-side-bar.component';
import { Router } from '@angular/router';

describe('LoginComponent', () => {
  let component: LoginComponent;
  let fixture: ComponentFixture<LoginComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ LoginComponent ],
      imports: [RouterTestingModule, HttpClientTestingModule, FormsModule],
      providers: [UserService]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(LoginComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should toggle password visibility', () => {
    component.togglePasswordVisibility();

    expect(component.showPassword).toEqual(true);
  });

  it('should call submit() and login a user with a userType == "connected"', () => {
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

    let login = <NgForm>{
      value: {
        password: '1234',
        email: 'a@gmail.com',
      },
    };

    let userService = fixture.debugElement.injector.get(UserService);

    let stub1 = spyOn(userService, 'signInUser').and.callFake(
      (infos:any = login.value): Observable<any> => {
        return of(user._id);
      }
    );

    let stub2 = spyOn(userService, 'getUserById').and.callFake(
      (id: string = user._id): Observable<User> => {
        return of(user);
      }
    );

    const routerStub: Router = TestBed.inject(Router);
    spyOn(routerStub, 'navigate');

    component.submit(login);
    expect(AppComponent.typeUser).toEqual('connected');
    expect(LeftSideBarComponent.typeUser).toEqual('connected');
  });

  it('should call submit() and login a user with a userType == "specialist"', () => {
    let user = {
      _id: '123postAuthorId',
      user_name: 'aaa',
      email: 'a@gmail.com',
      password: '1234',
      is_locked: false,
      is_admin: false,
      is_patient: false,
      is_specialist: true,
    };

    let login = <NgForm>{
      value: {
        password: '1234',
        email: 'a@gmail.com',
      },
    };

    let userService = fixture.debugElement.injector.get(UserService);

    let stub1 = spyOn(userService, 'signInUser').and.callFake(
      (infos:any = login.value): Observable<any> => {
        return of(user._id);
      }
    );

    let stub2 = spyOn(userService, 'getUserById').and.callFake(
      (id: string = user._id): Observable<User> => {
        return of(user);
      }
    );

    const routerStub: Router = TestBed.inject(Router);
    spyOn(routerStub, 'navigate');

    component.submit(login);
    expect(AppComponent.typeUser).toEqual('specialist');
    expect(LeftSideBarComponent.typeUser).toEqual('specialist');
  });

  it('should call submit() and login a user with a userType == "admin"', () => {
    let user = {
      _id: '123postAuthorId',
      user_name: 'aaa',
      email: 'a@gmail.com',
      password: '1234',
      is_locked: false,
      is_admin: true,
      is_patient: false,
      is_specialist: false,
    };

    let login = <NgForm>{
      value: {
        password: '1234',
        email: 'a@gmail.com',
      },
    };

    let userService = fixture.debugElement.injector.get(UserService);

    let stub1 = spyOn(userService, 'signInUser').and.callFake(
      (infos:any = login.value): Observable<any> => {
        return of(user._id);
      }
    );

    let stub2 = spyOn(userService, 'getUserById').and.callFake(
      (id: string = user._id): Observable<User> => {
        return of(user);
      }
    );

    const routerStub: Router = TestBed.inject(Router);
    spyOn(routerStub, 'navigate');

    component.submit(login);
    expect(AppComponent.typeUser).toEqual('admin');
    expect(LeftSideBarComponent.typeUser).toEqual('admin');
  });


});
