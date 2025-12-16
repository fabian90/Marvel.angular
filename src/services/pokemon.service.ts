
import { Injectable, inject } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { API_BASE_URL } from '../config';
import { PokemonListResponse, Pokemon } from '../models/api.models';

@Injectable({ providedIn: 'root' })
export class PokemonService {
  private http = inject(HttpClient);
  private baseUrl = `${API_BASE_URL}/pokemon`;

  getPokemonList(offset: number = 0, limit: number = 20): Observable<PokemonListResponse> {
    // Nota: El backend local debe implementar la paginación con 'offset' y 'limit'.
    return this.http.get<PokemonListResponse>(`${this.baseUrl}?offset=${offset}&limit=${limit}`);
  }

  getPokemonDetails(idOrName: string | number): Observable<Pokemon> {
    return this.http.get<Pokemon>(`${this.baseUrl}/${idOrName}`);
  }
}
