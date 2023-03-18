import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LoginComponent } from './components/login/login.component';
import { SignUpComponent } from './components/sign-up/sign-up.component';
import { RejectAuthGuardGuard } from '../../guards/reject-auth-guard.guard';
import { AuthComponent } from './components/auth/auth.component';

const routes: Routes = [
    {
        path: '',
        redirectTo: 'login',
        pathMatch: 'full',
    },
    {
        path: '',
        component: AuthComponent,
        canActivate: [RejectAuthGuardGuard],
        children: [
            {
                path: 'login',
                component: LoginComponent,
                canActivate: [RejectAuthGuardGuard],
            },
            {
                path: 'sign-up',
                component: SignUpComponent,
                canActivate: [RejectAuthGuardGuard],
            }
        ],
    },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class AuthRoutingModule { }
