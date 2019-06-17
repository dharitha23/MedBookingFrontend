import {Component, OnInit, SystemJsNgModuleLoader} from '@angular/core';
import {Router} from '@angular/router';
import {User} from './user.model';
import {UserService} from './user.service';
import {Patient} from './patient.model';
import {Doctor} from './doctor.model';
import {MatDialog, MatDialogConfig} from '@angular/material';
import {DialogComponent} from '../dialog/dialog.component';
import {NewUser} from './newuser.model';
import {Md5} from 'ts-md5/dist/md5';

@Component({
  selector: 'app-signup-in',
  templateUrl: './signup-in.component.html',
  styleUrls: ['./signup-in.component.scss'],
  providers: [UserService]
})

export class SignupInComponent implements OnInit {

  constructor(private router: Router, private userService: UserService, private dialog: MatDialog) {
  ​    // this.getAllUsers();
  }

  // type: String = '';
  userType = '';
  email = '';
  password = '';
  cpassword = '';
  users: User[];
  public validUsers: User[] = [];
  public dbUsers: User[] = [];
  signinEmail: String = '';
  signinPwd: String = '';
  result: String = '';
  public signupUserFound: boolean = false;


  // Error vars
  sign_in_invalid_email: boolean;
  sign_in_invalid_password: boolean;
  no_user_type: boolean;
  sign_up_invalid_email: boolean;
  sign_up_invalid_password: boolean;
  sign_up_invalid_confirm_password: boolean;
  sign_up_invalid_confirmed_password: boolean;
  navbar_solid: string;


  ngOnInit() {
// ​    this.userService.getAllUsers().subscribe(
//   data => {
//         this.dbUsers = data;}
//     );
  ​    this.navbar_solid = 'navbar_solid';

  }

  radioChangeHandler(event: any) {
  ​    this.userType = event.target.value;
​    console.log('user is a ' + this.userType);
  }

  createUser() {
  ​    this.cleanErrorVariables();

  ​    const patRadio = (<HTMLInputElement>document.getElementById('radio-patient')).checked;
​    const docRadio = (<HTMLInputElement>document.getElementById('radio-doctor')).checked;

    this.email = (<HTMLInputElement>document.getElementById('signup-mail')).value;
    this.password = (<HTMLInputElement>document.getElementById('su-password')).value;
    this.cpassword = (<HTMLInputElement>document.getElementById('su-confirm-password')).value;
    // this.userService.getUsers(this.email).subscribe(data => {
    //   ​        this.dbUsers = data;});

    // checks if user already exists
    if (!patRadio && !docRadio) {
      this.no_user_type = true;

    } else if (!this.emailvalidate(this.email)) {
      this.sign_up_invalid_email = true;

    } else if (!this.pwdvalidate(this.password)) {
      this.sign_up_invalid_password = true;

    } else if (!this.pwdvalidate(this.cpassword)) {
      this.sign_up_invalid_confirmed_password = true;

    } else if (this.password !== this.cpassword) {
      this.sign_up_invalid_confirm_password = true;

    } else if (!this.signupEmailValidation(this.email)) {
      console.log('user is not found');
      const user = new NewUser(this.userType, this.email, this.password);
      // this.users.push(user);
      this.userService.addUser(user).subscribe(data => {
          if (user.type === 'doctor') {
            localStorage.setItem('userDetail', JSON.stringify(user));
            this.openDialog('Success', 'Thanks for joining Medbooking!' +
              ' \n Please, complete your profile details.', true, 'Go to profile', '/docprofile');
          } else {
            localStorage.setItem('userDetail', JSON.stringify(user));
            this.openDialog('Success', 'Thanks for joining Medbooking!' +
              ' \n Please, complete your profile details.', true, 'Go to profile', '/myprofile');
          }
        },
        err => {
          console.log(err);
          this.openDialog('Error', 'There was an error. Please, try again later.');
        });
    }

  }

  userLogin() {
  ​    this.cleanErrorVariables();
​    localStorage.clear();
​    const signinEmail = (<HTMLInputElement>document.getElementById('si-mail')).value;
​    const signinPwd = (<HTMLInputElement>document.getElementById('si-password')).value;
​    this.loginFunction(signinEmail, signinPwd);
  }


  loginFunction(signinEmail: string, signinPwd: string, fromSignUp?: boolean) {
    this.signinEmail = signinEmail;
    this.signinPwd = signinPwd;
    // console.log('signin email is' + this.signinEmail);
    // console.log('signin password is' + this.signinPwd);
    let userFound = false;
    let pwdValid = false;
    if (this.emailvalidate(this.signinEmail) === true && this.pwdvalidate(this.signinPwd) === true) {
      this.userService.getUsers(this.signinEmail).subscribe(data => {
          this.validUsers = data;
          // console.log('users are' + this.validUsers);
          loop1:
            for (const validUser of this.validUsers) {
              if (this.signinEmail != null && this.signinEmail === validUser.email) {
                userFound = true;
                if (this.signinPwd != null && this.pwdEncryption(validUser.password)) {
                  pwdValid = true;
                  // console.log(this.type);
                  if (validUser.type === 'patient') {
                    // this.userService.createPatientSession(validUser).subscribe();
                    console.log('ID: ' + validUser.userID);
                    console.log('Email' + validUser.email);
                    console.log('Type' + validUser.type);
                    localStorage.setItem('userDetail', JSON.stringify(validUser));

                    if (fromSignUp) {
                      localStorage.removeItem('fromSignUp');
                      localStorage.setItem('fromSignUp', 'true');
                      this.router.navigate(['/myprofile']);
                    } else {
                      this.router.navigate(['/bookappointment']);
                    }
                  } else {
                    console.log('ID: ' + validUser.userID);
                    console.log('Email' + validUser.email);
                    console.log('Password' + validUser.password);
                    console.log('Type' + validUser.type);
                    localStorage.setItem('userDetail', JSON.stringify(validUser));

                    if (fromSignUp) {
                      localStorage.removeItem('fromSignUp');
                      localStorage.setItem('fromSignUp', 'true');
                      this.router.navigate(['/docprofile']);
                    } else {
                      this.router.navigate(['/docmyappointments']);
                    }
                  }
                }
                break loop1;
              }

            }
          if (!userFound) {
            this.openDialog('Error', 'There is no account registered with this email. \n Please, try again or create an account.', true, 'Create an account', '/signupin');
          } else {
            if (!pwdValid) {
              this.openDialog('Error', 'Please enter the correct password');
            }
          }
        },
        err => {
          console.log(err);
          this.openDialog('Error', 'There was an error. Please, try again later.');
        });
    } else {
      if (!this.emailvalidate(this.signinEmail)) {
        this.sign_in_invalid_email = true;

      } else if (!this.pwdvalidate(this.signinPwd)) {
        this.sign_in_invalid_password = true;
      }
    }


  }


  emailvalidate(email: String): boolean {
  ​    console.log('email validation');
​    const inputEmail: string = String(email);
​    const reg = new RegExp('[a-z0-9!#$%&\'*+/=?^_`{|}~.-]+@[a-z0-9-]+(\.[a-z0-9-]+)*');

    if (!inputEmail) {
      console.log('email null');
      return false;
    }
    if (!reg.test(inputEmail)) {
      console.log('email invalid');
      return false;
    }

    return true;
  }

  pwdvalidate(pwd: String): boolean {
  ​    console.log('pwd validation');
​    if (!pwd) {
    ​      console.log('pwd null');
​      // alert("Please enter a valid password");
    ​      return false;
​
    }
​    if (pwd.match(' ')) {
    ​      return false;
​
    }
​    if (!pwd.match('(?=.*[0-9])(?=.*[aA-zZ])([a-zA-Z0-9]{8,})')) {
    ​      return false;
​
    }

    return true;
  }

  signupEmailValidation(email: String): boolean {
  ​    console.log('in already user validation');
    this.userService.getUsers(email).subscribe(data => {
    ​        this.dbUsers = data;
    });
    loop1:
      ​
    for (const dbUser of this.dbUsers) {
      console.log('user: ' + dbUser.email + 'user is a: ' + dbUser.type);
​        console.log('iterating.....');
​        if (email != null && email === dbUser.email) {
      ​          console.log('email matches');
​          if (this.userType === dbUser.type) {
        ​            console.log('user type matches');
​            this.signupUserFound = true;
​            this.openDialog('Error', 'This email already has an account.');
          console.log('value of userfound 1: ' + this.signupUserFound);
          return true;
​            break loop1;
​
        }
​
      }
    }
    console.log('value of userfound 2: ' + this.signupUserFound);
    return this.signupUserFound;
  }

  pwdEncryption(storedPwd: String): boolean {
  ​              let pwd = this.signinPwd;
​              let salt = 'Welcome#ToTheMedBooking#WebApplication!!!12@$@4&#%^$*';
​              let pwd_with_salt = pwd.concat(salt);
​              console.log('Password with salt: ' + pwd_with_salt);
​              let md5_pwd = Md5.hashStr(pwd_with_salt);
​              console.log('Encrypted password: ' + md5_pwd);
​              if (md5_pwd === storedPwd)
      ​
    {
    ​                return true;
​
    }
​              else
    {
    ​                return false;
​
    }
  }

  openDialog(title: string, description: string, extra_button?: boolean, extra_button_text?: string, extra_button_url?: string) {
  ​    const dialogConfig = new MatDialogConfig();

    dialogConfig.disableClose = true;
    dialogConfig.autoFocus = true;

    dialogConfig.data = {
      id: 1,
      title: title,
      description: description,
      extra_button: extra_button,
      extra_button_text: extra_button_text,
      extra_button_url: extra_button_url
    };

    this.dialog.open(DialogComponent, dialogConfig);

  }

  cleanErrorVariables() {
  ​    this.sign_in_invalid_email = false;
​    this.sign_in_invalid_password = false;
​    this.no_user_type = false;
​    this.sign_up_invalid_email = false;
​    this.sign_up_invalid_password = false;
​    this.sign_up_invalid_confirm_password = false;
​    this.sign_up_invalid_confirmed_password = false;
  }


}



