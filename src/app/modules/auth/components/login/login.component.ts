import { ChangeDetectionStrategy, Component, OnDestroy, OnInit } from '@angular/core';
import { AuthService } from '../../services/auth.service';
import { filter, first, map, of, Subject, takeUntil } from 'rxjs';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { User } from '../../models/user';
import { Router } from '@angular/router';
import { LoginData } from '../../models/login';

interface LoginForm {
    username: FormControl<User['username'] | null>;
    password: FormControl<User['password'] | null>;
}

@Component({
    selector: 'app-login',
    templateUrl: './login.component.html',
    styleUrls: ['./login.component.scss'],
    changeDetection: ChangeDetectionStrategy.OnPush,
})
export class LoginComponent implements OnInit, OnDestroy {

    public loginForm = new FormGroup<LoginForm>({
        username: new FormControl(null, [Validators.required, Validators.minLength(5)]),
        password: new FormControl(null, [Validators.required, Validators.minLength(5)]),
    });

    private destroy$ = new Subject<void>();

    constructor(
        private authService: AuthService,
        private router: Router,
    ) {}

    public ngOnInit(): void {
        this.initializeUser();
    }

    public ngOnDestroy() {
        this.destroy$.next();
    }

    private initializeUser(): void {
        this.getTokenFromLocalStorage();
        this.redirectIfLoggedIn();
    }

    private redirectIfLoggedIn(): void {
        this.authService.token$
            .pipe(
                filter(token => !!token),
                takeUntil(this.destroy$),
            )
            .subscribe(() => this.router.navigate(['chats']));
    }

    private getTokenFromLocalStorage(): void {
        of(localStorage.getItem('sample-chat-user'))
            .pipe(
                first(),
                map(string => string ? string : null),
                filter(resultStr => !!resultStr),
                map((storageString) => JSON.parse(storageString as string)),
                filter(token => !!token && !!Object.keys(token).length),
                takeUntil(this.destroy$),
            )
            .subscribe(token => {
                this.authService.token$.next(token)
            });
    }

    public onButtonSubmit(): void {
        this.loginForm.markAsDirty();
        const username = this.loginForm.value.username;
        const password = this.loginForm.value.password;

        if (this.loginForm.invalid || !username || !password) return;

        const loginData = { username, password };
        this.authenticateUser(loginData);
    }

    private authenticateUser(loginData: LoginData): void {
        this.authService.login(loginData)
            .pipe(
                first(),
                takeUntil(this.destroy$),
            )
            .subscribe();
    }

}
