import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { BehaviorSubject, catchError, Observable, of, tap } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  private apiUrl = 'http://localhost:3000/auth';
  public currentUserSubject: BehaviorSubject<any>;
  public currentUser: Observable<any>;

  constructor(private http: HttpClient, private router: Router) {
    this.currentUserSubject = new BehaviorSubject<any>(
      JSON.parse(localStorage.getItem('user') || '{}')
    );
    this.currentUser = this.currentUserSubject.asObservable();
  }

  public get currentUserValue(): any {
    return this.currentUserSubject.value;
  }

  isAuthenticated(): boolean {
    const token = localStorage.getItem('user');
    return !!token;
  }

  login(data: any) {
    return this.http.post<any>(`${this.apiUrl}/login`, data).pipe(
      tap((user) => {
        localStorage.setItem('user', JSON.stringify(user));
        this.currentUserSubject.next(user);
        this.router.navigate(['/home']);
      }),
      catchError((error) => {
        console.error('Login error', error);
        return of(null);
      })
    );
  }

  register(formData: FormData) {
    return this.http.post<any>(`${this.apiUrl}/signup`, formData).pipe(
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

  logout() {
    localStorage.removeItem('user');
    this.currentUserSubject.next(null);
    this.router.navigate(['/home']);
  }

  isAdmin(): boolean {
    const roles = this.currentUserValue?.user?.roles || [];
    return roles.includes('admin') || roles.includes('manager');
  }

  get isUserLogged(): boolean {
    console.log(localStorage.getItem('user'));
    return this.currentUserValue.data?.fname ? true : false;
  }
}
