
import { Routes } from '@angular/router';
import { authGuard } from './guards/auth.guard';
import { LoginComponent } from './components/login/login.component';
import { RegisterComponent } from './components/register/register.component';
import { PokedexComponent } from './components/pokedex/pokedex.component';
import { PokemonDetailComponent } from './components/pokemon-detail/pokemon-detail.component';
import { FavoritesComponent } from './components/favorites/favorites.component';

export const APP_ROUTES: Routes = [
  { path: 'login', component: LoginComponent },
  { path: 'register', component: RegisterComponent },
  {
    path: 'pokedex',
    component: PokedexComponent,
    canActivate: [authGuard],
  },
  {
    path: 'pokemon/:idOrName',
    component: PokemonDetailComponent,
    canActivate: [authGuard],
  },
  {
    path: 'favorites',
    component: FavoritesComponent,
    canActivate: [authGuard],
  },
  { path: '', redirectTo: '/pokedex', pathMatch: 'full' },
  { path: '**', redirectTo: '/pokedex' },
];
