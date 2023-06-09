import { CUSTOM_ELEMENTS_SCHEMA, NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { MainComponent } from './modules/main/main.component';
import { MatInputModule } from '@angular/material/input';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MatIconModule } from '@angular/material/icon';
import { HTTP_INTERCEPTORS, HttpClientModule } from '@angular/common/http';
import { AccessAuthGuard } from './guards/access-auth-guard.service';
import { MatButtonModule } from '@angular/material/button';
import { AuthModule } from './modules/auth/auth.module';
import { CommonModule } from '@angular/common';
import { RejectAuthGuardGuard } from './guards/reject-auth-guard.guard';
import { SharedModule } from './modules/shared/shared.module';
import { HandleErrorsInterceptor } from './handle-errors.interceptor';
import { AuthenticationInterceptor } from './authentication.interceptor';

@NgModule({
    declarations: [
        AppComponent,
        MainComponent,
    ],
    imports: [
        CommonModule,
        BrowserModule,
        FormsModule,
        ReactiveFormsModule,
        AppRoutingModule,
        MatInputModule,
        BrowserAnimationsModule,
        MatIconModule,
        HttpClientModule,
        MatButtonModule,
        AuthModule,
        SharedModule,
    ],
    providers: [
        AccessAuthGuard,
        RejectAuthGuardGuard,
        {
            provide: HTTP_INTERCEPTORS,
            useClass: HandleErrorsInterceptor,
            multi: true,
        },
        {
            provide: HTTP_INTERCEPTORS,
            useClass: AuthenticationInterceptor,
            multi: true,
        }
    ],
    bootstrap: [AppComponent],
    schemas: [CUSTOM_ELEMENTS_SCHEMA],
})
export class AppModule {
}
