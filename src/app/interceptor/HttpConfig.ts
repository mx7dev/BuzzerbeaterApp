import { Injectable } from '@angular/core';
import { environment } from '../../environments/environment';
import { HttpInterceptor, HttpRequest, HttpHandler, HttpEvent, HttpErrorResponse } from '@angular/common/http';
import { Router } from '@angular/router';
import { Observable } from 'rxjs';
import { tap } from 'rxjs/operators';
@Injectable() 
export class HttpConfigInterceptor implements HttpInterceptor {
    private readonly urlBase: string = environment.apiUrl;
    constructor(
        private router: Router
    ) { }

    intercept(request: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
        //debugger;
        const isLogin: string = sessionStorage.getItem('isLogin');

        if (isLogin === '1') {
            const credentials: string  = sessionStorage.getItem('basicCredentials');
            request = request.clone({ headers: request.headers.set('Authorization', 'Basic ' + credentials) });
        } else {
            const token: string = sessionStorage.getItem('Guard');
            if (token) {
                request = request.clone({ headers: request.headers.set('Authorization', 'Bearer ' + token) });
            }
        }        
        
        request = request.clone({ headers: request.headers.set('Content-Type', 'application/json') });
        request = request.clone({ url: `${this.urlBase}${request.url}`, headers: request.headers.set('Accept', 'application/json') });   

        return next.handle(request).pipe(
            tap(() => { },
                (err: any) => {                    
                    if (err instanceof HttpErrorResponse) {
                        
                        if (err.status !== 401) {
                            return;
                        }
                        sessionStorage.clear();
                        window.location.href = environment.login;
                    }
                })
        );
    }
}