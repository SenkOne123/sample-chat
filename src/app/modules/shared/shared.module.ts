import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ErrorModalComponent } from './components/error-modal/error-modal.component';
import { MatIconModule } from '@angular/material/icon';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatButtonModule } from '@angular/material/button';



@NgModule({
  declarations: [
    ErrorModalComponent
  ],
    imports: [
        CommonModule,
        MatIconModule,
        MatFormFieldModule,
        MatButtonModule
    ]
})
export class SharedModule { }
