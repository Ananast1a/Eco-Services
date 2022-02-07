import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { AuthService } from '../auth.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {
  loginForm!: FormGroup;
  error!: string;
  isLoading = false;

  constructor(private authService: AuthService,
    private router: Router) { }

  ngOnInit(): void {
    this.loginForm = new FormGroup({
      'username': new FormControl(null, Validators.required),
      'password': new FormControl(null, Validators.required)
    });
  }

  onSubmitLogin() {
    if (!this.loginForm.valid) {
      return;
    }
    const password = this.loginForm.value.password;
    const username = this.loginForm.value.username;
    this.isLoading = true;
    this.authService.login(username, password)
    .subscribe(resData => {
      this.isLoading = false;
      this.router.navigate(['/map']);

    }, errorMessage => {
      this.error = errorMessage;
      this.isLoading = false;
    });
    this.loginForm.reset();
  }
}
