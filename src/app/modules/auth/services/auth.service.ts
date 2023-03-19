import { Injectable } from '@angular/core';
import { BehaviorSubject, catchError, filter, Observable, of, tap } from 'rxjs';
import { User } from '../models/user';
import { HttpClient } from '@angular/common/http';
import { LoginData } from '../models/login';
import { Token } from '../models/token';
import { RegistrationData } from '../models/registration';
import { environment } from '../../../../environments/environment';

@Injectable({
    providedIn: 'root'
})
export class AuthService {
    public token$ = new BehaviorSubject<Token | null>(null);

    private usersUrl = '/users'
    private loginUrl = '/auth/login';
    private registerUrl = '/auth/registration';

    constructor(private http: HttpClient) {
    }

    public isLoggedIn(): boolean {
        const token = localStorage.getItem('sample-chat-user');
        return !!token;
    }

    public logOut() {
        localStorage.removeItem('sample-chat-user');
    }

    public login(loginData: LoginData): Observable<Token> {
        return this.http.post<Token>(`${environment.apiUrl}${this.loginUrl}`, loginData)
            .pipe(
                catchError(err => of(err)),
                filter(token => !!token.token),
                tap((token) => this.setSession(token)),
            );
    }

    public register(registrationData: RegistrationData): Observable<Token> {
        return this.http.post<Token>(`${environment.apiUrl}${this.registerUrl}`, registrationData)
            .pipe(
                tap(this.setSession),
            );
    }

    public setSession(token: Token): void {
        localStorage.setItem('sample-chat-user', JSON.stringify(token));
        this.token$.next(token);
    }

    public getUsers(): Observable<User[]> {
        return this.http.get<User[]>(this.usersUrl);
    }
}
