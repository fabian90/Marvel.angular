
import { Component, ChangeDetectionStrategy, inject, signal, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ActivatedRoute, RouterLink } from '@angular/router';
import { PokemonService } from '../../services/pokemon.service';
import { FavoritesService } from '../../services/favorites.service';
import { Pokemon } from '../../models/api.models';
import { finalize } from 'rxjs';

@Component({
  selector: 'app-pokemon-detail',
  templateUrl: './pokemon-detail.component.html',
  styleUrls: ['../pokemon-card/pokemon-card.component.css'],
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [CommonModule, RouterLink]
})
export class PokemonDetailComponent implements OnInit {
  private route = inject(ActivatedRoute);
  private pokemonService = inject(PokemonService);
  favoritesService = inject(FavoritesService);

  pokemon = signal<Pokemon | null>(null);
  loading = signal(true);
  error = signal<string | null>(null);
  
  ngOnInit() {
    const idOrName = this.route.snapshot.paramMap.get('idOrName');
    if (idOrName) {
      this.loadPokemonDetails(idOrName);
    }
  }

  loadPokemonDetails(idOrName: string) {
    this.loading.set(true);
    this.pokemonService.getPokemonDetails(idOrName)
      .pipe(finalize(() => this.loading.set(false)))
      .subscribe({
        next: (data) => {
          console.log('Datos del Pokémon recibidos en PokemonDetailComponent:', data);
          this.pokemon.set(data);
        },
        error: (err) => {
          this.error.set(`No se pudo encontrar el Pokémon "${idOrName}".`);
          console.error(err);
        }
      });
  }

  toggleFavorite() {
    const p = this.pokemon();
    if (p) {
        if (this.favoritesService.isFavorite(p.id)) {
            this.favoritesService.removeFavorite(p.id);
        } else {
            this.favoritesService.addFavorite(p);
        }
    }
  }

  getStatPercentage(value: number): number {
    return Math.min((value / 255) * 100, 100);
  }
}
