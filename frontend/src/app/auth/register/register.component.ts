import { Component, OnInit } from '@angular/core';
import { AbstractControl, FormControl, FormGroup, ValidationErrors, ValidatorFn, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService } from '../auth.service';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.scss']
})
export class RegisterComponent implements OnInit {
  signupForm!: FormGroup;
  isLoading = false;
  error: string;
  success: string;

  constructor(private authService: AuthService,
  private router: Router) { }

  ngOnInit(): void {
    this.signupForm = new FormGroup({
      'username': new FormControl(null, Validators.required),
      'email': new FormControl(null, [Validators.required, Validators.email]),
      'password': new FormControl(null, [Validators.required, Validators.minLength(6)])
    });
  }

  onSubmitReg() {
    if (!this.signupForm.valid) {
      return;
    }
    const email = this.signupForm.value.email;
    const password = this.signupForm.value.password;
    const username = this.signupForm.value.username;
    this.isLoading = true;
    this.authService.signUp(username, password, email)
    .subscribe((resData) => {
      this.isLoading = false;
      this.success = resData.message + ' Now you can login with your credentials.';
    }, (errorMessage: string) => {
      this.error = errorMessage;
      this.isLoading = false;
    });
    this.signupForm.reset();
  }
}
