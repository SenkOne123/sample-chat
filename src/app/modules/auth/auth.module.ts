import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { LoginComponent } from './components/login/login.component';
import { SignUpComponent } from './components/sign-up/sign-up.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatIconModule } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import { AuthComponent } from './components/auth/auth.component';
import { RouterLink, RouterOutlet } from '@angular/router';
import { AccessAuthGuard } from '../../guards/access-auth-guard.service';
import { RejectAuthGuardGuard } from '../../guards/reject-auth-guard.guard';
import { AuthRoutingModule } from './auth-routing.module';
import { MatDialogModule } from '@angular/material/dialog';


@NgModule({
    declarations: [
        LoginComponent,
        SignUpComponent,
        AuthComponent,
    ],
    imports: [
        CommonModule,
        FormsModule,
        ReactiveFormsModule,
        MatFormFieldModule,
        MatIconModule,
        MatInputModule,
        MatButtonModule,
        RouterOutlet,
        AuthRoutingModule,
        RouterLink,
        MatDialogModule,
    ],
    providers: [AccessAuthGuard, RejectAuthGuardGuard],
})
export class AuthModule {
}
