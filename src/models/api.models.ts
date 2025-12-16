
export interface RegisterRequestDto {
  email?: string | null;
  password?: string | null;
  name?: string | null;
}

export interface LoginRequestDto {
  email?: string | null;
  password?: string | null;
}

export interface AuthResponseDto {
  token?: string | null;
  expiration?: string;
}

export interface PokemonListItem {
  name: string;
  url: string;
}

export interface PokemonListResponse {
  count: number;
  next: string | null;
  previous: string | null;
  results: PokemonListItem[];
}

export interface Pokemon {
    id: number;
    name: string;
    height: number;
    weight: number;
    sprite?: string | null; // La imagen es una URL directa
    types: {
        name: string;
    }[];
    // Las estadísticas no están en el ejemplo de la API, se marcan como opcionales.
    stats?: {
        base_stat: number;
        effort: number;
        stat: {
            name: string;
            url: string;
        }
    }[];
    // Las habilidades están en el ejemplo de la API, se añaden como opcionales.
    abilities?: {
        name: string;
    }[];
}

export interface FavoriteResponse {
  comicId: string; // El backend devuelve 'comicId', que tratamos como el ID del pokémon.
}

export interface AddFavoriteRequest {
  pokemonId: string;
}