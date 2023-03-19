import { Injectable } from '@angular/core';
import {
    HttpRequest,
    HttpHandler,
    HttpEvent,
    HttpInterceptor
} from '@angular/common/http';
import { filter, Observable } from 'rxjs';
import { ApiService } from './modules/shared/services/api.service';
import { MatDialog } from '@angular/material/dialog';
import { isDefined } from './modules/shared/utils/is-defined';

@Injectable()
export class HandleErrorsInterceptor implements HttpInterceptor {

  constructor(private dialog: MatDialog) {}

  public intercept(request: HttpRequest<unknown>, next: HttpHandler): Observable<HttpEvent<unknown>> {

      return next.handle(request)
          .pipe(
              ApiService.showDialogOnError(this.dialog),
              filter(isDefined),
          );
  }
}
