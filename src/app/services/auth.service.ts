import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { BehaviorSubject, Observable, tap } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  private currentUserSubject: BehaviorSubject<any>;
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

  login(data: FormData) {
    return this.http.post(`http"//localhost:3000/login`, data).pipe(
      tap((user) => {
        localStorage.setItem('user', JSON.stringify(user));
        this.currentUserSubject.next(user);
        this.router.navigate(['/home']);
      })
    );
  }

  register(data: FormData) {
    return this.http.post(`http://localhost:3000/auth/signup`, data).pipe(
      tap((user) => {
        localStorage.setItem('user', JSON.stringify(user));
        this.currentUserSubject.next(user);
        this.router.navigate(['/home']);
      })
    );
  }

  logout() {
    localStorage.removeItem('user');
    this.currentUserSubject.next(null);
    this.router.navigate(['/home']);
  }
}
