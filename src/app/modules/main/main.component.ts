import { ChangeDetectionStrategy, Component, OnInit } from '@angular/core';
import { AuthService } from '../auth/services/auth.service';
import { Router } from '@angular/router';
import { MatDialog } from '@angular/material/dialog';
import { ErrorModalComponent } from '../shared/components/error-modal/error-modal.component';

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
        private dialog: MatDialog,
    ) {
    }

    public ngOnInit(): void {
    }

    public onLogout(): void {
        this.authService.logOut();
        this.router.navigate(['auth']);
    }

    public onModalOpen(): void {
        this.dialog.open(ErrorModalComponent, {
            maxWidth: '600px',
            data: {
                message: 'Unauthorized!',
                statusCode: 401,
            }
        });
    }

}
