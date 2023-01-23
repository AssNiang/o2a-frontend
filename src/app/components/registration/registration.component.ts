import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Router } from '@angular/router';
import { MailService } from 'src/app/shared/services/mail.service';
import { UserService } from 'src/app/shared/services/user.service';

@Component({
  selector: 'app-registration',
  templateUrl: './registration.component.html',
  styleUrls: ['./registration.component.css'],
})
export class RegistrationComponent implements OnInit {
  registerIcon: string = '../../../assets/images/register-icon1.png';
  public showPassword: boolean = false;
  notValid: boolean = false;
  firstStepPassed: boolean = false;
  randString!: string;
  codeIncorrect: boolean = false;

  constructor(private router: Router, private _userService: UserService, private _mailService: MailService) {}

  passFirstStep(email: string) {
    this.firstStepPassed = true;

    this.randString = this.randomString(10);

    this._mailService.sendMail({destination: email, subject: 'Vérification du compte', text: `code: ${this.randString}`}).subscribe((data) => {
      if (data.message) {
        alert('Le mail a été envoyé avec succès.');
      } else if (data.error) {
        alert("L'envoi du mail a échoué.");
      }
    });
  }

  submit(register: NgForm) {
    if (register.value.password != register.value.passwordConfirmation) {
      this.notValid = true;
      return;
    }

    if (register.value.verificationToken !== this.randString) {
      this.codeIncorrect = true;
      return;
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

  randomString(length: number) {
    var randomChars =
      'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';

    var result = '';

    for (var i = 0; i < length; i++) {
      result += randomChars.charAt(
        Math.floor(Math.random() * randomChars.length)
      );
    }

    return result;
  }

  public togglePasswordVisibility(): void {
    this.showPassword = !this.showPassword;
  }

  ngOnInit(): void {
    //...
  }
}
