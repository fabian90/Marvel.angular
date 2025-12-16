
import { Component, ChangeDetectionStrategy, inject, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FavoritesService } from '../../services/favorites.service';
import { PokemonCardComponent } from '../pokemon-card/pokemon-card.component';

@Component({
  selector: 'app-favorites',
  templateUrl: './favorites.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [CommonModule, PokemonCardComponent]
})
export class FavoritesComponent implements OnInit {
  favoritesService = inject(FavoritesService);

  ngOnInit() {
    // Es una buena práctica asegurarse de que los datos se carguen,
    // por si el usuario llega aquí sin pasar por el flujo de login.
    this.favoritesService.loadFavorites().subscribe();
  }
}
