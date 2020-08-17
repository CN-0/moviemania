import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute, Params } from '@angular/router';
import { FormGroup, FormControl, Validators, FormBuilder } from '@angular/forms';
import { AuthService } from './auth.service';

@Component({
  selector: 'app-auth',
  templateUrl: './auth.component.html',
  styleUrls: ['./auth.component.css']
})
export class AuthComponent implements OnInit {
  presentRoute: string ;
  SignUpForm: FormGroup = new FormGroup({});
  LoginForm: FormGroup;
  loading = false;

  constructor(private route: ActivatedRoute, private fb: FormBuilder, private authService: AuthService) {
    this.SignUpForm = fb.group({
      email: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required, Validators.minLength(6)]],
      confirm_password: ['', [Validators.required]]
    }, {
      validator: this.ConfirmedValidator('password', 'confirm_password')
    });
   }

  ngOnInit(): void {
    this.route.params.subscribe((params: Params) => {
      this.presentRoute = params.id;
    });
    this.LoginForm = new FormGroup({
      email:  new FormControl('', [Validators.required, Validators.email]),
      password: new FormControl('', [Validators.required])
    });
  }

  ConfirmedValidator(controlName: string, matchingControlName: string): any{
    return (formGroup: FormGroup) => {
        const control = formGroup.controls[controlName];
        const matchingControl = formGroup.controls[matchingControlName];
        if (matchingControl.errors && !matchingControl.errors.confirmedValidator) {
            return;
        }
        if (control.value !== matchingControl.value) {
            matchingControl.setErrors({ confirmedValidator: true });
        } else {
            matchingControl.setErrors(null);
        }
    };
  }

  onSubmit(): any{
    this.loading = true;
    if (this.presentRoute === 'register'){
      this.authService.authenticate('register', this.SignUpForm.value.email, this.SignUpForm.value.password);
    }else{
      this.authService.authenticate('login', this.LoginForm.value.email, this.LoginForm.value.password);
    }
  }
}
