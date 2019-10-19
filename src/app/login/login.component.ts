import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { AuthServiceService } from '../services/auth/auth-service.service'; 
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
  loginForm: FormGroup;
  submitted = false;
  loginData: any;
  loginResponse:any;
  errorLogin:any;
  constructor(private formBuilder: FormBuilder,
        private authService:AuthServiceService,
        private router:Router) { }

  ngOnInit() {
    this.loginForm = this.formBuilder.group({
      email: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required, Validators.minLength(6)]]
  });
  }
  get f() { return this.loginForm.controls; }

  onSubmit() {
      this.submitted = true;

      // stop here if form is invalid
      if (this.loginForm.invalid) {
          return;
      }
      this.loginData = this.loginForm.value;
     this.loginResponse =   this.authService.loginUser(this.loginForm.value);

     if(this.loginResponse)
     {
      this.router.navigate(['dashboard']);
     }else{
       this.errorLogin = 'Please enter Valid Username & Password!';
     }
    }

}
