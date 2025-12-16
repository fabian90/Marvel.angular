
import { Injectable, inject, signal } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';
import { tap } from 'rxjs/operators';
import { API_BASE_URL } from '../config';
import { AuthResponseDto, LoginRequestDto, RegisterRequestDto } from '../models/api.models';
import { FavoritesService } from './favorites.service';

@Injectable({ providedIn: 'root' })
export class AuthService {
  private http = inject(HttpClient);
  private router = inject(Router);
  private favoritesService = inject(FavoritesService);
  private readonly TOKEN_KEY = 'pokedex_auth_token';

  isAuthenticated = signal<boolean>(this.hasToken());
  currentUser = signal<any>(null); // En una app real, se decodificaría el token para obtener info del usuario

  private hasToken(): boolean {
    if (typeof localStorage === 'undefined') return false;
    return !!localStorage.getItem(this.TOKEN_KEY);
  }

  getToken(): string | null {
    if (typeof localStorage === 'undefined') return null;
    return localStorage.getItem(this.TOKEN_KEY);
  }

  login(credentials: LoginRequestDto) {
    return this.http.post<AuthResponseDto>(`${API_BASE_URL}/auth/login`, credentials)
      .pipe(
        tap(response => {
          if (response.token) {
            localStorage.setItem(this.TOKEN_KEY, response.token);
            this.isAuthenticated.set(true);
            this.router.navigate(['/pokedex']);
          }
        })
      );
  }

  register(userInfo: RegisterRequestDto) {
    return this.http.post<AuthResponseDto>(`${API_BASE_URL}/auth/register`, userInfo)
      .pipe(
        tap(response => {
          if (response.token) {
            localStorage.setItem(this.TOKEN_KEY, response.token);
            this.isAuthenticated.set(true);
            this.router.navigate(['/pokedex']);
          }
        })
      );
  }

  logout() {
    localStorage.removeItem(this.TOKEN_KEY);
    this.isAuthenticated.set(false);
    this.currentUser.set(null);
    this.favoritesService.clearFavorites(); // Limpia los favoritos al cerrar sesión
    this.router.navigate(['/login']);
  }
}
