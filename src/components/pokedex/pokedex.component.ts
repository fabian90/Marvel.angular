
import { Component, ChangeDetectionStrategy, inject, signal, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { PokemonService } from '../../services/pokemon.service';
import { PokemonListItem } from '../../models/api.models';
import { PokemonCardComponent } from '../pokemon-card/pokemon-card.component';
import { finalize } from 'rxjs/operators';

@Component({
  selector: 'app-pokedex',
  templateUrl: './pokedex.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [CommonModule, PokemonCardComponent]
})
export class PokedexComponent implements OnInit {
  private pokemonService = inject(PokemonService);

  pokemonList = signal<PokemonListItem[]>([]);
  loading = signal(true);
  error = signal<string | null>(null);
  offset = signal(0);
  limit = 20;
  totalPokemon = signal(0);

  ngOnInit() {
    this.loadPokemon();
  }

  loadPokemon(newOffset?: number) {
    if (newOffset !== undefined) {
      this.offset.set(newOffset);
    }
    this.loading.set(true);
    this.error.set(null);
    this.pokemonService.getPokemonList(this.offset(), this.limit)
      .pipe(finalize(() => this.loading.set(false)))
      .subscribe({
        next: (response) => {
          this.pokemonList.set(response.results);
          this.totalPokemon.set(response.count);
        },
        error: (err) => {
          this.error.set('Error al cargar los Pokémon. Por favor, intenta de nuevo más tarde.');
          console.error(err);
        }
      });
  }

  nextPage() {
    if (this.offset() + this.limit < this.totalPokemon()) {
      this.loadPokemon(this.offset() + this.limit);
    }
  }

  previousPage() {
    if (this.offset() - this.limit >= 0) {
      this.loadPokemon(this.offset() - this.limit);
    }
  }
}
