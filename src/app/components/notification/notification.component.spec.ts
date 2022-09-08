import { ComponentFixture, TestBed } from '@angular/core/testing';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { NotificationComponent } from './notification.component';
import { RouterTestingModule } from '@angular/router/testing';
import { UserService } from 'src/app/services/user.service';
import { Observable, of } from 'rxjs';
import { AppComponent } from 'src/app/app.component';
import { User } from 'src/app/models/user';
import { LeftSideBarComponent } from '../left-side-bar/left-side-bar.component';

describe('NotificationComponent', () => {
  let component: NotificationComponent;
  let fixture: ComponentFixture<NotificationComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ NotificationComponent ],
      imports: [RouterTestingModule, HttpClientTestingModule],
      providers: [UserService]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(NotificationComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should call getUserById() and typeUser should be `connected`', () => {
    let user : User = {
      user_name: 'aaa',
      email: 'a@gmail.com',
      password: '1234',
      is_locked: false,
      is_admin: false,
      is_patient: false,
      is_specialist: false,
    };

    let userService = fixture.debugElement.injector.get(UserService);
    let stub = spyOn(userService, 'getUserById').and.callFake((id: string) : Observable<User> => {
      return of(user);
    });
    component.user_id = '123';
    component.ngOnInit();
    expect(AppComponent.typeUser).toEqual('connected');
    expect(LeftSideBarComponent.typeUser).toEqual('connected');
  });

  it('should call getUserById() and typeUser should be `specialist`', () => {
    let user : User = {
      user_name: 'aaa',
      email: 'a@gmail.com',
      password: '1234',
      is_locked: false,
      is_admin: false,
      is_patient: false,
      is_specialist: true,
    };

    let userService = fixture.debugElement.injector.get(UserService);
    let stub = spyOn(userService, 'getUserById').and.callFake((id: string) : Observable<User> => {
      return of(user);
    });
    component.user_id = '123';
    component.ngOnInit();
    expect(AppComponent.typeUser).toEqual('specialist');
    expect(LeftSideBarComponent.typeUser).toEqual('specialist');
  });

  it('should call getUserById() and typeUser should be `admin`', () => {
    let user : User = {
      user_name: 'aaa',
      email: 'a@gmail.com',
      password: '1234',
      is_locked: false,
      is_admin: true,
      is_patient: false,
      is_specialist: false,
    };

    let userService = fixture.debugElement.injector.get(UserService);
    let stub = spyOn(userService, 'getUserById').and.callFake((id: string) : Observable<User> => {
      return of(user);
    });
    component.user_id = '123';
    component.ngOnInit();
    expect(AppComponent.typeUser).toEqual('admin');
    expect(LeftSideBarComponent.typeUser).toEqual('admin');
  });

});
