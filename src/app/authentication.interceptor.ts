import { Injectable } from '@angular/core';
import {
    HttpRequest,
    HttpHandler,
    HttpEvent,
    HttpInterceptor
} from '@angular/common/http';
import { Observable } from 'rxjs';
import { AuthService } from './auth.service';

@Injectable()
export class AuthenticationInterceptor implements HttpInterceptor {

    constructor(private authService: AuthService) {
    }

    public intercept(request: HttpRequest<unknown>, next: HttpHandler): Observable<HttpEvent<unknown>> {
        const clonedRequest = request.clone();
        clonedRequest.headers.set('Content-type', 'application/json');

        const token = this.authService.token$.value;
        if (token) {
            clonedRequest.headers.set('Authentication', `Bearer ${ token }`);
        }

        return next.handle(clonedRequest);
    }
}
