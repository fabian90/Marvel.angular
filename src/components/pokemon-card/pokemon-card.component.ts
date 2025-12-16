
import { Component, ChangeDetectionStrategy, input, signal, OnInit, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterLink } from '@angular/router';
import { PokemonService } from '../../services/pokemon.service';
import { FavoritesService } from '../../services/favorites.service';
import { Pokemon } from '../../models/api.models';
import { finalize } from 'rxjs';

@Component({
  selector: 'app-pokemon-card',
  templateUrl: './pokemon-card.component.html',
  styleUrls: ['./pokemon-card.component.css'],
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [CommonModule, RouterLink]
})
export class PokemonCardComponent implements OnInit {
  pokemonUrl = input<string>();
  pokemonData = input<Pokemon | null>(null);

  private pokemonService = inject(PokemonService);
  favoritesService = inject(FavoritesService);

  pokemonDetails = signal<Pokemon | null>(null);
  loading = signal(true);
  error = signal<string | null>(null);

  ngOnInit() {
    if (this.pokemonData()) {
      this.pokemonDetails.set(this.pokemonData());
      this.loading.set(false);
    } else if (this.pokemonUrl()) {
      this.loadPokemonDetailsFromUrl();
    } else {
        this.error.set('No se proporcionaron datos del Pokémon.');
        this.loading.set(false);
    }
  }

  loadPokemonDetailsFromUrl() {
    const url = this.pokemonUrl();
    if (!url) return;
    
    const urlParts = url.split('/');
    const id = urlParts[urlParts.length - 2];
    if (id) {
        this.loading.set(true);
        this.pokemonService.getPokemonDetails(id)
        .pipe(finalize(() => this.loading.set(false)))
        .subscribe({
            next: (data) => {
                console.log('Datos del Pokémon recibidos en PokemonCardComponent:', data);
                this.pokemonDetails.set(data);
            },
            error: (err) => {
                this.error.set('No se pudieron cargar los detalles');
                console.error(err);
            }
        });
    }
  }

  toggleFavorite(event: Event) {
    event.stopPropagation();
    event.preventDefault();

    const p = this.pokemonDetails();
    if (p) {
        if (this.favoritesService.isFavorite(p.id)) {
            this.favoritesService.removeFavorite(p.id);
        } else {
            this.favoritesService.addFavorite(p);
        }
    }
  }
}
