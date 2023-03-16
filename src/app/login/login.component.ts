import { Component, OnDestroy, OnInit } from '@angular/core';
import { AuthenticationService } from '../authentication.service';
import { filter, map, of, Subject, takeUntil } from 'rxjs';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { User } from '../main/models/user';
import { Router } from '@angular/router';

interface LoginForm {
    username: FormControl<User['username'] | null>;
    password: FormControl<User['password'] | null>;
}

@Component({
    selector: 'app-login',
    templateUrl: './login.component.html',
    styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit, OnDestroy {

    public signUpForm = new FormGroup<LoginForm>({
        username: new FormControl(null, [Validators.required, Validators.minLength(5)]),
        password: new FormControl(null, [Validators.required, Validators.minLength(5)]),
    });

    private destroy$ = new Subject<void>();

    constructor(
        private authService: AuthenticationService,
        private router: Router,
    ) {}

    public ngOnInit(): void {
        this.initializeUser();
        this.redirectIfLoggedIn();
    }

    public ngOnDestroy() {
        this.destroy$.next();
    }

    private initializeUser(): void {
        of(localStorage.getItem('SampleChatUser'))
            .pipe(
                filter(storageString => !!storageString),
                map((storageString) => JSON.parse(storageString as string)),
                filter(user => !!user && !!Object.keys(user).length),
                takeUntil(this.destroy$),
            )
            .subscribe(user => this.authService.user$.next(user));
    }

    private redirectIfLoggedIn(): void {
        this.authService.user$.subscribe(_ => this.router.navigate(['chats']));
    }

}
