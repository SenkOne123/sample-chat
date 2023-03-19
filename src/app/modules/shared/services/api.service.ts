import { Injectable } from '@angular/core';
import { catchError, EMPTY, OperatorFunction } from 'rxjs';
import { MatDialog } from '@angular/material/dialog';
import { ErrorModalComponent } from '../components/error-modal/error-modal.component';
import { UnauthorizedError } from '../models/unauthorized-error';

@Injectable({
    providedIn: 'root',
})
export class ApiService {

    constructor() {
    }

    public static showDialogOnError<T>(dialog: MatDialog): OperatorFunction<T, T> {
        return catchError((error) => {
            ApiService.openErrorDialog(dialog, error);
            console.error(error);
            return EMPTY;
        });
    }

    private static openErrorDialog(dialog: MatDialog, error: UnauthorizedError): void {
        dialog
            .open(ErrorModalComponent, {
                maxWidth: '500px',
                data: error,
            });
    }
}
