import { HttpClient, HttpErrorResponse } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { catchError, tap } from "rxjs/operators";
import { BehaviorSubject, throwError } from "rxjs";

import { User } from "./user.model";
import { Router } from "@angular/router";

interface SignupResponseData {
    message: string;
}

interface SigninResponseData {
    access_token: string;
}

@Injectable({ providedIn: 'root' })
export class AuthService {

    user = new BehaviorSubject<User>(null);

    private tokenExpirationTimer: any;

    constructor(private http: HttpClient, private router: Router) {
    }

    signUp(username: string, password: string, email: string) {
        return this.http.post<SignupResponseData>(
            `https://flawless-energy-335218.appspot.com/api/v1/register`,
            {
                username: username,
                password: password,
                email: email
            })
            .pipe(catchError(this.handleError));
    }

    login(username: string, password: string) {
        return this.http.post<SigninResponseData>(
            `https://flawless-energy-335218.appspot.com/api/v1/login`,
            {
                username: username,
                password: password
            })
            .pipe(catchError(this.handleError),
                tap(resData => {
                    this.handleAuth(username, resData.access_token);
                }));
    }

    autoLogin() {
        const userData: {
            email: string,
            username: string,
            _token: string,
            _tokenExpirationDate: string
        } = JSON.parse(localStorage.getItem('userData'));
        if (!userData) {
            return;
        }
        const loadedUser = new User(
            userData.username,
            userData._token,
            new Date(userData._tokenExpirationDate)
        );
        if (loadedUser.token) {
            this.user.next(loadedUser);
            const expirationDuration = new Date(userData._tokenExpirationDate).getTime() - new Date().getTime();
            this.autoLogout(expirationDuration);
        }
    }

    logout() {
        this.user.next(null);
        this.router.navigate(['/']);
        localStorage.removeItem('userData');
        if (this.tokenExpirationTimer) {
            clearTimeout(this.tokenExpirationTimer);
        }
        this.tokenExpirationTimer = null;
    }

    autoLogout(expirationDuration: number) {
        this.tokenExpirationTimer = setTimeout(() => {
            this.logout();
        }, expirationDuration)
    }

    private handleAuth(username: string, token: string) {
        const expirationDate = new Date(new Date().getTime() + 600 * 10000);
        const user = new User(username, token, expirationDate);
        this.user.next(user);
        this.autoLogout(60 * 100000);
        localStorage.setItem('userData', JSON.stringify(user));
    }

    private handleError(errorRes: HttpErrorResponse) {
        console.log(errorRes.message);
        let errorMessage = 'An error occured';
        if (!errorRes.message) {
            return throwError(errorMessage);
        }
        switch (errorRes.message) {
            case 'A user with that username already exists':
                errorMessage = 'A user with that username already exists.';
                break;
            case 'A user with that email already exists':
                errorMessage = 'A user with that email already exists.';
                break;
            case 'Invalid credentials':
                errorMessage = 'Invalid credentials.'
                break;
        }
        return throwError(errorMessage);
    }
}