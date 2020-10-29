import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Store } from '@ngrx/store';
import { googleSignIn, emailSignIn } from '@store/actions/user.actions';

@Component({
  selector: 'app-login-page',
  templateUrl: './login-page.component.html',
  styleUrls: ['./login-page.component.scss']
})
export class LoginPageComponent {

  loginForm = new FormGroup({
    email: new FormControl('', []),
    password: new FormControl('', [])
  });

  constructor(private store: Store) {
  }

  onGoogleButtonClick() {
    this.store.dispatch(googleSignIn());
  }

  submit() {
    const emailControl = this.loginForm.get('email');
    emailControl.setErrors(
      Validators.required(emailControl) || Validators.email(emailControl)
    );

    const passwordControl = this.loginForm.get('password');
    passwordControl.setErrors(Validators.required(passwordControl));

    if (!this.loginForm.valid) {
      return;
    }

    this.loginForm.reset();

    this.store.dispatch(emailSignIn({
      email: emailControl.value,
      password: passwordControl.value
    }));
  }
}
