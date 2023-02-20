import { Injectable } from '@angular/core';
import { HttpEvent, HttpHandler, HttpRequest, HttpErrorResponse, HttpInterceptor } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { catchError, delay, retry } from 'rxjs/operators';

import { SnackbarService } from './services/snackbar.service';

@Injectable()

export class ErrorIntercept implements HttpInterceptor {
    constructor(private sbService: SnackbarService) {}

    intercept(
        request: HttpRequest<any>,
        next: HttpHandler
    ): Observable<HttpEvent<any>> {
        return next.handle(request)
            .pipe(
                delay(1000),
                retry(1),
                catchError((error: HttpErrorResponse) => {
                    let errorMessage = '';
                    if (error.error instanceof ErrorEvent) {
                        errorMessage = `Error: ${error.error.message}`;
                    } else {
                        errorMessage = `Error: ${error.name}, ${error.status}: ${error.statusText}`;
                    }
                    this.sbService.sbError(errorMessage);
                    return throwError(() => new Error(errorMessage));
                })
            )
    }
}