import { ChangeDetectionStrategy, Component, OnInit } from '@angular/core';
import { AuthService } from '../auth/services/auth.service';
import { Router } from '@angular/router';

@Component({
    selector: 'app-main',
    templateUrl: './main.component.html',
    styleUrls: ['./main.component.scss'],
    changeDetection: ChangeDetectionStrategy.OnPush,
})
export class MainComponent implements OnInit {

    constructor(
        private authService: AuthService,
        private router: Router,
    ) {
    }

    public ngOnInit(): void {
    }

    public onLogout(): void {
        this.authService.logOut();
        this.router.navigate(['auth']);
    }

}
