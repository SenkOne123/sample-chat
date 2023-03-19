import { ChangeDetectionStrategy, Component, Inject, OnInit } from '@angular/core';
import { DialogRef } from '@angular/cdk/dialog';
import { MAT_DIALOG_DATA } from '@angular/material/dialog';

@Component({
    selector: 'app-error-modal',
    templateUrl: './error-modal.component.html',
    styleUrls: ['./error-modal.component.scss'],
    changeDetection: ChangeDetectionStrategy.OnPush
})
export class ErrorModalComponent implements OnInit {

    constructor(
        private dialogRef: DialogRef,
        @Inject(MAT_DIALOG_DATA) public error: {
            message: string,
            statusCode: number,
        }
    ) {}

    public ngOnInit(): void {
    }

    public onCloseModal(): void {
        this.dialogRef.close();
    }

}
