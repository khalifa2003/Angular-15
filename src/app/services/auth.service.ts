import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { BehaviorSubject, catchError, Observable, of, tap } from 'rxjs';
import { IUser } from '../Models/iuser';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  public currentUserSubject: BehaviorSubject<any>;
  public currentUser: Observable<any>;

  constructor(private http: HttpClient, private router: Router) {
    // BehaviorSubject is used to store the current user
    this.currentUserSubject = new BehaviorSubject<any>(
      JSON.parse(localStorage.getItem('user') || '{}')
    );
    this.currentUser = this.currentUserSubject.asObservable();
  }

  public get currentUserValue(): { user: IUser; token: string } {
    return this.currentUserSubject.value;
  }

  isAuthenticated(): boolean {
    const token = localStorage.getItem('user');
    return !!token;
  }

  logout() {
    // Retrieve the token from local storage
    localStorage.removeItem('user');
    // Return true if the token exists, otherwise false
    this.currentUserSubject.next(null);
    this.router.navigate(['/login']);
  }

  isAdmin(): boolean {
    const roles = this.currentUserValue?.user?.roles || [];
    return roles.includes('admin') || roles.includes('manager');
  }

  login(data: any) {
    return this.http.post<any>(`/auth/login`, data).pipe(
      tap((data) => {
        localStorage.setItem('user', JSON.stringify(data));
        this.currentUserSubject.next(data);
        this.router.navigate(['/home']);
      }),
      catchError((error) => {
        console.error('Login error', error);
        return of(null);
      })
    );
  }

  register(formData: FormData) {
    return this.http.post<any>(`/auth/signup`, formData).pipe(
      // tap method to make some methods before subscribe the data
      tap((user) => {
        localStorage.setItem('user', JSON.stringify(user));
        this.currentUserSubject.next(user);
        this.router.navigate(['/home']);
      }),
      catchError((error) => {
        console.error('Registration error', error);
        return of(null);
      })
    );
  }

  forgotPassword(email: string): Observable<any> {
    return this.http
      .post(`/auth/forgotPassword`, {
        email,
      })
      .pipe(
        tap(() => {
          localStorage.setItem('email', JSON.stringify(email));
          this.router.navigate(['login/verify']);
        }),
        catchError((error) => {
          console.error('Login error', error);
          return of(null);
        })
      );
  }

  verifyResetCode(resetCode: string): Observable<any> {
    return this.http
      .post(`/auth/verifyResetCode`, {
        resetCode,
      })
      .pipe(
        tap(() => {
          this.router.navigate(['login/reset-password']);
        })
      );
  }

  resetPassword(newPassword: string): Observable<any> {
    const email = localStorage.getItem('email')?.slice(1, -1);

    return this.http.post(`/auth/resetPassword`, { newPassword, email }).pipe(
      tap((data) => {
        console.log(data);

        localStorage.setItem('user', JSON.stringify(data));
        this.currentUserSubject.next(data);
        this.router.navigate(['/home']);

        localStorage.removeItem('email');
      })
    );
  }
}
