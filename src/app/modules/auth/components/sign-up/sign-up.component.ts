import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { User } from '../../models/user';
import { AuthService } from '../../services/auth.service';
import { Router } from '@angular/router';

interface SignUpForm {
    username: FormControl<User['username'] | null>;
    password: FormControl<User['password'] | null>;
    email: FormControl<User['email'] | null>;
}

@Component({
    selector: 'app-sign-up',
    templateUrl: './sign-up.component.html',
    styleUrls: ['./sign-up.component.scss'],
})
export class SignUpComponent implements OnInit {

    public signUpForm = new FormGroup<SignUpForm>({
        username: new FormControl(null, [Validators.required, Validators.minLength(5)]),
        password: new FormControl(null, [Validators.required, Validators.minLength(5)]),
        email: new FormControl(null, [Validators.required, Validators.minLength(5)]),
    });

    constructor(
        private authService: AuthService,
        private router: Router,
    ) {}

    public ngOnInit(): void {
        this.detectUser();
    }

    private detectUser(): void {
        if (this.authService.isLoggedIn()) {
            this.router.navigate(['']);
        }
    }

}
