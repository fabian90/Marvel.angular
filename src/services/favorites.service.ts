
import { Injectable, signal, inject } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Pokemon, FavoriteResponse, AddFavoriteRequest } from '../models/api.models';
import { API_BASE_URL } from '../config';
import { forkJoin, of } from 'rxjs';
import { switchMap, tap, catchError } from 'rxjs/operators';
import { PokemonService } from './pokemon.service';

@Injectable({
  providedIn: 'root'
})
export class FavoritesService {
  private http = inject(HttpClient);
  private pokemonService = inject(PokemonService);
  private baseUrl = `${API_BASE_URL}/Favorites`;

  favorites = signal<Pokemon[]>([]);
  loading = signal(false);
  private favoritesLoaded = signal(false);

  loadFavorites() {
    if (this.favoritesLoaded()) {
      return of(this.favorites());
    }

    this.loading.set(true);
    return this.http.get<FavoriteResponse[]>(this.baseUrl).pipe(
      switchMap(favs => {
        if (favs.length === 0) {
          return of([]);
        }
        const pokemonObservables = favs.map(fav =>
          this.pokemonService.getPokemonDetails(fav.comicId)
        );
        return forkJoin(pokemonObservables);
      }),
      tap(pokemons => {
        this.favorites.set(pokemons);
        this.loading.set(false);
        this.favoritesLoaded.set(true);
      }),
      catchError(err => {
        console.error('Failed to load favorites', err);
        this.loading.set(false);
        return of([]);
      })
    );
  }

  addFavorite(pokemon: Pokemon) {
    if (this.isFavorite(pokemon.id)) return;

    // Actualización optimista
    this.favorites.update(current => [...current, pokemon]);

    const request: AddFavoriteRequest = { pokemonId: pokemon.id.toString() };

    this.http.post(this.baseUrl, request).subscribe({
      error: () => {
        // Revertir en caso de error
        this.favorites.update(current => current.filter(p => p.id !== pokemon.id));
      }
    });
  }

  removeFavorite(pokemonId: number) {
    if (!this.isFavorite(pokemonId)) return;

    let removedPokemon: Pokemon | undefined;
    
    // Actualización optimista
    this.favorites.update(current => {
      removedPokemon = current.find(p => p.id === pokemonId);
      return current.filter(p => p.id !== pokemonId);
    });

    this.http.delete(`${this.baseUrl}/${pokemonId}`).subscribe({
      error: () => {
        // Revertir en caso de error
        if (removedPokemon) {
          this.favorites.update(current => [...current, removedPokemon!]);
        }
      }
    });
  }

  isFavorite(pokemonId: number): boolean {
    return this.favorites().some(p => p.id === pokemonId);
  }

  clearFavorites() {
    this.favorites.set([]);
    this.favoritesLoaded.set(false);
  }
}
