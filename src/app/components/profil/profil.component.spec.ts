import { ComponentFixture, TestBed } from '@angular/core/testing';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { ProfilComponent } from './profil.component';
import { RouterTestingModule } from '@angular/router/testing';
import { UserService } from 'src/app/services/user.service';
import { FormsModule, NgForm } from '@angular/forms';
import { User } from 'src/app/models/user';
import { Observable, of } from 'rxjs';

describe('ProfilComponent', () => {
  let component: ProfilComponent;
  let fixture: ComponentFixture<ProfilComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ProfilComponent],
      imports: [RouterTestingModule, HttpClientTestingModule, FormsModule],
      providers: [UserService],
    }).compileComponents();

    fixture = TestBed.createComponent(ProfilComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should call ngOnInit and get the user', () => {
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

    let userService = fixture.debugElement.injector.get(UserService);

    let stub = spyOn(userService, 'getUserById').and.callFake(
      (id: string = '123postAuthorId'): Observable<User> => {
        return of(user);
      }
    );
    component.ngOnInit();

    expect(component.user).toEqual(user);
  });

  // // working, but gotta handle the exception
  // it('should call onUpdate(), but not update the user (throw an exception)', () => {
  //   let user: User = {
  //     _id: '123postAuthorId',
  //     user_name: 'aaa',
  //     email: 'a@gmail.com',
  //     password: '1234',
  //     is_locked: false,
  //     is_admin: false,
  //     is_patient: false,
  //     is_specialist: false,
  //   };

  //   const testForm = <NgForm>{
  //     value: {
  //       email: 'a@gmail.com',
  //       user_name: 'a3',
  //     },
  //   };

  //   let userService = fixture.debugElement.injector.get(UserService);

  //   let stub = spyOn(userService, 'updateUser').and.callFake(
  //     (infos = testForm.value): Observable<User> => {
  //       return of(user);
  //     }
  //   );
  //   component.onUpdate(testForm);

  //   //expect(component.user).toEqual(user);
  // });

  it('should call onUpdate(), and update the user', () => {
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

    const testForm = <NgForm>{
      value: {
        email: 'a@gmail.com',
        user_name: 'a3',
      },
    };

    component.user = user;

    let userService = fixture.debugElement.injector.get(UserService);

    let stub = spyOn(userService, 'updateUser').and.callFake(
      (infos = testForm.value): Observable<User> => {
        return of(user);
      }
    );
    component.onUpdate(testForm);

    expect(component.user._id).toEqual(testForm.value.id);
  });

  it('should toggle password visibility', () => {
    component.togglePasswordVisibility();

    expect(component.showPassword).toEqual(true);
  });
});
