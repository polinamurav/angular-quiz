import { Component, OnInit } from '@angular/core';
import {FormControl, FormGroup, Validators} from "@angular/forms";
import {AuthService} from "../../../core/auth/auth.service";
import {HttpErrorResponse} from "@angular/common/http";
import {LoginResponseType} from "../../../../types/login-response.type";
import {Router} from "@angular/router";
import {MatSnackBar} from "@angular/material/snack-bar";

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  loginForm = new FormGroup({
    email: new FormControl('', [Validators.email, Validators.required]),
    password: new FormControl('', [Validators.pattern('^(?=.*\\d)(?=.*[a-z])(?=.*[A-Z])[0-9a-zA-Z]{8,}$'), Validators.required]),
  })

  constructor(private authService: AuthService, private router: Router, private _snackBar: MatSnackBar) { }

  ngOnInit(): void {
  }

  login(): void {
    if (this.loginForm.valid && this.loginForm.value.email && this.loginForm.value.password) {
      this.authService.login(this.loginForm.value.email, this.loginForm.value.password)
        .subscribe({
          next: (data: LoginResponseType) => {
            if (data.error || !data.accessToken || !data.refreshToken
              || !data.fullName || !data.userId) {
              this._snackBar.open('Ошибка при авторизации');
              throw new Error(data.message ? data.message : 'Error with data on login');
            }

            this.authService.setUserInfo({
              fullName: data.fullName,
              userId: data.userId,
              // email: result.email
            })
            this.authService.setTokens(data.accessToken, data.refreshToken);
            
            this.router.navigate(['/choice']);
          },
          error: (error: HttpErrorResponse) => {
            this._snackBar.open('Ошибка при авторизации');
            throw new Error(error.error.message);
          }
        })
    }
  }

}
