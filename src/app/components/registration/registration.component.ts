import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Router } from '@angular/router';
import { UserService } from 'src/app/services/user.service';

@Component({
  selector: 'app-registration',
  templateUrl: './registration.component.html',
  styleUrls: ['./registration.component.css'],
})
export class RegistrationComponent implements OnInit {
  registerIcon: string = '../../../assets/images/register-icon1.png';
  public showPassword: boolean = false;
  notValid: boolean = false;
  notChecked: string = '';

  constructor(private router: Router, private _userService: UserService) {}

  submit(register: NgForm) {
    if(register.value.password != register.value.passwordConfirmation){
      this.notValid = true;
      return;
    }

    if( !register.value.conditionsGeneralesUtilisation.checked) {
      this.notChecked = 'bg-danger'
    } else {
      this.notChecked = 'bg-success'
    }

    // a tryCathc may be a good answer
    try {
      this._userService.signUpUser(register.value).subscribe((data) => {
        //console.log(data);
        // use RegistoryComponent
        /*
          - add verifications before switching (validators)
          - save infos in the db
        */
        this.router.navigate(['login']);
      });
    } catch (error) {
      console.log(error);
    }

  }

  public togglePasswordVisibility(): void {
    this.showPassword = !this.showPassword;
  }

  ngOnInit(): void {
    //...
  }
}
