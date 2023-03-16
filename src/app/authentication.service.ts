import { Injectable } from '@angular/core';
import { BehaviorSubject, filter, map, Observable } from 'rxjs';
import { User } from './main/models/user';
import { HttpClient } from '@angular/common/http';
import { LoginDto } from './main/models/login';
import { Token } from './main/models/token';
import { RegistrationData } from './main/models/registration';

@Injectable({
    providedIn: 'root'
})
export class AuthenticationService {

    private baseUrl = 'auth/login'

    public user$ = new BehaviorSubject<User | null>(null);
    public isLoggedIn = false;

    constructor(private http: HttpClient) {
    }

    public login(loginDto: LoginDto): Observable<Token> {
        return this.http.post<Token>(this.baseUrl, loginDto);
    }

    public register(loginDto: RegistrationData): Observable<Token> {
        return this.http.post<Token>(this.baseUrl, loginDto);
    }
}
