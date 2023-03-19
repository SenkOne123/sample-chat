import { ChangeDetectionStrategy, Component, OnDestroy, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { User } from '../../models/user';
import { AuthService } from '../../services/auth.service';
import { RegistrationData } from '../../models/registration';
import { filter, first, Subject, takeUntil } from 'rxjs';
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
    changeDetection: ChangeDetectionStrategy.OnPush,
})
export class SignUpComponent implements OnInit, OnDestroy {

    public signUpForm = new FormGroup<SignUpForm>({
        username: new FormControl(null, [Validators.required, Validators.minLength(5)]),
        password: new FormControl(null, [Validators.required, Validators.minLength(5)]),
        email: new FormControl(null, [Validators.required, Validators.minLength(5)]),
    });

    private destroy$ = new Subject<void>();

    constructor(
        private authService: AuthService,
        private router: Router,
    ) {}

    public ngOnDestroy(): void {
        this.destroy$.next();
    }

    public ngOnInit(): void {
        this.detectTokenAndNavigate();
    }

    public onButtonSubmit(): void {
        this.signUpForm.markAsDirty();
        const username = this.signUpForm.value.username;
        const password = this.signUpForm.value.password;
        const email = this.signUpForm.value.email;

        if (this.signUpForm.invalid || !username || !password || !email) return;

        const signUpData = { username, password, email };
        this.signUpUser(signUpData);
    }

    private signUpUser(signUpData: RegistrationData): void {
        this.authService.register(signUpData)
            .pipe(
                first(),
                takeUntil(this.destroy$),
            )
            .subscribe();
    }

    private detectTokenAndNavigate(): void {
        this.authService.token$
            .pipe(
                filter(token => !!token?.token),
                takeUntil(this.destroy$),
            )
            .subscribe(_ => this.router.navigate(['chats']))
    }

}
