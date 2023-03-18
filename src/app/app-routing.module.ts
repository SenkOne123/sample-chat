import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LoginComponent } from './login/login.component';
import { MainComponent } from './main/main.component';
import { AccessAuthGuard } from './access-auth-guard.service';
import { SignUpComponent } from './sign-up/sign-up.component';
import { RejectAuthGuardGuard } from './reject-auth-guard.guard';

const routes: Routes = [
    {
        path: '',
        redirectTo: 'login',
        pathMatch: 'full',
    },
    {
        path: 'chats',
        component: MainComponent,
        canActivate: [AccessAuthGuard],
        canActivateChild: [AccessAuthGuard],
    },
    {
        path: 'login',
        component: LoginComponent,
        canActivate: [RejectAuthGuardGuard],
    },
    {
        path: 'sign-up',
        component: SignUpComponent,
        canActivate: [RejectAuthGuardGuard],
    },
    {
        path: '**',
        redirectTo: '',
    }
];

@NgModule({
    imports: [RouterModule.forRoot(routes)],
    exports: [RouterModule]
})
export class AppRoutingModule {}
