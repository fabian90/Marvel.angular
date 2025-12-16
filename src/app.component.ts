
import { Component, ChangeDetectionStrategy, effect, inject } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { HeaderComponent } from './components/header/header.component';
import { AuthService } from './services/auth.service';
import { FavoritesService } from './services/favorites.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [RouterOutlet, HeaderComponent],
})
export class AppComponent {
  private authService = inject(AuthService);
  private favoritesService = inject(FavoritesService);

  constructor() {
    effect(() => {
      // Si el usuario está autenticado, carga sus favoritos.
      // El servicio tiene lógica interna para no recargarlos si ya existen.
      if (this.authService.isAuthenticated()) {
        this.favoritesService.loadFavorites().subscribe();
      }
    });
  }
}
