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
    public user$ = new BehaviorSubject<User | null>(null);
    public token$ = new BehaviorSubject<Token | null>(null);

    private baseUrl = '/auth/login'

    constructor(private http: HttpClient) {
    }

    public isLoggedIn(): boolean {
        const token = localStorage.getItem('sample-chat-user');
        return !!token;
    }

    public login(loginData: LoginData): Observable<Token> {
        return this.http.post<Token>(`${environment.apiUrl}${this.baseUrl}`, loginData)
            .pipe(
                catchError(err => of(err)),
                filter(token => !!token.token),
                tap((token) => this.setSession(token)),
            );
    }

    public setSession(token: Token): void {
        localStorage.setItem('sample-chat-user', JSON.stringify(token));
        this.token$.next(token);
    }

    public logOut() {
        localStorage.removeItem('sample-chat-user');
    }

    public register(registrationData: RegistrationData): Observable<Token> {
        return this.http.post<Token>(`${environment.apiUrl}${this.baseUrl}`, registrationData)
            .pipe(
                tap(this.setSession),
            );
    }
}
