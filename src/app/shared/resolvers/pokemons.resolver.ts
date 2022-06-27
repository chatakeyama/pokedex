import { Injectable } from '@angular/core';
import { Resolve } from '@angular/router';
import { Observable, of } from 'rxjs';
import { catchError, delay, map } from 'rxjs/operators';
import { PokemonService } from 'src/app/services/pokemon.service';
import { IPokemonsResolved } from '../interfaces/IPokemonsResolved.interface';

@Injectable({
  providedIn: 'root'
})
export class PokemonsResolver implements Resolve<IPokemonsResolved> {

  constructor(private pokemonService: PokemonService) {
  }
  resolve(): Observable<IPokemonsResolved> {
    return this.pokemonService.getAll().pipe(
      delay(1000),
      map(result => ({ pokemons: result, error: null })),
      catchError((error) => {
        return of({ pokemons: [], error: error })
      })
    )
  }
}
