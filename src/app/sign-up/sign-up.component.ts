import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { User } from '../main/models/user';
import { AuthenticationService } from '../authentication.service';
import { filter } from 'rxjs';
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
        private authService: AuthenticationService,
        private router: Router,
    ) {}

    public ngOnInit(): void {
        this.detectUser();
    }

    private detectUser(): void {
        this.authService.user$
            .pipe(
                filter(user => !!user),
            )
            .subscribe(_ => this.router.navigate(['']));
    }

}
